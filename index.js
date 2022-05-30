const express = require("express");
const app = express();
const PassportScraper = require("./passportScraper");

app.get("/", (req, res) => {
  PassportScraper()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) =>
      res.status(500).send({
        message: "Failure",
        errorMessage: err.message,
      })
    );
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port}`);
});
