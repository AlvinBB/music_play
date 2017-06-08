/**
 * Created by Web on 2017/6/8.
 */

(()=>{
    class myQuery {
        constructor(query){
                this.$=this.query(query);
                this.get=this.$;
                this.length=this.$.length||0;   //这里length为0指的是查询到的dom对象只有一个
        }
        query(query){
            var elem=document.querySelectorAll(query);
            if(elem.length===1){
                elem=elem[0];
            }else if(elem.length===0){
                console.log('ReferenceError: query element not found');
                return;
            }
            return elem;
        }
        //循环
        forEach(func){
            var dom=null;
            if(this.length===0){
                return;
            }
            for(var i=0;i<this.length;i++){
                dom=this.$[i];
                func(i,dom)
            }
        }
        //添加，移除，切换class
        addClass(className){
            var elem=this.$;
            let add=(elem)=>{
                if(elem.className){
                    elem.className=elem.className+" "+className;
                }else{
                    elem.className=className;
                }
            }
            if(this.length>0){
                this.forEach((i,dom)=>{
                    add(dom)
                    console.log(dom)
                })
            }else{
                add(elem);
            }
        }
        removeClass(className,elem){
            var elem=elem||this.$;
            let remove=(elem)=>{
                var allClassNames=elem.className;
                elem.className=allClassNames.replace(className,"");
            }
            if(this.length>0){
                this.forEach(function(i,dom){
                    remove(dom)
                })
            }else{
                remove(elem)
            }
        }
        toggleClass(className){
            //暂不支持多元素toggle
            var elem=this.$;
            var allClassNames=elem.className;
            if(allClassNames.indexOf(className)>=0){
                this.removeClass(className)
            }else{
                this.addClass(className)
            }
        }
        //获取样式，设置样式
        getStyle(styleProps){
            //多个元素获取样式时只获取第一个元素样式
            var elem=this.$;
            if(this.length>0){
                elem=this.get[0]
            }
            var s=getComputedStyle(elem)[styleProps];
            if(s.slice(-2)==="px"){
                s=parseInt(s);
            }
            return s;
        }
        setStyle(styleProps,style){
            var elem=this.$;
            if(this.length===0){
                elem.style[styleProps]=style;
            }else{
                this.forEach(function(i,dom){
                    dom.style[styleProps]=style;
                })
            }
        }
        //获取兄弟元素
        siblings(tagName){
            var siblingsAll= this.$.parentNode.children;
            var siblings=[];
            tagName=tagName||null;
            if(tagName){
                for(var i=0;i<siblingsAll.length;i++){
                    if(siblingsAll[i].nodeName===tagName.toUpperCase()){
                        siblings.push(siblingsAll[i])
                    }
                }
            }else{
                for(var i=0;i<siblingsAll.length;i++){
                    if(siblingsAll[i].nodeName!=='SCRIPT'){
                        siblings.push(siblingsAll[i])
                    }
                }
            }
            return siblings;
        }

        /***以下为事件行为函数***/
        toggleActive(targetElem,event){
            event=event||'click';
            var elem=this.$;
            if(!targetElem){
                console.log("ReferenceError:arguments is requested");
                return;
            }
            var targetElems=elem.querySelectorAll(targetElem);
            var len=targetElems.length;
            elem.addEventListener(event,(e)=>{
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
        toggleSelf(className,event){
            event=event||'click';
            var elem=this.$;
            elem.addEventListener(event,(e)=>{
                e.preventDefault();
                this.toggleClass(className)
            })
        }
        //点击切换页面
        togglePages(targetElem,event){
            event=event||'click';
            var elem=this.$;
            if(!targetElem){
                console.log("ReferenceError:arguments is requested");
                return;
            }
            elem.addEventListener(event,(e)=>{
                e.preventDefault();
                e.stopPropagation();
                if(e.target.tagName!="A")return;
                var src=e.target.href;
                var index=src.indexOf("#");
                var id=src.slice(index);
                if(id==="#")return;
                console.log(id);
                var siblings=$(id).siblings();
                $(id).removeClass('active',siblings)
                $(id).addClass('active');
            })
        }
        //input 切换placeholder
        togglePlaceholder(placeholder){
            var value='';
            var elem=this.$;
            elem.addEventListener('focus',()=>{
                value=elem.value;
                if(value===placeholder){
                    elem.value='';
                }
            });
            elem.addEventListener('blur',()=>{
                value=elem.value;
                if(value===""){
                    elem.value=placeholder;
                }
            });
        }
    }
//创建$类,该类查询节点的方式为document.querySelectorAll()
    window.$=(query)=>{
        return (new myQuery(query))
    };
    window.$f={
        addLoadEvent:(func)=>{
            var oldonload=window.onload;
            if(typeof window.onload!='function'){
                window.onload=func;
            }else{
                window.onload=function(){
                    oldonload();
                    func();
                }
            }
        },
        addResizeEvent:(func)=>{
            let resizeEvent=()=> {
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
            this.addLoadEvent(resizeEvent)
        }
    }
})();

/***function myQuery(query){
    this.$=this.query(query);
    this.get=this.$;
    this.length=this.$.length||0;
}
myQuery.prototype={
    constructor:myQuery,
    query:function(query){
        var elem=document.querySelectorAll(query);
        if(elem.length===1){
            elem=elem[0];
        }else if(elem.length===0){
            console.log('ReferenceError: query element not found');
            return;
        }
        return elem;
    },
    //循环
    forEach:function(func){
        var dom=null;
        if(this.length===0){
            return;
        }
        for(var i=0;i<this.length;i++){
            dom=this.$[i];
            func(i,dom)
        }
    },
    //添加，移除，切换class
    addClass:function(className){
        var elem=this.$;
        function add(elem){
            if(elem.className){
                elem.className=elem.className+" "+className;
            }else{
                elem.className=className;
            }
        }
        if(this.length>0){
            this.forEach(function(i,dom){
                add(dom)
                console.log(dom)
            })
        }else{
            add(elem);
        }
    },
    removeClass:function(className){
        var elem=this.$;
        function remove(elem){
            var allClassNames=elem.className;
            elem.className=allClassNames.replace(className,"");
        }
        if(this.length>0){
            this.forEach(function(i,dom){
                remove(dom)
            })
        }else{
            remove(elem)
        }
    },
    toggleClass:function(className){
        //暂不支持多元素toggle
        var elem=this.$;
        var allClassNames=elem.className;
        if(allClassNames.indexOf(className)>=0){
            this.removeClass(className)
        }else{
            this.addClass(className)
        }
    },
    //获取样式，设置样式
    getStyle:function(styleProps){
        //多个元素获取样式时只获取第一个元素样式
        var elem=this.$;
        if(this.length>0){
            elem=this.get[0]
        }
        var s=getComputedStyle(elem)[styleProps];
        if(s.slice(-2)==="px"){
            s=parseInt(s);
        }
        return s;
    },
    setStyle:function(styleProps,style){
        var elem=this.$;
        if(this.length===0){
            elem.style[styleProps]=style;
        }else{
            this.forEach(function(i,dom){
                dom.style[styleProps]=style;
            })
        }
    },
    //获取兄弟元素
    siblings:function(tagName){
        var siblingsAll= this.$.parentNode.children;
        var siblings=[];
        tagName=tagName||null;
        if(tagName){
            for(var i=0;i<siblingsAll.length;i++){
                if(siblingsAll[i].nodeName===tagName.toUpperCase()){
                    siblings.push(siblingsAll[i])
                }
            }
        }else{
            for(var i=0;i<siblingsAll.length;i++){
                if(siblingsAll[i].nodeName!=='SCRIPT'){
                    siblings.push(siblingsAll[i])
                }
            }
        }
        return siblings;
    }
}****/


//添加window.onload事件
// function addLoadEvent(func){
//     var oldonload=window.onload;
//     if(typeof window.onload!='function'){
//         window.onload=func;
//     }else{
//         window.onload=function(){
//             oldonload();
//             func();
//         }
//     }
// }

//window.onresize事件


//响应式高度
function responseHeight(elem,offset){
    elem=elem||document.getElementById("main");
    offset=offset||100;
    var scrollHeight=document.documentElement.clientHeight;
    elem.style.height=(scrollHeight-offset)+'px';
}

//
