export default async function activateScript(fun) {
   console.log("activate Script 1 called");
   let [tab] = await chrome.tabs.query({
     active: true,
     currentWindow: true,
   });
 
   chrome.scripting.executeScript({
     target: {
       tabId: tab.id,
     },
     function: fun,
   });
 }