function copyDiscord() {
  let copyText = document.getElementById("discordclipboard");

  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  document.execCommand("copy");
  
  // incase that failed
  
  if (navigator.clipboard) {
  	navigator.clipboard.writeText(copyText.value)
  }
  
  let tooltip = document.getElementById("tag");
  tooltip.innerHTML = "copied to clipboard";
}

function mouseOut() {
  let tooltip = document.getElementById("tag");
  tooltip.innerHTML = "oatmealine#5397";
}
