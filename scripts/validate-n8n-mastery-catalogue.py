from __future__ import annotations

import json
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, build_opener, HTTPRedirectHandler


SOURCE_PATH = Path("/home/ubuntu/ai-automation-roadmap/docs/n8n-mastery-catalogue-extracted.json")
OUTPUT_PATH = Path("/home/ubuntu/ai-automation-roadmap/docs/n8n-mastery-catalogue-url-validation.json")
USER_AGENT = "DataTeaRoadmapResourceValidator/1.0 (non-commercial link validation)"


class LimitedRedirectHandler(HTTPRedirectHandler):
    max_redirections = 5


def validate_url(url: str) -> dict[str, object]:
    request = Request(url, method="HEAD", headers={"User-Agent": USER_AGENT, "Accept": "text/html,*/*;q=0.8"})
    opener = build_opener(LimitedRedirectHandler())
    try:
        with opener.open(request, timeout=12) as response:
            return {"url": url, "status": response.status, "finalUrl": response.url, "method": "HEAD"}
    except HTTPError as error:
        if error.code not in {405, 403}:
            return {"url": url, "status": error.code, "finalUrl": error.geturl(), "method": "HEAD"}
    except URLError as error:
        return {"url": url, "status": None, "error": str(error.reason), "method": "HEAD"}
    except TimeoutError:
        return {"url": url, "status": None, "error": "timeout", "method": "HEAD"}

    fallback = Request(
        url,
        method="GET",
        headers={"User-Agent": USER_AGENT, "Accept": "text/html,*/*;q=0.8", "Range": "bytes=0-1023"},
    )
    try:
        with opener.open(fallback, timeout=12) as response:
            return {"url": url, "status": response.status, "finalUrl": response.url, "method": "GET"}
    except HTTPError as error:
        return {"url": url, "status": error.code, "finalUrl": error.geturl(), "method": "GET"}
    except URLError as error:
        return {"url": url, "status": None, "error": str(error.reason), "method": "GET"}
    except TimeoutError:
        return {"url": url, "status": None, "error": "timeout", "method": "GET"}


def main() -> int:
    source = json.loads(SOURCE_PATH.read_text(encoding="utf-8"))
    urls = sorted({url for record in source["records"] for url in record["urls"]})

    results: list[dict[str, object]] = []
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(validate_url, url): url for url in urls}
        for future in as_completed(futures):
            results.append(future.result())

    results.sort(key=lambda item: str(item["url"]))
    status_counts: dict[str, int] = {}
    for result in results:
        status_key = str(result.get("status", "network-error"))
        status_counts[status_key] = status_counts.get(status_key, 0) + 1

    payload = {"uniqueUrlCount": len(urls), "statusCounts": status_counts, "results": results}
    OUTPUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: payload[key] for key in payload if key != "results"}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
