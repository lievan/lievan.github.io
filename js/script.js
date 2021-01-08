$(document).ready(function() {
    var urls = ["./images/headshot2.jpg", "./images/nlmatics.png", "./images/spec2.png", "./images/delib.png", "./images/sappho.png", "./images/ConvosClimate.png", "./images/regisroar.png", "./images/headshot.jpg"]
    var main = d3.select("main");
    var scrolly = main.select("#scrolly");
    var figure = scrolly.select("figure");
    figure.style("background-image", "url(" + urls[0] + ")").style("background-size", "auto 100%")
    var article = scrolly.select("article");
    var step = article.selectAll(".step");
    
    // initialize the scrollama
    var scroller = scrollama();
    
    // generic window resize listener event
    function handleResize() {
      // 1. update height of step elements
      var stepH = Math.floor(window.innerHeight * 0.9);
      step.style("height", stepH + "px");
    
      var figureHeight = window.innerHeight / 2;
      var figureMarginTop = (window.innerHeight - figureHeight) / 2;
    
      figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");
    
      // 3. tell scrollama to update new element dimensions
      scroller.resize();
    }
    
    // scrollama event handlers
    function handleStepEnter(response) {
      console.log(response);
      // response = { element, direction, index }
    
      // add color to current step only
      step.classed("is-active", function(d, i) {
        figure.style("background-image", "url(" + urls[response.index] + ")").style("background-size", "auto 100%")
        return i === response.index;
      });
      console.log(response.index)
      // update graphic based on step
      
    }
    
    function setupStickyfill() {
      d3.selectAll(".sticky").each(function() {
        Stickyfill.add(this);
      });
    }
    
    function init() {
      setupStickyfill();
    
      // 1. force a resize on load to ensure proper dimensions are sent to scrollama
      handleResize();
    
      // 2. setup the scroller passing options
      // 		this will also initialize trigger observations
      // 3. bind scrollama event handlers (this can be chained like below)
      scroller
        .setup({
          step: "#scrolly article .step",
          offset: 0.33
        })
        .onStepEnter(handleStepEnter);
    
      // setup resize event
      window.addEventListener("resize", handleResize);
    }
    
    // kick things off
    init();
      
});