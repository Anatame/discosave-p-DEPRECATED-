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

let guildsWithBot = []

chrome.storage.sync.get(
   ["userGuilds"],
   async ({
      userGuilds, serverData
   }) => {
      userGuilds.forEach( async (guild) => {
         await fetch(`http://127.0.0.1:5000/users/${guild.id}`)
         .then(response => response.json())
            .then(data => {
               console.log(data)
            if (data.id != "notFound") {
               guildsWithBot.push(data)
               console.log(data)
          }
         });
      })
 
   })

   console.log(guildsWithBot)



let guildListVisible = false;
let channelListVisible = false;

// guildContainerBtn.addEventListener("click", (e) => {

//    guildList.style.display = "block"
//    guildListVisible = true;
//    window.scrollTo(0, 200);
// })



