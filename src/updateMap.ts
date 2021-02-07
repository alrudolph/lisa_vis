import {  
    getDateRange, 
    getFips,
    getQuantileColors,
    getStackColors,
    globalMoranEstimate,
    globalMoranPvalue
} from "./data";

import * as d3 from "d3";

export const updateMap = (what: "heat" | "heat_stacked" | "quantile", week: number) => {
    $("#plot_date").text(getDateRange(week))

    switch(what) {
        case "heat": {
            const colors = getStackColors(week);
            getFips().forEach((val, i) => {
                $("#" + val).css("fill", colors[i])
            })
        } break;
        case "heat_stacked": {

        } break;
        case "quantile": {
            const colors = getQuantileColors(week);
            getFips().forEach((val, i) => {
                $("#" + val).css("fill", colors[i])
            })
        } break;
    }
}

export const updateBarPlot = (week: number) => {
    $("#global_moran_pvalue").text(globalMoranPvalue(week));
    const est = globalMoranEstimate(week);
    const svg = d3.select("#bar_chart").transition();
    svg.select(".bar").duration(150).attr("d", est).attr("width",est * 350);
    svg.select(".label").duration(225).attr("x", est * 350 + 10).text(Math.floor(est * 1000) / 1000);
}