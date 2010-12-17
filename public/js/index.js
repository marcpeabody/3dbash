$(function(){
  $(".up").live("click",function(){
    var sender = $(this);
    $.post("/up", {id:sender.attr("data-id")}, function(resp){
      sender.html(":) "+ resp.movie.votes.up);
    });
  });
  $(".down").live("click",function(){
    var sender = $(this);
    $.post("/down", {id:sender.attr("data-id")}, function(resp){
      sender.html(":( "+ resp.movie.votes.down);
    });
  });
});
