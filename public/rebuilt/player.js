/**
 * Created by Web on 2017/6/12.
 */

//播放器
(()=>{
    'use strict';
    let player={
        music:$("#music").$,
        /********歌单切换*********/
        listChangeBtnContainer:".list-control",
        listChangeByRecommendBlock:"#recommendListsContainer",
        musicDialogContainer:".music-dialog",
        //弹出框歌单容器
        musicDialogList:"#musicDialogLists",
        musicDialogTotal:".music-dialog .total",
        musicDialogBtn:".footer-tool-right-list",
        musicDialogBtnTotal:".footer-tool-right-list .list-count",
        //歌单详情页
        listsDetailArea:"#listsDetailArea",
        catchListContainer:"#catchListContainer",
        listDetailAreaName:".lists-area-top-msg .lists-name",
        listCoverPic:".lists-area-top-cover img",
        listPlayAllBtn:".list-play-all",

        /********歌曲切换*********/
        //歌单内所有歌曲
        ListSongs:[],
        ListSongsCatch:[],
        ListLength:0,
        ListIndex:0,
        currentSongSRC:"",
        CatchIndex:0,   //提取缓存歌曲编号，便于切换歌单时播放指定歌曲

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
        singerPicDir:"images/singer_pic/",
        singerPic:"images/singer_pic/singerXMJ.jpg",
        musicArea:".music-stage",

        /*********歌曲preview*******/
        singerPreviewPic:"#singerPreview",
        previewSong:"#previewSong",
        previewSinger:"#previewSinger",

        /*********歌词区域*******/
        lyricHeader:".lyric-header h1",

        /********获取歌单所有歌曲*******/
        //根据歌单id获取歌单,并缓存
        getListSongsCatch(lid){
            let self=this;
            $f.ajax({
                type:'POST',
                url:'/Lists',
                data:{lid:lid},
                success:(result)=>{
                    let data=JSON.parse(result)
                    console.log(data)
                    if(data.code<0){
                        alert(data.msg);
                        return;
                    }
                    self.ListSongsCatch=data;
                }
            })
        },
        //更新当前歌单
        updateCurrentListSongs(index){
            if(!this.ListSongsCatch){
                console.log('没有缓存歌单');
                return;
            }
            this.ListSongs=this.ListSongsCatch;
            this.ListLength=this.ListSongsCatch.length;
            this.ListIndex=index;
        },
        //显示歌单详情页
        showListsDetailArea(){
            //歌单详情页显示，其他页隐藏
            let siblings=$(this.listsDetailArea).siblings()
            let len=siblings.length;
            for(let i=0;i<len;i++){
                $(siblings[i]).removeClass('active')
            }
            $(this.listsDetailArea).addClass('active')
        },
        //更新歌单详情页数据
        updateListsDetailAreaData(){
            let list=this.ListSongsCatch;
            let html='';
            let even='';
            for(let i=0;i<list.length;i++){
                html+=`
                    <tr class="${even}">
                        <td>0${i+1}</td>
                        <td>
                            <i class="fa fa-heart-o"></i>
                        </td>
                        <td>${list[i].sname}</td>
                        <td>${list[i].singer}</td>
                    </tr>
                `
                even=(even===''?'even':'');
            }
            $(this.catchListContainer).html(html);
            $(this.listCoverPic).$.src=this.singerPicDir+this.ListSongsCatch[0].spic
        },
        //更改歌单详情页数据事件绑定
        changeListsDetailData(containerElem,targetElem,isNotTarget){    //isNotTarget:如果e.target的父元素才是a元素，那么该值为true,用于获取a
            let container=$(containerElem);
            let len=container.length;
            let bindContainer=(elem)=>{
                $(elem).bindEvent('click',(e)=>{
                    e.preventDefault();
                    let target=e.target;
                    if(isNotTarget){
                       target=target.parentNode
                    }
                    if(target.nodeName!==targetElem.toUpperCase())return;
                    let lid=$(target).getHrefId();
                    this.getListSongsCatch(lid);
                    $(this.listsDetailArea).showTargetHideSiblings();
                    //更新歌单详情页标题
                    $(this.listDetailAreaName).html(target.innerText);
                })
            }
            if(len){
                for(let i=0;i<len;i++){
                    bindContainer(container.get[i])
                }
            }else{
                bindContainer(container.get)
            }
        },
        //更改歌单详情页数据事件绑定
        changeListsDetailDataBind(){
            //通过侧边栏音乐工具更改歌单详情页数据
            this.changeListsDetailData(this.listChangeBtnContainer,'a')
            //通过主页推荐歌单更改歌单详情页数据
            this.changeListsDetailData(this.listChangeByRecommendBlock,'a',true)
        },
        //点击歌单详情页播放全部按钮，或双击歌单详情页歌曲，切换当前播放歌单
        changeCurrentListSongs(){
            $(this.listPlayAllBtn).bindEvent('click',()=>{
                if(this.ListSongs===this.ListSongsCatch){
                    this.autoPlayIndexSong(0);
                    return;
                }
                if(confirm('是否替换当前播放列表')){
                    this.updateCurrentListSongs(0);
                }
            })
            $(this.catchListContainer).bindEvent('dblclick',(e)=>{
                if(e.target.nodeName!=="TD")return;
                let index=parseInt(e.target     //获取该行第一列序号，转换为index，存入缓存index
                        .parentNode
                        .firstElementChild
                        .innerHTML)-1;
                if(this.ListSongs===this.ListSongsCatch){       //如果缓存歌单与当前歌单内容相同，则直接播放index指定歌曲
                    this.autoPlayIndexSong(index);
                    return;
                }
                if(confirm('是否替换当前播放列表')){
                    this.CatchIndex=index;
                    this.updateCurrentListSongs(index);
                }
            })
        },

        //弹出歌单列表按钮控制
        toggleMusicListsDialog(){
            $(this.musicDialogBtn).bindEvent('click',()=>{
                $(this.musicDialogContainer).toggleClass('active')
            })
        },
        //更新弹出歌单列表
        updateDialogLists(){
            let lists=this.ListSongs;
            let isOdd=true;
            let odd='';
            let html='';
            for(let i=0;i<lists.length;i++){
                let songObj=lists[i];
                (isOdd)?(odd='odd'):(odd='');
                html+=`
                    <li class="${odd}">
                        <a href="#${i}">
                            <i class="fa"></i>
                            ${songObj.sname}
                            <span>${songObj.singer}</span>
                        </a>
                    </li>
                `;
                isOdd=!isOdd
            }
            $(this.musicDialogList).html(html)
            $(this.musicDialogTotal).html(lists.length);
            $(this.musicDialogBtnTotal).html(lists.length);
        },
        //绑定歌单内每首歌的双击事件
        dialogSongDBLEvent(){
            $(this.musicDialogList).bindEvent('dblclick',(e)=>{
                e.preventDefault();
                e.stopPropagation();
                if(e.target.nodeName!=='A')return;
                let src=e.target.href;
                let index=src.indexOf("#");
                let i=src.slice(index+1);
                this.setCurrentSong(i)
            })
        },

        /**********根据播放状态设置前进后退歌曲内容*********/
        //控制歌曲播放状态
        playStatusChange(){
            $(this.playStatusControlBtn).bindEvent('click',()=>{
                this.playStatus++;
                this.playStatus>3&&(this.playStatus=1);
                console.log("播放状态"+this.playStatus)
                this.playStatusStyle()
            })
        },
        //根据SRC更新歌曲
        updateCurrentSong(){
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
        //更新当前歌曲preview图片,内容,以及stage区域的歌曲内容
        updateSingerPreview(){
            $(this.singerPreviewPic).$.src=this.singerPic;
            $(this.previewSinger).html(
                this.ListSongs[this.ListIndex].singer
            );
            $(this.previewSong).html(
                this.ListSongs[this.ListIndex].sname
            );
            $(this.lyricHeader).html(
                this.ListSongs[this.ListIndex].sname
            );
        },
        //点击播放，暂停
        clickPlayPause(){
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
        //获得指定index的歌曲信息
        getIndexSongObj(index){
            let song=this.ListSongs[index];
            let picSRC=song.spic;
            let songSRC=song.ssrc;

            return {
                pic:picSRC,
                song:songSRC
            };
        },
        //获取后一首歌曲SRC,图片等信息(由状态1,2,3判断)
        getNextSong(reverse){
            if(this.playStatus===1){
                reverse?(this.ListIndex--):(this.ListIndex++);  //如果reverse为true，则切换前一首
            }else if(this.playStatus===3){      //如果状态是随机，则随机index
                this.ListIndex=(Math.floor(Math.random()*(this.ListLength)))
            }
            (this.ListIndex<0)&&(this.ListIndex=this.ListLength-1);
            (this.ListIndex>=this.ListLength)&&(this.ListIndex=0);
            console.log('下一首歌曲编号'+this.ListIndex)
            return this.getIndexSongObj(this.ListIndex)
        },
        //设置当前歌曲
        setCurrentSong(index){
            this.ListIndex=index;
            let obj=this.getIndexSongObj(index)
            this.currentSongSRC=obj.song;
            this.singerPic=this.singerPicDir+obj.pic;
            this.updateCurrentSong();
            this.updateSingerPreview();
        },
        //自动播放第index首歌曲
        autoPlayIndexSong(index){
            index=index||0; //载入歌单后自动播放第一首歌
            this.setCurrentSong(index)
        },
        //跳转歌曲,若当前歌曲暂停，则切换后自动播放
        jumpToSong(elem,func,isPaused){
            $(elem).bindEvent('click',(e)=>{
                //若此时暂停，则跳转歌曲后开始更新进度条
                if(this.music.paused){
                    this.setCurrentTimeInterval();
                }
                let obj=func.call(this);    //func隐式解绑，需要绑定this
                this.currentSongSRC=obj.song;
                this.singerPic=this.singerPicDir+obj.pic;
                this.updateCurrentSong();
                //点击后更新一次进度条，避免延迟
                this.setCurrentTime();
                this.togglePlayPauseIcon(isPaused);
                this.updateSingerPreview()
            })
        },
        jumpToNextSong(){
            this.jumpToSong(
                this.nextMusicBtn,
                this.getNextSong,
                true
            )
        },
        jumpToPrevSong(){
            this.jumpToSong(
                this.prevMusicBtn,
                function(){
                    return this.getNextSong(true)
                },
                true
            )
        },
        //自动跳转歌曲，用于每次播放结束后自动播放下一曲
        autoJumpToNextSong(){
            if((this.currentTime/this.duration)>0.992&&(this.playStatus!==2)){
                let obj=this.getNextSong()
                this.currentSongSRC=obj.song;
                this.singerPic=this.singerPicDir+obj.pic;
                this.updateCurrentSong()
                this.updateSingerPreview()
            }
        },

        /***********歌曲进度控制等设置***********/
        //时长转换为歌曲时长显示格式
        timeToString(duration){
            var m=Math.floor(duration/60);
            var s=Math.floor(duration%60);
            m=m>9?m:(m>0?("0"+m):"00");
            s=s>9?s:(s>0?("0"+s):"00");
            return (m+":"+s)
        },
        //更新总时长
        updateDuration(){
            var duration=Math.ceil(this.music.duration);
            var durationStr=this.timeToString(duration);
            if(duration){
                $(this.durationSpan).html(durationStr);
                this.duration=duration;
            }
        },
        setDuration(){
            $(this.music).bindEvent('loadedmetadata',()=>{      //duration加载完成事件，若直接取duration取到的值为NaN
                this.updateDuration()
            })
        },
        //获取当前时长
        getCurrentTime(currentTime){
            return this.timeToString(currentTime)
        },
        //设置当前进度条
        setCurrentTime(){
            var self=this;
            this.currentTime=Math.ceil(this.music.currentTime);
            this.progress=(this.currentTime/this.duration)*100+"%";
            //更新进度条
            $(this.progressSpan).setStyle("width",self.progress);
            var currentTimeStr=this.getCurrentTime(this.currentTime);
            $(this.currentTimeSpan).html(currentTimeStr);
        },
        //定时器每一秒更新一次进度条
        setCurrentTimeInterval(){
            var self=this;
            this.timer=setInterval(()=>{
                self.setCurrentTime()
                self.autoJumpToNextSong()
            },1000)
        },
        //获取进度条总长度（宽度）
        getWidth(elem){
            return $(elem).getStyle("width");
        },
        //点击进度条切换进度
        progressControl(){
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
        updateVolume(){
            this.volume=this.music.volume;
            var percent=Math.floor(this.volume*100)+"%";
            $(this.volumeDiv).setStyle("width",percent);
        },
        setVolume(){
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
        toggleSilence(){
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
        playStatusStyle(){
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


        /******音乐播放区显示、隐藏****/
        //展示，隐藏播放区
        showMusicArea(){
            $(this.previewBtn).bindEvent('click',()=>{
                $(this.musicArea).addClass('active')
            })
        },
        hideMusicArea(){
            $(this.hideBtn).bindEvent('click',()=>{
                $(this.musicArea).removeClass('active')
            })
        },

        /*********canvas绘制disc播放区********/
        //绘制disc旋转动画
        discRotatingControl(){
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
            let canvas=()=>{
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

            img_disc.onload=()=>{
                progress+=50
                if(progress>=100){
                    canvas()
                }
            }
            img_needle.onload=()=>{
                progress+=50
                if(progress>=100){
                    canvas()
                }
            }
            img_disc.src=this.singerPic;
            img_needle.src=this.needlePic;
        },
        //切换时销毁disc动画以便重新加载
        changeCurrentDiscAnimation(){
            if(this.timer_disc!==null){
                clearInterval(this.timer_disc);
                this.timer_disc=null;
                this.discRotatingControl()
            }
        },

        //初始化播放器
        initialPlayer(){
            /***********请求歌单************/
            //请求歌单缓存
            this.getListSongsCatch(11111);
            //提取缓存歌单，更新为当前歌单
            $f.watch(player,"ListSongsCatch",()=>{
                this.updateCurrentListSongs(0);      //此处监听是为了页面一开始刷新的时候就提取缓存的歌单进行播放(ajax请求有延迟，所以有缓存数据才更新)
                $f.watch(player,"ListSongsCatch",()=>{
                    this.updateListsDetailAreaData()
                })   //第一次刷新歌单自动播放后解除监听，避免后续缓存歌单变化就自动更新当前歌单
            })
            //监听歌单，一旦发生变化，则初始化第一首歌曲
            $f.watch(player,"ListSongs",()=>{
                if(this.CatchIndex){            //切换歌单时，如果点击不是第一首歌，则拿到该缓存歌index，播放该index歌曲
                    this.autoPlayIndexSong(this.CatchIndex);
                    console.log("监听当前歌单变化:"+this.ListIndex)
                    this.CatchIndex=0;
                }else{                          //否则切歌单时，播放第一首歌曲
                    this.autoPlayIndexSong(0);
                }
                this.updateDialogLists();
                //当前歌单中正在播放歌曲的状态小图标(这里一个大坑fix了半天)
                $f.watch(player,'ListIndex',()=>{
                    if(this.ListSongs){
                        let $i=$(this.musicDialogList+" li i")
                        for(let i=0;i<$i.length;i++){
                            $($i.$[i]).removeClass('fa-pause')
                        }
                        let index=this.ListIndex>=this.ListLength?0:this.ListIndex  //防止越界（ListIndex在更新最后一首歌曲时先越界再回零然后切换歌曲，因此此处有越界）
                        $($i.$[index]).addClass('fa-pause')
                        console.log("切换歌曲1",this.ListIndex)
                    }
                })
            })

            //更改歌单事件绑定
            this.changeListsDetailDataBind();
            //点击隐藏显示歌单列表
            this.toggleMusicListsDialog();
            //歌单内歌曲双击事件
            this.dialogSongDBLEvent();
            //点击替换当前歌单
            this.changeCurrentListSongs();


            /******播放暂停前进后退*****/
                //控制歌曲状态：循环/顺序/随机
            this.playStatusChange();
            this.jumpToNextSong();
            this.jumpToPrevSong();
            this.clickPlayPause();
            /******音乐播放进度*****/
            this.setDuration();
            this.updateDuration();
            this.setCurrentTimeInterval();
            this.progressControl();
            /******声音*****/
            this.setVolume();
            this.toggleSilence();


            /******音乐播放区显示、隐藏****/
            this.showMusicArea();
            this.hideMusicArea();

            /*********canvas绘制disc播放区********/
            //disc
            this.discRotatingControl();
            //监听disc图片，变化后重新创建
            $f.watch(player,"singerPic",
                this.changeCurrentDiscAnimation.bind(player)
            )
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