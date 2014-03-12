function getFSUrl() {
   return "http://www.reddit.com/r/friendsafari/new";
}

function goToFS() {
   chrome.tabs.create({url: getFSUrl()});
}

function update() {
   $.get(getFSUrl(),
      function (data) {
         results = $(".link:has(.flair-ditto)", data);
         if (results.length > 0) {
            chrome.browserAction.setBadgeText({text: results.length.toString()});
         } else {
            chrome.browserAction.setBadgeText({text: ""});
         }
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
