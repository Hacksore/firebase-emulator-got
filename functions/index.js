const functions = require('firebase-functions');
const got = require('got');
const express = require('express');
const app = express();

app.get('/', async(request, response) => {
  // locally this comes back with nothing in the emulator
  // deployed it is working fine but strangely this only happens with got
  // this seems it could be a windows only bug
  const res = await got('https://api.github.com/repos/hacksore/bluelinky/issues?state=open');
  response.send(res.body);
});

exports.app = functions.https.onRequest(app);
