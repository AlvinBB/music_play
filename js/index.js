/**
 * Created by 76419 on 2017/6/3.
 */

//响应式高度
addLoadEvent(function(){
    responseHeight();
    responseHeight($('#musicTool'),150);
})
addResizeEvent(function(){
    responseHeight();
    responseHeight($('#musicTool'),150);
});

