/**
 * Created by Web on 2017/6/9.
 */
//����߶ȶ�̬�仯
$f.addLoadEvent(()=>{
    $("#main").responseSize('height',100);
    //正在播放音乐的展示框
    $("#musicPlayingDetailStage").responseSize('height',100);
    // $("#musicPlayingDetailStage").responseSize('width');


    //用于测试
    $("#loginBtn").bindEvent('click',()=>{
        $f.ajax({
            type:'POST',
            url:'/Login',
            data:{uname:"alvinbb",upwd:123456},
            success:(data)=>{
                console.log(JSON.parse(data))
            }
        })
    })
})
$f.addResizeEvent(()=>{
    //正在播放音乐的展示框
    $("#musicPlayingDetailStage").responseSize('height',100);
    // $("#musicPlayingDetailStage").responseSize('width');
    $("#main").responseSize('height',100);
})