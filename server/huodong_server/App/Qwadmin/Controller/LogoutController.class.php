<?php
/**
*
* ��Ȩ���У�ǡά����<qwadmin.qiawei.com>
* ��    �ߣ�����<hanchuan@qiawei.com>
* ��    �ڣ�2016-01-17
* ��    ����1.0.0
* ����˵������̨�ǳ���������
*
**/

namespace Qwadmin\Controller;
use Qwadmin\Controller\ComController;
class LogoutController extends ComController {
    public function index(){
		cookie('auth',null);
		$url = U("login/index");
		header("Location: {$url}");
		exit(0);
    }
}