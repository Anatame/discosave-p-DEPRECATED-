import {activateScript, injectMainScript} from "./injectables/activateScript";
import {
   getParamByName,
   getDiscordUri,
   getUserData
} from './utils';

// import test from './utils/methods/test'

console.log(getDiscordUri())

let user_signed_in = false;


chrome.runtime.onInstalled.addListener(function () {
   chrome.action.setBadgeText({
      text: "ON",
   });
   chrome.action.setBadgeBackgroundColor({
      color: "#4688F1",
   });

});

chrome.storage.sync.set({
   svg: chrome.runtime.getURL("/images/savewhite.svg"),
   svgHover: chrome.runtime.getURL("/images/savewhitehover.svg"),
   svgClick: chrome.runtime.getURL("/images/savewhiteClick.svg"),
});

chrome.webNavigation.onCompleted.addListener(function (tab) {
   if (tab.frameId == 0) {
      console.log("activated");
      activateScript();
   }
});

chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {

   if (request.msg == "login") {
    
      launchAuthFlow(sendResponse);
      return true;
   } else if (request.msg == "logOut") {
      user_signed_in = false;
      sendResponse("success");
      return false;
   } else if (request.msg == "scriptActivated") {
      injectMainScript();
   }
})

function launchAuthFlow(sendResponse) {
   chrome.identity.launchWebAuthFlow(
      {
        url: getDiscordUri(),
        interactive: true,
      }, (redirect_uri) => {
        getUserData("https://discordapp.com/api/users/@me", getParamByName('access_token', redirect_uri))
        console.log(redirect_uri);
        if (
          chrome.runtime.lastError ||
          redirect_uri.includes("access_denied")
        ) {
          sendResponse("fail");
          return;
        } else {
          user_signed_in = true
          sendResponse("success");
        }
      }
    );
}


