/**
 * Created by Web on 2017/6/11.
 */
/**
 * Created by Web on 2017/6/8.
 */

((global)=>{
    var myQuery={
        sayName:()=>{
            console.log(this.$)
        },
        query:(query)=>{
            var elem=document.querySelectorAll(query);
            if(elem.length===1){
                elem=elem[0];
            }else if(elem.length===0){
                console.log('ReferenceError: query element not found');
                return;
            }
            return elem;
        },
        //ѭ��
        forEach:(func)=>{
            var dom=null;
            if(this.length===0){
                return;
            }
            for(var i=0;i<this.length;i++){
                dom=this.$[i];
                func(i,dom)
            }
        },
        //��ӣ��Ƴ����л�class
        addClass:(className)=>{
            var elem=this.$;
            console.log(this)
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
                })
            }else{
                add(elem);
            }
        },
        removeClass:(className,elem)=>{
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
        },
        toggleClass:(className)=>{
            //�ݲ�֧�ֶ�Ԫ��toggle
            var elem=this.$;
            let toggleFunc=(elem)=>{
                //console.log(this)
                //console.log(elem)
                var allClassNames=elem.className;
                if(allClassNames.indexOf(className)>=0){
                    this.removeClass.call($(elem),className)
                }else{
                    this.addClass.call($(elem),className)
                }
            }
            if(this.length>0){
                for(var i=0;i<this.length;i++){
                    toggleFunc.call($(elem[i]),elem[i]);
                    console.log(i)
                }
            }else{
                toggleFunc(elem)
            }
        },
        //��ȡ��ʽ��������ʽ
        getStyle:(styleProps)=>{
            //���Ԫ�ػ�ȡ��ʽʱֻ��ȡ��һ��Ԫ����ʽ
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
        setStyle:(styleProps,style)=>{
            var elem=this.$;
            if(this.length===0){
                elem.style[styleProps]=style;
            }else{
                this.forEach(function(i,dom){
                    dom.style[styleProps]=style;
                })
            }
        },
        //��ȡ�ֵ�Ԫ��
        siblings:(tagName)=>{
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
        },

        /***����Ϊ�¼���Ϊ����***/
        toggleActive:(targetElem,event)=>{
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
        },
        //�������л�class
        toggleSelf:(className,event)=>{
            //�ݲ�֧�ֶ������
            event=event||'click';
            var elem=this.$;
            elem.addEventListener(event,(e)=>{
                e.preventDefault();
                this.toggleClass(className)
            })
        },
        //����л�ҳ��
        togglePages:(targetElem,event)=>{
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

                $(siblings).removeClass('active');
                $(id).addClass('active');
            })
        },
        //input �л�placeholder
        togglePlaceholder:(placeholder)=>{
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
        },
        responseHeight:(offset)=>{
            offset=offset||100;
            var scrollHeight=document.documentElement.clientHeight;
            this.setStyle('height',((scrollHeight-offset)+'px'));
        }
    }
    class Query{
        constructor(query){
            if(typeof query==='string'){
                this.$=this.query(query);
                this.get=this.$;
                this.length=this.$.length||0;   //����lengthΪ0ָ���ǲ�ѯ����dom����ֻ��һ��
            }else{
                this.$=query;
                this.length=this.$.length||0;
            }
        };
    }
    Object.setPrototypeOf(Query.prototype,myQuery);
    //��global������ע��$��,�����ѯ�ڵ�ķ�ʽΪdocument.querySelectorAll()
    global.$=(query)=>{
        return (new Query(query))
    };
    global.$f={
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
            $f.addLoadEvent(resizeEvent)
        }
    }
})(window);