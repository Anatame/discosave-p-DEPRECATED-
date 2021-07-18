import injectMain from './injectable';

async function activateScript() {
   console.log("activate Script 1 called");
   let [tab] = await chrome.tabs.query({
     active: true,
     currentWindow: true,
   });
 
   chrome.scripting.executeScript({
     target: {
       tabId: tab.id,
     },
      function: () => {
         window.setInterval(() => {
            chrome.runtime.sendMessage({
              msg: "scriptActivated",
            });

          }, 1000);
     },
   });
}
 
async function injectMainScript() {
   let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
  
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
      },
       function: injectMain
    });
}

export {
   activateScript,
   injectMainScript
}




 