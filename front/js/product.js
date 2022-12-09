
//fonction qui récupére les paramètres d’URL et qui crée une variable urlParams
const urlParams = new URLSearchParams(window.location.search)

//fonction qui récupére l'id dans l’URL et qui crée une variable id
const id = urlParams.get("id")     
 
let itemPrice = 0
let imgUrl, altText, nom

//fetch : fonction par defaut de javascript pour le web qui permet de se connecter au serveur retournant une promesse
//avec comme argument l'url de mon serveur avec un produit en JSON identifier avec son id
fetch(`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then((res) => afficheProduit(res))

//fonction global qui recupere et affiche aux site les details du produits(fichiers JSON) qui utilise d'autres fonctions 
//avec comme argument le fichier JSON entier
function afficheProduit(canape) {
    const {altTxt, colors, description, imageUrl, name, price} = canape
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    nom = name
    creationImage(imageUrl, altTxt)
    creationTitre(name)
    creationPrix(price)
    creationDescription(description)
    creationCouleurs(colors)
}

//fonction qui crée une balise <img>, son src et alt correspondant avec comme argument l'Url et altTxt du fichiers JSON du produit
function creationImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt

    document.querySelector(".item__img").appendChild(image)
}

//fonction qui crée une balise <div#title> et son contenu avec comme argument le nom du fichier JSON du produit
function creationTitre(name) {
    document.querySelector("#title").textContent = name
}

//fonction qui crée une balise <div#price> et son contenu avec comme argument le prix du fichier JSON du produit
function creationPrix(price) {
    document.querySelector("#price").textContent = price
}

//fonction qui crée une balise <div#description> et son contenu avec comme argument la description du fichier JSON du produit
function creationDescription(description) {
    document.querySelector("#description").textContent = description
}        

//fonction qui selectionne la <div#colors> et qui l'ajoute a son parent une balise <option> creer et comme contenu les elemnts du tableau
//avec comme argument un tableau de couleurs du fichier JSON du produit
function creationCouleurs(colors){
    const couleurs = document.querySelector("#colors")
    if(couleurs != null){
        colors.forEach(color => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            couleurs.appendChild(option)
        });
    }
}

//creation variable button qui correspond a la <div#addToCart>
const button = document.querySelector("#addToCart")

//fonction qui declenche la fonction handleClick() au click du button
button.addEventListener("click", handleClick)

//fonction qui permet de recuperer les la couleurs et la quantité du produits
function handleClick() {
    const colors = document.querySelector("#colors").value
    console.log(colors)
    const quantity = document.querySelector("#quantity").value
    console.log(quantity)

    //condition de verification si false la fonction s'arrête
    if (verifCommande(colors, quantity)) return;
    saveCommande(colors, quantity);

}

//fonction qui construit deux objet et recupere les informations du produits pour les stocker dans le localStorage 
//avec comme argument la couleurs et l'objet
function saveCommande(colors, quantity){
    //consctrution de l'objet de l'article
    const data = {
        id: id,
        itemPrice: Number(itemPrice),
        imageUrl:imgUrl,
        altTxt:altText,
        colors: colors,
        quantity: Number(quantity),
        name:nom,
    }

    //consctrution de l'objet avec son id et sa couleur
    const idColors ={
        id: id,
        colors:colors,
    }

    //convertir les objets en JSON et stocke dans le localStorage car localstorage ne peut garder un objet obliger de le passer en JSON ou string
    localStorage.setItem(JSON.stringify(idColors), JSON.stringify(data))
}

//fonction qui sert a faire des verification a l'utilisateur en faisant des alert 
//Avec comme argument la couleurs et la quantite du produit
function verifCommande(colors,quantity){
    if (colors == "" || quantity == 0 || quantity < 0 || quantity > 100) {   
        if(quantity != 0 && colors == ""){
            alert("Veuillez choisir une couleur")
        }
        else if(colors != "" && quantity == 0){
              alert("Veuillez choisir une quantité")  
        }
        else if(quantity < 0 || quantity > 100){
            alert("Veuillez choisir une quantité entre 0 et 100 !") 
        }
        else{
            alert("Veuillez choisir une couleur et sa quantité")
        }
        return true
    }
    else{
        //Avertir ce qu'il a mis dans le panier
    alert("La couleur "+colors+" a été ajouté en "+quantity+" exemplaire(s) à votre panier !")
    }
}