/**
 * Created by Web on 2017/6/9.
 */
//����߶ȶ�̬�仯
$f.addLoadEvent(()=>{
    $("#main").responseHeight();
})
$f.addResizeEvent(()=>{
    $("#main").responseHeight();
})