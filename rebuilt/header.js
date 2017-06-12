/**
 * Created by 76419 on 2017/6/6.
 */
$f.addLoadEvent(()=>{
    $(".tool-bar-setting").$.addEventListener('click',(e)=>{
        e.preventDefault();
        e.stopPropagation();
        if(e.target.nodeName!=="I")return;
        var span=e.target.parentNode;
        //保证工具栏只有一个元素激活，且可以自身切换class
        if(span.className.indexOf('active')>=0){
            $(".tool-bar-setting li span.dialog-control").removeClass('active');
        }else{
            $(".tool-bar-setting li span.dialog-control").removeClass('active');
            $(e.target.parentNode).addClass('active')
        }
    })
    $("#search").togglePlaceholder('搜索音乐，歌手，歌词，用户');
})