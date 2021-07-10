let logoutBtn = document.getElementById("logout")
let avatar = document.getElementById("avatar")
let username = document.getElementById("userName")
let discriminator = document.createElement('span')
let userID = document.getElementById("userID")

let guildContainer = document.getElementById("guildContainer")
let guildContainerBtn = document.getElementById("guildContainerBtn")
let guildList = document.getElementById("guildList")
//let guildItem = document.getElementById("guildItem")

let channelContainer = document.getElementById('channelContainer')
let channelContainerBtn = document.getElementById("channelContainerBtn")
let channelList = document.getElementById("channelList")

channelContainer.style.display = "none"

chrome.storage.sync.get(
["userGuilds", "profile"],
 ({
   userGuilds,
   profile
}) => {
   renderProfile(profile);
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
   //https://cdn.discordapp.com/icons/798483750883295303/a8ec3d3f91efe9cc35e52bb647fd32ac.png

   let item = document.createElement("div")
   item.style.margin = "20px"
   item.style.textAlign = "center"
   let img = document.createElement("img");
   let title = document.createElement("h3")
   img.classList.add("guildAvatar")
   title.classList.add("guildTitle")

   item.append(img)
   item.appendChild(title)

   if (guild.guildName) {
      img.src = guild.icon
      img.style.border = "3px solid #ff008c"
      title.innerText = `${guild.guildName} --GuildWithBot`

      item.addEventListener("click", (e) => {
         console.log("clicked")
         handleGuildClick(guild.guildChannels)
      })
      
   } else {
      img.src = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`
      img.style.filter = "grayscale(100%)"
      title.innerText = guild.name

      item.addEventListener("click", (e) => {
         console.log("authorize bot first")
      })
   }
   
   item.setAttribute("id", index);



   guildList.append(item)
}

function renderProfile(profile){
   avatar.src = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
   username.innerText = profile.username
   discriminator.innerText = `#${profile.discriminator}`;
   discriminator.classList.add('tag')
   username.appendChild(discriminator)
   userID.innerText = profile.id

}

function handleGuildClick(channels) {
   guildContainer.style.display = "none"
   channelContainer.style.display = "block"
   channelList.style.display = "none"

   channelContainerBtn.innerText = channels[0].channelName
   channelContainerBtn.addEventListener("click", (e) => {
      channelList.style.display = "block"
   })

   channels.forEach((channel) => {
      let item = document.createElement("button")
      item.classList.add('item')
      item.setAttribute("channelID", channel.channelID)

      item.innerText = channel.channelName
      console.log(channel.channelName)
     

      item.addEventListener("click", () => {
         console.log(item.getAttribute("channelID"))
         channelList.style.display = "none"
         channelContainerBtn.innerText = item.innerText
      })

      channelList.append(item)
   })
   
   
}