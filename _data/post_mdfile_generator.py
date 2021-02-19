import json

with open('works.json') as json_file:
	data = json.load(json_file)
	for work_slug, work in data.items():
		with open("markdown_files/" + work_slug + ".md", "w") as f:
			f.write("---\ntitle: " + work['name'] + "\npermalink: /works/" + work_slug + "\n---")
			f.close