let messageElement = document.querySelectorAll(".cozyMessage-3V1Y8y");
let img, imgHover, imgClick;

//fetchSvgFromStorage
chrome.storage.sync.get(["svg", "svgHover", "svgClick"],({svg,svgHover,svgClick}) => {
     img = svg;
     imgHover = svgHover;
     imgClick = svgClick;
   }
);
 
if (messageElement) {
   mainElementHandler(messageElement)
}

function mainElementHandler(mainElement) {
   mainElement.forEach((item, index) => {
      item.addEventListener("mouseover", (event) => {
         item.setAttribute("messageElementID", index)
         elementCreator()
       })
   })
}

function elementInitializer(item) {
   let buttonGroupDiv, messageContainer, wrapper, embeddedImageContainer;

   if (item.childNodes.length == 3 && item.childNodes[2].classList.contains("buttonContainer-DHceWr")) {
      buttonGroupDiv = item.childNodes[2].childNodes[0].childNodes[0];
      wrapper = item.childNodes[2].childNodes[0];
      messageContainer = item.childNodes[0];
      embeddedImageContainer = item.childNodes[1]

   }  else if (item.childNodes.length == 4 && item.childNodes[3].classList.contains("buttonContainer-DHceWr")) {
      buttonGroupDiv = item.childNodes[3].childNodes[0].childNodes[0];
      wrapper = item.childNodes[3].childNodes[0];
      messageContainer = item.childNodes[1];
      embeddedImageContainer = item.childNodes[2]
   }

   addButton(buttonGroupDiv)
}

function addButton(buttonGroupDiv) {
   if (buttonGroupDiv.childNodes.length <= 3 && !buttonGroupDiv.childNodes[0].classList.contains("saveBtn")) {
      buttonGroupDiv.prepend(createButton());
   }
}

function addListener() {
   ["click", "mouseenter", "mouseout", "mousedown", "mouseup",].forEach((e) => {
      button.addEventListener(e, (event) => {
         if (event.type == "click") {
            
         }
      })
   })
}






