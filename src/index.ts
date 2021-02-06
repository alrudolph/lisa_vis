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
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", map_path)
      .attr("class", "county")
      .attr("id", (x: any) => x.properties.fips)
      .attr("county_name", (x: any) => x.properties.NAMELSAD)
      .on("mouseover", ({ target }: any) => {
        $("#info_county").removeClass("hidden");
        $("#info #county_name").text($(target).attr("county_name"));
      });

    map_g
      .append("g")
      .attr("class", "boundary")
      .selectAll("boundary")
      .data(data.features)
      .enter()
      .append("path");
  });

  $("#plot_map").on("mouseout", () => {
    $("#info_county").addClass("hidden");
  });

  /*
    BAR PLOT 
  */

  const bar_width = 350,
    bar_height = 50;

  const y = d3.scaleBand().range([0, bar_height]);
  const x = d3.scaleLinear().range([0, 5]);

  const bar_svg = d3
    .select("#bar_chart")
    .append("svg")
    .attr("width", bar_width)
    .attr("height", bar_height)
    .append("g");

  const bar_data = [4.3]; //make between 50 and 350

  x.domain([0, bar_height]);
  bar_svg
    .selectAll(".bar")
    .data(bar_data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width", bar_data[0])
    .attr("height", bar_height);

  bar_svg.append("g").attr("transform", `translate(0,${bar_height})`);

  //bar_svg.append("g").call(d3.axisLeft(y));

  bar_svg
    .append("text")
    .attr("y", (bar_height * 3) / 5)
    .attr("x", bar_data[0] + 5)
    .text(bar_data[0]);

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

  $("#type_quantile").on("click", function () {
    option = [false, false, true];
    update(option);
    $(this).addClass("option_selected");
  });
});
