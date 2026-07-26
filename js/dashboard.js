// Load user's name from Settings
const savedName = localStorage.getItem("fullName");
if(savedName){
    document.getElementById("welcomeMessage").textContent =
        `Welcome Back, ${savedName} 👋`;
}else{
    document.getElementById("welcomeMessage").textContent =
        "Welcome Back 👋";
}
const avatar = document.getElementById("profileAvatar");
if(savedName){
    avatar.textContent = savedName.charAt(0).toUpperCase();
}