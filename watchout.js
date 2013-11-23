


var height = 545;
var width = 700;
var svg = d3.select(".container").append("svg");
var time = 0;
var highScore = 0;

var data = d3.range(30).map(function(item){
  return {
    cy: Math.floor(Math.random() * height),
    cx: Math.floor(Math.random() * width),
    r: 10
  }
})

var playerPos = {
  x: 0,
  y: 0
}

var dragPlayer = d3.behavior.drag()
  .on('drag', function(d, i) {
    playerPos.x = d3.event.x;
    playerPos.y = d3.event.y;
    var degrees = 360 * (Math.atan2(d3.event.dy,d3.event.dx)/(Math.PI*2));
    player.attr("transform", "rotate(" + degrees + "," + d3.event.x + "," + d3.event.y + ") translate(" +  d3.event.x + "," + d3.event.y + ")");
  });

var player = svg.append("path")
.attr("x", 0)
.attr("y", 0)
.attr("angle", 0)
.attr("r", 5)
.attr("d", "m-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z")
.attr("fill", "orange")
.call(dragPlayer);

var checkCollision = function(enemy, cb) {
  var radiusSum = 15;
  var xDiff = parseFloat(enemy.attr('cx')) - playerPos.x;
  var yDiff = parseFloat(enemy.attr('cy')) - playerPos.y;

  var separation = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) );

  if (separation < 15) {
    resetTimer();
  }
};

var resetTimer = function() {
  if (time > highScore) {
    d3.select(".high-score").text(time);
    highScore = time;
    time = 0;
  }
};

var tweenWithCollisionDetection = function(endData) {
  var enemy = d3.select(this);

  startPos = {
    x: parseFloat(enemy.attr('cx')),
    y: parseFloat(enemy.attr('cx'))
  }

  endPos = {
    x: endData.x,
    y: endData.y 
  };

  return function(t) {
    checkCollision(enemy);
  };
};

var purpleEnemies = svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function(d){ return d.cx })
  .attr("cy", function(d){ return d.cy })
  .attr("r", function(d){ return d.r })
  .style("fill", "purple");

var moveEnemies = function(enemies){
  enemies.transition().duration(1000).attr("cx", function(){ 
    return Math.floor(Math.random() * height);
  })
    .attr("cy", function(){ 
      return Math.floor(Math.random() * width);
    }).tween("custom", tweenWithCollisionDetection);
};

setInterval(function(){
  moveEnemies(purpleEnemies);
}, 2000);

setInterval(function() {
  d3.select(".current-score").text(function() { return time++; })
}, 50);

