const darkModeBtn = document.getElementById("darkModeBtn")

const body = document.getElementById("body")

let darkMode = localStorage.getItem("dark-mode") || "disabled"
console.log(darkMode)

const enableDarkMode = () => {
    body.classList.add("darkMode")
    darkModeBtn.innerHTML = "<i class='fa-solid fa-sun fa-xl'></i>"
    localStorage.setItem("dark-mode", "enabled")
}

const disableDarkMode = () => {
    body.classList.remove("darkMode")
    darkModeBtn.innerHTML = "<i class='fa-solid fa-moon fa-xl'></i>"
    localStorage.setItem("dark-mode", "disabled")
}

if(darkMode === "enabled"){
    enableDarkMode()
}

darkModeBtn.addEventListener("click", (e) => {
    e.preventDefault()
    darkMode = localStorage.getItem("dark-mode")
    if(darkMode === "disabled"){
        enableDarkMode()
    }else{
        disableDarkMode()
    }
})