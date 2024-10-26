require("dotenv").config();
const express = require("express");
const app = express();
const famousCountries = [
  { name: "United States" },
  { name: "Canada" },
  { name: "United Kingdom" },
  { name: "Germany" },
  { name: "France" },
  { name: "Italy" },
  { name: "Spain" },
  { name: "Australia" },
  { name: "Japan" },
  { name: "China" },
  { name: "India" },
  { name: "Brazil" },
  { name: "Mexico" },
  { name: "Russia" },
  { name: "South Korea" },
  { name: "Saudi Arabia" },
  { name: "Netherlands" },
  { name: "Switzerland" },
  { name: "South Africa" },
  { name: "Turkey" },
];

app.get("/", (req, res) => {
  res.send(famousCountries);
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
