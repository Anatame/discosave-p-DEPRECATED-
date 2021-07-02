import postData from './postData'

export default async function getUserData(userUrl, guildUrl, token) {


   Promise.all([
      fetch(userUrl, {
         method: 'GET', // or 'PUT'
         headers: {
            Authorization: `Bearer ${token}`
         },
      }),
      fetch(guildUrl, {
         method: 'GET', // or 'PUT'
         headers: {
            Authorization: `Bearer ${token}`
         },
      })
   ]).then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
         return response.json();
      }));
   }).then(function (data) {
      // Log the data to the console
      // You would do something with both sets of data here
      console.log(data);
   }).catch(function (error) {
      // if there's an error, log it
      console.log(error);
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