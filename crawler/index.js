const puppeteer = require('puppeteer');
const c = require("./env")


async function main() {
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

    // await page.click('span[class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0"]')
    
    await page.goto("https://twitter.com/settings/profile");

    await page.waitForSelector(`input[data-testid="fileInput"]`)

    const [_, avatar] = await page.$$(`input[data-testid="fileInput"]`)

    await avatar.uploadFile("/home/ivan/Documents/testes/node_general/crawler/screenshots/2023-01-26T23:01:07.198Z.jpg")
  
    await page.waitForSelector('div[data-testid="applyButton"]')

    await page.click('div[data-testid="applyButton"]')

    await page.waitForSelector('div[data-testid="Profile_Save_Button"]')
    
    await page.click('div[data-testid="Profile_Save_Button"]')

    setTimeout(async () => {
        await page.screenshot({ path: `./screenshots/${new Date().toISOString()}.jpg` });
  
        browser.close()
    }, 2000);
}

main();