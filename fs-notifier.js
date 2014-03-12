function getFSUrl() {
   return "http://www.reddit.com/r/friendsafari/new";
}

function goToFS() {
   chrome.tabs.create({"url": getFSUrl()});
}

function update() {
   $.get(getFSUrl(),
      function (page) {
         this.page = page;
         var root = this;
         chrome.storage.sync.get("tracked", function (store) {
            subselector = store["tracked"].map(function (elem) { return ".flair-" + elem; }).toString();
            results = $(".link:has("+subselector+")", root.page);
            if (results.length > 0) {
               chrome.browserAction.setBadgeText({"text": results.length.toString()});
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
