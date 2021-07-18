export default function getMessage() {
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
      }

      let data = {
        message: message,
        baseURI: baseURI,
      }
      console.log(data)
    
      return data;
    }
}