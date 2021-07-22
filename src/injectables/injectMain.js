export default function () {

  let mainElement = document.querySelectorAll(".cozyMessage-3V1Y8y");
  let img, imgHover, imgClick;

  chrome.storage.sync.get(
    ["svg", "svgHover", "svgClick"],
    ({
      svg,
      svgHover,
      svgClick
    }) => {
      img = svg;
      imgHover = svgHover;
      imgClick = svgClick;
      console.log(svg);
    }
  );


  if (mainElement) {

    mainElement.forEach((item, index) => {
      let btnNum = 0;
      item.addEventListener("mouseover", (event) => {
        // console.log(item.childNodes[2].childNodes[0].childNodes[0])
        item.setAttribute("messageElementID", index)
        if (btnNum == 0) {
          try {
            let buttonGroupDiv;
            let messageContainer;
            let wrapper;
            let embeddedImageContainer;
            // buttonContainer-DHceWr
            if (
              item.childNodes.length == 3 &&
              item.childNodes[2].classList.contains("buttonContainer-DHceWr")
            ) {
              buttonGroupDiv = item.childNodes[2].childNodes[0].childNodes[0];
              wrapper = item.childNodes[2].childNodes[0];
              messageContainer = item.childNodes[0];
              embeddedImageContainer = item.childNodes[1]
            } else if (
              item.childNodes.length == 4 &&
              item.childNodes[3].classList.contains("buttonContainer-DHceWr")
            ) {
              buttonGroupDiv = item.childNodes[3].childNodes[0].childNodes[0];
              wrapper = item.childNodes[3].childNodes[0];
              messageContainer = item.childNodes[1];
              embeddedImageContainer = item.childNodes[2]

            }

            

            if ( buttonGroupDiv.childNodes.length <= 3 && !buttonGroupDiv.childNodes[0].classList.contains("saveBtn")) {
              // console.log(buttonGroupDiv.childNodes)
              let div = document.createElement("div");
              // div.style.width = "100%";
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
              // button.style.margin = "4px"
              // buttonGroupDiv.style.backgroundColor = "#121212";

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
                  baseURI = embeddedImageContainer.childNodes[0].baseURI
                  if (message == "" || message === undefined) {
                    message = embeddedImageContainer.childNodes[0].childNodes[0].childNodes[0].childNodes[1].currentSrc
                    console.log(embeddedImageContainer.childNodes[0].childNodes[0].childNodes[0].childNodes[1].currentSrc)
                    baseURI = embeddedImageContainer.childNodes[0].childNodes[0].childNodes[0].childNodes[1].baseURI




                  }
                }
          
                let data = {
                   message: message,
                   baseURI: baseURI,
                }
                console.log(data)
          
                return data;
             }

             let message = "";

             if (messageContainer.childNodes.length == 2) {
                message = getMessage(messageContainer, embeddedImageContainer, 1).message
             } else if (messageContainer.childNodes.length == 3) {
                message = getMessage(messageContainer, embeddedImageContainer, 2).message
             } else if (messageContainer.childNodes.length == 4) {
                message = getMessage(messageContainer, embeddedImageContainer, 3).message
             } 

              console.log(messageContainer.childNodes.length)
              console.log(messageContainer.childNodes)
    
    
             if (message !== undefined && messageContainer.childNodes.length !== 1 || embeddedImageContainer.childNodes[0].className == "messageAttachment-1aDidq") {
                buttonGroupDiv.prepend(div);
             }

              console.log(message);
              console.log(embeddedImageContainer.childNodes)

                    
          
             
              // let isEmbed = false;
              // isEmbed = embeddedImageContainer.childNodes[0].classList.contains("embedFull-2tM8--")
           
              
          
              btnNum = 1;
              [
                "click",
                "mouseenter",
                "mouseout",
                "mousedown",
                "mouseup",
              ].forEach(function (e) {
                button.addEventListener(e, (event) => {
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

                  function getMessage(nodeIndex) {
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
                      baseURI = embeddedImageContainer.childNodes[0].baseURI
                      if (message == "" || message === undefined) {
                        message = embeddedImageContainer.childNodes[0].childNodes[0].childNodes[0].childNodes[1].currentSrc
                        console.log(embeddedImageContainer.childNodes[0].childNodes[0].childNodes[0].childNodes[1].currentSrc)
                        baseURI = embeddedImageContainer.childNodes[0].childNodes[0].childNodes[0].childNodes[1].baseURI
                      }
                    }

                    let data = {
                      message: message,
                      baseURI: baseURI,
                    }
                    console.log(data)
                  
                    return data;
                  }

                  function sendMes(data) {
                    chrome.storage.sync.set({
                      message: data,
                    });

                    chrome.runtime.sendMessage({
                      msg: "sendMessage",
                    });
                  }

                  if (event.type == "click") {
                    console.log("click");

                    if (messageContainer.childNodes.length == 2) {
                      console.log("contained");
                      console.log(messageContainer.childNodes[1].innerText);
                      console.log(messageContainer.childNodes[1].childNodes)
                    
                      
                      let mIndex = messageContainer.parentNode.getAttribute("messageElementID")
                      console.log(mIndex)

                      mElement = document.querySelectorAll(".cozyMessage-3V1Y8y");
                      
                      let author;
                      for (let i = mIndex; i >= 0; i--) {
                        console.log(i)
                        let mContainer;
                        console.log(mElement[i].childNodes)
                        
                        if (mElement[i].childNodes.length == 3 && mElement[i].childNodes[2].classList.contains("buttonContainer-DHceWr")) {
                          mContainer = mElement[i].childNodes[0];
                        } else if (mElement[i].childNodes.length == 4 && mElement[i].item.childNodes[3].classList.contains("buttonContainer-DHceWr")) {
                          meContainer = mElement[i].childNodes[1];
                        }
                        
                        if (mContainer.childNodes.length == 3) {
                          console.log(mContainer.childNodes)
                          console.log(mContainer.childNodes[1].childNodes)
                          author = {
                            authorAvatar: mContainer.childNodes[0].src,
                            authorUsername: mContainer.childNodes[1].childNodes[0].innerText,
                          }
                          break;
                        }
  
                      }
                      let data = { ...author, ...getMessage(1) }
                      console.log(data)
                      let messageData = getMessage(1).message

                      sendMes(data)

                      
                    } else if (messageContainer.childNodes.length == 3) {
                      console.log("alone");
                      console.log(messageContainer.childNodes[2].innerText);
                      console.log(messageContainer.childNodes[2].childNodes)

                      let messageData = getMessage(2).message

                      console.log(messageContainer.childNodes[1].childNodes[0].innerText)
                      let author = {
                        authorAvatar: messageContainer.childNodes[0].src,
                        authorUsername: messageContainer.childNodes[1].childNodes[0].innerText,
                      }

                      let data = { ...author, ...getMessage(2) }
                      console.log(data)

                      sendMes(data)

                    
                    } else if (messageContainer.childNodes.length == 4) {
                      console.log("containsReply");
                      console.log(
                        messageContainer.childNodes[3].innerText + " ahh"
                      );
                      console.log(messageContainer.childNodes[3].childNodes)

                      let messageData = getMessage(3).message
                      console.log(messageContainer.childNodes[1].childNodes)
                      let author = {
                        authorAvatar: messageContainer.childNodes[0].src,
                        authorUsername: messageContainer.childNodes[1].childNodes[0].innerText
                      }

                      let data = { ...author, ...getMessage(3) }
                      console.log(data)

                      sendMes(data)

                    }
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
                    console.log("ZEROOOOOOOOO");
                    button.style.backgroundImage = `url(${img})`;
                  } else if (event.type == "mousedown") {
                    button.style.backgroundImage = `url(${imgClick})`;
                  } else if (event.type == "mouseup") {
                    button.style.backgroundImage = `url(${imgHover})`;
                  }

                  console.log(messageContainer.childNodes.length != 3);
                });
              });
            }
          
          } catch (err) {
            // if any error, Code throws the error
            // console.log("not found")
          }
        }
      });
    });
  }
}