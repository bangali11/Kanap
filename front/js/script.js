//fetch : fonction par defaut de javascript pour le web qui permet de se connecter au serveur retournant une promesse
//avec comme argument l'url de mon serveur avec ses produits en JSON
fetch("http://localhost:3000/api/products")
//fonction qui permet de recuperer les fichiers d'un JSON
.then((res) => res.json())
.then((data) => ajoutProduits(data))

//fonction global qui recupere et affiche aux site les produits(fichiers JSON) qui utilise tous les autres fonctions 
//avec comme argument le fichier JSON entier
function ajoutProduits(canapes) {
    //boucle qui recupere tous les elements du fichiers JSON produit
    canapes.forEach((canape) => {
        const {_id, imageUrl, altTxt, name, description } = canape
        const a = creationA(_id)
        const article = document.createElement("article")
        const image = creationImage(imageUrl, altTxt)
        const h3 = creationH3(name)
        const p = creationP(description)
        afficheTableauArticle(article, [image, h3, p]) 
        afficheIdArticle(a, article)
    });
}

//fonction qui affiche les element d'un tableau a la section <article> avec comme argument une balise <article> et un array
function afficheTableauArticle(article, array){
    array.forEach((item) =>{
        article.appendChild(item)
    })
}

//fonction qui crée une balise <a> et son href correspondant avec comme argument l'id du fichiers JSON du produit
function creationA(id) {
    const a = document.createElement("a")
    a.href = "./product.html?id="+id
    return a
}

//fonction qui ajoute la div #items à la balise a et le tous a la balise article avec comme argument la balise a avec son href et la balise article
function afficheIdArticle(a, article) {
    const items = document.querySelector("#items")
    items.appendChild(a)
    a.appendChild(article)
}

//fonction qui crée une balise <img>, son src et alt correspondant avec comme argument l'Url et altTxt du fichiers JSON du produit
function creationImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

//fonction qui crée une balise <h3>, son contenu et sa classe correspondant avec comme argument le nom du fichiers JSON du produit
function creationH3(name){
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

//fonction qui crée une balise <p>, son contenu et sa classe correspondant avec comme argument la description du fichiers JSON du produit
function creationP(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}