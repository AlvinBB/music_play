/**
 * Created by 76419 on 2017/6/8.
 */

//计算banner的left值
//导航栏切换
$("#findMusic .nav-bar").toggleActive('li');
$("#findMusic .nav-bar").togglePages('li a');
/******banner部分********/
(()=>{
    'use strict';
    class banner{
        constructor(){
            //包裹div
            this.container="#personalizedRecommendation";
            //此处可进一步做初始化,在此之前动态添加active,next,pre的class
            this.active="#personalizedRecommendation ul.banner-show li.active";
            this.next="#personalizedRecommendation ul.banner-show li.next";
            this.normal="#personalizedRecommendation ul.banner-show>[class='']";
            //所有轮播图列表项
            this.allShowLists="#personalizedRecommendation ul.banner-show li";
            //轮播下方点击按钮
            this.bannerIndexContainer="#personalizedRecommendation ul.banner-index";
            this.allIndexLists="#personalizedRecommendation ul.banner-index li";
            //定时器
            this.timer=null;
            //轮播当前index
            this.index=0;
        }

        //获取元素left值
        getBannerLeft(){
            var container=$(this.container).$;
            var activeBanner=$(this.active).$;
            var nextBanner=$(this.next).$;
            var containerWidth=$(container).getStyle('width');
            var normalBannerWidth=$(nextBanner).getStyle('width');
            var activeBannerWidth=$(activeBanner).getStyle('width');
            var normalBannerLeft=(containerWidth-normalBannerWidth)/2+'px';
            var activeBannerLeft=(containerWidth-activeBannerWidth)/2+'px';
            var nextBannerLeft=(containerWidth-normalBannerWidth)+'px';
            return {
                'normalBannerLeft':normalBannerLeft,
                'activeBannerLeft':activeBannerLeft,
                'nextBannerLeft':nextBannerLeft
            }
        }
        //初始化banner中各个元素位置
        resizeBanner(){
            //获取left值
            var bannerLefts=this.getBannerLeft();
            var normalBannerLeft=bannerLefts.normalBannerLeft;
            var activeBannerLeft=bannerLefts.activeBannerLeft;
            var nextBannerLeft=bannerLefts.nextBannerLeft;
            //查询需要设置left值的元素
            var activeBanner=$(this.active).$;
            var nextBanner=$(this.next).$;
            var normalBanners=$(this.normal);
            //修改元素left值
            $(activeBanner).setStyle('left',activeBannerLeft);
            $(nextBanner).setStyle('left',nextBannerLeft);
            for(var i=0;i<normalBanners.length;i++){
                $(normalBanners.get[i]).setStyle('left',normalBannerLeft);
            }
        }

        //点击后切换当前轮播图片
        clickBannerIndex(task,self,interval){
            //var bannerIndex=$(self.bannerIndexContainer).$;
            $(self.bannerIndexContainer).bindEvent('click',(e)=>{
                e.stopPropagation();
                e.preventDefault();
                self.index=parseInt(e.target.getAttribute("href"))
                clearInterval(self.timer);
                self.timer=null;
                task();
                self.timer=setInterval(task, interval)
            })
        }
        //轮播
        carousel(interval) {
            var self=this;
            interval = interval || 4000;
            var bannerLefts = this.getBannerLeft();
            var normalBannerLeft = bannerLefts.normalBannerLeft;
            var activeBannerLeft = bannerLefts.activeBannerLeft;
            var nextBannerLeft = bannerLefts.nextBannerLeft;
            var liLists = $(this.allShowLists).$;
            var liIndexLists=$(this.allIndexLists).$;
            var len = liLists.length;

            //var index = 0;
            var prev = null;
            var next = null;
            var active = null;
            var activeIndex=null;

            //切换class，轮播定时器的任务函数
            let task=()=> {
                for (var i = 0; i < len; i++) {
                    liLists[i].className = "";
                    liIndexLists[i].className="";
                }
                (this.index >= len) && (this.index = 0);
                active = liLists[this.index];
                activeIndex=liIndexLists[this.index];
                if (this.index === 0) {
                    prev = liLists[len - 1];
                    next = liLists[this.index + 1];
                } else if (this.index === len - 1) {
                    prev = liLists[this.index - 1];
                    next = liLists[0];
                } else {
                    prev = liLists[this.index - 1];
                    next = liLists[this.index + 1];
                }
                $(active).addClass( 'active');
                active.style.left = activeBannerLeft;
                $(prev).addClass( 'pre');
                prev.style.left = '0px';
                $(next).addClass( 'next');
                next.style.left = nextBannerLeft;
                $(activeIndex).addClass('active');
                this.index++;
            }

            this.timer = setInterval(task, interval);
            this.clickBannerIndex(task,self,interval);
        }

        //初始化响应式banner
        initialResponseBanner(){
            this.resizeBanner();
            this.carousel();
        }
    }
    var ban=new banner();
    $f.addLoadEvent(()=>{ban.initialResponseBanner()});
    $f.addResizeEvent(()=>{
        clearInterval(ban.timer)
        ban.timer=null;
        ban.initialResponseBanner()
    });
})()
