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

