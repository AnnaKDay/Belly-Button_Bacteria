const url = "https://api.spacexdata.com/v2/launchpads";

d3.json("samples.json").then(function(data){
    console.log(data);
});

d3.json("samples.json").then(function(data){
    firstPerson = data.metadata[0];
    Object.entries(firstPerson).forEach(([key, value]) =>
      {console.log(key + ': ' + value);});
});

// creates a dropdown menu of ID numbers dynamically
function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

// option changed function
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
};

function buildMetadata(sample) {
d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => 
        {PANEL.append("h6").text(key.toUpperCase() + ': ' + value);});
   
   
});
};

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // DELIVERABLE 1
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = sampleArray[0];
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = result.otu_ids;
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuIds.slice(0,10).map((x) => "OTU " + x).reverse();
    var hoverText = otuLabels.slice(0,10).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sampleValues.slice(0,10).reverse(),
      text: hoverText,
      type: "bar"
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: "# of Samples Found"},
      yaxis: {
        tickmode: "array",
        tickvals: [0,1,2,3,4,5,6,7,8,9],
        ticktext: yticks
      }
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout, {responsive: true})

    // DELIVERABLE 2
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      mode: "markers",
      x: otuIds,
      y: sampleValues,
      marker: {
        size: sampleValues,
        color: otuIds,
      },
      text: otuLabels
  }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU-ID"},
      yaxis: {title: "# of Samples"}
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout, {responsive: true}); 

    // DELIVERABLE 3
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metaData = data.metadata;
    // 2. Create a variable that holds the first sample in the metadata array.
    var resultArray = metaData.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // 3. Create a variable that holds the washing frequency.
    var washFrequency = result.wfreq;
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      type: "indicator",
      mode: "gauge+number",
      title: {text: "Belly Button Washing Frequency: Scrubs Per Week"},
      domain: {x: [0, 1], y: [0, 1]},
      value: washFrequency,
      gauge: {
        axis: {range: [null, 10]},
        bar: {color: "black"},
        steps: [
          {range: [0, 2], color: "red"},
          {range: [2, 4], color: "darkorange"},
          {range: [4, 6], color: "yellow"},
          {range: [6, 8], color: "greenyellow"},
          {range: [8, 10], color: "lime"},
        ]
      }
  
  }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600,
      height: 450,
      margin: {t:0, b: 0}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
