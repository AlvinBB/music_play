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
    function add(elem){
        if(elem.className){
            elem.className=elem.className+" "+className;
        }else{
            elem.className=className;
        }
    }
    if(elem.length!==undefined){
        for(var i=0;i<elem.length;i++){
            addClass(elem[i]);
        }
    }else{
        add(elem);
    }
}

function removeClass(elem,className){
    function remove(elem){
        var allClassNames=elem.className;
        elem.className=allClassNames.replace(className,"");
    }
    if(elem.length!==undefined){
        for(var i=0;i<elem.length;i++){
            remove(elem[i]);
        }
    }else{
        remove(elem)
    }
}

function toggleClass(elem,className){
    var allClassNames=elem.className;
    if(allClassNames.indexOf(className)>=0){
        removeClass(elem,className)
    }else{
        addClass(elem,className)
    }
}

//查找兄弟元素
function getElemSiblings(elem){
    return elem.parentNode.children;
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

//点击切换页面
function togglePages(containerElem,targetElem,event){
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
        var src=e.target.href;
        var index=src.indexOf("#");
        var id=src.slice(index);
        if(id==="#")return;
        var siblings=getElemSiblings($(id));
        removeClass(siblings,'active')
        addClass($(id),'active');
    })
}

//input元素placeholder
function togglePlaceholder(elem,placeholder){
    var value='';
    elem.addEventListener('focus',function(){
        value=elem.value;
        if(value===placeholder){
            elem.value='';
        }
    });
    elem.addEventListener('blur',function(){
        value=elem.value;
        if(value===""){
            elem.value=placeholder;
        }
    });
}