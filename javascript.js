var start_button=false;
var score=0;
var time_remaining=60;
var correct_ans;

document.getElementById("start-box").onclick=function changeToReset(){
    if(!start_button){
        document.getElementById("start-box").innerHTML="Reset";
        document.getElementById("GameOver").style.display="none";
        start_button=true;
        time_remaining=60;
        score=0;
        SetUpGame();
    }
    
    else{
        location.reload();
    }
}
function clearOut(){
    document.getElementById("value1").innerHTML=" ";
    document.getElementById("value2").innerHTML=" ";
    document.getElementById("value3").innerHTML=" ";
    document.getElementById("value4").innerHTML=" ";
    document.getElementById("box2").innerHTML=" ";
    document.getElementById("timeRemaining").style.visibility="hidden";
    document.getElementById("correct-box").style.display="none";
    start_button=false;
    document.getElementById("start-box").innerHTML="Start";

}
function SetUpGame(){
    Time_Countdown();
    Game_and_Question_Generation();
    CheckValue("value1");
    CheckValue("value2");
    CheckValue("value3");
    CheckValue("value4");

    function CheckValue(value){
        document.getElementById(value).onclick=function checkValue1(){
            if(document.getElementById(value).innerHTML==correct_ans){
                document.getElementById("correct-box").style.display="inline";
                score++;
                document.getElementById("scorevalue").innerHTML=score;
                even=setTimeout(function(){document.getElementById("correct-box").style.display="none";clearTimeout(even);},300);
                Game_and_Question_Generation();
            }
            else{
                document.getElementById("wrong-box").style.display="inline";
                even=setTimeout(function(){document.getElementById("wrong-box").style.display="none";clearTimeout(even);},300);
                Game_and_Question_Generation();
            }
        }
       
    }
    

}






function Time_Countdown(){
    document.getElementById("timeRemain").innerHTML="  ";
    document.getElementById("timeRemaining").style.visibility="visible";
    even1=setInterval(function()
    {
        if(time_remaining==0){
            clearOut();
            document.getElementById("GameOver").style.display="block";
            document.getElementById("GameOver").innerHTML+="You receive "+score+" points";
            clearInterval(even1);
        }//change time
        document.getElementById("timeRemain").innerHTML=time_remaining+"";
        time_remaining--;
    },1000);
   
}



function Game_and_Question_Generation(){
    var val1=Math.round(Math.random()*20);
    var val2=Math.round(Math.random()*20);
    var val3=Math.floor(Math.random()*3);
    var operator;
    if(val3==0){
        operator="+";
        correct_ans=val1+val2;
    }
    else if(val3==1){
        operator="-";
        correct_ans=val1-val2;
    }
    else if(val3==2){
        operator="x";
        correct_ans=val1*val2;
    }
    else{
        operator="/";
        correct_ans=val1/val2;
    }
    document.getElementById("box2").innerHTML=val1+operator+val2;
    correct_position=1+Math.floor(Math.random()*4);//1-4 will be generated
    for(var i=1;i<=4;i++){
        if(i==correct_position){
            document.getElementById("value"+correct_position).innerHTML=Math.round(correct_ans);

        }
        else{
            var wronganswer=Math.round(Math.random()*100);
            while(wronganswer==correct_ans){
                wronganswer=Math.round(Math.random()*100);
            }
            document.getElementById("value"+i).innerHTML=wronganswer;;
        }
    }
   

}
