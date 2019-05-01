<?php
/**
*
* 功能说明：文章控制器。
*
**/

namespace Qwadmin\Controller;
use Think\Controller;

class HuodController extends Controller {
	
	public function _initialize(){
		C(setting());
	}

	public function index(){
		$m = M('huodong_list');
		$p = I('page')?I('page'):0;
		$pagesize = I('page_size'); 
		$offset = $p*$pagesize; 
		$where['display'] = 0;
		$list = $m->join('LEFT JOIN qw_huodong_user ON qw_huodong_list.openid = qw_huodong_user.openid')->where($where)->order('qw_huodong_list.id DESC')->limit($offset.','.$pagesize)->select();
		$num = $m->where($where)->count();
		if($num != 0){
			if($list){
			   foreach($list as $key=>$value){
					 $list[$key]['datetime'] = date("m-d H:i", $value['datetime']);
					 $list[$key]['wxname'] = htmlspecialchars_decode($value['wxname']); 
			   }
			   echo json_encode($list);
			}else{
				echo '0';
			}
		}else{
			echo '0';
		}

	}

	public function view(){
		$map['id'] = I('id');
		$m = M('huodong_list');
		$list = $m->join('LEFT JOIN qw_huodong_user ON qw_huodong_list.openid = qw_huodong_user.openid')->where($map)->select();
		$where['vid'] = I('id');
		$gzlists = M('huodong_bm')->field('datetime,xingming,tels')->where($where)->order('datetime DESC')->limit(10)->select();
		if($list){
		   foreach($list as $key=>$value){
				 $list[$key]['datetime'] = date("m-d H:i", $value['datetime']);
				 $list[$key]['kdate'] = date("Y-m-d", $value['kdate']);
				 $list[$key]['jdate'] = date("Y-m-d", $value['jdate']);
				 $list[$key]['wxname'] = htmlspecialchars_decode($value['wxname']); 
		   }
		}
		if($gzlists){
		   foreach($gzlists as $key=>$value){
			  $gzlists[$key]['datetime'] = date("m-d", $value['datetime']);
			  $gzlists[$key]['tels'] = substr_replace($value['tels'], '****', 3, 4);
		   }
		}
		$lists = array_merge_recursive($list[0],array("gzlist"=>$gzlists));

		echo json_encode($lists);
	}
	
	public function baoMing(){
		$data['xingming'] = I('xingming');
		$data['vid'] = I('vid');
		$data['tels'] = I('tels');
		$data['contents'] = I('content');
		$data['openid'] = I('openid');
		$data['long'] = I('longitude');
		$data['lat'] = I('latitude');
		$data['address'] = I('address');
		$data['datetime'] = time();
		$aid = M('huodong_bm')->data($data)->add();
		if($aid){
			echo $aid;
		}else{
			echo $aid;
		}
	}

	public function delTxt(){
		$where['id'] = I('id');
		$data['display'] = 1;
		$op = M('huodong_list')->where($where)->save($data);
		if($op){
			echo 'ok';
		}else{
			echo 'no';
		}

	}

	public function userMore(){
		$map['openid'] = I('openid');
		$op = M('huodong_user')->where($map)->find();
		if(!$op){
			echo "0";
			exit;
		}
		$m = M('huodong_list');
		$where['openid'] = I('openid');
		$where['display'] = 0;
		$uList = $m->where($where)->order('id DESC')->select();
		if($uList){
			echo json_encode($uList);
		}else{
			echo "1";
		}

	}

	public function userChick(){
		$data['genDer'] = I('genDer');
		$data['wxname'] = I('nickName');
		$data['tel'] = I('tel');
		$data['headimgurl'] = I('avatarUrl');
		$data['openid'] = I('openid');
		$data['dateline'] = time();
		$data['disuid'] = 0;
		$where['openid'] = I('openid');
		$op = M('huodong_user')->where($where)->find();
		if($op){
			echo "1";
		}else{
			M('huodong_user')->data($data)->add();
			echo "2";
		}
	}

	public function seachUser(){
		$where['openid'] = I('openid');
		$op = M('huodong_user')->where($where)->find();
		if($op){
			echo '0';
		}else{
			echo '1';
		}
	}

	public function telCode(){
		$result = $this-> getRandomCheckCode();
		return $result;
	}

