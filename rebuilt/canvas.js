/**
 * Created by 76419 on 2017/6/15.
 */
var img=new Image();
img.src="img/disc.png";
var ctx=drawArea.getContext("2d");
ctx.translate(250,250);
ctx.drawImage(img,-70,-70,140,140);
img.onload=()=>{
    var r=0;
    var timer=null;
    (()=>{
        if(this.play){
            this.play=false;
            clearInterval(timer);
            timer=null;
        }else{
            this.play=true;
            timer=setInterval(
                ()=>{
                    ctx.clearRect(0,0,400,400)
                    ctx.rotate(0.05);
                    ctx.drawImage(img,-100,-100,200,200);
                },100
            )
        }
    })()

}