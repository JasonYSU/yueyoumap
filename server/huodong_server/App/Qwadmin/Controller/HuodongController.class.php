<?php
/**
*
* 功能说明：文章控制器。
*
**/

namespace Qwadmin\Controller;
use Qwadmin\Controller\ComController;
use Vendor\Tree;

class HuodongController extends ComController {

	public function lists($p=1){

		$M = M('huodong_list');
		$p = intval($p)>0?$p:1;
		$pagesize = 15;量
		$offset = $pagesize*($p-1);
		$prefix = C('DB_PREFIX');
		$where['display'] = 0;
		$count = $M->where($where)->count();
		$list = $M->where($where)->join("{$prefix}huodong_user ON {$prefix}huodong_list.openid = {$prefix}huodong_user.openid")->order("{$prefix}huodong_list.id DESC")->limit($offset.','.$pagesize)->select();
		$page	=	new \Think\Page($count,$pagesize);
		$page = $page->show();
		$this->assign('page',$page);
		$this->assign('list',$list);
		$this -> display();
	}

	public function del(){

		$where['id'] = I('id');
		$art = M('huodong_list')->where($where)->find();
		if($art['photo'] != ''){
			unlink($_SERVER['DOCUMENT_ROOT'].'/'.$art['photo']);
		}
		if(M('huodong_list')->where($where)->delete()){
			$w['vid'] = I('id');
			M('huodong_bm')->where($w)->delete();
			$this->success('信息删除成功');
		}else{
			$this->error('参数错误');
		}
	}

	public function baoming(){
		$userList = M('huodong_user')->select();
		$this->assign('userList',$userList);
		$this -> display();
	}
	
	public function bmlist(){
		$M = M('huodong_bm');
		$prefix = C('DB_PREFIX');
		$userList = $M->where($where)->join("{$prefix}huodong_list ON {$prefix}huodong_bm.vid = {$prefix}huodong_list.id")->order("{$prefix}huodong_bm.id DESC")->select();
		$this->assign('userList',$userList);
		$this -> display();
	}
	

	
}
