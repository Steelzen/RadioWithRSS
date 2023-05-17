const express = require("express");
const fetch = require("isomorphic-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/proxy", (req, res) => {
  const rssUrl = req.query.url;

  fetch(rssUrl)
    .then((response) => response.text())
    .then((xmlString) => {
      res.set("Content-Type", "application/xml");
      res.send(xmlString);
    })
    .catch((error) => {
      console.error("Error fetching RSS feed:", error);
      res.status(500).send("Error fetching RSS feed");
    });
});

app.listen(3000, () => {
  console.log("Proxy server is running on port 3000");
});
