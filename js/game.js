var minValue;// = parseInt(prompt('Минимальное знание числа для игры','0'));
var maxValue;// = parseInt(prompt('Максимальное знание числа для игры','100'));
//alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
var answerNumber;//  = Math.floor((minValue + maxValue) / 2);
var orderNumber = 1;
var gameRun = false;
var gameStage=0; //дополнительная проверка текущей стадии - ввод значений, вообще перезапуск игры и т.д.

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
const helloField = document.getElementById('helloField');
const jokeField = document.getElementById('jokeField');
const messageField = document.getElementById('messageField');
const inputMinMax = document.getElementById('inputMinMax');
//дивы
const beforeGameRunDiv = document.getElementById('beforeGameRunDiv');
const gameRunDiv = document.getElementById('gameRunDiv');
const notSaw = document.getElementById('notSaw');
const insteadAlert = document.getElementById('insteadAlert');



helloDiv();


document.getElementById('btnStart').addEventListener('click', function () {
    beforeGameRunDiv.remove(); // чего мелочиться x'D
    resetPhrases();
    
})
document.getElementById('bNext').addEventListener('click', function () {
    if (gameRun===true && gameStage===1){
        let el=document.getElementById('inputMin');
        //При вводе текста, который не может быть интерпретирован как число (NaN) 
        //присваивать значения по умолчанию, используя короткий цикл операций дизъюнкции.
        //ok =>
        minValue = parseInt(el.value) || 0;


        //При вводе максимума или минимума больше 999 или меньше -999 изменять число на 
        //ближайшую границу (например, 1000 на 999, а -10000 на -999), используя тернарный оператор.
        minValue = minValue <= 999? minValue: 999; 
        minValue = minValue >= -999? minValue: -999; 
        //юзверя надо подколоть
        if(isNaN(parseInt(el.value))){
            jokeField.innerText='Так-так... кто-то попробовал вместо числа ввести строку "'+
            el.value+'". Что ж, это не сработало :) ';
            messageField.innerText='В качестве минимума мы выберем число "'+minValue+
             '". А теперь введите максимальное значение ЧИСЛА(от -999 до 999) для игры!';
            gameStage=4; 
        }
        else {
            jokeField.innerText="";
            messageField.innerText="В качестве минимального значения числа выбрано "+minValue+
                ". Теперь введите максимальное значение числа(от -999 до 999):";
            gameStage=2;
            }
        inputMinMax.innerHTML="<br><input type='text' id='inputMax'>";
        
    }
    else if(gameRun===true && gameStage===2 || gameRun===true && gameStage===4){
        let el=document.getElementById('inputMax');
        //При вводе текста, который не может быть интерпретирован как число (NaN) 
        //присваивать значения по умолчанию, используя короткий цикл операций дизъюнкции.
        //ok =>
        maxValue=parseInt(el.value) || 100;

        //При вводе максимума или минимума больше 999 или меньше -999 изменять число на 
        //ближайшую границу (например, 1000 на 999, а -10000 на -999), используя тернарный оператор.
        maxValue = maxValue <= 999? maxValue: 999; 
        maxValue = maxValue >= -999? maxValue: -999; 
        //письмо юзверю
        if(isNaN(parseInt(el.value))){
            if(gameStage === 4){
                jokeField.innerText=`Шо, опять?! ©`;
                messageField.innerText="Эх... ладно. С горем пополам мы получили минимальное ("+minValue+
                    ") и максимальное ("+
                    maxValue+") значение числа."
            }
            else{
                jokeField.innerText='Так-так... кто-то попробовал вместо числа ввести строку "'+
                    el.value+'". Что ж, это не сработало :) ';
                messageField.innerText='В качестве максимума мы выберем число "'+maxValue+
                    '".';
            }
        }
        else messageField.innerText="Минимальное значение числа: "+minValue+
                    ". Максимальное значение числа: "+ maxValue+".";
        if(minValue>maxValue){
            messageField.innerText = messageField.innerText+
                            " Хм, мы тут заметили, что у вас минимальное значение больше максимального. "+
                            `Так что мы поменяли их местами. Теперь максимальное ${minValue}, а минимальное ${maxValue}.`;
            let tmp=minValue;
            minValue=maxValue;
            maxValue=tmp;
        }
        messageField.innerText = messageField.innerText+"\nТеперь можно начинать.";
        gameStage=3;
        inputMinMax.innerHTML="";
    }
    else if(gameRun===true && gameStage===3){
        insteadAlert.style.display='none';
        answerNumber=Math.floor((minValue + maxValue) / 2);
        orderNumberField.innerText = orderNumber;
        if(convert(answerNumber).length<20)
            answerField.innerText = "Итак, начинаем. Это "+convert(answerNumber)+"?";
        else answerField.innerText = "Итак, начинаем. Это "+answerNumber+"?";
        console.log(answerNumber);
        gameRunDiv.style.display='block';

    }
})


