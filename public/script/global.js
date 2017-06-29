/**
 * Created by Web on 2017/6/8.
 */

((global) => {
    'use strict';
    //创建Query类，用于简化操作,调用方法类似jQuery
    class Query {
        constructor(query){
            if(typeof query === 'string'){
                this.$ = this.query(query);      //若传入参数为字符串，则调用document.querySelectorAll，将返回的dom对象赋值给this.$
                this.get = this.$;
                this.length = this.$.length||0;   //这里length为0指的是查询到的dom对象只有一个
            }else{
                this.$ = query;   //若传入的参数本身就是dom对象(不是字符串)，则直接赋值给this.$
                this.get = this.$;
                this.length = this.$.length||0;
            }
        }
        //查询query返回dom
        query(query){
            var elem = document.querySelectorAll(query);
            if(elem.length === 1){
                elem = elem[0];
            }else if(elem.length === 0){
                console.log('ReferenceError: query element not found');
                return;
            }
            return elem;
        }
        //循环
        forEach(func){
            var dom = null;
            if(this.length === 0){
                return;
            }
            for(var i = 0;i<this.length;i++){
                dom = this.$[i];
                func(i,dom)
            }
        }
        //添加，移除，切换class
        addClass(className){
            var elem = this.$;
            let add = (elem) => {
                if(elem.className){
                    elem.className = elem.className+" "+className;
                }else{
                    elem.className = className;
                }
            }
            if(this.length>0){
                this.forEach((i,dom) => {
                    add(dom)
                })
            }else{
                add(elem);
            }
        }
        removeClass(className,elem){
            var elem = elem||this.$;
            let remove = (elem) => {
                var allClassNames = elem.className;
                elem.className = allClassNames.replace(className,"");
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
            var elem = this.$;
            let toggleFunc = (elem) => {
                var allClassNames = elem.className;
                if(allClassNames.indexOf(className) >= 0){
                    this.removeClass.call($(elem),className)
                }else{
                    this.addClass.call($(elem),className)
                }
            }
            if(this.length>0){
                for(var i = 0;i<this.length;i++){
                    toggleFunc.call($(elem[i]),elem[i]);
                    console.log(i)
                }
            }else{
                toggleFunc(elem)
            }
        }
        //获取样式，设置样式
        getStyle(styleProps){
            //多个元素获取样式时只获取第一个元素样式
            var elem = this.$;
            if(this.length>0){
                elem = this.get[0]
            }
            var s = getComputedStyle(elem)[styleProps];
            if(s.slice(-2) === "px"){
                s = parseInt(s);
            }
            return s;
        }
        setStyle(styleProps,style){
            var elem = this.$;
            if(this.length === 0){
                elem.style[styleProps] = style;
            }else{
                this.forEach(function(i,dom){
                    dom.style[styleProps] = style;
                })
            }
        }
        //获取兄弟元素
        siblings(tagName){
            var siblingsAll =  this.$.parentNode.children;
            var siblings = [];
            tagName = tagName||null;
            if(tagName){
                for(var i = 0;i<siblingsAll.length;i++){
                    if(siblingsAll[i].nodeName === tagName.toUpperCase()){
                        siblings.push(siblingsAll[i])
                    }
                }
            }else{
                for(var i = 0;i<siblingsAll.length;i++){
                    if(siblingsAll[i].nodeName !== 'SCRIPT'){
                        siblings.push(siblingsAll[i])
                    }
                }
            }
            return siblings;
        }
        //获取，设定元素innerHTML
        html(str){
            if(str){
                this.$.innerHTML = str;
            }else{
                return this.$.innerHTML;
            }
        }
        //获取a元素内的href
        getHrefId(){
            let target = this.$;
            if(target.nodeName !== 'A'){
                console.log("target element nodeName is not 'A'");
                return;
            }
            let src = target.href;
            let index = src.indexOf("#");
            return src.slice(index+1);
        }
        //显示目标隐藏兄弟
        showTargetHideSiblings(){
            let siblings  =  this.siblings();
            let len  =  siblings.length;
            for(let i = 0;i<len;i++){
                $(siblings[i]).removeClass('active')
            }
            this.addClass('active')
        }

        /***以下为事件行为函数***/
        //绑定事件
        bindEvent(event,callBack){
            this.$.addEventListener(event,callBack)
        }
        //解绑事件
        unBindEvent(event,callBack){
            this.$.removeEventListener(event,callBack)
        }
        toggleActive(targetElem,event){
            event = event||'click';
            var elem = this.$;
            if(!targetElem){
                console.log("ReferenceError:arguments is requested");
                return;
            }
            var targetElems = elem.querySelectorAll(targetElem);
            var len = targetElems.length;
            elem.addEventListener(event,(e) => {
                e.preventDefault();
                e.stopPropagation();
                if(e.target.tagName !== "A")return;
                for(var i = 0;i<len;i++){
                    targetElems[i].className = '';
                    e.target.parentNode.className = 'active';
                }
            })
        }
        //自身点击切换class
        toggleSelf(className,event){
            //暂不支持多个对象
            event = event||'click';
            var elem = this.$;
            elem.addEventListener(event,(e) => {
                e.preventDefault();
                this.toggleClass(className)
            })
        }
        //点击切换页面
        togglePages(targetElem,event){
            event = event||'click';
            var elem = this.$;
            if(!targetElem){
                console.log("ReferenceError:arguments is requested");
                return;
            }
            elem.addEventListener(event,(e) => {
                e.preventDefault();
                e.stopPropagation();
                if(e.target.tagName !== "A")return;
                let src = e.target.href;
                let index = src.indexOf("#");
                let id = src.slice(index);
                if(id === "#")return;
                console.log(id);
                var siblings = $(id).siblings();

                $(siblings).removeClass('active');
                $(id).addClass('active');
            })
        }
        //input 切换placeholder
        togglePlaceholder(placeholder){
            var value = '';
            var elem = this.$;
            elem.addEventListener('focus',() => {
                value = elem.value;
                if(value === placeholder){
                    elem.value = '';
                }
            });
            elem.addEventListener('blur',() => {
                value = elem.value;
                if(value === ""){
                    elem.value = placeholder;
                }
            });
        }
        responseSize(type,offset){
            var prop = (type === "height"?"Height":"Width");
            offset = offset||0;
            var scrollSize = document.documentElement["client"+prop];
            this.setStyle(type,((scrollSize-offset)+'px'));
        }
    }

    //在global对象上注册$类
    global.$ = (query) => {
        return (new Query(query))
    };

    //不需要dom对象的通用函数，封装在$f对象中
    global.$f = {
        //将函数添加至onload事件内
        addLoadEvent:(func) => {
            var oldonload = window.onload;
            if(typeof window.onload !== 'function'){
                window.onload = func;
            }else{
                window.onload = function(){
                    oldonload();
                    func();
                }
            }
        },
        //窗口大小改变时触发
        addResizeEvent:(callBack) => {
            let resizeEvent = () =>  {
                var oldResize  =  window.onresize;
                if (typeof window.onresize  !==  'function') {
                    window.onresize  =  callBack;
                } else {
                    window.onresize  =  function () {
                        oldResize();
                        callBack();
                    }
                }
            }
            $f.addLoadEvent(resizeEvent)
        },
        //属性监听函数
        watch:(obj,attr,callBack) => {
            var _value;
            Object.defineProperty(obj,attr,{
                get(){
                    return _value;
                },
                set(val){
                    _value = val;
                    if(callBack){
                        callBack()
                    }
                }
            })
        },
        //序列化对象
        serialize:(obj) => {
            let str = "";
            for(let key in obj){
                str += (key+" = "+obj[key]+"&");
            }
            return str.slice(0,-1);
        },
        //封装ajax对象(只支持XMLHttpRequest)
        ajax:(obj) => {
            let xhr = new XMLHttpRequest();
            let data = null;
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status === 200){
                        let data = JSON.parse(xhr.responseText);
                        obj.success(data)
                    }
                }
            };
            xhr.open(obj.type,obj.url,true);
            (obj.type === "POST")&&(xhr.setRequestHeader("Content-Type","application/json"));
            (!obj.data)&&(data = null);
            (obj.data)&&(data = JSON.stringify(obj.data))
            xhr.send(data)
        }
    }
})(window);