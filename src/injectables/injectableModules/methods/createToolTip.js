export default function createToolTip() {
   let toolTip = document.createElement("div");
         toolTip.innerText = "Save";
         toolTip.style.padding = "10px";
         toolTip.style.marginTop = "-72px";
         toolTip.style.left = "-5px";
         toolTip.style.borderRadius = "6px 6px 0px 6px";
         toolTip.style.zIndex = "9999";
         toolTip.style.position = "absolute";
         toolTip.style.backgroundColor = "#18191d";
         toolTip.style.color = "#DCDDDE";
         toolTip.style.fontSize = "14px";
         toolTip.style.fontWeight = "500";
         toolTip.style.opacity = "0";
   
   return toolTip;
}