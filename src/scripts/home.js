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
   //https://cdn.discordapp.com/icons/798483750883295303/a8ec3d3f91efe9cc35e52bb647fd32ac.png

   let item = document.createElement("div")
   let img = document.createElement("img");
   let title = document.createElement("h3")

   item.classList.add("item")
   img.classList.add("guildAvatar")
   title.classList.add("guildTitle")

   item.append(img)
   item.appendChild(title)

   if (guild.guildName) {
      img.src = guild.icon
      title.innerText = `${guild.guildName} --GuildWithBot`
      
   } else {
      img.src = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`
      title.innerText = guild.name
   }
   
   item.setAttribute("id", index);

   item.addEventListener("click", (e) => {
      console.log(clicked)
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


