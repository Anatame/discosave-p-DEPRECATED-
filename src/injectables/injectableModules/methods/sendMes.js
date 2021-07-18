export default function sendMes(data) {
   chrome.storage.sync.set({
     message: data,
   });

   chrome.runtime.sendMessage({
     msg: "sendMessage",
   });
 }
