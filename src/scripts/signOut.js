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


logoutBtn.addEventListener("click", (e) => {
   chrome.runtime.sendMessage({
      msg: 'login'
   }, (response) => {
      if (response === 'success') window.locaction.replace('./popup.html')
   })
})

let guilds = []
let guildInstance = []
//renderProfile()
setInterval(() => {
   chrome.storage.sync.get(
      ["profile"],
      async ({
         profile
      }) => {
         if (profile.id){

            await fetch(`http://127.0.0.1:5000/users/${profile.id}`)
               .then(response => response.json())
               .then(data => {
               
                  data.forEach((data) => {
                     data.guild.forEach((guild) => {
                        console.log(guild.guildName)
                        guilds.push({
                           name: guild.guildName,
                           id: guild.id,
                           channels: guild.guildChannels
                        })
                     })
                  })

                  if (guildInstance.length == 0) {
                     guildInstance = guilds
                     renderProfile()
                  }
               
              
                  if (guildInstance.length != guilds.length) {
                  
                     console.log(guilds[0].channels[0])
                     guildContainerBtn.innerText = guilds[0].name
                     channelContainerBtn.innerText = guilds[0].channels[0].channelName
         
                     console.log(guilds)
                     Array.from(guildList.childNodes).forEach(element => element.remove())
                     guilds.forEach((guild, index) => {
                        let item = document.createElement("button")
                        item.classList.add("item")
                        item.innerText = guild.name
                        item.setAttribute("id", index);
         
                        item.addEventListener("click", (e) => {
                           guildContainerBtn.innerText = guilds[item.getAttribute("id")].name
                           console.log(guilds[item.getAttribute("id")].name)
                           guildList.style.display = "none"
                           guildListVisible = false;
                           window.scrollTo(0, -200);
                           //childNodes is a live collection, removing elements messes wih the iterator, Array.from() copies the vhildNodes array
                           Array.from(channelList.childNodes).forEach(element => element.remove())
                           renderChannels(guilds, item.getAttribute("id"))
                        })
                        console.log(item)
                        guildList.append(item)
         
                     })
         
                     renderChannels(guilds, 0)

                  }
               
                  console.log(data)
               });
      }
})
}, 500)



function renderProfile() {
   chrome.storage.sync.get(
      ["profile", "serverData"],
      ({
         profile,
         serverData,
      }) => {
         avatar.src = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
         username.innerText = profile.username
         discriminator.innerText = `#${profile.discriminator}`;
         discriminator.classList.add('tag')
         username.appendChild(discriminator)
         userID.innerText = profile.id

         if (serverData) {
            console.log(serverData)

            serverData.forEach((data) => {
               data.guild.forEach((guild) => {
                  console.log(guild.guildName)
                  guilds.push({
                     name: guild.guildName,
                     id: guild.id,
                     channels: guild.guildChannels
                  })
               })
            })

            console.log(guilds[0].channels[0])
            guildContainerBtn.innerText = guilds[0].name
            channelContainerBtn.innerText = guilds[0].channels[0].channelName
            Array.from(guildList.childNodes).forEach(element => element.remove())
            console.log(guilds)
            guilds.forEach((guild, index) => {
               let item = document.createElement("button")
               item.classList.add("item")
               item.innerText = guild.name
               item.setAttribute("id", index);

               item.addEventListener("click", (e) => {
                  guildContainerBtn.innerText = guilds[item.getAttribute("id")].name
                  console.log(guilds[item.getAttribute("id")].name)
                  guildList.style.display = "none"
                  guildListVisible = false;
                  window.scrollTo(0, -200);
                  //childNodes is a live collection, removing elements messes wih the iterator, Array.from() copies the vhildNodes array
                  Array.from(channelList.childNodes).forEach(element => element.remove())
                  renderChannels(guilds, item.getAttribute("id"))
               })
               console.log(item)
               guildList.append(item)

            })

            renderChannels(guilds, 0)
         }



      }
   );
}

function renderChannels(guilds, selectedGuild) {
   guilds[selectedGuild].channels.forEach((channel, cindex) => {
      let citem = document.createElement("button")
      citem.classList.add("item")
      citem.innerText = channel.channelName
      citem.setAttribute("id", cindex);

      citem.addEventListener("click", (e) => {
         channelContainerBtn.innerText = guilds[selectedGuild].channels[citem.getAttribute("id")].channelName
         channelList.style.display = "none"
         channelListVisible = false;
         window.scrollTo(0, -300);
         chrome.storage.sync.set({
            channelID: guilds[selectedGuild].channels[citem.getAttribute("id")].channelID
         })
         console.log(guilds[selectedGuild].channels[citem.getAttribute("id")].channelID)
      })
      console.log(citem)
      channelList.append(citem)
   })
}

let guildListVisible = false;
let channelListVisible = false;

guildContainerBtn.addEventListener("click", (e) => {

   guildList.style.display = "block"
   guildListVisible = true;
   window.scrollTo(0, 200);
})



channelContainerBtn.addEventListener("click", (e) => {
   channelList.style.display = "block"
   channelListVisible = true;
   window.scrollTo(0, 300);
})