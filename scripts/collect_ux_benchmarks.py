"""Collect directional SimilarWeb comparator data for documented UX research."""

import json
import sys
from pathlib import Path

sys.path.append("/opt/.manus/.sandbox-runtime")
from data_api import ApiClient

OUTPUT_PATH = Path(__file__).resolve().parents[1] / "docs" / "ux-benchmark-similarweb.json"
DOMAINS = ["roadmap.sh", "codecademy.com"]
DATE_QUERY = {"country": "world", "granularity": "monthly", "start_date": "2026-05", "end_date": "2026-07"}


def main() -> None:
    client = ApiClient()
    result: dict[str, object] = {
        "purpose": "Directional public learning-platform comparison only; not first-party analytics.",
        "domains": {},
        "dateQuery": DATE_QUERY,
    }

    for domain in DOMAINS:
        domain_result: dict[str, object] = {}
        for name, endpoint in {
            "visits": "SimilarWeb/get_visits_total",
            "bounceRate": "SimilarWeb/get_bounce_rate",
            "trafficSourcesDesktop": "SimilarWeb/get_traffic_sources_desktop",
            "trafficByCountry": "SimilarWeb/get_total_traffic_by_country",
        }.items():
            try:
                query = DATE_QUERY if name != "trafficByCountry" else {"start_date": "2026-05", "end_date": "2026-07", "limit": "10"}
                domain_result[name] = client.call_api(endpoint, path_params={"domain": domain}, query=query)
            except Exception as error:  # Keep partial retrieval evidence when a provider response is unavailable.
                domain_result[name] = {"error": str(error)}
        result["domains"][domain] = domain_result
        OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT_PATH.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")

    print(json.dumps({"output": str(OUTPUT_PATH), "domains": DOMAINS}, indent=2))


if __name__ == "__main__":
    main()
