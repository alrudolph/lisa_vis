import { map, barPlot } from "./plots"
import { updateMap, updateBarPlot } from "./updateMap"


$(async () => {
  let type: "heat" | "quantile" | "heat_stacked" = "heat"
  let week = 0;
  let playing = false;

  $("#heat_colors").hide()
  $("#quantile_colors").hide()

  const heatColorsDisplay = ["#ffffff", "#ff0000", "#0000ff"];
  const heatTextDisplay = ["Not Significant", "Hot Area", "Cold Area"];
  const quantileColorDisplay = ["#FFFFFF", "#FFFF00", "#FFD000", "#FFA200", "#FF7000", "#FF5000", "#FF0000"]

  $("#heat_colors").children().each(function (i, elem) {
      $(elem).children(".color").css("background-color", heatColorsDisplay[i])
      $(elem).children("p").text(heatTextDisplay[i]);
  });
  $("#quantile_colors").children().each(function (i, elem) {
      $(elem).children().each(function (i2, elem2) {
          $(elem2).children(".color").css("background-color", quantileColorDisplay[(i * 4) + i2])
      })
  })
  
  const intrvl = (func: Function) => setInterval(() => {
    func();
  }, 300)

  let playingInterval: any;

  let setPlaying = (val = false) => {
    playing = val;
    clearInterval(playingInterval);
    $("#plot_controls_play").text(week < 47 ? "Play" : "Reset");
  }

  await map();
  updateMap(type, week);
  barPlot();
  updateBarPlot(week);

  const update = () => {
    $("#type_heatmap").removeClass("option_selected");
    $("#type_stacked_heatmap").removeClass("option_selected");
    $("#type_quantile").removeClass("option_selected");
  };

  $("#type_heatmap").on("click", function () {
    update();
    type = "heat";
    $(this).addClass("option_selected");
    updateMap(type, week);
  });

  $("#type_stacked_heatmap").on("click", function () {
    update();
    type = "heat_stacked";
    $(this).addClass("option_selected");
    updateMap(type, week);
  });

  $("#type_quantile").on("click", function () {
    update();
    type = "quantile";
    $(this).addClass("option_selected");
    updateMap(type, week);
  });

  $("#plot_controls_next").on("click", () => {
    week = week < 47 ? week + 1 : 0;
    setPlaying();
    updateMap(type, week);
    updateBarPlot(week)
  })

  $("#plot_controls_prev").on("click", () => {
    week = week > 0 ? week - 1 : 47;
    setPlaying();
    updateMap(type, week);
    updateBarPlot(week)
  })

  $("#plot_controls_play").on("click", function () {
    if (week >= 47) {
      week = 0;
    }

    setPlaying(!playing);
    $(this).text(playing ? "Pause" : "Play");

    if (playing) {
      const inc = () => {
        updateMap(type, ++week);
        updateBarPlot(week)
  
        if (week >= 47) {
          playing = false;
          $(this).text("Reset");
          clearInterval(playingInterval);
        }
      }
      playingInterval = intrvl(inc);
      playingInterval();
    }
  })
});
