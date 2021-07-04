let logoutBtn = document.getElementById("logout")
let avatar = document.getElementById("avatar")
let username = document.getElementById("userName")
let discriminator = document.createElement('span')
let userID = document.getElementById("userID")

let guildContainer = document.getElementById("guildContainer")
let guildContainerBtn = document.getElementById("guildContainerBtn")
let guildList = document.getElementById("guildList")
//let guildItem = document.getElementById("guildItem")

// let channelContainer = document.getElementById('channelContainer')
// let channelContainerBtn = document.getElementById("channelContainerBtn")
// let channelList = document.getElementById("channelList")

chrome.storage.sync.get(
   ["userGuilds", "serverData"],
   async ({
      userGuilds, serverData
   }) => {
      userGuilds.forEach(guild => console.log(guild))
   })




let guildListVisible = false;
let channelListVisible = false;

// guildContainerBtn.addEventListener("click", (e) => {

//    guildList.style.display = "block"
//    guildListVisible = true;
//    window.scrollTo(0, 200);
// })



