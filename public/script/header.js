/*
 * Alvin 2017/6/6.
 */
(() => {
  'use strict';
  let Toolbar = {
      barContainer: ".tool-bar-setting",
      dialogControl: ".tool-bar-setting li span.dialog-control",
      //切换主题
      themeLink: "#themeCSS",
      dialogTheme: ".tool-bar-setting .dialog-theme",
      /**********用户登陆***********/
      loginBtn: "#loginBtn",
      unameInput: "#uname",
      upwdInpue: "#upwd",

      //点击工具栏切换显示隐藏对话框
      toggleDialog(){
        $(this.barContainer).bindEvent('click', e => {
          e.preventDefault();
          e.stopPropagation();
          if(e.target.nodeName !== "I")return;
          let span = e.target.parentNode;
          //保证工具栏只有一个元素激活，且可以自身切换class
          if(span.className.indexOf('active') >= 0){
            $(this.dialogControl).removeClass('active');
          }else{
            $(this.dialogControl).removeClass('active');
            $(e.target.parentNode).addClass('active');
          }
        });
      },
      //更新主题
      updateTheme(){
        let color = localStorage['theme'] || 'red';
        $(this.themeLink).$.href = 'style/theme-' + color + ".css";
      },
      //切换主题
      changeTheme(){
        this.updateTheme();
        $(this.dialogTheme).bindEvent('click', e=>{
          e.preventDefault();
          e.stopPropagation();
          if(e.target.nodeName !== 'A')return;
          let src = e.target.href,
              i = src.lastIndexOf("#"),
              color = src.substr(i + 1);
          //使用localStorage存储主题颜色
          localStorage['theme'] = color;
          this.updateTheme();
        });
      },

      /**********用户登陆***********/
      login(){
        let self = this;
        $(this.loginBtn).bindEvent('click', () => {
          let un = $(self.unameInput).$.value;
          let up = $(self.upwdInpue).$.value;
          $f.ajax({
            type:'POST',
            url:'/Login',
            data:{uname: un, upwd: up},
            success:(result)=>{
              let data = JSON.parse(result);
              console.log(data)
              if(data.code === 1){
                  sessionStorage['uname'] = data.uname;
                  $("#nickname").html(data.uname);
                  $("#headPortrait img").$.src = "images/" + data.uhead;
              } else {
                  $("#loginMsg").html("用户名或密码错误");
              }
            }
          });
        });
      },
      initialTool(){
        this.toggleDialog();
        this.changeTheme();
        //登陆
        this.login();
      }
  };
  $f.addLoadEvent(()=>{
    Toolbar.initialTool();
    $("#search").togglePlaceholder('搜索音乐，歌手，歌词，用户');
  });
})();
