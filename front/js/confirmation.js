//fonction qui récupére les paramètres d’URL et qui crée une variable urlParams
const urlParams = new URLSearchParams(window.location.search)

//fonction qui récupére l'id dans l’URL et qui crée une variable orderId
const orderId = urlParams.get("orderId")    

//entre le orderId dans le contenu de la <div#orderId>
document.querySelector("#orderId").textContent = orderId

//efface tous le localStorage
localStorage.clear()
