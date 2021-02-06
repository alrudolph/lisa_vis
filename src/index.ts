import * as d3 from "d3";
import { updateMap, updateBarPlot } from "./updateMap"
import {
  globalMoranEstimate, 
} from "./data";
import { scaleBand } from "d3";

$(() => {
  /*
    MAP PLOT
  */
  const map_width = 500,
    map_height = 500;

  const svg = d3
    .select("#plot_map")
    .append("svg")
    .attr("width", map_width)
    .attr("height", map_height);

  const map_g = svg.append("g");

  const projection = d3.geoAlbersUsa().scale(2500).translate([1050, 300]);
  const map_path = d3.geoPath().projection(projection);

  (d3 as any).json("public/map.json").then((data: any) => {
    console.log(data);
    map_g
    .append("g")
    .attr("class", "boundary")
    .selectAll("boundary")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", map_path)
      .attr("id", (x: any) => x.properties.fips.replace(/\s/g, ''))
      .attr("county_name", (x: any) => x.properties.NAMELSAD.replace(/\s$/g, ''))
      .on("mouseover", ({ target }: any) => {
        $("#info_county").removeClass("hidden");
        $("#info #county_name").text($(target).attr("county_name"));
      });

      let w = 0
      setInterval(() => {
        if (w <= 47) {
         
        updateMap("heat", ++w); 
        updateBarPlot(w)
        }
      }, 300)
  });

  $("#plot_map").on("mouseout", () => {
    $("#info_county").addClass("hidden");
  });

  /*
    BAR PLOT 
  */

  const bar_width = 350,
    bar_height = 50;

  const x = d3.scaleLinear().range([0, bar_width]).domain([0, 1]);
  const y = d3.scaleLinear().range([bar_height, 0]).domain([0,1]);

  const xAxis = d3.axisBottom(x).tickSize(0).tickSizeOuter(0);
  const yAxis = d3.axisLeft(y).tickSize(0);

  const bar_svg = d3
    .select("#bar_chart")
    .append("svg")
    .attr("width", bar_width)
    .attr("height", bar_height)

  const bar_data = globalMoranEstimate(0); //make between 50 and 350

  bar_svg.append("g")
    .append('rect')
    .attr("class", "bar")
    .attr("width", bar_data * 500)
    .attr("height", 50)


  bar_svg
    .append("text")
    .attr("class", "label")
    .attr("y", (bar_height * 3) / 5)
    .attr('x', bar_data * 500 + 10);

  /*
    OPTIONS
  */
  let option = [false, false, false];

  const update = (option: Array<boolean>) => {
    $("#type_heatmap").removeClass("option_selected");
    $("#type_stacked_heatmap").removeClass("option_selected");
    $("#type_quantile").removeClass("option_selected");
  };

  $("#type_heatmap").on("click", function () {
    console.log("HERE");
    option = [true, false, false];
    update(option);
    $(this).addClass("option_selected");
  });

  $("#type_stacked_heatmap").on("click", function () {
    option = [false, true, false];
    update(option);
    $(this).addClass("option_selected");
  });

});
