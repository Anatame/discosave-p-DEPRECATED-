// Initialize button with user's preferred color
let authorizeBtn = document.getElementById("authorize")

authorizeBtn.addEventListener("click", (e) => {
   chrome.runtime.sendMessage({ msg: 'login' }, (response) => {
      if (response === 'success') window.location.replace('./popup-sign-out.html')
   })
})


