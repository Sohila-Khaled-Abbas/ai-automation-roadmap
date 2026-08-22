"""Collect directional SimilarWeb comparator data for documented UX research."""

import json
import sys
from pathlib import Path

sys.path.append("/opt/.manus/.sandbox-runtime")
from data_api import ApiClient

OUTPUT_PATH = Path(__file__).resolve().parents[1] / "docs" / "ux-benchmark-similarweb.json"
DOMAINS = ["roadmap.sh", "codecademy.com"]


def main() -> None:
    client = ApiClient()
    result: dict[str, object] = {
        "purpose": "Directional public learning-platform comparison only; not first-party analytics.",
        "domains": {},
        "metrics": ["globalRank"],
    }

    for domain in DOMAINS:
        domain_result: dict[str, object] = {}
        for name, endpoint in {"globalRank": "SimilarWeb/get_global_rank"}.items():
            try:
                domain_result[name] = client.call_api(endpoint, path_params={"domain": domain})
            except Exception as error:  # Keep partial retrieval evidence when a provider response is unavailable.
                domain_result[name] = {"error": str(error)}
        result["domains"][domain] = domain_result
        OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT_PATH.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")

    print(json.dumps({"output": str(OUTPUT_PATH), "domains": DOMAINS}, indent=2))


if __name__ == "__main__":
    main()
