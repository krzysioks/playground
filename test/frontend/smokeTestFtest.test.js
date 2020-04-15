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

describe("Front end test", () => {
  // before any test tear down clear database
  beforeEach(async () => {
    await UserModel.deleteOne({
      _id: correctUserId,
    });
    await new UserModel(correctUser).save();
    await TaskModel.deleteMany({
      taskOwnerId: correctUserId,
    });
    taskList.forEach(async (task) => {
      await new TaskModel(task).save();
    });
  });

  //close connection to server so, that test suite will close and clear db
  afterAll(async () => {
    await TaskModel.deleteMany({
      taskOwnerId: correctUserId,
    });
    await UserModel.deleteOne({
      _id: correctUserId,
    });
    await app.close();
    await mongoose.disconnect();
  });

  test("Should log in successfully", (done) => {
    puppeteer
      .launch({ headless: true, args: ["--start-fullscreen"] })
      .then(async (browser) => {
        const page = await browser.newPage();
        await page.setViewport({ width: 2560, height: 1440 });
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
        await page.waitFor(
          "#playground > div > div > div.d-flex.flex-row.justify-content-between.card-body > button:nth-child(1)",
          { visible: true }
        );
        // const refreshBtn = await page.$(
        //   "#playground > div > div > div.d-flex.flex-row.justify-content-between.card-body > button:nth-child(1)"
        // );
        const btnName = await page.$eval(
          "#playground > div > div > div.d-flex.flex-row.justify-content-between.card-body > button:nth-child(1)",
          (btn) => btn.innerHTML
        );
        // const value = await btnName.jsonValue();
        // console.log("test: ", btnName);

        if (btnName == "refresh") {
          expect("refresh").toBe("refresh");
        } else {
          expect("false").toBe("refresh");
        }

        // const btnName = await refreshBtn.getProperty("innerHTML");
        // console.log("btnName: ", btnName);
        // expect("refresh").toBe("refresh");
        await browser.close();
        await done();
      });
  });
});
