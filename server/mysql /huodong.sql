/*
Navicat MySQL Data Transfer

Source Server         : www
Source Server Version : 50519
Source Host           : localhost:3306
Source Database       : wx_girls

Target Server Type    : MYSQL
Target Server Version : 50519
File Encoding         : 65001

Date: 2017-09-11 13:03:23
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `qw_auth_group`
-- ----------------------------
DROP TABLE IF EXISTS `qw_auth_group`;
CREATE TABLE `qw_auth_group` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` char(100) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `rules` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qw_auth_group
-- ----------------------------
INSERT INTO `qw_auth_group` VALUES ('1', '超级管理员', '1', '1,2,3,56,6,5,7,8,9,10,51,52,53,57,13,14,15,16,17,18,108,109,111,110');

-- ----------------------------
-- Table structure for `qw_auth_group_access`
-- ----------------------------
DROP TABLE IF EXISTS `qw_auth_group_access`;
CREATE TABLE `qw_auth_group_access` (
  `uid` mediumint(8) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qw_auth_group_access
-- ----------------------------
INSERT INTO `qw_auth_group_access` VALUES ('1', '1');

-- ----------------------------
-- Table structure for `qw_auth_rule`
-- ----------------------------
DROP TABLE IF EXISTS `qw_auth_rule`;
CREATE TABLE `qw_auth_rule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `name` char(80) NOT NULL DEFAULT '',
  `title` char(20) NOT NULL DEFAULT '',
  `icon` varchar(255) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '1',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `condition` char(100) NOT NULL DEFAULT '',
  `islink` tinyint(1) NOT NULL DEFAULT '1',
  `o` int(11) NOT NULL COMMENT '排序',
  `tips` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=112 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qw_auth_rule
-- ----------------------------
INSERT INTO `qw_auth_rule` VALUES ('1', '0', 'Index/index', '返回首页', 'menu-icon fa fa-tachometer', '1', '1', '', '1', '0', '友情提示：经常查看操作日志，发现异常以便及时追查原因。');
INSERT INTO `qw_auth_rule` VALUES ('2', '0', '', '系统设置', 'menu-icon fa fa-cog', '1', '1', '', '1', '2', '');
INSERT INTO `qw_auth_rule` VALUES ('3', '2', 'Setting/setting', '网站设置', 'menu-icon fa fa-caret-right', '1', '1', '', '1', '3', '这是网站设置的提示。');
INSERT INTO `qw_auth_rule` VALUES ('4', '2', 'Menu/index', '后台菜单', 'menu-icon fa fa-caret-right', '1', '1', '', '1', '4', '');
INSERT INTO `qw_auth_rule` VALUES ('5', '2', 'Menu/add', '新增菜单', 'menu-icon fa fa-caret-right', '1', '1', '', '0', '5', '');
INSERT INTO `qw_auth_rule` VALUES ('6', '4', 'Menu/edit', '编辑菜单', '', '1', '1', '', '0', '6', '');
INSERT INTO `qw_auth_rule` VALUES ('7', '2', 'Menu/update', '保存菜单', 'menu-icon fa fa-caret-right', '1', '1', '', '0', '7', '');
INSERT INTO `qw_auth_rule` VALUES ('8', '2', 'Menu/del', '删除菜单', 'menu-icon fa fa-caret-right', '1', '1', '', '0', '8', '');
INSERT INTO `qw_auth_rule` VALUES ('9', '2', 'Database/backup', '数据库备份', 'menu-icon fa fa-caret-right', '1', '1', '', '1', '9', '');
INSERT INTO `qw_auth_rule` VALUES ('10', '9', 'Database/recovery', '数据库还原', '', '1', '1', '', '0', '10', '');
INSERT INTO `qw_auth_rule` VALUES ('13', '0', '', '用户及组', 'menu-icon fa fa-users', '1', '1', '', '1', '13', '');
INSERT INTO `qw_auth_rule` VALUES ('14', '13', 'Member/index', '用户管理', 'menu-icon fa fa-caret-right', '1', '1', '', '1', '14', '');
INSERT INTO `qw_auth_rule` VALUES ('15', '13', 'Member/add', '新增用户', 'menu-icon fa fa-caret-right', '1', '1', '', '1', '15', '');
INSERT INTO `qw_auth_rule` VALUES ('16', '13', 'Member/edit', '编辑用户', 'menu-icon fa fa-caret-right', '1', '1', '', '0', '16', '');
INSERT INTO `qw_auth_rule` VALUES ('17', '13', 'Member/update', '保存用户', 'menu-icon fa fa-caret-right', '1', '1', '', '0', '17', '');
INSERT INTO `qw_auth_rule` VALUES ('18', '13', 'Member/del', '删除用户', '', '1', '1', '', '0', '18', '');
INSERT INTO `qw_auth_rule` VALUES ('19', '13', 'Group/index', '用户组管理', 'menu-icon fa fa-caret-right', '1', '1', '', '1', '19', '');
INSERT INTO `qw_auth_rule` VALUES ('111', '108', 'huodong/bmlist', '报名列表', 'menu-icon fa fa-caret-right', '1', '1', '', '1', '1', '');
INSERT INTO `qw_auth_rule` VALUES ('21', '13', 'Group/edit', '编辑用户组', 'menu-icon fa fa-caret-right', '1', '1', '', '0', '21', '');
INSERT INTO `qw_auth_rule` VALUES ('22', '13', 'Group/update', '保存用户组', 'menu-icon fa fa-caret-right', '1', '1', '', '0', '22', '');
INSERT INTO `qw_auth_rule` VALUES ('23', '13', 'Group/del', '删除用户组', '', '1', '1', '', '0', '23', '');
INSERT INTO `qw_auth_rule` VALUES ('51', '9', 'Database/export', '备份', '', '1', '1', '', '0', '51', '');
INSERT INTO `qw_auth_rule` VALUES ('52', '9', 'Database/optimize', '数据优化', '', '1', '1', '', '0', '52', '');
INSERT INTO `qw_auth_rule` VALUES ('53', '9', 'Database/repair', '修复表', '', '1', '1', '', '0', '53', '');
INSERT INTO `qw_auth_rule` VALUES ('56', '3', 'Setting/update', '设置保存', '', '1', '1', '', '0', '56', '');
INSERT INTO `qw_auth_rule` VALUES ('57', '9', 'Database/del', '备份删除', '', '1', '1', '', '0', '57', '');
INSERT INTO `qw_auth_rule` VALUES ('108', '0', '', '活动报名', 'menu-icon fa fa-desktop', '1', '1', '', '1', '14', '');
INSERT INTO `qw_auth_rule` VALUES ('109', '108', 'huodong/lists', '活动信息', 'menu-icon fa fa-caret-right', '1', '1', '', '1', '0', '');
INSERT INTO `qw_auth_rule` VALUES ('110', '108', 'huodong/baoming', '发布名单', 'menu-icon fa fa-caret-right', '1', '1', '', '1', '2', '');

-- ----------------------------
-- Table structure for `qw_huodong_bm`
-- ----------------------------
DROP TABLE IF EXISTS `qw_huodong_bm`;
CREATE TABLE `qw_huodong_bm` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '程序小失物认领',
  `vid` int(11) NOT NULL,
  `openid` varchar(120) NOT NULL,
  `xingming` varchar(100) NOT NULL DEFAULT '0',
  `tels` varchar(20) NOT NULL,
  `contents` text COMMENT '品物描述',
  `lat` varchar(100) NOT NULL,
  `long` varchar(100) NOT NULL,
  `address` varchar(150) NOT NULL,
  `datetime` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=566 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of qw_huodong_bm
-- ----------------------------
INSERT INTO `qw_huodong_bm` VALUES ('565', '556', 'o9aLx0HjM6JApTFI6p0--awl0kKk', '哈哈', '18287328732', '123123', '37.87059', '112.548879', '山西省太原市杏花岭区新建路155号', '1505106140');

-- ----------------------------
-- Table structure for `qw_huodong_list`
-- ----------------------------
DROP TABLE IF EXISTS `qw_huodong_list`;
CREATE TABLE `qw_huodong_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '程序小失物认领',
  `openid` varchar(120) NOT NULL,
  `title` varchar(100) NOT NULL DEFAULT '0',
  `kdate` int(11) NOT NULL,
  `jdate` int(11) NOT NULL,
  `addres` varchar(150) NOT NULL,
  `photo` varchar(255) DEFAULT '0' COMMENT '品物图片',
  `content` text NOT NULL COMMENT '品物描述',
  `display` int(11) NOT NULL DEFAULT '0',
  `plnum` varchar(20) DEFAULT '0',
  `lat` varchar(100) NOT NULL,
  `long` varchar(100) NOT NULL,
  `address` varchar(150) NOT NULL,
  `datetime` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=557 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of qw_huodong_list
-- ----------------------------
INSERT INTO `qw_huodong_list` VALUES ('556', 'o9aLx0HjM6JApTFI6p0--awl0kKk', '231', '1504281600', '1504540800', '3123', 'Uploads/XcX/2017-09-11/59b618cd3d090.jpg', '123123123', '0', '0', '37.87059', '112.548879', '山西省太原市杏花岭区新建路155号', '1505106125');

-- ----------------------------
-- Table structure for `qw_huodong_user`
-- ----------------------------
DROP TABLE IF EXISTS `qw_huodong_user`;
CREATE TABLE `qw_huodong_user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(120) NOT NULL,
  `genDer` int(11) NOT NULL,
  `wxname` varchar(150) NOT NULL,
  `tel` varchar(11) NOT NULL,
  `headimgurl` text NOT NULL,
  `disuid` int(2) NOT NULL DEFAULT '0',
  `dateline` int(11) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qw_huodong_user
-- ----------------------------
INSERT INTO `qw_huodong_user` VALUES ('62', 'name', '1', 'X', '133000000', 'url', '0', '133000000');

-- ----------------------------
-- Table structure for `qw_member`
-- ----------------------------
DROP TABLE IF EXISTS `qw_member`;
CREATE TABLE `qw_member` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(120) DEFAULT NULL COMMENT '信微ID',
  `headimgurl` varchar(255) DEFAULT NULL COMMENT '信微头像',
  `user` varchar(225) NOT NULL,
  `head` varchar(255) DEFAULT NULL COMMENT '头像',
  `sex` tinyint(1) DEFAULT NULL COMMENT '0保密1男，2女',
  `birthday` int(10) DEFAULT NULL COMMENT '生日',
  `phone` varchar(20) NOT NULL COMMENT '电话',
  `qq` varchar(20) DEFAULT NULL COMMENT 'QQ',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `password` varchar(32) NOT NULL,
  `t` int(10) unsigned NOT NULL COMMENT '注册时间',
  `identifier` varchar(32) DEFAULT NULL,
  `token` varchar(32) DEFAULT NULL,
  `salt` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qw_member
-- ----------------------------
INSERT INTO `qw_member` VALUES ('1', '', '', 'admin', '/Public/attached/201601/1453389194.png', '1', '1420128000', '13800138000', '331349451', 'xieyanwei@qq.com', '0fa5933c7d220e1334ba99d6f751074c', '1490075084', 'e1b81579e1e3a50f411c73c32cd667ca', 'b45b0db54ab4293aaf3d12365cf78047', '77dAsR9z93');

-- ----------------------------
-- Table structure for `qw_setting`
-- ----------------------------
DROP TABLE IF EXISTS `qw_setting`;
CREATE TABLE `qw_setting` (
  `k` varchar(100) NOT NULL COMMENT '变量',
  `v` varchar(255) NOT NULL COMMENT '值',
  `type` tinyint(1) NOT NULL COMMENT '0系统，1自定义',
  `name` varchar(255) NOT NULL COMMENT '说明',
  PRIMARY KEY (`k`),
  KEY `k` (`k`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qw_setting
-- ----------------------------
INSERT INTO `qw_setting` VALUES ('sitename', '', '0', '');
INSERT INTO `qw_setting` VALUES ('title', '网站后台管理', '0', '');
INSERT INTO `qw_setting` VALUES ('keywords', '', '0', '');
INSERT INTO `qw_setting` VALUES ('description', '', '0', '');
INSERT INTO `qw_setting` VALUES ('footer', '', '0', '');
INSERT INTO `qw_setting` VALUES ('appID', 'appID', '1', 'appID');
INSERT INTO `qw_setting` VALUES ('appSecret', 'appSecret', '1', 'appSecret');
INSERT INTO `qw_setting` VALUES ('sms_name', 'sms_name', '1', '短信账号');
INSERT INTO `qw_setting` VALUES ('sms_pwd', 'sms_pwd', '1', '短信密码');

