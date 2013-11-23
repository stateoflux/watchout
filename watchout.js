


// enemies
var height = 545;
var width = 700;
var svg = d3.select(".container").append("svg");
var data = d3.range(30).map(function(item){
  return {
    cy: Math.floor(Math.random() * height),
    cx: Math.floor(Math.random() * width),
    r: 10
  }
})

/* var player = svg.select("path").data({ 
  fill: '#ff6600',
  x: 0,
  y: 0,
  angle: 0,
  r: 5 })
.enter()
.append("path")
.attr("x", function(d){ return d.x })
.attr("y", function(d){ return d.y })
.attr("angle", function(d){ return d.angle })
.attr("r", function(d){ return d.r })
.attr("d", "m-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z")
.attr("fill", "orange"); */
var dragPlayer = d3.behavior.drag()
  .on('drag', function(d, i) {
    d3.select(this).x += d3.event.dx;
    d3.select(this).y += d3.event.dy;
    d3.select(this).attr("transform", "translate("+d.x+","+d.y+")");
  });

var player = svg.append("path")
.attr("x", width / 2)
.attr("y", height /2)
.attr("angle", 0)
.attr("r", 5)
.attr("d", "m-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z")
.attr("fill", "orange")
.call(dragPlayer);





var purpleEnemies = svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function(d){ return d.cx })
  .attr("cy", function(d){ return d.cy })
  .attr("r", function(d){ return d.r })
  .style("fill", "purple");

var moveEnemies = function(enemies){
  enemies.transition().duration(1000).attr("cx", function(){ return Math.floor(Math.random() * height) })
    .attr("cy", function(){ return Math.floor(Math.random() * height) })
}

setInterval(function(){ moveEnemies(purpleEnemies) }, 2000);

