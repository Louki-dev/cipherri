<?php
namespace api\v1\controllers;

use api\v1\models\process\Process as modelProcess;
use core\misc\Database;
use core\misc\Defaults;
use core\misc\Utilities;

class Process
{
 
    public function __construct() 
    {
        $headers = Utilities::getHeaders();
        $authorization = '';
        $uid = '';
        
        foreach ($headers as $key => $valueHeader) {
            // $authorization = $key == 'Authorization' ? 'Authorization' : 'authorization';
            // $uid = $key == 'Userid' ? 'Userid' : 'userid'; //for hostinger
            $uid = $key == 'userid' ? 'userid' : 'Userid'; //for localhost

        }
                
		$auth = Utilities::fetchRequiredDataFromArray($headers, 'Authorization');
		$userId = Utilities::fetchRequiredDataFromArray($headers, $uid);

        $tokenObj = (new Database())->processQuery("SELECT * FROM token WHERE token_user_id = ? AND token_token = ?", [$userId, $auth]);
        
        if (empty($tokenObj)) {
            return Utilities::responseWithException(Defaults::ERROR_401);
        }
    }
 
    public function actionAddAccount()
    {
        return modelProcess::addAccount();
    }
    
    public function actionUpdateAccount()
    {
        return modelProcess::updateAccount();
    }

    public function actionDeleteAccount()
    {
        return modelProcess::deleteAccount();
    }

    public function actionGetAccount()
    {
        return modelProcess::getAccount();
    }

    public function actionGetAllItems()
    {
        return modelProcess::getAllItems();
    }

    public function actionGetSpecifiedAccount()
    {
        return modelProcess::getSpecifiedAccount();
    }

    public function actionUpdateProfile()
    {
        return modelProcess::updateProfile();
    }

}
