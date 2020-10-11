var data = [];
const layout = {
    showlegend: false,
    width: 650,
    height: 400,
    paper_bgcolor: "rgb(240, 240, 240)",
    plot_bgcolor: "rgb(240, 240, 240)",
    aspectratio: 1,
    title: "Graph of the above equation",
    xaxis: {
      title: "X axis"
    },
    yaxis: {
      scaleanchor: 'x',
      title: "Y axis"
    }
  }

var graph = Plotly.newPlot(document.getElementById("graph"), data, layout, {staticPlot: true});

var createGraph = function(m, b) {
  var line = [{
    x: [-3, 8],
    y: [b + (-3 * m), b + (8 * m)],
    type: "scatter",
    mode: "lines",
    line: {
    	color: "rgb(230, 210, 20)",
    	width: 3
    }
  }];
  
  graph = Plotly.newPlot(document.getElementById("graph"), line, layout, {staticPlot: true});
}

//createGraph(1/3, -2);