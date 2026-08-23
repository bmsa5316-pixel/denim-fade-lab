import json
from pathlib import Path

p = Path("data/projects.json")
data = json.loads(p.read_text(encoding="utf-8"))

assert "projects" in data and isinstance(data["projects"], list)

for project in data["projects"]:
    required = ["id", "brand", "model", "start_date", "baseline_date", "items", "records"]
    for key in required:
        assert key in project, f"missing project field: {key}"
    for item in project["items"]:
        assert "id" in item and "type" in item and "baseline_image" in item
        assert Path(item["baseline_image"]).exists(), item["baseline_image"]

print("OK: projects.json")
