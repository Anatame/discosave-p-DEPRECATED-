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
["userGuilds"],
 ({
   userGuilds,
   serverData
}) => {


   userGuilds.forEach(async (guild, index) => {
      let response = await fetch(`http://127.0.0.1:5000/users/${guild.id}`)
      response = await response.json();
      if (response.id != "notFound") {
        handleGuildRender(response, index)
      } else {
         console.log(guild)
         handleGuildRender(guild, index)
      }
   })

})



function handleGuildRender(guild, index) {
   let item = document.createElement("button")
   item.classList.add("item")
   if (guild.guildName) {
      item.innerText = `${guild.guildName} --GuildWithBot`
   } else {
      item.innerText = guild.name
   }
   
   item.setAttribute("id", index);

   item.addEventListener("click", (e) => {
      consle.log(clicked)
   })

   guildList.append(item)
}


// let guildListVisible = false;
// let channelListVisible = false;

// guildContainerBtn.addEventListener("click", (e) => {

//    guildList.style.display = "block"
//    guildListVisible = true;
//    window.scrollTo(0, 200);
// })


