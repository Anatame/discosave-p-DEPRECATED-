let logoutBtn = document.getElementById("logout")
let avatar = document.getElementById("avatar")
let username = document.getElementById("userName")
let discriminator = document.createElement('span')
let userID = document.getElementById("userID")

let guildContainer = document.getElementById("guildContainer")
let guildContainerBtn = document.getElementById("guildContainerBtn")
let guildList = document.getElementById("guildList")
let guildItem = document.getElementById("guildItem")

let channelContainer = document.getElementById('channelContainer')
let channelContainerBtn = document.getElementById("channelContainerBtn")
let channelList = document.getElementById("channelList")

logoutBtn.addEventListener("click", (e) => {
   chrome.runtime.sendMessage({ msg: 'login' }, (response) => {
      if (response === 'success') window.locaction.replace('./popup.html')
   })
})

chrome.storage.sync.get(
   ["profile", "serverData"],
   ({profile, serverData}) => {
      avatar.src = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
      username.innerText = profile.username
      discriminator.innerText = `#${profile.discriminator}`;
      discriminator.classList.add('tag')
      username.appendChild(discriminator)
      userID.innerText = profile.id
      
   }
 );

let guildListVisible = false;

guildContainerBtn.addEventListener("click", (e) => {
 
   guildList.style.display = "block"
   guildListVisible = true;
   window.scrollTo(0, 300);
})

guildItem.addEventListener("click", (e) => {
   guildList.style.display = "none"
   guildListVisible = false;
   window.scrollTo(0, -300);
})

channelContainerBtn.addEventListener("click", (e) => {
   channelList.style.display = "block"
   window.scrollTo(0, 300);
})