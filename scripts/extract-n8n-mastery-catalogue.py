from __future__ import annotations

import json
import re
import sys
import zipfile
from collections import Counter
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree as ET


DOCX_PATH = Path("/home/ubuntu/upload/n8n-mastery-sources-catalogue.docx")
OUTPUT_PATH = Path("/home/ubuntu/ai-automation-roadmap/docs/n8n-mastery-catalogue-extracted.json")

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
R_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
PKG_REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"
NS = {"w": W_NS, "r": R_NS, "pr": PKG_REL_NS}


def text_for(element: ET.Element) -> str:
    parts = [node.text or "" for node in element.findall(".//w:t", NS)]
    return re.sub(r"\s+", " ", "".join(parts)).strip()


def cell_payload(cell: ET.Element, relationships: dict[str, str]) -> tuple[str, list[str]]:
    urls: list[str] = []
    for link in cell.findall(".//w:hyperlink", NS):
        relationship_id = link.attrib.get(f"{{{R_NS}}}id")
        if relationship_id and relationship_id in relationships:
            urls.append(relationships[relationship_id])
    return text_for(cell), urls


def current_group_from_heading(text: str, current: str) -> str:
    compact = text.casefold()
    if compact.startswith("2. arabic foundational course"):
        return "Arabic Foundational Course: n8n with Karim"
    if compact.startswith("3. arabic advanced ai agents"):
        return "Arabic Advanced AI Agents & Scaling Course: AI Plus"
    if compact.startswith("4. english comprehensive"):
        return "English Comprehensive Tutorials & Workflows"
    if compact.startswith("5. official documentation"):
        return "Official Documentation & Technical Resource Guides"
    return current


def main() -> int:
    if not DOCX_PATH.exists():
        raise FileNotFoundError(f"Missing catalogue: {DOCX_PATH}")

    with zipfile.ZipFile(DOCX_PATH) as archive:
        document = ET.fromstring(archive.read("word/document.xml"))
        relationships_xml = ET.fromstring(archive.read("word/_rels/document.xml.rels"))

    relationships = {
        rel.attrib["Id"]: rel.attrib["Target"]
        for rel in relationships_xml.findall("pr:Relationship", NS)
        if rel.attrib.get("TargetMode") == "External" and rel.attrib.get("Type", "").endswith("/hyperlink")
    }

    body = document.find("w:body", NS)
    if body is None:
        raise ValueError("The Word document has no body element")

    records: list[dict[str, object]] = []
    group = "Unclassified catalogue section"
    document_order = 0

    for child in list(body):
        if child.tag == f"{{{W_NS}}}p":
            group = current_group_from_heading(text_for(child), group)
            continue
        if child.tag != f"{{{W_NS}}}tbl":
            continue

        for row in child.findall("w:tr", NS):
            cells = row.findall("w:tc", NS)
            if len(cells) < 5:
                continue
            values_and_urls = [cell_payload(cell, relationships) for cell in cells]
            values = [value for value, _ in values_and_urls]
            number, title, resource_format, reference_label, purpose = values[:5]
            if number.casefold() in {"#", "category / series group"}:
                continue

            urls = values_and_urls[3][1]
            if not urls:
                continue
            document_order += 1
            records.append(
                {
                    "documentOrder": document_order,
                    "catalogueGroup": group,
                    "catalogueNumber": number,
                    "title": title,
                    "format": resource_format,
                    "referenceLabel": reference_label,
                    "urls": urls,
                    "purpose": purpose,
                }
            )

    flat_urls = [url for record in records for url in record["urls"]]
    domains = Counter(urlparse(url).netloc for url in flat_urls)
    no_url_records = [record["documentOrder"] for record in records if not record["urls"]]
    duplicate_urls = {url: count for url, count in Counter(flat_urls).items() if count > 1}

    payload = {
        "sourceFile": DOCX_PATH.name,
        "relationshipHyperlinkCount": len(relationships),
        "extractedCatalogueRows": len(records),
        "rowsWithoutEmbeddedUrl": no_url_records,
        "embeddedUrlCount": len(flat_urls),
        "duplicateEmbeddedUrls": duplicate_urls,
        "domains": dict(sorted(domains.items())),
        "records": records,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: payload[key] for key in payload if key != "records"}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
