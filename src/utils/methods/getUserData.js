import postData from './postData'

export default async function getUserData(url, token) {
   let response = await fetch(url, {
         method: 'GET', // or 'PUT'
         headers: {
            Authorization: `Bearer ${token}`
         },
      })
      .then(response => response.json())
      .then(data => {
         chrome.storage.sync.set({
            "profile": data
          })
         fetchUser(data.id)
         //  postData("http://127.0.0.1:5000/users", data)
      })
      .catch((error) => {
         console.error('Error:', error);
      });
   
}


async function fetchUser(id) {
   await fetch(`http://127.0.0.1:5000/users/${id}`)
   .then(response => response.json())
      .then(data => {
         chrome.storage.sync.set({
            "serverData": data
          })
         console.log(data)
      });
}