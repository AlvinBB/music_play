/**
 * Created by Web on 2017/6/12.
 */

//播放器
(()=>{
    'use strict';
    let player={
        music:$("#music").$,
        /********歌曲切换*********/
        currentSongSRC:"许美静%20-%20倾城.mp3",
        //暂停播放
        play_pause:"#play_pause",
        //前一首后一首
        prevMusicBtn:"#prevMusic",
        nextMusicBtn:"#nextMusic",
        //循环状态,1表示列表循环,2表示单曲循环，3表示随机
        playStatus:1,
        playStatusControlBtn:"#playStatusControl i",

        /********歌曲进度*********/
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
        volumeSilence:"#volumeSilence",
        volumeSilenceIcon:"#volumeSilence i",

        /******音乐播放区显示、隐藏****/
        //展示，隐藏播放区按钮
        previewBtn:".music-preview",
        hideBtn:".shrink-stage",

        /******canvas绘制disc****/
        timer_disc:null,
        degree:0,
        needlePic:'images/play_needle.png',
        singerPic:"images/singer_pic/singer01.jpg",
        musicArea:".music-stage",

        /**********播放暂停前一首后一首*********/
        //根据SRC更新歌曲
        updateCurrentSong:function(){
            this.music.src="medias/"+this.currentSongSRC;
        },
        //切换播放暂停图标
        togglePlayPauseIcon(isPaused){
            var icon=$(this.play_pause+" i.fa");
            if(isPaused){
                icon.removeClass('fa-play')
                icon.removeClass('fa-pause')
                icon.addClass('fa-pause')
            }else{
                icon.removeClass('fa-pause')
                icon.removeClass('fa-play')
                icon.addClass('fa-play')
            }
        },
        //点击播放，暂停
        clickPlayPause:function(){
            var play_pause=$(this.play_pause);
            var music=this.music;
            play_pause.bindEvent('click',()=>{
                if(music.paused){
                    music.play();
                    this.togglePlayPauseIcon(true);
                    this.setCurrentTime();
                    this.setCurrentTimeInterval();
                }else{
                    music.pause();
                    this.togglePlayPauseIcon(false);
                    clearInterval(this.timer);
                    this.timer=null;
                }
            })
        },
        //获取后一首歌曲SRC
        getNextSongSRC:function(){
            return "music.mp3";
        },
        //跳转歌曲,若当前歌曲暂停，则切换后自动播放
        jumpToSong:function(elem,func,isPaused){
            $(elem).bindEvent('click',(e)=>{
                //若此时暂停，则跳转歌曲后开始更新进度条
                if(this.music.paused){
                    this.setCurrentTimeInterval();
                }
                this.currentSongSRC=func.call(this);    //func隐式解绑，需要绑定this
                this.updateCurrentSong();
                //点击后更新一次进度条，避免延迟
                this.setCurrentTime();
                this.togglePlayPauseIcon(isPaused);
            })
        },
        jumpToNextSong:function(){
            this.jumpToSong(
                this.nextMusicBtn,
                this.getNextSongSRC,
                true
            )
        },
        jumpToPrevSong:function(){
            this.jumpToSong(
                this.prevMusicBtn,
                this.getNextSongSRC,
                true
            )
        },
        //自动跳转歌曲，用于每次播放结束后自动播放下一曲
        autoJumpToNextSong:function(){
            if((this.currentTime/this.duration)>0.992&&(this.playStatus===1)){
                this.currentSongSRC=this.getNextSongSRC();
                this.updateCurrentSong()
            }
        },

        /***********歌曲进度控制等设置***********/
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
            $(this.music).bindEvent('loadedmetadata',()=>{      //duration加载完成事件，若直接取duration取到的值为NaN
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
                self.autoJumpToNextSong()
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
            //点击进度条框获取鼠标X位置，并切换进度条
            $(elem).bindEvent('click',(e)=>{
                clearInterval(this.timer)
                this.timer=null;
                this.music.currentTime=Math.floor(e.offsetX/this.musicTotalWidth*this.duration);
                //点击后立即更新一次进度，避免进度条显示延迟1秒
                this.setCurrentTime();
                this.setCurrentTimeInterval();
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
            //点击音量条框获取鼠标X位置，并切换音量
            $(elem).bindEvent('click',(e)=>{
                this.music.volume=e.offsetX/this.volumeTotalWidth;
                if(this.volume===0){
                    //切换音量图标状态
                    $(this.volumeSilenceIcon).removeClass('fa-volume-off');
                    $(this.volumeSilenceIcon).addClass('fa-volume-up');
                }
                this.updateVolume();
            })
        },
        //控制静音
        toggleSilence:function(){
            $(this.volumeSilence).bindEvent('click',(e)=>{
                e.preventDefault();
                e.stopPropagation();
                let target=e.target;
                if(target.nodeName!=='I')return;
                if(this.volume>0){
                    target.model=this.volume;
                    this.music.volume=0;
                    //此处样式为分离
                    $(target).removeClass('fa-volume-up');
                    $(target).addClass('fa-volume-off');
                }else{
                    this.music.volume=target.model;
                    $(target).removeClass('fa-volume-off');
                    $(target).addClass('fa-volume-up');
                }
                this.updateVolume();
            })
        },
        //控制循环按钮样式
        playStatusStyle:function(){
            $(this.playStatusControlBtn).removeClass("fa-repeat");
            $(this.playStatusControlBtn).removeClass("fa-random");
            $(this.playStatusControlBtn).removeClass("fa-indent");
            if(this.playStatus===1){
                $(this.playStatusControlBtn).addClass("fa-indent");
            }else if(this.playStatus===2){
                $(this.playStatusControlBtn).addClass("fa-repeat");
            }else{
                $(this.playStatusControlBtn).addClass("fa-random");
            }
        },
        //控制循环
        playStatusChange:function(){
            $(this.playStatusControlBtn).bindEvent('click',()=>{
                this.playStatus++;
                this.playStatus>3&&(this.playStatus=1);
                this.playStatusStyle()
            })
        },

        /******音乐播放区显示、隐藏****/
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

        /*********canvas绘制disc播放区********/
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
                    self.timer_disc=setInterval(
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
            if(this.timer_disc!==null){
                clearInterval(this.timer_disc);
                this.timer_disc=null;
                this.discRotatingControl()
            }
        },

        //初始化播放器
        initialPlayer:function(){
            /******播放暂停前进后退*****/
            this.jumpToNextSong()
            this.jumpToPrevSong()
            this.clickPlayPause()
            /******音乐播放进度*****/
            this.setDuration()
            this.updateDuration()
            this.setCurrentTimeInterval()
            this.progressControl()
            /******声音*****/
            this.setVolume()
            this.toggleSilence()
            //控制歌曲状态：循环/顺序/随机
            this.playStatusChange()

            /******音乐播放区显示、隐藏****/
            this.showMusicArea()
            this.hideMusicArea()

            /*********canvas绘制disc播放区********/
            //disc
            this.discRotatingControl()
            //监听disc图片，变化后重新创建
            $f.watch(player,"singerPic",this.changeCurrentDiscAnimation.bind(player))
        }
        /****destroyPlayer:function(){
            $(this.play_pause).unBindEvent('click');
            $(this.nextMusicBtn).unBindEvent('click');
            $(this.prevMusicBtn).unBindEvent('click');
            $(this.progressContainer).unBindEvent('click');
            $(this.volumeContainer).unBindEvent('click');
            $(this.volumeSilence).unBindEvent('click');
            $(this.volumeSilence).unBindEvent('click');
        }****/
    }
    $f.addLoadEvent(()=>{player.initialPlayer()});
    /****$f.addResizeEvent(()=>{
        player.destroyPlayer();
    })****/
})()