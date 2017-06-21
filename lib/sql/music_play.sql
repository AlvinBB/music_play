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
INSERT INTO m_user VALUES(1,'alvinbb','123456','AlvinBB','loginHeadUser.jpg');
CREATE TABLE m_song(
    sid INT PRIMARY KEY AUTO_INCREMENT,
    singer VARCHAR(40) NOT NULL DEFAULT '',
    sname VARCHAR(40) NOT NULL DEFAULT '',
    spic VARCHAR(50) NOT NULL DEFAULT '',
    ssrc VARCHAR(50) NOT NULL DEFAULT ''
);
INSERT INTO m_song VALUES
(1,'许美静','倾城','singerXMJ.jpg','许美静%20-%20倾城.mp3'),
(2,'Beyond','冷雨夜','singer.jpg','Beyond%20-%20冷雨夜.mp3'),
(3,'刘美君','两杯茶','singer.jpg','刘美君%20-%20两杯茶.mp3'),
(4,'陈僖仪','忘川','singerCYX.jpg','陈僖仪%20-%20忘川.mp3'),
(5,'张惠妹','床前思故梦','singer.jpg','张惠妹%20-%20床前思故梦.mp3'),
(6,'李幸倪','月球下的人','singer.jpg','李幸倪%20-%20月球下的人.mp3'),
(7,'林忆莲','再见悲哀','singer.jpg','林忆莲%20-%20再见悲哀.mp3'),
(8,'陈奕迅','烂','singerYS.jpg','陈奕迅%20-%20烂.mp3'),
(9,'陈奕迅','三个人的探戈','singerYS.jpg','陈奕迅%20-%20三个人的探戈.mp3'),
(10,'陈奕迅','夕阳无限好','singerYS.jpg','陈奕迅%20-%20夕阳无限好.mp3'),
(11,'陈奕迅','16月6日 晴','singerYS.jpg','陈奕迅%20-%2016月6日%20晴.mp3'),
(12,'陈奕迅','怕死','singerYS.jpg','陈奕迅%20-%20怕死.mp3'),
(13,'陈奕迅','新美人主义','singerYS.jpg','陈奕迅%20-%20新美人主义.mp3');
CREATE TABLE m_list(
    lid INT PRIMARY KEY AUTO_INCREMENT,
    lname VARCHAR(50) NOT NULL DEFAULT ''
);
INSERT INTO m_list VALUES(1,'我最爱的'),
(2,'U-87');

CREATE TABLE m_list_song(
    lsid INT PRIMARY KEY AUTO_INCREMENT,
    sid INT NOT NULL DEFAULT 0,
    lid INT NOT NULL DEFAULT 0
);
INSERT INTO m_list_song VALUES(null,1,1),
(null,2,1),
(null,3,1),
(null,4,1),
(null,5,1),
(null,6,1),
(null,7,1),
(null,8,1),
(null,8,2),
(null,9,2),
(null,10,2),
(null,11,2),
(null,12,2),
(null,13,2);