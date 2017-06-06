/**
 * Created by 76419 on 2017/6/4.
 */
//计算banner的left值
//导航栏切换
toggleActive($("#findMusic .nav-bar"),'li');
/******banner部分********/
function getBannerLeft(){
    var container=$("#personalizedRecommendation");
    var activeBanner=container.querySelector("ul.banner-show li.active");
    var nextBanner=container.querySelector("ul.banner-show li.next");
    var containerWidth=getStyle(container,'width');
    var normalBannerWidth=getStyle(nextBanner,'width');
    var activeBannerWidth=getStyle(activeBanner,'width');
    var normalBannerLeft=(containerWidth-normalBannerWidth)/2+'px';
    var activeBannerLeft=(containerWidth-activeBannerWidth)/2+'px';
    var nextBannerLeft=(containerWidth-normalBannerWidth)+'px';
    return {
        'normalBannerLeft':normalBannerLeft,
        'activeBannerLeft':activeBannerLeft,
        'nextBannerLeft':nextBannerLeft
    }
}
//初始化banner位置
function resizeBanner(){
    //获取left值
    var bannerLefts=getBannerLeft();
    var normalBannerLeft=bannerLefts.normalBannerLeft;
    var activeBannerLeft=bannerLefts.activeBannerLeft;
    var nextBannerLeft=bannerLefts.nextBannerLeft;
    //查询需要设置left值的元素
    var activeBanner=$("#personalizedRecommendation ul.banner-show li.active");
    var nextBanner=$("#personalizedRecommendation ul.banner-show li.next");
    var normalBanners=$("#personalizedRecommendation ul.banner-show>[class='']");
    //修改元素left值
    activeBanner.style.left=activeBannerLeft;
    nextBanner.style.left=nextBannerLeft;
    for(var i=0;i<normalBanners.length;i++){
        normalBanners[i].style.left=normalBannerLeft;
    }
}
addLoadEvent(resizeBanner);
addResizeEvent(resizeBanner);

function responseCarousel() {
    var timer = null;

    function carousel(interval) {
        interval = interval || 4000;
        var bannerLefts = getBannerLeft();
        var normalBannerLeft = bannerLefts.normalBannerLeft;
        var activeBannerLeft = bannerLefts.activeBannerLeft;
        var nextBannerLeft = bannerLefts.nextBannerLeft;
        var liLists = $("#personalizedRecommendation ul.banner-show li");
        var liIndexLists=$("#personalizedRecommendation ul.banner-index li");
        var len = liLists.length;

        var index = 0;
        var prev = null;
        var next = null;
        var active = null;
        var activeIndex=null;

        function task() {
            for (var i = 0; i < len; i++) {
                liLists[i].className = "";
                liIndexLists[i].className="";
            }
            (index >= len) && (index = 0);
            active = liLists[index];
            activeIndex=liIndexLists[index];
            if (index === 0) {
                prev = liLists[len - 1];
                next = liLists[index + 1];
            } else if (index === len - 1) {
                prev = liLists[index - 1];
                next = liLists[0];
            } else {
                prev = liLists[index - 1];
                next = liLists[index + 1];
            }
            addClass(active, 'active');
            active.style.left = activeBannerLeft;
            addClass(prev, 'pre');
            prev.style.left = '0px';
            addClass(next, 'next');
            next.style.left = nextBannerLeft;
            addClass(activeIndex,'active');
            index++;
        }

        function clickBannerIndex(){
            var bannerIndex=$("#personalizedRecommendation ul.banner-index");
            bannerIndex.onclick=function(e){
                e.stopPropagation();
                e.preventDefault();
                index=parseInt(e.target.getAttribute("href"))
                clearInterval(timer);
                timer=null;
                task();
                timer=setInterval(task, interval)
            }
        }

        clickBannerIndex();
        timer = setInterval(task, interval);
    }

    addLoadEvent(carousel);
    addResizeEvent(function () {
        clearInterval(timer);
        timer = null;
        if (timer === null) {
            carousel();
        }
    })
}
responseCarousel();