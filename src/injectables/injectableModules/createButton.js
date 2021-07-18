export default function createButton() {
   let div = document.createElement("div");
         div.classList.add("button-1ZiXG9");
         div.classList.add("saveBtn");

   let button = document.createElement("button");
         button.classList.add("btn");
         button.style.backgroundImage = `url(${img})`;
         button.style.backgroundRepeat = "no-repeat";
         button.style.backgroundSize = "contain";
         button.style.width = "22px";
         button.style.height = "22px";
         button.style.backgroundColor = "transparent";

   div.appendChild(button);

   return div;
}