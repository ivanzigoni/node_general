const puppeteer = require('puppeteer');
const c = require("./env")
const fs = require("fs");

async function main(imagePath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.goto("https://twitter.com/i/flow/login");
  
    await page.waitForSelector('[autocomplete="username"]');
  
    await page.type('[autocomplete="username"]', c.username);
  
    await page.evaluate(() => {
      [...document.getElementsByTagName("div")]
        .filter(div => div.getAttribute("role") === "button")
        .find(div => [...div.children].find(element => element.textContent === "Next"))
        ?.setAttribute("nextButton", "true");
  
      return true
    })
  
    await page.click('[nextButton="true"]');
  
    await page.waitForSelector('[autocomplete="current-password"]');
  
    await page.type('[autocomplete="current-password"]', c.password);
  
    await page.evaluate(() => {
      [...document.getElementsByTagName("div")]
        .filter(div => div.getAttribute("role") === "button")
        .find(div => [...div.children].find(element => element.textContent === "Log in"))
        ?.setAttribute("loginButton", "true");
  
      return true
    })
    
    await page.click('[loginButton="true"]');
  
    await page.waitForSelector('article');
    
    await page.goto("https://twitter.com/settings/profile");

    await page.waitForSelector(`input[data-testid="fileInput"]`)

    const [_, avatar] = await page.$$(`input[data-testid="fileInput"]`)

    if (!fs.existsSync(imagePath)) {
      console.log(imagePath);
      throw new Error("invalid image path");
    }

    await avatar.uploadFile(imagePath);

    await page.waitForSelector('div[data-testid="applyButton"]')

    await page.click('div[data-testid="applyButton"]')

    await page.waitForSelector('div[data-testid="Profile_Save_Button"]')
    
    await page.click('div[data-testid="Profile_Save_Button"]')

    setTimeout(async () => {
        // await page.screenshot({ path: `./screenshots/${new Date().toISOString()}.jpg` });
  
        browser.close()
    }, 2000);
    return;
}

async function crawler(imagePath) {
  return main(imagePath);
}


module.exports = { crawler };