const puppeteer = require("./node_modules/puppeteer");
describe("Front end test 1", () => {
  // beforeAll(async () => {
  //   puppeteer
  //     .launch({ headless: false, args: ["--start-fullscreen"] })
  //     .then(async (browser) => {
  //       const page = await browser.newPage();
  //       await page.setViewport({ width: 2560, height: 1440 });
  //       await page.goto("http://localhost:3001/#/task/login");
  //       await browser.close();
  //     });
  // });

  test("Should open login page", async (done) => {
    puppeteer
      .launch({ headless: false, args: ["--start-fullscreen"] })
      .then(async (browser) => {
        const page = await browser.newPage();
        await page.setViewport({ width: 2560, height: 1440 });
        await page.goto("http://localhost:3001/#/task/login");
        // await browser.close();
        await done();
      });
  });
});
