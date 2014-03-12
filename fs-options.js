function fs_li_add(name) {
   $("#tracking").append("<li><span>"+name+"</span><a data-item='"+name+"' href='#' class='remove'>Remove</a>");
}

function fs_add() {
   window.fs_tracked.push($("#add-text").val());
   fs_li_add($("#add-text").val());
   chrome.storage.sync.set({"tracked": window.fs_tracked});
   $("#add-text").val("");
}

function fs_remove() {
   var index = window.fs_tracked.indexOf($(this).attr("data-item"));
   window.fs_tracked.splice(index, 1);
   chrome.storage.sync.set({"tracked": window.fs_tracked});
   $(this).parent().remove();
}

function fs_load() {
   chrome.storage.sync.get("tracked", function (data) {
      window.fs_tracked = data["tracked"];
      if (!window.fs_tracked) { window.fs_tracked = []; }
      $(data["tracked"]).each(function () {
         fs_li_add(this);
      });
   });
}
fs_load();

$("#tracking").on("click", ".remove", fs_remove);
$("#add-button").click(fs_add);
$("#add-text").keypress(function(e) { if (e.keyCode == 13) { fs_add() }});
