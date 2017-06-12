/**
 * Created by Web on 2017/6/12.
 */

//播放器
let player={
    music:$("#music").$,
    play_pause:"#play_pause",
    durationSpan:"#musicDuration",
    currentTimeSpan:"#musicCurrentTime",
    progressContainer:"#progressContainer",
    duration:0,
    currentTime:0,
    progress:0,
    progressSpan:"#playProgress",
    //歌曲进度条总长
    musicTotalWidth:0,
    //音量
    volumeTotalWidth:0,
    volumeContainer:"#volumeContainer",
    volumeDiv:"#volumeControl",
    volume:1,
    timer:null,
    //点击播放，暂定
    clickPlayPause:function(){
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
    },

    /****歌曲进度控制等设置****/
    //时长转换为歌曲时长显示格式
    timeToString:function(duration){
        var m=Math.floor(duration/60);
        var s=Math.floor(duration%60);
        m=m>9?m:(m>0?("0"+m):"00");
        s=s>9?s:(s>0?("0"+s):"00");
        return (m+":"+s)
    },
    //更新总时长
    updateDuration:function(){
        var duration=Math.ceil(this.music.duration);
        var durationStr=this.timeToString(duration);
        if(duration){
            $(this.durationSpan).$.innerHTML=durationStr;
            this.duration=duration;
        }
    },
    setDuration:function(){
        this.music.addEventListener('loadedmetadata',()=>{      //duration加载完成事件，若直接取duration取到的值为NaN
            this.updateDuration()
        })
    },
    //获取当前时长
    getCurrentTime:function(currentTime){
        return this.timeToString(currentTime)
    },
    //设置当前进度条
    setCurrentTime:function(){
        var self=this;
        this.currentTime=Math.ceil(this.music.currentTime);
        this.progress=(this.currentTime/this.duration)*100+"%";
        //更新进度条
        $(this.progressSpan).setStyle("width",self.progress);
        var currentTimeStr=this.getCurrentTime(this.currentTime);
        $(this.currentTimeSpan).$.innerHTML=currentTimeStr;
    },
    //定时器每一秒更新一次进度条
    setCurrentTimeInterval:function(){
        var self=this;
        this.timer=setInterval(()=>{
            self.setCurrentTime()
        },1000)
    },
    //获取进度条总长度（宽度）
    getWidth:function(elem){
        return $(elem).getStyle("width");
    },
    //点击进度条切换进度
    progressControl:function(){
        var elem=this.progressContainer;
        this.musicTotalWidth=this.getWidth(elem);
        var self=this;
        //点击进度条框获取鼠标X位置，并切换进度条
        $(elem).$.addEventListener('click',(e)=>{
            clearInterval(self.timer)
            self.timer=null;
            self.music.currentTime=Math.floor(e.offsetX/this.musicTotalWidth*self.duration);
            //点击后立即更新一次进度，避免进度条显示延迟1秒
            self.setCurrentTime();
            self.setCurrentTimeInterval();
        })
    },

    /****音量控制****/
    updateVolume:function(){
        this.volume=this.music.volume;
        var percent=Math.floor(this.volume*100)+"%";
        $(this.volumeDiv).setStyle("width",percent);
    },
    setVolume:function(){
        this.updateVolume();
        var elem=this.volumeContainer;
        this.volumeTotalWidth=this.getWidth(elem);
        var self=this;
        //点击音量条框获取鼠标X位置，并切换音量
        $(elem).$.addEventListener('click',(e)=>{
            self.music.volume=e.offsetX/this.volumeTotalWidth;
            self.updateVolume();
        })
    },
    initialPlayer:function(){
        this.clickPlayPause()
        //音乐播放进度
        this.setDuration()
        this.updateDuration()
        this.setCurrentTimeInterval()
        this.progressControl()
        //声音控制
        this.setVolume()
    }
}
$f.addLoadEvent(()=>{player.initialPlayer()});