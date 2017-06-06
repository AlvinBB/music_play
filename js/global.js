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

//添加,移除,切换class
function addClass(elem,className){
    if(elem.className){
        elem.className=elem.className+" "+className;
    }else{
        elem.className=className;
    }
}

function removeClass(elem,className){
    var allClassNames=elem.className;
    elem.className=allClassNames.replace(className,"");
}

function toggleClass(elem,className){
    var allClassNames=elem.className;
    if(allClassNames.indexOf(className)>=0){
        removeClass(elem,className)
    }else{
        addClass(elem,className)
    }
}

//列表项之间点击切换
function toggleActive(containerElem,targetElem,event){
    event=event||'click';
    if(!containerElem||!targetElem){
        console.log("ReferenceError:arguments is requested");
        return;
    }
    var targetElems=containerElem.querySelectorAll(targetElem);
    var len=targetElems.length;
    containerElem.addEventListener(event,function(e){
        e.preventDefault();
        e.stopPropagation();
        if(e.target.tagName!="A")return;
        for(var i=0;i<len;i++){
            targetElems[i].className='';
            e.target.parentNode.className='active';
        }
    })
}
//自身点击切换class
function toggleSelf(elem,className,event){
    event=event||'click';
    if(elem.length){
        for(var i=0;i<elem.length;i++){
            elem[i].addEventListener(event,function(e){
                e.preventDefault();
                toggleClass(this,className)
            })
        }
    }else{
        elem.addEventListener(event,function(e){
            e.preventDefault();
            toggleClass(this,className)
        })
    }
}