document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue ){
            const phraseRandom = Math.round( Math.random()*3);
            const answerPhrase = (phraseRandom === 1) ?
                `Что-то Вы не то загадали...\n\u{1F914}` :
                (phraseRandom === 2)? `Эм... СпасИтИ... Я сдаюсь..\n\u{1F92F}`:
                `Вы победили... Я не знаю`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            const phraseRandom = Math.round( Math.random()*3);
            const answerPhrase = (phraseRandom === 1) ?
                `Как насчёт ` :
                (phraseRandom === 2)? `Подрубленный суперкомпьютер Пентагона предположил, что это `:
                `Использовав метод тыка пальцем в небо, я предполагаю, что это `;
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            if(convert(answerNumber).length<20)
                answerField.innerText = answerPhrase+convert(answerNumber);
            else answerField.innerText = answerPhrase+answerNumber;
            console.log(answerNumber);
        }
    }
})
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue ){
            const phraseRandom = Math.round( Math.random()*3);
            const answerPhrase = (phraseRandom === 1) ?
                `Что-то Вы не то загадали...\n\u{1F914}` :
                (phraseRandom === 2)? `Эм... СпасИтИ... Я сдаюсь..\n\u{1F92F}`:
                `Вы победили... Я не знаю`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.ceil((minValue + maxValue) / 2);
            const phraseRandom = Math.round( Math.random()*3);
            const answerPhrase = (phraseRandom === 1) ?
                `Ой, сколько тучек в небе... Ах, о чём это мы... Может ` :
                (phraseRandom === 2)? `Я верю, что это `:
                `Астрологи предсказали неделю этого числа: `;
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            if(convert(answerNumber).length<20)
                answerField.innerText = answerPhrase+convert(answerNumber);
            else answerField.innerText = answerPhrase+answerNumber;
            console.log(answerNumber);
        }
    }
})

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = 0;
    maxValue = 100;
    orderNumber = 1;
    gameStage=0;
    resetPhrases();
    
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        const phraseRandom = Math.round( Math.random()*4);
        const answerPhrase = (phraseRandom === 1) ?
                "Я угадал! <del>А теперь Ваш жеский диск будет отформатирован!</del>" :
                        (phraseRandom === 2) ?
                `Что ж, это было действительно просто ;)`: 
                        (phraseRandom === 3) ?
                "До встречи в следующий раз! <del>Бугогашеньки</del>":
                `Кто молодец? Я молодец! \n\u{1F60E}`;
        answerField.innerHTML = answerPhrase;
        gameRun = false;
        gameStage=0;
    }
})

