const cookie_day="style=day";
const cookie_night="style=night";

const li_night=document.querySelector("#night_style");
const li_day=document.querySelector("#day_style");

const regexp_style=/(?:^style=\w+;|; style=\w+;|^style=\w+)/g;

var cookie_string=document.cookie;

// document.cookie = "style=night;SameSite=Strict;";
//"style=night;path=/;SameSite=Lax;";
li_night.onclick = function() {
    blackMagic("night");
    document.cookie = "style=night;path=/;SameSite=Lax;";  
    console.log('Меняем тему на ночную');
  }
  li_day.onclick = function() {
    blackMagic("day");
    document.cookie = "style=day;path=/;SameSite=Lax;";
    console.log('Меняем тему на дневную');
}

//черное дело... (Об это чуть позже)
function blackMagic(style) {
    let new_class=""; //какой в итоге класс будет
    let old_class=""; //текущий класс
    if(style=="night"){
        new_class="night_div";
        old_class="day_div";
        li_night.style.display="none";
        li_day.style.display="block";
    }
    else {
        new_class="day_div";
        old_class="night_div";
        li_day.style.display="none";
        li_night.style.display="block";
    }
    let divs=document.querySelectorAll("."+old_class);
    //forEach используем в другой раз как-нибудь
    for( let i=0; i< divs.length;i++){
        divs[i].classList.remove(old_class);
        divs[i].classList.add(new_class)
    }
}

//смотрим, а есть ли среди печенек что-то похожее на необходимое нам?

/* тут автор вспомнил про regexp, но код оставим про запас
if(cookie_string.includes(cookie_day)|| cookie_string.includes(cookie_night)){
    //сначала нам все равно придется убедиться, что это точно прямо нужная нам пара ключ-значение
    //для этого строчечную печеньку конвертируем в массив 
    let cookies_arr = cookie_string.split(";");
    let style="";
    for(let i=0;i<cookies_arr.length;i++){
        let pair=cookies_arr[i].split("=");
        if(pair[0]=="style" && pair[1]=="night"){
            console.log("Текущая тема: ",pair[1]); 
            blackMagic(pair[1]);
            break; // мы тут закончили, на выход (если меняем на ночь, естественно, если нет - идем дальше)
        }
        if(pair[0]=="style" && pair[1]=="day"){
            console.log("Текущая тема: ",pair[1]);
            blackMagic(pair[1]);
            break;
        }
    }   
}*/
if(cookie_string.match(regexp_style)){
    let value=cookie_string.match(regexp_style)[0];
    value=value.match(/\w+\w+/g)[1];
/* 
Итак, если мы нашли печеньку, начинаем свое черное дело по смене темы. 

Было бы вообще идеально, если бы у нас была БД, где мы бы хранили значение юзверской темы, 
страница генерировалась через php с учетом этой темы... Но чем, как говорится, богаты...
*/  
    blackMagic(value);
}


