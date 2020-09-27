const canvas = document.getElementById("canvas");
const ctx =canvas.getContext("2d");
const canvasSize= 800;
canvas.width=canvasSize;
canvas.height=canvasSize;

const snakebox=20;
const totalmoves=canvasSize/snakebox;

const apple=new Image();
apple.src="images/apple.png"

let dead=new Audio();
let eat=new  Audio();
let up=new Audio();
let down=new Audio();
let left=new Audio();
let right=new Audio();

dead.src="audio/dead.mp3"
down.src="audio/down.mp3"
eat.src="audio/eat.mp3"
left.src="audio/left.mp3"
right.src="audio/right.mp3"
up.src="audio/up.mp3"

let snake=[];
snake[0]={
    x: 9*snakebox,
    y: 10*snakebox
};

let food={};
 getfood()


let score=0;

let dir="";

document.addEventListener("keydown",direction);


function direction(){
    var key = event.keyCode;
    if(key==37 && dir!="RIGHT"){
       //console.log("hai")
         dir="LEFT"; 
         left.play();
     }
    else  if(key==38 && dir!="DOWN"){
         // console.log("hai")
            dir="UP";
            up.play();
    }
    else if(key==39 && dir!="LEFT"){
        // console.log("hai")
           dir="RIGHT";
           right.play();
    }
    else if(key==40 && dir!="UP"){
           dir="DOWN";
           down.play();
     }
          
 };   

function getfood(){
        food={
            x:Math.floor(Math.random()*(totalmoves-2-3)+3)*snakebox,
            y:Math.floor(Math.random()*(totalmoves-2-3)+3)*snakebox
        };
    }
    function collision(head,ar){
        for(i=0;i<ar.length;++i){
            if(ar[i].x==head.x&&ar[i].y==head.y){
                return true;
            }
        }
      return false;
    }

 function run(){
            ctx.fillStyle="#dcdcdc";
            ctx.fillRect(0,0,canvasSize,canvasSize);
           

            for(let i=0; i<snake.length; ++i){
                ctx.fillStyle=i==0?"#4CAF50":"#fff";
                ctx.fillRect(snake[i].x,snake[i].y,snakebox,snakebox);

                ctx.strokeStyle="#3FC17B";
                ctx.strokeRect(snake[i].x,snake[i].y,snakebox,snakebox);

              };
            
 ctx.drawImage(apple,food.x,food.y,snakebox,snakebox);
 let snakex =snake[0].x;
 let snakey =snake[0].y;

 if(dir=="LEFT") snakex-=snakebox;
 if(dir=="RIGHT") snakex+=snakebox;
 if(dir=="UP") snakey-=snakebox;
 if(dir=="DOWN") snakey+=snakebox;

  if (snakex==food.x && snakey==food.y){
                  score++;
                  eat.play();
                  getfood();

                 }
  else{
                  snake.pop();

                  }
let newhead={
            x:snakex,
            y:snakey
          };
if (snakex<0||snakex>=canvasSize||snakey<0||snakey>=canvasSize||collision(newhead,snake)){
    gameover();
    return;
}


 snake.unshift(newhead);
 //var gm=setInterval(run,100);
 ctx.fillStyle="black";
 ctx.font="40px tahoma";
 ctx.fillText(score,10,40);

                
                }           


 run();
       
 var gm=setInterval(run,200);
   function gameover(){
   clearInterval(gm);
   dead.play();
   ctx.fillStyle="black";
   ctx.font="40px tahoma";
   ctx.fillText("GAME OVER",canvasSize/2-100,canvasSize/2);
   ctx.fillText("your score:"+score,canvasSize/2-100,canvasSize/2-100);
   } 
                



 

