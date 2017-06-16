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
        let self=this;
        let img=new Image();
        let ctx=drawArea.getContext("2d");
        img.src=this.singerPic;
        ctx.translate(250,250);
        ctx.drawImage(img,-100,-100,200,200);
        img.onload=()=>{
            self.timer=setInterval(
                ()=>{
                    if(!self.music.paused){
                        ctx.clearRect(0,0,500,500);
                        ctx.rotate(0.01);
                        ctx.drawImage(img,-100,-100,200,200);
                    }else{
                        ctx.clearRect(0,0,500,500);
                        ctx.drawImage(img,-100,-100,200,200);
                    }
                },100
            )
        }
    },
    initialStage:function(){
        //音乐播放区显示、隐藏
        this.showMusicArea()
        this.hideMusicArea()
        //disc
        this.discRotatingControl()
    }
}
$f.addLoadEvent(()=>{stage.initialStage()})
