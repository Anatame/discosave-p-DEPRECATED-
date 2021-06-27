export default function repeater(fun, message, inteval) {
   window.setInterval(() => {
     chrome.runtime.sendMessage({
       msg: message,
     });
     console.log("Injected script 1");
   }, inteval);
 }