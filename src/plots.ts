import * as d3 from "d3";

export const map = async () => {
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

    const data: any = await d3.json("public/map.json");

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
        /*.on("mouseover", ({ target }: any) => {
            $(target).css("stroke-width", "3px")
            $("#info_county").removeClass("hidden");
            $("#info #county_name").text($(target).attr("county_name"));
        });*/

    /*$("#plot_map").on("mouseout", () => {
        $("#info_county").addClass("hidden");
    });*/
}

export const barPlot = () => {
    const bar_width = 350,
        bar_height = 50;

    const x = d3.scaleLinear().range([0, bar_width]).domain([0, 1]);
    const y = d3.scaleLinear().range([bar_height, 0]).domain([0, 1]);

    const xAxis = d3.axisBottom(x).tickSize(0).tickSizeOuter(0);
    const yAxis = d3.axisLeft(y).tickSize(0);

    const bar_svg = d3
        .select("#bar_chart")
        .append("svg")
        .attr("width", bar_width)
        .attr("height", bar_height)

    bar_svg
        .append("g")
        .append('rect')
        .attr("class", "bar")
        .attr("width", 0)
        .attr("height", 50)

    bar_svg
        .append("text")
        .attr("class", "label")
        .attr("y", (bar_height * 3) / 5)
        .attr('x', 0);
}