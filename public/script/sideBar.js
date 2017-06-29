/**
 * Created by Web on 2017/6/6.
 */
//这个是另外一个文件的func
(()=>{
    let musicSideBar = {
        //工具栏列表
        toolRecommendContainer:".music-tool-recommend",
        //切换列表显示相应区域
        tabOptionToShowArea(){
            let $container = $(".music-tool-recommend");
            $container.bindEvent('click',(e)=>{
                let target = e.target;
                if(target.nodeName !== 'A')return;
                let id = '#'+$(target).getHrefId();
                $(id).showTargetHideSiblings();
            })
        },
        initialTool(){
            this.tabOptionToShowArea();
        }
    }

    //列表项激活事件
    $f.addLoadEvent(()=>{
        $("#musicTool").toggleActive('ul.music-tool-list li');
        $("#createdMusicLists").toggleSelf('active');
        $("#collectedMusicLists").toggleSelf('active');
        musicSideBar.initialTool();
    })
})()
