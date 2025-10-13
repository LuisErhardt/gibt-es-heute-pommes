import puppeteer from "puppeteer";
import { delay } from "./util.js";
import { readFileSync, writeFileSync } from "fs";
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

async function writeResultToFile(found: boolean) {
  let days = null;
  if (!found) {
    const res = JSON.parse(readFileSync("public/result.json", "utf-8"));
    days = res.days + 1;
  }

  const text = found ? "Ja" : "Nein";
  const data = { result: text, days: days };
  writeFileSync("public/result.json", JSON.stringify(data, null, 2), { encoding: "utf-8" });
  console.log(data);
  console.log("JSON geschrieben");
}

try {
  // const pommesFound = await pommmesInMenu();
  await writeResultToFile(true);
  // await createPost(pommesFound ? "Ja" : "Nein");
} catch (error) {
  console.error(error);
  process.exit(1);
}
