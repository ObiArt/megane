var images = document.getElementsByTagName('img')

for(let i = 0; i < images.length; i++){
    //Home page
    images[i].src = images[i].src.replace("_b.", ".")
    //17.12.19 здесь была сложная система возвращающая превью всей манги, но она так и не заработала в полную мощь
}