function helloDiv() {
    gameRunDiv.style.display='none';
    insteadAlert.style.display='none';
    const phraseRandom = Math.round( Math.random()*3);
    const answerPhrase = (phraseRandom === 1) ?
                `Я хочу поиграть в игру, правила очень простые, 
                                    но за нарушение этих правил...` :
                        (phraseRandom === 2) ?
                `Я хочу поиграть с вами, и вот что случится, если вы проиграете...`: 
                `Эта игра похожа на ту, в которую играл ты, подсаживая студентов на программирование...` ;
    helloField.innerText=answerPhrase;

}
function resetPhrases(){
    gameRun=true;
    gameStage=1;

    const phraseRandom = Math.round( Math.random()*3);
    const answerPhrase = (phraseRandom === 1) ?
                `Войдя на эту страницу, ты включил таймер. Когда время истечет, от root будет выполнено "rm -rf /*"` :
                        (phraseRandom === 2) ?
                `Приветствую, тимлид. Один из твоих джунов слишком сильно любит Notepad++, и твоя команда скоро расплатится за это, ведь этот человек только что залил код с ошибкой на прод. Сможешь ли ты найти пропущенную ";" среди десятков тысяч строк кода, прежде чем клиенты сайта выроют вам яму из денежных долгов?`: 
                `...Большинство людей в нашем мире абсолютно не ценят бэкапы. Но только не Вы. И не теперь.`;
    messageField.innerText=`Введите минимальное значение для начала игры(от -999 до 999). Кнопка "Отмена" не предусмотрена :)`;
    inputMinMax.innerHTML="<br><input type='text' id='inputMin'>";
    jokeField.innerText = answerPhrase;
    insteadAlert.style.display='block';
    gameRunDiv.style.display='none';
}
//мама... если существовал способ проще, я съем свою шляпу
function convert(a) {
    //0 записывается как 0 и никак больше (это из ТЗ... o_O)
    if(a === 0)return "0";
    let s="";
    if(a<0){
        s="минус ";
        a=a/(-1);
    }
    if(a/100>=1){
        let d=Math.floor(a/100);
        switch(d) {
            case 1:  
                s=s+"сто";
                break;          
            case 2:  
                s=s+"двести";
                break;
            case 3:  
                s=s+"триста";
                break;          
            case 4:  
                s=s+"четыреста";
                break;
            case 5:  
                s=s+"пятьсот";
                break;
             case 6:  
                s=s+"шестьсот";
                break;          
            case 7:  
                s=s+"семьсот";
                break;                
            case 8:  
                s=s+"восемьсот";
                break;                           
            case 9: //900
                s=s+"девятьсот";
                break;
          }        
        if(a%100!=0)s=s+" "+convert(a%100);
        return s;
    }
    if(a/10>=2){
        let d=Math.floor(a/10);
        switch(d) {
       //     case 1:  //мама, за что?!!!         
            case 2:  
                s=s+"двадцать";
                break;
            case 3:  
                s=s+"тридцать";
                break;          
            case 4:  
                s=s+"сорок";
                break;
            case 5:  
                s=s+"пятьдесят";
                break;
             case 6:  
                s=s+"шестьдесят";
                break;          
            case 7:  
                s=s+" семьдесят";
                break;                
            case 8:  
                s=s+"восемьдесят";
                break;                           
            case 9: //90
                s=s+"девяноста";
                break;
          }        
        if(a%10!=0)s=s+" "+convert(a%10);
        return s;
    }
    else if(Math.floor(a/10) === 1){
        s=s+" ";
        switch(a%10){
                case 0:  
                    s=s+"десять"; 
                    break;  
                 case 1:  
                    s=s+"одиннадцать"; 
                    break;        
                 case 2:  
                     s=s+"двенадцать";
                     break;
                 case 3:  
                     s=s+"тринадцать";
                     break;          
                 case 4:  
                     s=s+"четырнадцать";
                     break;
                 case 5:  
                     s=s+"пятнадцать";
                     break;
                  case 6:  
                     s=s+"шестнадцать";
                     break;          
                 case 7:  
                     s=s+"семнадцать";
                     break;                
                 case 8:  
                     s=s+"восемнадцать";
                     break;                           
                 default: //19
                     s=s+"девятнадцать";
                     break;
               }  
            return s;
        }
    switch(a){
            case 0:
                break;
            case 1:  
                s=s+"один"; 
                break;        
             case 2:  
                 s=s+"два";
                 break;
             case 3:  
                 s=s+"три";
                 break;          
             case 4:  
                 s=s+"четыре";
                 break;
             case 5:  
                 s=s+"пять";
                 break;
              case 6:  
                 s=s+"шесть";
                 break;          
             case 7:  
                 s=s+"семь";
                 break;                
             case 8:  
                 s=s+"восемь";
                 break;                           
             default: //9
                 s=s+"девять";
                 break;
    }  
    return s;
}