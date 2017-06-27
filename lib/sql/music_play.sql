SET NAMES UTF8;
DROP DATABASE IF EXISTS music_play;
CREATE DATABASE music_play CHARSET=utf8;
USE music_play;
CREATE TABLE m_user(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(20) NOT NULL DEFAULT '',
    upwd VARCHAR(32) NOT NULL DEFAULT '',
    nickname VARCHAR(10) NOT NULL DEFAULT '',
    uhead VARCHAR(50) NOT NULL DEFAULT ''
);
INSERT INTO m_user VALUES(516516,'alvinbb','123456','AlvinBB','loginHeadUser.jpg');
CREATE TABLE m_song(
    sid INT PRIMARY KEY AUTO_INCREMENT,
    singer VARCHAR(40) NOT NULL DEFAULT '',
    sname VARCHAR(40) NOT NULL DEFAULT '',
    spic VARCHAR(50) NOT NULL DEFAULT '',
    ssrc VARCHAR(50) NOT NULL DEFAULT ''
);
INSERT INTO m_song VALUES
(1,'许美静','倾城','singerXMJ.jpg','许美静%20-%20倾城.mp3'),
(2,'Beyond','冷雨夜','singerBYD.jpg','Beyond%20-%20冷雨夜.mp3'),
(3,'刘美君','两杯茶','singerLMJ.jpg','刘美君%20-%20两杯茶.mp3'),
(4,'陈僖仪','忘川','singerCXY.jpg','陈僖仪%20-%20忘川.mp3'),
(5,'张惠妹','床前思故梦','singerZHM.jpg','张惠妹%20-%20床前思故梦.mp3'),
(6,'李幸倪','月球下的人','singerLXN.jpg','李幸倪%20-%20月球下的人.mp3'),
(7,'林忆莲','再见悲哀','singerLYL.jpg','林忆莲%20-%20再见悲哀.mp3'),
(8,'陈奕迅','烂','singerYS.jpg','陈奕迅%20-%20烂.mp3'),
(9,'陈奕迅','三个人的探戈','singerYS.jpg','陈奕迅%20-%20三个人的探戈.mp3'),
(10,'陈奕迅','夕阳无限好','singerYS.jpg','陈奕迅%20-%20夕阳无限好.mp3'),
(11,'陈奕迅','16月6日 晴','singerYS.jpg','陈奕迅%20-%2016月6日%20晴.mp3'),
(12,'陈奕迅','怕死','singerYS.jpg','陈奕迅%20-%20怕死.mp3'),
(13,'陈奕迅','新美人主义','singerYS.jpg','陈奕迅%20-%20新美人主义.mp3'),
(14,'林峯','幼稚完','singerLF.jpg','林峯%20-%20幼稚完.mp3'),
(15,'周柏豪','小白','singerZBH.jpg','周柏豪%20-%20小白.mp3'),
(16,'许廷铿','厌弃','singerXTK.jpg','许廷铿%20-%20厌弃.mp3'),
(17,'李悦君','梦伴','singerLYJ.jpg','李悦君%20-%20梦伴.mp3'),
(18,'关心妍','情歌','singerGXY.jpg','关心妍%20-%20情歌.mp3'),
(19,'黄凯芹','雨中的恋人们','singerHKQ.jpg','黄凯芹%20-%20雨中的恋人们.mp3'),
(20,'刘德华','暗里着迷','singerLDH.jpg','刘德华%20-%20暗里着迷.mp3'),
(21,'陈僖仪','蜚蜚','singerCXY.jpg','陈僖仪%20-%20蜚蜚.mp3'),
(22,'张国荣','沉默是金','singerZGR.jpg','张国荣%20-%20沉默是金.mp3'),
(23,'张智霖','十指紧扣','singerZZL.jpg','张智霖%20-%20十指紧扣.mp3'),
(24,'杨千嬅','再见二丁目','singerYQH.jpg','杨千嬅%20-%20再见二丁目.mp3'),
(25,'陈奕迅','不如不见','singerYS.jpg','陈奕迅%20-%20不如不见.mp3'),
(26,'G.E.M.邓紫棋','喜欢你','singerGEM.jpg','G.E.M.邓紫棋%20-%20喜欢你.mp3'),
(27,'杨千嬅','处处吻','singerYQH.jpg','杨千嬅%20-%20处处吻.mp3'),
(28,'许廷铿','面具','singerXTK.jpg','许廷铿%20-%20面具.mp3'),
(29,'麦浚龙','耿耿于怀','singerMJL.jpg','麦浚龙%20-%20耿耿于怀.mp3'),
(30,'谭咏麟','一生中最爱','singerTYL.jpg','谭咏麟%20-%20一生中最爱.mp3'),
(31,'杨千嬅','野孩子','singerYQH.jpg','杨千嬅%20-%20野孩子.mp3'),
(32,'孙耀威','爱的故事(上)','singerSYW.jpg','孙耀威%20-%20爱的故事(上).mp3'),
(33,'杨千嬅','勇','singerYQH.jpg','杨千嬅%20-%20勇.mp3'),
(34,'谭咏麟','朋友','singerTYL.jpg','谭咏麟%20-%20朋友.mp3'),
(35,'Beyond','海阔天空','singerBYD.jpg','Beyond%20-%20海阔天空.mp3'),
(36,'吴若希','越难越爱','singerWRX.jpg','吴若希%20-%20越难越爱.mp3'),
(37,'李克勤','月半小夜曲','singerLKQ.jpg','李克勤%20-%20月半小夜曲.mp3'),
(38,'梁汉文','七友','singerLHW.jpg','梁汉文%20-%20七友.mp3'),
(39,'郑欣宜','上心','singerZXY.jpg','郑欣宜%20-%20上心.mp3');

CREATE TABLE m_list_pub(
    lpid INT PRIMARY KEY AUTO_INCREMENT,
    lpname VARCHAR(50) NOT NULL DEFAULT ''
);
INSERT INTO m_list_pub VALUES(11111,'我最爱的'),
(11112,'U-87'),
(11113,'粤语'),
(11114,'经典粤语');

CREATE TABLE m_list_my(
    lmid INT PRIMARY KEY AUTO_INCREMENT,
    lmname VARCHAR(50) NOT NULL DEFAULT '',
    uid INT NOT NULL DEFAULT 0,
    lpid INT NOT NULL DEFAULT 0
);
INSERT INTO m_list_my VALUES(1,'我最爱的',516516,11111),
(2,'U-87',516516,11112);

CREATE TABLE m_list_song(
    lsid INT PRIMARY KEY AUTO_INCREMENT,
    sid INT NOT NULL DEFAULT 0,
    lid INT NOT NULL DEFAULT 0
);
INSERT INTO m_list_song VALUES(null,1,11111),
(null,2,11111),
(null,3,11111),
(null,4,11111),
(null,5,11111),
(null,6,11111),
(null,7,11111),
(null,8,11112),
(null,8,11112),
(null,9,11112),
(null,10,11112),
(null,11,11112),
(null,12,11112),
(null,13,11112),
(null,14,11113),
(null,15,11113),
(null,16,11113),
(null,17,11113),
(null,18,11113),
(null,19,11113),
(null,20,11113),
(null,21,11113),
(null,22,11113),
(null,23,11113),
(null,24,11113),
(null,25,11114),
(null,26,11114),
(null,27,11114),
(null,28,11114),
(null,29,11114),
(null,30,11114),
(null,31,11114),
(null,32,11114),
(null,33,11114),
(null,34,11114),
(null,35,11114),
(null,36,11114),
(null,37,11114),
(null,38,11114),
(null,39,11114);