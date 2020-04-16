const puppeteer = require("puppeteer");
const app = require("../../server/server");
const jwt = require("jsonwebtoken");
const UserModel = require("../../server/models/user.js");
const TaskModel = require("../../server/models/task.js");
const mongoose = require("mongoose");

// test data
const correctUserId = new mongoose.Types.ObjectId();
const token = jwt.sign({ _id: correctUserId }, process.env.JWT_SECRET);
const correctUser = {
  _id: correctUserId,
  username: "tom",
  email: "tom.josen@gmail.com",
  password: "Tom2020!",
  tokens: [
    {
      token,
    },
  ],
};

const unregisteredUser = {
  _id: correctUserId,
  username: "jakob",
  email: "jakob.josen@gmail.com",
  password: "Jakob2020!",
  tokens: [
    {
      token,
    },
  ],
};

const taskList = [
  {
    name: "Fix internet",
    creationDate: new Date().getTime(),
    status: false,
    taskOwnerId: correctUserId,
  },
  {
    name: "Buy stuff for dinner",
    creationDate: new Date().getTime(),
    status: false,
    taskOwnerId: correctUserId,
  },
  {
    name: "Meet with John",
    creationDate: new Date().getTime(),
    status: true,
    taskOwnerId: correctUserId,
  },
];

/**
 * Test of front end
 * 1. Database is prepared for each test case
 * 2. each test has assertions to determine if test is successfull
 * 3. browser is opened for visual test (eg.: check if elements are rendered properly)
 *
 * jest.config.js is used to extend timeout so that all test are finished and test suite is closing correctly
 * Timeout extension is needed to take into account time spent on opening/closing browser window.
 * If timeout is not enough ->  extend in setupTestFramework.js
 */
describe("Front end test", () => {
  // before any test tear down clear database
  beforeEach(async () => {
    await UserModel.deleteMany();
    await new UserModel(correctUser).save();
    await TaskModel.deleteMany();
    taskList.forEach(async (task) => {
      await new TaskModel(task).save();
    });
  });

  //close connection to server so, that test suite will close and clear db
  afterAll(async () => {
    await TaskModel.deleteMany();
    await UserModel.deleteMany();
    await app.close();
    await mongoose.disconnect();
  });

  test("Should log in successfully", (done) => {
    puppeteer
      .launch({ headless: false, args: ["--start-fullscreen"] })
      .then(async (browser) => {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(process.env.PAGE_URL);
        //fill in login..
        await page.focus(
          "#playground > div > div > div > form > div:nth-child(1) > input"
        );
        await page.keyboard.type(correctUser.username);
        //.. password fields
        await page.focus(
          "#playground > div > div > div > form > div:nth-child(2) > input"
        );
        await page.keyboard.type(correctUser.password);
        //click on login button
        await page.click(
          "#playground > div > div > div > form > div.d-flex.flex-row.justify-content-between.mt-2 > button:nth-child(1)"
        );

        //wait until page after login will be loaded
        await page.waitFor(
          "#playground > div > div > div.d-flex.flex-row.justify-content-between.card-body > button:nth-child(1)",
          { visible: true }
        );

        const btnName = await page.$eval(
          "#playground > div > div > div.d-flex.flex-row.justify-content-between.card-body > button:nth-child(1)",
          (btn) => btn.innerHTML
        );

        expect(btnName).toBe("refresh");

        //close browser after 1500ms
        setTimeout(async () => {
          await browser.close();
          await done();
        }, 1500);
      });
  });

  test("Should not log in if user is not registered", (done) => {
    puppeteer
      .launch({ headless: false, args: ["--start-fullscreen"] })
      .then(async (browser) => {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(process.env.PAGE_URL);
        //fill in login..
        await page.focus(
          "#playground > div > div > div > form > div:nth-child(1) > input"
        );
        await page.keyboard.type(unregisteredUser.username);
        //.. password fields
        await page.focus(
          "#playground > div > div > div > form > div:nth-child(2) > input"
        );
        await page.keyboard.type(unregisteredUser.password);
        //click on login button
        await page.click(
          "#playground > div > div > div > form > div.d-flex.flex-row.justify-content-between.mt-2 > button:nth-child(1)"
        );

        //wait until error label showed up
        await page.waitFor(
          "#playground > div > div > div > form > div:nth-child(1) > div",
          { visible: true }
        );

        const notExistentUserLabel = await page.$eval(
          "#playground > div > div > div > form > div:nth-child(1) > div",
          (errLabel) => errLabel.innerHTML
        );

        expect(notExistentUserLabel).toBe("User does not exist");

        //close browser after 1500ms
        setTimeout(async () => {
          await browser.close();
          await done();
        }, 1500);
      });
  });

  test("Should not log in if user provided wrong password", (done) => {
    puppeteer
      .launch({ headless: false, args: ["--start-fullscreen"] })
      .then(async (browser) => {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(process.env.PAGE_URL);
        //fill in login..
        await page.focus(
          "#playground > div > div > div > form > div:nth-child(1) > input"
        );
        await page.keyboard.type(correctUser.username);
        //.. password fields
        await page.focus(
          "#playground > div > div > div > form > div:nth-child(2) > input"
        );
        await page.keyboard.type(`${correctUser.password}wrong`);
        //click on login button
        await page.click(
          "#playground > div > div > div > form > div.d-flex.flex-row.justify-content-between.mt-2 > button:nth-child(1)"
        );

        //wait until error label showed up
        await page.waitFor(
          "#playground > div > div > div > form > div:nth-child(2) > div",
          { visible: true }
        );

        const label = await page.$eval(
          "#playground > div > div > div > form > div:nth-child(2) > div",
          (errLabel) => errLabel.innerHTML
        );

        expect(label).toBe("Password does not match");

        //close browser after 1500ms
        setTimeout(async () => {
          await browser.close();
          await done();
        }, 1500);
      });
  });
});
