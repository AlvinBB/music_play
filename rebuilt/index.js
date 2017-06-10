/**
 * Created by Web on 2017/6/9.
 */
//整体高度动态变化
$f.addLoadEvent(()=>{
    $("#main").responseHeight();
})
$f.addResizeEvent(()=>{
    $("#main").responseHeight();
})