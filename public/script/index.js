/*
 * Alvin 2017/6/9.
 */
$.addLoadEvent(()=>{
  $("#main").responseSize('height', 100);
  //正在播放音乐的展示框
  $("#musicPlayingDetailStage").responseSize('height', 100);
  //歌单详情页
  $("#listsDetailArea").responseSize('height', 100);
});
$.addResizeEvent(()=>{
  //正在播放音乐的展示框
  $("#musicPlayingDetailStage").responseSize('height', 100);
  $("#main").responseSize('height', 100);
  //歌单详情页
  $("#listsDetailArea").responseSize('height', 100);
});
