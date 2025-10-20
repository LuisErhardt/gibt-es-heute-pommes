import puppeteer from "puppeteer";
import { delay, isWeekend } from "./util.js";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { createPost } from "./api.js";

async function pommmesInMenu() {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  try {
    const page = await browser.newPage();
    console.log("Browser started");

    await page.goto("https://www.stw-edu.de/gastronomie/speiseplaene/mensa-campus-duisburg");
    console.log("Page fetched, wait for 4 seconds...");

    await delay(4000);

    const speiseplanText = await page.$eval("div.speiseplan", (el) => el.textContent || "");

    console.log("Speiseplan gelesen");
    return speiseplanText.toLowerCase().includes("pommes");
  } finally {
    await browser.close();
    console.log("Browser closed");
  }
}

async function writeResultToFile(found: boolean): Promise<number | null> {
  let days = null;
  if (!found) {
    const res = JSON.parse(readFileSync("public/result.json", "utf-8"));
    days = res.days + 1;
  }

  const text = found ? "Ja" : "Nein";
  const data = { result: text, days: days };
  writeFileSync("public/result.json", JSON.stringify(data, null, 2), { encoding: "utf-8" });
  console.log(data);
  console.log("result.json geschrieben");
  return days;
}

function archiveResult(found: boolean, path: string) {
  let data: Record<string, boolean> = {};
  if (existsSync(path)) {
    data = JSON.parse(readFileSync(path, "utf-8"));
  }
  const todayAsString = new Date().toLocaleDateString("en-CA");

  if (data[todayAsString]) {
    console.log("Ergebnis für heute schon im Archiv, nichts geändert.");
    return;
  }

  data[todayAsString] = found;
  writeFileSync(path, JSON.stringify(data, null, 2), { encoding: "utf-8" });
  console.log("archive.json geschrieben");
}

try {
  const pommesFound = await pommmesInMenu();
  archiveResult(pommesFound, "public/archive.json");
  if (!isWeekend()) {
    const days = await writeResultToFile(pommesFound);
    await createPost(pommesFound ? "Ja" : "Nein!\n" + (days ? `Das ist der ${days}. Tag ohne Pommes in Folge.` : ""));
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}