	public function msCode(){
		$uid = C('sms_name');
		$pwd = md5(C('sms_pwd'));
		$tel = I('tel');
		$telCodes = $this-> getRandomCheckCode();
		$message = '【活动报名】短信验证码为'.$telCodes;
		if($tel){
			$sendurl = "https://api.smsbao.com/sms?u=".$uid."&p=".$pwd."&m=".$tel."&c=".urlencode($message);
			$results = file_get_contents($sendurl);
			echo $telCodes;
		}else{
			echo '0';
		}
	}

	public function addData(){
		$data['title'] = I('title');
		$data['kdate'] = strtotime(I('kdate'));
		$data['jdate'] = strtotime(I('jdate'));
		$data['addres'] = I('addres');
		$data['photo'] = $this->upload();
		$data['content'] = I('content');
		$data['openid'] = I('openid');
		$data['plnum'] = 0;
		$data['long'] = I('longitude');
		$data['lat'] = I('latitude');
		$data['address'] = I('address');
		$data['datetime'] = time();
		$aid = M('huodong_list')->data($data)->add();
		if($aid){
			echo $aid;
		}else{
			echo $aid;
		}
	}

	public function upload(){

		if(IS_POST){
			$upload = new \Think\Upload();
			$upload->maxSize  =   3145728 ;
			$upload->exts   =   array('jpg', 'gif', 'png', 'jpeg');
			$upload->rootPath =   './Uploads/'; 
			$upload->savePath =   '/XcX/'; 
			$info  =  $upload->upload();
			if(!$info) {
				echo 'no';
			}else{
				$where['id'] = $_POST['pid'];
				$data['photo'] = 'Uploads/XcX/'.date("Y-m-d").'/'.$info['files']['savename'];
				if(M('huodong_list')->where($where)->save($data)) {
					echo '0';
				}else{
					echo '1';
				}
			}
		}
		//echo "ok----";
	}

	public function GetOpenid(){
		if (!isset($_GET['code'])){
			$baseUrl = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
			$url = $this->__CreateOauthUrlForCode($baseUrl);
			Header("Location: $url");
			exit();
		} else {
		    $code = $_GET['code'];
			$openid = $this->getOpenidFromMp($code);
			echo $openid;
		}
	}
	private function __CreateOauthUrlForCode($redirectUrl){
		$urlObj["appid"] = C('appID');
		$urlObj["redirect_uri"] = "$redirectUrl";
		$urlObj["response_type"] = "code";
		$urlObj["scope"] = "snsapi_base";
		$urlObj["state"] = "STATE"."#wechat_redirect";
		$bizString = $this->ToUrlParams($urlObj);
		return "https://open.weixin.qq.com/connect/oauth2/authorize?".$bizString;
	}
	private function ToUrlParams($urlObj){
		$buff = "";
		foreach ($urlObj as $k => $v){
			if($k != "sign"){
				$buff .= $k . "=" . $v . "&";
			}
		}
		$buff = trim($buff, "&");
		return $buff;
	}
	public function GetOpenidFromMp($code){
		$url = $this->__CreateOauthUrlForOpenid($code);
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_TIMEOUT, $this->curl_timeout);
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,FALSE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		$res = curl_exec($ch);
		curl_close($ch);
		$data = json_decode($res,true);
		$this->data = $data;
		$openid = $data['openid'];
		return $openid;
	}
	
	private function __CreateOauthUrlForOpenid($code){
		$urlObj["appid"] = C('appID');
		$urlObj["secret"] = C('appSecret');
		$urlObj["code"] = $code;
		$urlObj["grant_type"] = "authorization_code";
		$bizString = $this->ToUrlParams($urlObj);
		return "https://api.weixin.qq.com/sns/oauth2/access_token?".$bizString;
	}

	public function verify() {
		$config = array(
		'fontSize' => 10, 
		'length' => 5, 
		'useNoise' => false, 
		'codeSet'=>'0123456789',
		'useCurve'=> false,	
		);
		$verify = new \Think\Verify($config);
		$verify -> entry('wxreg');
	}

	function check_verify($code, $id = '') {
		$verify = new \Think\Verify();
		return $verify -> check($code, $id);
	}

 function getRandomCheckCode() {
     $chars = '0123456789';
     mt_srand((double)microtime()*1000000*getmypid());
     $CheckCode="";
     while(strlen($CheckCode)<5)
         $CheckCode.=substr($chars,(mt_rand()%strlen($chars)),1);
     return $CheckCode;
 }

}
