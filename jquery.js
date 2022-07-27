
$(function () {
    var playing = false;
    var score = 0;
    var life = 3;
    var list = ["apple", "banana", "blueberry", "coconut", "orange", "strawberry"];
    var ev;
    $("#start-box").click(function () {
        if (playing == false) {
            $("#start-box").text("Restart");
            $("#GameOver").hide();
            playing = true;
            score = 0;
            life = 3;
            $("#life").css("display", 'block');
            $("#score").css("display", 'block');
            $("#score").text("score:" + score);
            addheart(life);
            setUp();
        }
        else {
            location.reload();

        }
    });
    function addheart(heart) {
        $("#life").empty();//delete all html element inside it
        for (var i = 0; i < heart; i++) {
            $("#life").append("<img src='heart.png' width='40px' height='30px'></img>");
            //it append value into it

        }
    }




    $("#fruitContainer").click(function () {
        score = score + 1;
        $("#score").text("score:" + score);
        endaction();
        $("#fruit").hide("explode");
        setTimeout(setUp,500);



    });

    function setUp() {
        var random_val = Math.floor(Math.random() * 6);
        $("#fruit").attr("src", list[random_val] + ".png");
        $("#fruit").show();
        $("#fruitContainer").show();
        //I try to use html but it can't recognize the variable, you can only use img then change size using css
        //how to place the random html into it  ans:use attr
        //generate the random location of fruitContainer
        var y = Math.floor(Math.random() * 250);/*range [0,330] for 400*/
        var x = Math.floor(Math.random() * 500) + 50;/*50,550*/
        $("#fruitContainer").css("position", 'absolute');
        $("#fruitContainer").css("top", y);
        $("#fruitContainer").css("left", x);
        var step = Math.random() * 5 + 1;
        ev = setInterval(function () {
            $("#fruitContainer").css("top", $("#fruitContainer").position().top + step);
            //$("#fruitContainer").position().top() will get the value of to
            if ($("#fruitContainer").position().top > 370) {
                if (life == 1) {
                    life--;
                    addheart(life);
                    endaction();
                    $("#GameOver").show();
                    $("#GameOver").text("Game over. Your score is " + score);
                    location.reload();
                    playing = false;


                }
                else {
                    life--;
                    addheart(life);
                    var random_val = Math.floor(Math.random() * 6);
                    $("#fruit").attr("src", list[random_val] + ".png");
                    var x = Math.floor(Math.random() * 500) + 50;/*50,550*/
                    $("#fruitContainer").css("position", 'absolute');
                    $("#fruitContainer").css("top", -50);
                    $("#fruitContainer").css("left", x);
                    step = Math.random() * 20 + 1;
                    //don't use function to restart the fruit throwing because multiple even will run in multiple function
                    //which is uncontrollable 
                }
            }
        }, 100);
        /*if you put it inside the setInterval,the click movement will be saved, use one logic. They are running together*/

    }

    /*remember, it is feature. When you put this in, it ill be: when you click it. It is still possible it is undergoing movement*/




    function endaction() {
        clearInterval(ev);
        $("fruit").hide();
    }




}




);
