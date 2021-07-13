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
            // buttonContainer-DHceWr
            if (
              item.childNodes.length == 3 &&
              item.childNodes[2].classList.contains("buttonContainer-DHceWr")
            ) {
              buttonGroupDiv = item.childNodes[2].childNodes[0].childNodes[0];
              wrapper = item.childNodes[2].childNodes[0];
              messageContainer = item.childNodes[0];
           
            } else if (
              item.childNodes.length == 4 &&
              item.childNodes[3].classList.contains("buttonContainer-DHceWr")
            ) {
              buttonGroupDiv = item.childNodes[3].childNodes[0].childNodes[0];
              wrapper = item.childNodes[3].childNodes[0];
              messageContainer = item.childNodes[1];
    
            }

            if (
              buttonGroupDiv.childNodes.length <= 3 && !buttonGroupDiv.childNodes[0].classList.contains("saveBtn")) {
              console.log(buttonGroupDiv.childNodes)
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
              // button.style.margin = "4px"
              // buttonGroupDiv.style.backgroundColor = "#121212";
              div.appendChild(button);
              buttonGroupDiv.prepend(div);
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
                          author = {
                            authorAvatar: mContainer.childNodes[0].src,
                            authorUsername: mContainer.childNodes[1].innerText,
                          }
                          break;
                          }
  
                      }
                      let data = {...author, ...getMessage(1)}
                      console.log(data)
                      let messageData = getMessage(1).message

                      sendMes(data)

                      
                    } else if (messageContainer.childNodes.length == 3) {
                      console.log("alone");
                      console.log(messageContainer.childNodes[2].innerText);
                      console.log(messageContainer.childNodes[2].childNodes)

                      let messageData = getMessage(2).message

                      let author = {
                        authorAvatar: messageContainer.childNodes[0].src,
                        authorUsername: messageContainer.childNodes[1].innerText,
                      }

                      let data = {...author, ...getMessage(2)}
                      console.log(data)

                      sendMes(data)

                    
                    } else if (messageContainer.childNodes.length == 4) {
                      console.log("containsReply");
                      console.log(
                        messageContainer.childNodes[3].innerText + " ahh"
                      );
                      console.log(messageContainer.childNodes[3].childNodes)

                      let messageData = getMessage(3).message

                      let author = {
                        authorAvatar: messageContainer.childNodes[0].src,
                        authorUsername: messageContainer.childNodes[1].innerText,
                      }

                      let data = {...author, ...getMessage(3)}
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