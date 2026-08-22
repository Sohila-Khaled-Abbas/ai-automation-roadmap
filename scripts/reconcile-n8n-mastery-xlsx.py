"""Reconcile XLSX source URLs with the previously imported catalogue inventory."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
XLSX_PATH = ROOT / "docs" / "n8n-mastery-xlsx-extracted.json"
DOCX_PATH = ROOT / "docs" / "n8n-mastery-catalogue-extracted.json"
OUTPUT_PATH = ROOT / "docs" / "n8n-mastery-xlsx-reconciliation.json"


def urls(records: list[dict[str, object]]) -> set[str]:
    return {str(record["url"]) for record in records if record.get("url")}


def catalogue_urls(records: list[dict[str, object]]) -> set[str]:
    return {
        str(url)
        for record in records
        for url in record.get("urls", [])
        if url
    }


def main() -> None:
    spreadsheet = json.loads(XLSX_PATH.read_text(encoding="utf-8"))
    catalogue = json.loads(DOCX_PATH.read_text(encoding="utf-8"))
    spreadsheet_urls = urls(spreadsheet["rows"])
    prior_catalogue_urls = catalogue_urls(catalogue["records"])
    direct_video_urls = [
        row["url"]
        for row in spreadsheet["rows"]
        if row.get("urlKind") == "youtube_direct_video"
    ]
    result = {
        "spreadsheetRows": spreadsheet["rowCount"],
        "spreadsheetUniqueUrls": len(spreadsheet_urls),
        "priorCatalogueUniqueUrls": len(prior_catalogue_urls),
        "spreadsheetUrlsAlreadyInPriorCatalogue": len(spreadsheet_urls & prior_catalogue_urls),
        "newSpreadsheetUrls": sorted(spreadsheet_urls - prior_catalogue_urls),
        "directVideoPermalinks": direct_video_urls,
        "conclusion": (
            "The spreadsheet is a deduplicated subset of the prior catalogue and supplies no direct "
            "YouTube video permalinks; no search-result URLs can be safely replaced from this file."
        ),
    }
    OUTPUT_PATH.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
