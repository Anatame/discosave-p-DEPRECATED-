import getMessage from "./getMessage";
// import {getMessageHandler} from './injectableModules/index'

export default function () {

   let messageElement = document.querySelectorAll(".cozyMessage-3V1Y8y");
   let img, imgHover, imgClick;

   //fetchSvgFromStorage
   chrome.storage.sync.get(["svg", "svgHover", "svgClick"], ({
      svg,
      svgHover,
      svgClick
   }) => {
      img = svg;
      imgHover = svgHover;
      imgClick = svgClick;
   });

   if (messageElement) {
      mainElementHandler(messageElement)
   }

   function mainElementHandler(mainElement) {
      mainElement.forEach((item, index) => {
         item.addEventListener("mouseover", (event) => {
            item.setAttribute("messageElementID", index)
            elementInitializer(item)
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

         //console.log(embeddedImageContainer.childNodes)

         getMessageHandler()
         let message = "";

         if (messageContainer.childNodes.length == 2) {
            message = getMessage(messageContainer, embeddedImageContainer, 1).message
         } else if (messageContainer.childNodes.length == 3) {
            message = getMessage(messageContainer, embeddedImageContainer, 2).message
         } else if (messageContainer.childNodes.length == 4) {
            message = getMessage(messageContainer, embeddedImageContainer, 3).message
         }

         if (message != "") {
            if (embeddedImageContainer.childNodes.length == 0 || embeddedImageContainer.childNodes[0].classList.length == 2 || message !== undefined) {
               saveBtnHandler(buttonGroupDiv, messageContainer, wrapper)
            }

         }

         console.log(message)



      } else if (item.childNodes.length == 4 && item.childNodes[3].classList.contains("buttonContainer-DHceWr")) {
         buttonGroupDiv = item.childNodes[3].childNodes[0].childNodes[0];
         wrapper = item.childNodes[3].childNodes[0];
         messageContainer = item.childNodes[1];
         embeddedImageContainer = item.childNodes[2]

//console.log(embeddedImageContainer.childNodes)
         getMessageHandler()

         let message = "";

         if (messageContainer.childNodes.length == 2) {
            message = getMessage(messageContainer, embeddedImageContainer, 1).message
         } else if (messageContainer.childNodes.length == 3) {
            message = getMessage(messageContainer, embeddedImageContainer, 2).message
         } else if (messageContainer.childNodes.length == 4) {
            message = getMessage(messageContainer, embeddedImageContainer, 3).message
         }


         if (embeddedImageContainer.childNodes.length == 0 || embeddedImageContainer.childNodes[0].classList.length == 2 || message !== undefined) {
            saveBtnHandler(buttonGroupDiv, messageContainer, wrapper)
         }



         console.log(message)

      }


   }


   function saveBtnHandler(buttonGroupDiv, messageContainer, wrapper) {


      if (buttonGroupDiv.childNodes.length <= 3 && !buttonGroupDiv.childNodes[0].classList.contains("saveBtn")) {
         let data = createButton()
         let div = data.div;
         let button = data.button
         buttonGroupDiv.prepend(data.div)

         console.log("called")[
            "click",
            "mouseenter",
            "mouseout",
            "mousedown",
            "mouseup", ""
         ].forEach(function (e) {
            button.addEventListener(e, (event) => {
               if (event.type == "click") {
                  console.log("Works")
                  getMessageHandler(messageContainer)


               } else if (event.type == "mouseenter") {
                  div.style.backgroundColor = "#4f545c29";
                  button.style.backgroundImage = `url(${imgHover})`;

                  if (wrapper.childNodes.length == 1) {
                     wrapper.append(toolTip);
                     wrapper.childNodes[1].style.opacity = "1";
                  } else {
                     wrapper.childNodes[1].style.opacity = "1";
                  }
               } else if (event.type == "mouseout") {
                  wrapper.childNodes[1].style.opacity = "0d";
                  div.style.backgroundColor = "transparent";
                  wrapper.childNodes[1].style.opacity = "0";
                  button.style.backgroundImage = `url(${img})`;
               } else if (event.type == "mousedown") {
                  button.style.backgroundImage = `url(${imgClick})`;
               } else if (event.type == "mouseup") {
                  button.style.backgroundImage = `url(${imgHover})`;
               }
            })
         })
      }
   }

   function getMessage(messageContainer, embeddedImageContainer, nodeIndex) {
      let baseURI = ""
      let message = ""
      messageContainer.childNodes[nodeIndex].childNodes.forEach((node) => {
         if (node) {
            if (node.nodeName == "SPAN") {
               console.log(node.firstChild.ariaLabel)
               message += node.firstChild.ariaLabel
               if (baseURI != node.baseURI) {
                  baseURI = node.baseURI
               }
            } else {
               console.log("Text node")
               message += node.textContent
               if (baseURI != node.baseURI) {
                  baseURI = node.baseURI
               }
            }

         } else {
            console.log("undefined")
         }
      })

      if (message == "") {
         message = embeddedImageContainer.childNodes[0].childNodes[0].href
      }

      let data = {
         message: message,
         baseURI: baseURI,
      }
      console.log(data)

      return data;
   }

   function createButton() {
      let div = document.createElement("div");
      div.classList.add("button-1ZiXG9");
      div.classList.add("saveBtn");

      let button = document.createElement("button");
      button.classList.add("btn");
      button.style.backgroundImage = `url(${img})`;
      button.style.backgroundRepeat = "no-repeat";
      button.style.backgroundSize = "contain";
      button.style.width = "22px";
      button.style.height = "22px";
      button.style.backgroundColor = "transparent";

      div.appendChild(button);

      return {
         div: div,
         button: button
      };
   }

}