/**
 * Created by Web on 2017/6/11.
 */
//播放器
class player{
    constructor(){
        this.music=$("#music").$;
        this.play_pause="#play_pause";
        this.durationSpan="#musicDuration";
        this.currentTimeSpan="#musicCurrentTime";
        this.duration=0;
        this.currentTime=0;
        this.progress=0;
        this.progressSpan="#playProgress";
        this.timer=null;
    }
    //点击播放，暂定
    clickPlayPause(){
        var play_pause=$(this.play_pause).$;
        var music=this.music;
        var icon=$(play_pause.querySelector("i.fa"));
        play_pause.addEventListener('click',()=>{
            if(music.paused){
                music.play()
                icon.removeClass('fa-play')
                icon.addClass('fa-pause')
                this.setCurrentTime();
            }else{
                music.pause()
                icon.removeClass('fa-pause')
                icon.addClass('fa-play')
                clearInterval(this.timer)
                this.timer=null;
            }
        })
    }
    /****设置总时长****/
    //时长转换为歌曲时长显示格式
    timeToString(duration){
        var m=Math.floor(duration/60);
        var s=Math.floor(duration%60);
        m=m>9?m:(m>0?("0"+m):"00");
        s=s>9?s:(s>0?("0"+s):"00");
        return (m+":"+s)
    }
    updateDuration(){
        var duration=Math.ceil(this.music.duration);
        var durationStr=this.timeToString(duration);
        if(duration){
             $(this.durationSpan).$.innerHTML=durationStr;
             this.duration=duration;
        }
    }
    setDuration(){
        this.music.addEventListener('loadedmetadata',()=>{      //duration加载完成事件，若直接取duration取到的值为NaN
            this.updateDuration()
        })
    }
    getCurrentTime(currentTime){
        return this.timeToString(currentTime)
    }
    setCurrentTime(){
        var self=this;
        this.timer=setInterval(()=>{
            self.currentTime=Math.ceil(this.music.currentTime);
            self.progress=(self.currentTime/self.duration)*100+"%";
            $(self.progressSpan).setStyle("width",self.progress);
            var currentTimeStr=this.getCurrentTime.call(self,self.currentTime);
            $(self.currentTimeSpan).$.innerHTML=currentTimeStr;
        },1000)
    }
    initialPlayer(){
        this.clickPlayPause()
        this.setDuration()
        this.updateDuration()
        this.setCurrentTime()
    }
}
$f.addLoadEvent(()=>{new player().initialPlayer()});