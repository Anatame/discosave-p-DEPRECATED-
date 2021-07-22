let authorizeBtn = document.getElementById("authorize")

chrome.storage.sync.get(
   ["loginStatus"],
   ({
      loginStatus,
   }) => {
      if (loginStatus == "true") {
         window.location.replace('./home.html')
      }
    })

authorizeBtn.addEventListener("click", (e) => {
   chrome.runtime.sendMessage({ msg: 'login' }, (response) => {
      if (response === 'success')  window.location.replace('./home.html')
   })
})


