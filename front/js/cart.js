//Dans tous eviter les variable globale essayer toujour
//avoirs a linterieur d'une fonction

//Declarer du tableau vide cart
const cart = []
ajoutPanier()
//boucle for pour chaque elements de cart faire appel a la fonction affichePanier
cart.forEach((item) => affichePanier(item))

//fonction qui ajoute les key du localstorage au tableau cart
function ajoutPanier(){
    const numberItems = localStorage.length
    for(let i = 0; i < numberItems; i++) {
    const item = localStorage.getItem(localStorage.key(i))
    const itemObject = JSON.parse(item)
    cart.push(itemObject)

} 
}

//fonction qui engloble plusieurs fonction et qui affiche le(s) produits dans le page panier avec comme argument les element du tableau cart
function affichePanier(item){
    const article = creationArticle(item)
    afficheArticle(article) 
    const image = creationImage(item)  
    article.appendChild(image)

    const content = creationContent(item)
    article.appendChild(content)
    AffichePrixEtQuantiteTotal()
}

//fonction qui supprime un produit dans le tableau cart et le localStorage 
function supprimePanier(product) {
  //fonction pratique qui cherche et enregistre l'index de l'element du tableau qui correspond au product(l'objet idColors) dans la variable cartDelete
  const cartDelete = cart.findIndex(item => item.id === product.id && item.colors === product.colors)
  //Condition sinon bug peut supprimer tous le array et des article aleatoire
  if(cartDelete >= 0 ){
    //retire l'element du tableau cart
    cart.splice(cartDelete, 1)
    //selection de la balise du produit qui correpond avec data-id et data-colors dans la variable produit
    const produit = document.querySelectorAll('[data-id=\"'+product.id+'\"]'&&'[data-colors=\"'+product.colors+'\"]')
    //boucle qui supprime les elements de la variable produits de la page
    for (const elem of produit) {
      elem.remove();
    }
  }
  //convertir l'element en json et supprime du localStorage
  localStorage.removeItem(JSON.stringify(product));

  AffichePrixEtQuantiteTotal()
}

//fonction qui met a jour la quantite d'un produit avec comme argument la nouvelle quantite et 2 objets
function misAJourTotal(newQuantity, item, idColors){
  //fonction pratique qui cherche et enregistre l'index de l'element du tableau qui correspond l'objet idColors dans la variable cartUpdateQuantity
  const cartUpdateQuantity = cart.find(item => item.id === idColors.id && item.colors === idColors.colors)

  //convertie la variable string en number
  cartUpdateQuantity.quantity = Number(newQuantity)
  //enregistre la nouvelle quantite dans l'objet du produit
  item.quantity = cartUpdateQuantity.quantity

  AffichePrixEtQuantiteTotal()

  //modifie le localStorage
  localStorage.setItem(JSON.stringify(idColors), JSON.stringify(item))
}

//fonction qui affiche le prix total et le nb total d'article
function AffichePrixEtQuantiteTotal(){
  const spanTotalQuantity = document.querySelector("#totalQuantity") 
  const spanTotalPrice = document.querySelector("#totalPrice") 
  
  let totalQuantity = 0
  let totalPrice = 0
  //boucle for du tableau cart qui permet de calculer la quantite et le prix
  cart.forEach(item =>{
    totalQuantity  = totalQuantity + item.quantity
    totalPrice = totalPrice + item.itemPrice * item.quantity
  })

  //ou peut faire a la place du forEach
  //facilite au lieu de faire un forEach
  //totalPrice = cart.reduce((total,item) => total + item.itemPrice * item.quantity, 0)
  //totalQuantity = cart.reduce((total,item) => total + item.quantity, 0)

  //affiche le prix et la quantite dans la page
  spanTotalQuantity.textContent = totalQuantity
  spanTotalPrice.textContent = totalPrice
}

//fonction qui sélectionne la <div#cart__items> et qui l'ajoute la balise article qui est l'argument
function afficheArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

//Cree et affiche le produit dans la page panier
// fonction qui cree une balise article avec sa classe(.cart__item), son data-id et data-colors avec comme argument l'objet item
function creationArticle(item){
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.colors = item.colors
    return article
}

//Cree et affiche l'image du produit dans la page panier
// fonction qui cree une balise div sa classe(.cart__item__img) et img avec sa source et son alt et l'ajoute a la balise div
//avec comme argument l'objet item
function creationImage(item){
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    //modifie
    //ajoute image a div
    div.appendChild(image)
    return div
}

//Cree et affiche la description du produit et sa quantite dans la page panier
// fonction qui englobe plusieurs fonction cree une balise div sa classe(.cart__item__content) et ajoute ses elements
//avec comme argument l'objet item
function creationContent(item){
    const div = document.createElement("div")
    div.classList.add("cart__item__content")
    const contentDescription = creationContentDescription(item)
    div.appendChild(contentDescription)
    const contentSettings = creationContentSettings(item)
    div.appendChild(contentSettings)
    return div
}

