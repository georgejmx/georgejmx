import { readFileSync, writeFile } from "fs";
import handlebars from "handlebars";

import fascinations from "./models/fascinations.json" assert { type: "json" };
import projects from "./models/projects.json" assert { type: "json" };

const TEMPLATE_PATH = "src/index.hbs";
const OUTPUT_HTML_PATH = "assets/index.html";

function buildStaticHtml() {
    const htmlString = readFileSync(TEMPLATE_PATH, "utf-8");
    const template = handlebars.compile(htmlString);
    const outputHtml = template({ fascinations, projects });

    writeFile(OUTPUT_HTML_PATH, outputHtml, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            console.log("\nSuccessfully built HTML ✅");
        }
    });
}

buildStaticHtml();
