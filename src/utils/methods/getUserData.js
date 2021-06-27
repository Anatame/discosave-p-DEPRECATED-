export default async function getUserData(url, token) {
   console.log(token)
   response = await fetch(url, {
         method: 'GET', // or 'PUT'
         headers: {
            Authorization: `Bearer ${token}`
         },
      })
      .then(response => response.json())
      .then(data => {
         console.log('Success:', data);
         chrome.storage.sync.set({
            "profile": data
         })

         postData("http://127.0.0.1:5000/users", data)
      })
      .catch((error) => {
         console.error('Error:', error);
      });
}