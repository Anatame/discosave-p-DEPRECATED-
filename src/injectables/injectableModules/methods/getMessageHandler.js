export default function getMessageHandler(messageContainer, getMessage, sendMes) {
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
    
}