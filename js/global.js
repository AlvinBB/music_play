/**
 * Created by 76419 on 2017/6/3.
 */

//选择器函数
function $(query){
    var elem=document.querySelectorAll(query);
    if(elem.length===1){
        elem=elem[0];
    }else if(elem.length===0){
        console.log('query element not found');
        return;
    }
    return elem;
}

//添加函数至onload事件中
function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}

//添加窗口调整响应事件函数
function addResizeEvent(func){
    function resizeEvent() {
        var oldResize = window.onresize;
        if (typeof window.onresize != 'function') {
            window.onresize = func;
        } else {
            window.onresize = function () {
                oldResize();
                func();
            }
        }
    }
    addLoadEvent(resizeEvent)
}

//响应式高度函数
function responseHeight(elem,offset){
    elem=elem||document.getElementById("main");
    offset=offset||100;
    var scrollHeight=document.documentElement.clientHeight;
    elem.style.height=(scrollHeight-offset)+'px';
}

//获取元素样式函数
function getStyle(elem,style){
    if(elem.length!==undefined){
        elem=elem[0];
    }
    var s=getComputedStyle(elem)[style];
    if(s.slice(-2)==="px"){
        s=parseInt(s);
    }
    return s;
}

//添加class
function addClass(elem,className){
    if(elem.className){
        elem.className=elem.className+" "+className;
    }else{
        elem.className=className;
    }
}