import {  
    getDateRange, 
    getFips,
    getQuantileColors,
    getStackColors,
    getHeatColors,
    globalMoranEstimate,
    globalMoranPvalue,
    getQuantileBin
} from "./data";

import * as d3 from "d3";

const swap = (heat: boolean) => {
    if (heat) {
        $("#quantile_colors").hide();
        $("#heat_colors").show();
    }
    else {
        $("#heat_colors").hide();
        $("#quantile_colors").show();
    }
}

export const updateMap = (what: "heat" | "heat_stacked" | "quantile", week: number) => {
    $("#plot_date").text(getDateRange(week))

    let colors: Array<string>

    swap(what !== "quantile");

    switch(what) {
        case "heat": {
            colors = getHeatColors(week);
        } break;
        case "heat_stacked": {
            colors = getStackColors(week);
        } break;
        case "quantile": {
            colors = getQuantileColors(week);
            const quantiles = [0, ...getQuantileBin(week)];
            $("#quantile_colors").children().each(function (i, elem) {
                $(elem).children().each(function (i2, elem2) {
                    $(elem2).children("p").text(Math.round(quantiles[i * 5 + i2]) + "-" + Math.round(quantiles[i * 5 + i2 + 1]))
                })
            })
        } break;
    }

    getFips().forEach((val, i) => {
        $("#" + val).css("fill", colors[i])
    })
}

export const updateBarPlot = (week: number) => {
    $("#global_moran_pvalue").text(globalMoranPvalue(week));
    const est = globalMoranEstimate(week);
    const svg = d3.select("#bar_chart").transition();
    svg.select(".bar").duration(150).attr("d", est).attr("width",est * 350);
    svg.select(".label").duration(225).attr("x", est * 350 + 10).text(Math.floor(est * 1000) / 1000);
}