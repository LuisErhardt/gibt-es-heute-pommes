import puppeteer from "puppeteer";
import { delay } from "./util.js";
import { writeFileSync } from "fs";

async function pommmesInMenu() {
  const browser = await puppeteer.launch({ headless: true });
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

function writeResultToFile(found: boolean) {
  const text = found ? "Ja" : "Nein";
  writeFileSync("result.txt", text, { encoding: "utf-8" });
  console.log("Pommes gefunden: " + text);
  console.log("Textdatei geschrieben");
}

try {
  const pommesFound = await pommmesInMenu();
  writeResultToFile(pommesFound);
} catch (error) {
  console.error(error);
  process.exit(1);
}
