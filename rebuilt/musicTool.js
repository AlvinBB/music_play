/**
 * Created by Web on 2017/6/6.
 */
//这个是另外一个文件的func

//列表项激活事件
$f.addLoadEvent(()=>{
    $("#musicTool").toggleActive('ul.music-tool-list li');
    $("#createdMusicLists").toggleSelf('active');
    $("#collectedMusicLists").toggleSelf('active');

})