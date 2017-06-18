/**
 * Created by 76419 on 2017/6/15.
 */

let stage={
    music:$("#music").$,
    //展示，隐藏播放区按钮
    previewBtn:".music-preview",
    hideBtn:".shrink-stage",
    //disc动画区(canvas)
    timer:null,
    degree:0,
    needlePic:'images/play_needle.png',
    singerPic:"images/singer_pic/singer01.jpg",
    musicArea:".music-stage",

    //展示，隐藏播放区
    showMusicArea:function(){
        $(this.previewBtn).bindEvent('click',()=>{
            $(this.musicArea).addClass('active')
        })
    },
    hideMusicArea:function(){
        $(this.hideBtn).bindEvent('click',()=>{
            $(this.musicArea).removeClass('active')
        })
    },
    //绘制disc旋转动画
    discRotatingControl:function(){
        this.degree=0;
        let drawCircle=(radius,line_width,color)=>{
            ctx.strokeStyle=color;
            ctx.lineWidth=line_width;
            ctx.beginPath();
            ctx.arc(0,0,(radius+line_width/2),0,Math.PI*2);
            ctx.stroke();
        }
        let self=this;
        //获取画笔
        let ctx=drawArea.getContext("2d");
        let progress=0;
        let img_disc=new Image();
        let img_needle=new Image();

        img_disc.src=this.singerPic;
        img_needle.src=this.needlePic;

        img_disc.onload=()=>{
            img_needle.onload=()=>{
                //唱片指针对象
                let needle={
                    img:img_needle,
                    x:-48*0.4,
                    y:-48*0.4,
                    width:img_needle.width*0.4,
                    height:img_needle.height*0.4
                }
                let needle_rotate=0;
                self.timer=setInterval(
                    ()=>{
                        ctx.save()
                        if(!self.music.paused)self.degree+=0.3;

                        ctx.clearRect(0,0,500,500);
                        ctx.translate(250,250);
                        ctx.rotate(self.degree*Math.PI/180);
                        ctx.drawImage(img_disc,-100,-100,200,200);

                        //唱片圆环
                        drawCircle(100,8,'#000');
                        let r=107
                        let colorChange=true;
                        for(var i=0;i<=22;i++){
                            if(colorChange){
                                drawCircle(r,5,'#3C3D3D')
                                r+=4;
                            }else{
                                drawCircle(r,2,'#434346')
                                r+=1;
                            }
                            colorChange=!colorChange
                        }
                        drawCircle(r-1,10,'#A8A8A8');

                        ctx.rotate(-self.degree*Math.PI/180);
                        ctx.translate(-250,-250);
                        ctx.translate(250,0);
                        if(self.music.paused){
                            (needle_rotate<=35)&&(needle_rotate+=4)
                        }else{
                            (needle_rotate>0)&&(needle_rotate-=4)
                        }
                        ctx.rotate(-needle_rotate*Math.PI/180)
                        //唱片指针
                        ctx.drawImage(
                            needle.img,
                            needle.x,
                            needle.y,
                            needle.width,
                            needle.height
                        )

                        ctx.restore()
                    },20
                )
            }
        }
    },
    //切换时销毁disc动画以便重新加载
    changeCurrentDiscAnimation:function(){
        if(this.timer!==null){
            clearInterval(this.timer);
            this.timer=null;
            this.discRotatingControl()
        }
    },

    initialStage:function(){
        //音乐播放区显示、隐藏
        this.showMusicArea()
        this.hideMusicArea()
        //disc
        this.discRotatingControl()
        //监听disc图片，变化后重新创建
        $f.watch(stage,"singerPic",this.changeCurrentDiscAnimation.bind(stage))

    }
}
$f.addLoadEvent(()=>{stage.initialStage()})
