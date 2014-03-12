$.get("http://www.reddit.com/r/friendsafari/new",
   function (data) {
      $(".entry:has(.flair-normal)>p.title>a.title", data).each(
         function () {
            $("#results").append("<li><a href='http://www.reddit.com"+
               $(this).attr("href")+"'>"+$(this).html()+"</a></li>");
         }
      );
   }
);
