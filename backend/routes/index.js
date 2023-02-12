var express = require("express");
var router = express.Router();

const accountSid = "AC5fc23366d0f4dabc4c6d64182dbfa22e";
const authToken = "f8d2fcd3c91f1e43f86ccf13d81c69f6";
const phoneNumber = "+18339042854";

/* GET home page. 
requires number
*/

router.get("/getStarted", function (req, res, next) {
  require("dotenv").config();
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: "Thank you for subscribing to our notification queue. Please respond with the racer's name that you'd like to follow.",
      from: phoneNumber,
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
  var name = req.query.name;
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
  const twilioClient = require("twilio")(accountSid, authToken);
  dataCollection = database.collection("data");
  const arr = dataCollection.find(
    {
      name: name.substring(0, name.length - 5),
    },
    { number: 1, _id: 0 }
  );
  arr.toArray().then((data) => {
    data.map((entry) => {
      twilioClient.messages
        .create({
          body:
            "Lap: " +
            lapnum +
            "\nLap Time: " +
            laptime +
            "\nPit Stop Time: " +
            pitstoptime +
            "\nRace Time Elapsed: " +
            prevelapsed +
            "\n\n" +
            name.substring(0, name.length - 5) +
            " is in position " +
            position +
            ". They're expected to finish in position " +
            probability,
          from: phoneNumber,
          to: entry.number,
        })
        .catch((err) => console.log(err));
    });
  });
  res.send("");
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

router.get("/retrieveCurrData", function (req, res, next) {
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://formulytics:formulytics@cluster0.pqrdl47.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  const collection = client.db("formulytics").collection("racer-data");
  collection
    .find({})
    .toArray()
    .then((data) => {
      res.send(data);
    });
});

module.exports = router;
