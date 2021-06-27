const DISCORD_URL = "https://discord.com/api/oauth2/authorize";
const CLIENT_ID = encodeURIComponent("855041441902493736");
const RESPONSE_TYPE = encodeURIComponent("token");
const REDIRECT_URI = encodeURIComponent(chrome.identity.getRedirectURL());
const STATE = encodeURIComponent("waterff99");
const SCOPE = encodeURIComponent("identify email bot");
// https://djleobblkcfjfgkiodedcjhdjmhjmmkg/chromium.app/
console.log(chrome.identity.getRedirectURL())

export default function getDiscordUri() {
   let nonce = encodeURIComponent(
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
   );

const url = `${DISCORD_URL}
?client_id=${CLIENT_ID}
&response_type=${RESPONSE_TYPE}
&redirect_uri=${REDIRECT_URI}
&state=${STATE}
&scope=${SCOPE}
&nonce=${nonce}`;

   return url;
}