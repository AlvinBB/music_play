/**
 * Created by 76419 on 2017/6/6.
 */
(()=>{
    'use strict';
    let Toolbar={
        barContainer:".tool-bar-setting",
        dialogControl:".tool-bar-setting li span.dialog-control",
        //切换主题
        themeLink:"#themeCSS",
        dialogTheme:".tool-bar-setting .dialog-theme",
        //点击工具栏切换显示隐藏对话框
        toggleDialog:function(){
            $(this.barContainer).bindEvent('click',(e)=>{
                e.preventDefault();
                e.stopPropagation();
                if(e.target.nodeName!=="I")return;
                var span=e.target.parentNode;
                //保证工具栏只有一个元素激活，且可以自身切换class
                if(span.className.indexOf('active')>=0){
                    $(this.dialogControl).removeClass('active');
                }else{
                    $(this.dialogControl).removeClass('active');
                    $(e.target.parentNode).addClass('active')
                }
            })
        },
        //更新主题
        updateTheme:function(){
            var color=localStorage['theme']||'red';
            $(this.themeLink).$.href='style/theme-'+color+".css";
        },
        //切换主题
        changeTheme:function(){
            this.updateTheme();
            $(this.dialogTheme).bindEvent('click',(e)=>{
                e.preventDefault();
                e.stopPropagation();
                if(e.target.nodeName!=='A')return;
                let src=e.target.href;
                let i=src.lastIndexOf("#");
                let color=src.substr(i+1);
                //使用localStorage存储主题颜色
                localStorage['theme']=color;
                this.updateTheme();
            })
        },
        //初始化
        initialTool:function(){
            this.toggleDialog()
            this.changeTheme()
        }
    }
    $f.addLoadEvent(()=>{
        Toolbar.initialTool()
        $("#search").togglePlaceholder('搜索音乐，歌手，歌词，用户');
    })
})()
