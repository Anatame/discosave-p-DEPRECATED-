export default async function getUserData(url, token) {
   let returnData;
   let response = await fetch(url, {
         method: 'GET', // or 'PUT'
         headers: {
            Authorization: `Bearer ${token}`
         },
      })
      .then(response => response.json())
      .then(data => {
         returnData = data;
      })
      .catch((error) => {
         console.error('Error:', error);
      });
   
   return returnData;
}