//Cree et affiche la description du produit dans la page panier
// fonction qui englobe plusieurs fonction cree une balise div sa classe(.cart__item__content__description) et ajoute ses elements
//avec comme argument l'objet item
function creationContentDescription(item){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.colors
    const p2 = document.createElement("p")
    p2.textContent = item.itemPrice+" €"
    div.appendChild(h2)
    div.appendChild(p)
    div.appendChild(p2)
    return div
}

//Cree et affiche la quantite et le bouton supprimer du produit dans la page panier
// fonction qui englobe plusieurs fonction cree une balise div sa classe(.cart__item__content__settings) et ajoute ses elements
//avec comme argument l'objet item
function creationContentSettings(item){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings")
    const contentSQ = creationContentSettingsQuantity(item)
    div.appendChild(contentSQ)
    const contentSD = creationContentSettingsDelete(item)
    div.appendChild(contentSD)
    return div
}

//Cree et affiche la quantite du produit dans la page panier
// fonction qui englobe plusieurs fonction cree une balise div sa classe(.cart__item__content__settings__quantity) et ajoute ses elements
//avec comme argument l'objet item
function creationContentSettingsQuantity(item){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté : "
    const input = document.createElement("input")
    input.value = item.quantity
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.classList.add("itemQuantity")
    input.type = "number"

    //creation de l'objet idColors
    const idColors ={
      id: item.id,
      colors: item.colors,
    }

    //fonction qui declenche la fonction misAJourTotal() au click de l'input quantite
    input.addEventListener("input", () => misAJourTotal(input.value, item, idColors))

    div.appendChild(p)
    div.appendChild(input)
    return div
}

//Cree et affiche le bouton supprimer du produit dans la page panier
// fonction qui englobe plusieurs fonction cree une balise div sa classe(.cart__item__content__settings__delete) et ajoute ses elements
//avec comme argument l'objet item
function creationContentSettingsDelete(item){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    const p = document.createElement("p")
    p.classList.add("deleteItem")
    p.textContent = "Supprimer"
    div.appendChild(p)

    const idColors ={
      id: item.id,
      colors: item.colors,
    }

    //fonction qui declenche la fonction supprimePanier() au click de p (supprimer)
    p.addEventListener("click", () => supprimePanier(idColors))
    return div
}

//page confirmation

//boutton du formulaire
const orderButton = document.querySelector("#order")

//fonction qui declenche la fonction verifBoutonPanier() au click du boutton du formulaire pour faire les verification
orderButton.addEventListener("click", (e) => verifBoutonPanier(e))

//fonction qui engloble plusieurs fonctions et effectue  des verification a l'utilisateur en faisant des alert 
//et envoie au serveur web l'objet conatct et un tableu d'id de string au serveur web
function verifBoutonPanier(e){
  e.preventDefault()
  const form = document.querySelector(".cart__order__form")
  if (cart.length === 0){
    alert("Veuillez remplir votre panier !")
    return
  }
  if (formInvalide(form) != 0){
    alert("Veuillez remplir tous les champs du formulaire !")
    return
  }
  if (emailInvalide(form)) return

    console.log(form.elements)
    const body = contactProduit(form, cart)
    fetch("http://localhost:3000/api/products/order",{
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId
      window.location.href="./confirmation.html?orderId="+orderId
    })

}

//fonction qui permet de verifier l'email avec regex sinon envoie une alert a l'utilisateur
//avec comme argument le formulaire
function emailInvalide(form){
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  //form[4].value correspond a l'email dans le formulaire
  if(regex.test(form[4].value) === false){
    alert("Veuillez remplir correctement votre email !")
    return true
  }
  return false
}

//fonction qui permet de verifier que le formulaire a bien etait rempli sinon envoie une alert a l'utilisateur
//avec comme argument le formulaire
function formInvalide(form){
  let error = 0
  const inputs = form.querySelectorAll("input")
   inputs.forEach((input) => {
    if(input.value === ""){
      //a chaque case vide error prendre +1
      error++
    }
   })
   return error
}

//focntion qui permet de rentrer les element du tableau dans l'objet contact et les produits du tableau cart dans le tableau cart
//avec comme argument le formulaire et le tableau cart
function contactProduit(form, cart){
  const products = []
  cart.forEach(item =>{
    products.push(item.id)
  })
  
  const body = {
    contact:{
      firstName: form[0].value,
      lastName: form[1].value,
      address: form[2].value,
      city: form[3].value,
      email: form[4].value,
    },
    products
  }
  return body
}



