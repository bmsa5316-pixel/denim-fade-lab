import json
from pathlib import Path
from datetime import date

data = json.loads(Path("data/projects.json").read_text(encoding="utf-8"))
out = Path("generated")
out.mkdir(exist_ok=True)

summary = {
    "generated_on": date.today().isoformat(),
    "projects": []
}

for project in data["projects"]:
    latest = project["records"][-1]
    summary["projects"].append({
        "id": project["id"],
        "brand": project["brand"],
        "model": project["model"],
        "baseline_date": project["baseline_date"],
        "latest": latest
    })

(out / "summary.json").write_text(
    json.dumps(summary, ensure_ascii=False, indent=2),
    encoding="utf-8"
)

print("Generated:", out / "summary.json")
