import puppeteer from "puppeteer"
import { expect } from "chai"

async function wait(t) {
  return new Promise((resolve) => {
    setTimeout(resolve, t)
  })
}

async function login(page) {
    await page.locator("#login").fill("test")
    await page.locator("#password").fill("test")
    await page.locator("button").click()
    await wait(1000)
}

describe("System tests", function(){
  let browser, page

  beforeEach(async function(){
    browser = await puppeteer.launch({ headless: true })
    //browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.goto("http://localhost:5173")
    await page.setViewport({width: 1400, height: 1600})
  })

  afterEach(function(){
    browser.close()
  })

  it("Success login", async function(){
    await login(page)
    expect(await page.$eval("p", t => t.innerText)).to.be.eq("test")
  })

  it("Failed login", async function(){
    await page.locator("#login").fill("t")
    await page.locator("#password").fill("t")
    await page.locator("button").click()
    expect(await page.$eval(".text-danger", t => t.innerText)).to.be.eq("Špatné jméno nebo heslo")
  })

  it("Start chat", async function(){
    await login(page)
    await page.locator("a").click()
    expect(await page.$eval("h3", h => h.innerText)).to.be.eq("Chat s Josef")
  })

  it("Start chat with Josef", async function(){
    await login(page)
    await page.locator("a").click()
    await page.locator("#message").fill("ahoj")
    await page.locator("#send").click()
    expect(await page.$eval("span", h => h.innerText)).to.be.eq("ahoj")
    expect(await page.$eval("span", h => h.classList.contains("bg-light"))).to.be.true
  })

  it("Cancel chat", async function(){
    await login(page)
    await page.locator("a").click()
    await page.locator("#message").fill("ahoj")
    await page.locator("#cancel").click()
    expect(await page.$eval("h1", h => h.innerText)).to.be.eq("SOSTP Chat!")
  })
})
