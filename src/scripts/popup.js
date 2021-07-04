let authorizeBtn = document.getElementById("authorize")



authorizeBtn.addEventListener("click", (e) => {
   chrome.runtime.sendMessage({ msg: 'login' }, (response) => {
      if (response === 'success')  window.location.replace('./home.html')
   })
})


