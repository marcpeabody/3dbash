$(function(){
  $(".up").live("click",function(){
    var sender = $(this);
    $.post("/up", {id:sender.attr("data-id")}, function(resp){
      var movie = resp.movie;
      sender.html(":) "+ movie.up_count);
    });
  });
  $(".down").live("click",function(){
    var sender = $(this);
    $.post("/down", {id:sender.attr("data-id")}, function(resp){
      var movie = resp.movie;
      sender.html(":( "+ movie.down_count);
    });
  });
});
