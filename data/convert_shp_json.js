const Shp = require("shp");
const fs = require("fs");

Shp.readFile("data/county_level_shp/county_level", (err, data) => {
  fs.writeFileSync("public/map.json", JSON.stringify(data));
});
