var express = require("express");
var router = express.Router();

/* GET home page. 
requires number
*/
router.get("/getStarted", function (req, res, next) {
  require("dotenv").config();
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: "Thank you for subscribing to our notification queue. Please respond with the racer's name that you'd like to follow.",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.query.number,
    })
    .catch((err) => console.log(err));
});

router.get("/sendRequests", function (req, res, next) {
  require("dotenv").config();
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: "",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.query.number,
    })
    .catch((err) => console.log(err));
  res.send("");
});

router.post("/add", function (req, res, next) {
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://formulytics:formulytics@cluster0.pqrdl47.mongodb.net/test";
  const client = new MongoClient(uri);

  const database = client.db("formulytics");
  const collection = database.collection("data");

  collection.insertOne(
    { name: req.query.name, number: req.query.number },
    (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`Inserted a document: ${result}`);
      client.close();
    }
  );
  res.send("");
});

/**
 * Inputs name of racer they want to be updated for and their number
 */
router.post("/addRacerData", function (req, res, next) {
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://formulytics:formulytics@cluster0.pqrdl47.mongodb.net/test";
  const client = new MongoClient(uri);

  const database = client.db("formulytics");
  var collection = database.collection("racer-data");
  const lapnum = req.query.lap;
  const name = req.query.name;
  const laptime = req.query.laptime;
  const pitstoptime = req.query.pitstoptime;
  const prevelapsed = req.query.prevelapsed;
  const position = req.query.position;
  const probability = req.query.probability;
  client.connect().then(function () {
    collection.updateMany(
      { name: name },
      {
        $set: {
          lap: lapnum,
          name: name,
          laptime: laptime,
          pitstoptime: pitstoptime,
          prevelapsed: prevelapsed,
          position: position,
          probability: probability,
        },
      },
      { upsert: true }
    );
  });
  require("dotenv").config();
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioClient = require("twilio")(accountSid, authToken);
  collection = database.collection("data");

  res.send(
    collection.find(
      {
        name: req.query.name.substring(0, name.length - 2),
      },
      { number: 1, _id: 0 }
    )
  );
});
/**
 * inputs number and name of the racer they want to update to
 */
router.post("/update", function (req, res, next) {
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://formulytics:formulytics@cluster0.pqrdl47.mongodb.net/test";
  const client = new MongoClient(uri);

  const database = client.db("formulytics");
  const collection = database.collection("data");

  collection.findOneAndUpdate(
    { number: req.query.number },
    { $set: { name: req.query.name } },
    (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`Inserted a document: ${result}`);

      // Close the connection
      client.close();
    }
  );
  res.send("");
});

module.exports = router;
