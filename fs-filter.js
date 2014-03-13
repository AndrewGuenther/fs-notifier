$(".link").css("display", "none");
chrome.storage.sync.get("tracked", function (store) {
   subselector = store["tracked"].map(function (elem) { return ".flair-" + elem; }).toString();
   results = $(".link:has("+subselector+")").css("display", "block");
});
