const functions = require("firebase-functions");
const got = require("got");
const express = require("express");
const request = require("request");
const app = express();

app.get("/", async (req, res) => {
  // locally this comes back with nothing in the emulator
  // deployed it is working fine but strangely this only happens with got
  // this seems it could be a windows only bug

  const response = await got(
    "https://api.github.com/repos/hacksore/bluelinky/issues?state=open",
    {
      headers: {
        "User-Agent": "got",
      },
    }
  );

  request(
    "https://api.github.com/repos/hacksore/bluelinky/issues?state=open",
    {
      headers: {
        "User-Agent": "request",
      },
    },
    (err, data) => {
      if (err) {
        throw new Error(err);
      }

      res.send({
        "request-lib": JSON.parse(data.body),
        "got-lib": JSON.parse(response.body || "{}"),
      });
    }
  );
});

exports.app = functions.https.onRequest(app);
