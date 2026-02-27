$(document).ready(function(){
var onceAlert = 0;
if(onceAlert === 0){
    alert("Assalamu Alaiqum, Brother/Sister. This game is sort of a memory game. The nigga browser will give you buttons. Example: it'll press blue, you have to press blue; then it'll press green, you have to press blue + green; then it'll press something else and so on. Enjoy!!");
    onceAlert = 1;
}

var count = 1;
var i;
var result = 0;
var trial;
var struggle = [];
var strike = [];
var starter = 1;

var game_over_sound = new Audio("sounds/wrong.mp3");
var green_sound = new Audio("sounds/green.mp3");
var red_sound = new Audio("sounds/red.mp3");
var blue_sound = new Audio("sounds/blue.mp3");
var yellow_sound = new Audio("sounds/yellow.mp3");
var faa = new Audio("sounds/faaah.mp3");

function randomBlock(){
    trial = Math.random();
    trial = trial * 4;
    trial = Math.floor(trial) + 1;
    $("h1").text("Level " + count);
    //here starts the main block of codes
    switch (trial) {
        case 1:
            $(".green").fadeOut();
            green_sound.play();
            $(".green").fadeIn();
            struggle.push(1);
            strike.length = 0;
            break;
        case 2:
            $(".red").fadeOut();
            red_sound.play();
            $(".red").fadeIn();
            struggle.push(2);
            strike.length = 0;
            break;
        case 3: 
            $(".yellow").fadeOut();
            yellow_sound.play();
            $(".yellow").fadeIn();
            struggle.push(3);
            strike.length = 0;
            break;
        case 4:
            $(".blue").fadeOut();
            blue_sound.play();
            $(".blue").fadeIn();
            struggle.push(4);
            strike.length = 0;
            break;
    }
}


$(document).on("keypress", function(){
    if(starter === 1){
        randomBlock();
        starter = 0;
    }
});

function hits(){
        result = compareArray(struggle, strike);
        if(result === 1){
            faa.play();
            struggle.length = 0;
            strike.length = 0;
            blockMatch = 0;
            starter = 1;
            $("body").addClass("game-over");
            setTimeout(function(){ 
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over. Press A Key to Start");
            count = count - 1;
            alert("Congrats, you've completed " + count + " levels. Try again.");
            count = 1;
            }   
        else if(struggle.length === strike.length){
            count++;
            setTimeout(function(){
                randomBlock();
            }, 800);             
        }   
    }    

$(".btn").click(function(){
            if(starter !== 0){
                faa.play();
                count = 1;  
                starter = 1; 
                struggle.length = 0;
                strike.length = 0;
                blockMatch = 0;
                $("body").addClass("game-over");
                setTimeout(function(){ 
                $("body").removeClass("game-over");
                }, 200);
                $("h1").text("Press A Key to Start"); 
            }
            $(this).addClass("pressed");
            var pointerButton = $(this);
            setTimeout(function(){
                pointerButton.removeClass("pressed");
            }, 100); 
            var buttonClick = $(this).attr("id");
            switch (buttonClick) {
                case "green":
                    green_sound.play();
                    strike.push(1);
                    break;
                case "red":
                    red_sound.play();
                    strike.push(2);
                    break;
                case "yellow": 
                    yellow_sound.play();
                    strike.push(3);
                    break;
                case "blue":
                    blue_sound.play();
                    strike.push(4);
                    break;
            }            
            hits();         
    });

function compareArray(arr1, arr2){
    var comArr = 0;
        for(i=0; i<(arr2.length); i++){
        if(arr2[i] === arr1[i]){
            comArr = 0;
        }
        else{
            comArr = 1;
            return comArr;
        }
    }
    return comArr;
};
});
