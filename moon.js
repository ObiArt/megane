var parser = new DOMParser()
var images = document.getElementsByTagName('img')
var wheretogo = document.querySelector("a[target='_blank']")
var title = document.querySelector("h1").innerHTML

for(let i = 0; i < images.length; i++){
    //Home page
    images[i].src = images[i].src.replace("_b.", ".")
    //17.12.19 There was a comment about how my system for restoring preview on nude-moon didn't work. Now it does

    //yaw it's restore time
    if (images[i].src == "https://nude-moon.net/images/warning.jpg"){
        var toPaste = `<td class="main-body"><hr><table width="100%"><tbody><tr><td class="bg_style1" width="100%"><font class="news_text"><center>Превью</center></font></td></tr></tbody></table><table width="100%"><tbody><tr><td></td><td><table class="tbl" align="center" border="0" cellpadding="0" cellspacing="10" width="100%">`
        previewed = 0
        fetch("https://cors-anywhere.herokuapp.com/" + wheretogo.href + "?row").then((response) => {
            return response.text();
        }).then((website) => {
            var putItBefore = document.querySelector("body > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > hr")
            var putItInside = putItBefore.parentNode
            var reader = parser.parseFromString(website, 'text/html');
            var pages = reader.getElementsByTagName('img')

            for (let u = 0; u < pages.length; u++){
                console.log(pages[u].src)
                if (pages[u].src.search("/manga/") != -1){
                    if (previewed == 0){
                        toPaste += `<tbody><tr>`
                    }
                    previewed++
                    toPaste += `<td><a href="${wheretogo.href}?page=1" target="_self" title="${title} Стр. 1 " alt="${title} Смотреть онлайн."><center><span><span class="box"><img class="news_pic2" src="${pages[u].src}" style="width:200px;"></img></span></span></center></a></td>`
                    if (previewed == 20){
                        toPaste += `</tr></tbody>`
                        break
                    }
                    if (previewed % 5 == 0){
                        toPaste += `</tr><tr>`
                    }
                }
            }
            toPaste += `</table><hr><table align="center"><tbody><tr><td class="button" width="200px"><img src="https://nude-moon.net/images/vote/read.jpg" height="25px"><a href="${wheretogo.href}" target="_self">ЧИТАТЬ ДАЛЕЕ</a></td></tr></tbody></table></td></tr></tbody></table></td>`
            temp = document.createElement("div")
            temp.innerHTML = toPaste
            toPaste = temp
            putItInside.insertBefore(toPaste, putItBefore)
        })
    }
}