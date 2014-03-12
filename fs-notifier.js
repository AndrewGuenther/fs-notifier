function getFSUrl() {
   return "http://www.reddit.com/r/friendsafari/new";
}

function goToFS() {
   chrome.browserAction.setBadgeText({"text": ""});
   chrome.tabs.create({"url": getFSUrl()});
}

function update() {
   $.get(getFSUrl(),
      function (page) {
         this.page = page;
         this.results = 0;
         var root = this;
         chrome.storage.sync.get(null, function (store) {
            subselector = store["tracked"].map(function (elem) { return ".flair-" + elem; }).toString();
            times = $(".link:has("+subselector+") time", root.page);
            $(times).each(function () {
               if (new Date(store["last-observed"]) < new Date($(this).attr("datetime"))) {
                  console.log("increment");
                  root.results += 1;
               }
            });
            if (root.results > 0) {
               chrome.browserAction.setBadgeBackgroundColor({"color": [80, 136, 47, 255]});
               chrome.browserAction.setBadgeText({"text": root.results.toString()});
            } else {
               chrome.browserAction.setBadgeText({"text": ""});
            }
         });
      });
};

update();

chrome.browserAction.onClicked.addListener(goToFS);
chrome.alarms.onAlarm.addListener(update);
chrome.runtime.onInstalled.addListener(
   function () {
      chrome.alarms.create("fs-notifier", {
         when: Date.now(),
         periodInMinutes: 5
      });
   }
);
