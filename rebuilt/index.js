/**
 * Created by Web on 2017/6/9.
 */
//����߶ȶ�̬�仯
$f.addLoadEvent(()=>{
    $("#main").responseSize('height',100);
    //正在播放音乐的展示框
    $("#musicPlayingDetailStage").responseSize('height',100);
    // $("#musicPlayingDetailStage").responseSize('width');
})
$f.addResizeEvent(()=>{
    //正在播放音乐的展示框
    $("#musicPlayingDetailStage").responseSize('height',100);
    // $("#musicPlayingDetailStage").responseSize('width');
    $("#main").responseSize('height',100);
})