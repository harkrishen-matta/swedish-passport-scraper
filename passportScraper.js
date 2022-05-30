const puppeteer = require("puppeteer");

const PassportScraper = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage();
      await page.goto(
        "https://www.migrationsverket.se/ansokanbokning/valjtyp?0&enhet=U0586&sprak=sv&callback=https:/www.swedenabroad.se"
      );

      //await page.select("select#viseringstyp", "ansöka om svenskt pass/id-handlingar")
      await page.click("select#viseringstyp");
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Enter");

      await page.waitForSelector("#antalpersoner", { visible: true });
      await page.select("select#antalpersoner", "0");

      await page.waitFor(500);

      const checkbox = await page.$(
        'input[name="control.panel:control.checkbox"]'
      );
      await checkbox.click();

      await page.waitFor(1000);

      const submit = await page.$('input[name="fortsatt"]');
      await submit.click();

      await page.waitFor(1000);

      var appointmentAvailability = "";
      if (
        (await page.content()).match(
          "Det finns inga mer lediga tider för närvarande."
        ) !== null
      ) {
        appointmentAvailability = "No Appointments Available";
        console.log("No Appointments Available");
      } else {
        appointmentAvailability = "Appointments Available";
        console.log("Appointments Available");
      }

      await page.waitFor(1000);

      await browser.close();

      return resolve(appointmentAvailability);
    } catch (e) {
      return reject(e);
    }
  });
};

module.exports = PassportScraper;
