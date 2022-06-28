<?php

namespace api\v1\models\process;

use core\misc\Database;
use core\misc\Defaults;
use core\misc\Utilities;
use api\v1\models\process\Aes;


class Process
{
    const SKEY = "UtMspn4Ywt7xUOI4";

    public static function getAccount()
    {
        $userId = Utilities::fetchRequiredDataFromArray($_GET, 'user');
        
        $output = (new Database())->processQuery("SELECT `user_id`, user_username, user_email, user_pin FROM users WHERE `user_id` = ?", [$userId]);

        return Utilities::response(empty($output) ? false : true, null, ["user"=>$output]);
    }

    public static function getAllItems()
    {
        $userId = Utilities::fetchRequiredDataFromArray($_GET, 'user');
        $output = (new Database())->processQuery("SELECT * FROM accounts WHERE `account_user` = ? ORDER BY account_application", [$userId]);

        $cat = [];
        foreach($output as $category){
            $cat[$category['account_app_category']][] = $category;
        }
        return Utilities::response(empty($output) ? false : true, null, ['items'=>$output, 'category'=> $cat]);
    }

    public static function getSpecifiedAccount()
    {
        $accountId = Utilities::fetchRequiredDataFromArray($_GET, 'Account');
        $user = Utilities::fetchRequiredDataFromArray($_GET, 'User');
        $userPin = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_GET, 'UserPIN'));

        $verifyUser = (new Database())->processQuery("SELECT * FROM users WHERE `user_id` = ?", [$user]);
  
        foreach($verifyUser as $verified){
            $pin = $verified['user_pin'];
        }

        if ($userPin == ''){
            return Utilities::response(false, ["error" => "PIN is required. Try Again."], null);  
        }
        if (strcasecmp($userPin, $pin) != 0){
            return Utilities::response(false, ["error" => "Incorrect PIN. Try Again."], null);  
        }
        else{
            $output = (new Database())->processQuery("SELECT * FROM accounts WHERE `account_id` = ?", [$accountId]);

            return Utilities::response(empty($output) ? false : true, null, ["account"=>$output]);
        }
 
    }

    public static function addAccount()
    {
        $userId = Utilities::fetchRequiredDataFromArray($_POST, 'user_id');
        $userApp = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_POST, 'Application'));
        $userName = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_POST, 'Username'));
        $userEmail = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_POST, 'Email'));
        $userPass = Aes::cryptoJsAesDecrypt(self::SKEY, Utilities::fetchRequiredDataFromArray($_POST, 'Password'));
        $userCat = Utilities::fetchRequiredDataFromArray($_POST, 'Category');

        $checkAcc = (new Database())->processQuery("SELECT * FROM accounts WHERE account_user = ? AND account_application = ? AND account_username = ?", [$userId, $userApp, $userName]);

        if(!empty($checkAcc)){
            return Utilities::response(false, ["error" => "Account already existed."], null);
        }
        if($userApp == ''){
            return Utilities::response(false, ["error" => "Application name must not be empty."], null);
        }
        if($userName == ''){
            return Utilities::response(false, ["error" => "Username must not be empty."], null);
        }
        if($userEmail == ''){
            return Utilities::response(false, ["error" => "Email must not be empty."], null);
        }
        if($userPass == ''){
            return Utilities::response(false, ["error" => "Password must not be empty."], null);
        }
        if(Utilities::validateEmail($userEmail) == false){
            return Utilities::response(false, ["error" => "Invalid email format."], null);  
        }
        else{
            $output = (new Database())->processQuery("INSERT INTO accounts (account_user, account_application, account_username, account_email, account_password, account_app_category) VALUES (?,?,?,?,?,?)", [$userId, $userApp, $userName, $userEmail, $userPass, $userCat]);
        }

        return Utilities::response(((!empty($output['response']) && $output['response'] == Defaults::SUCCESS) ? true : false), null, null);
    }
   
    public static function updateAccount()
    {
        $accountId = Utilities::fetchRequiredDataFromArray($_POST, 'Account_id');
        $accountName = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_POST, 'Username'));
        $accountEmail = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_POST, 'Email'));
        $accountPass = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_POST, 'Password'));

        $checkAcc = (new Database())->processQuery("SELECT * FROM accounts WHERE account_id = ?", [$accountId]);

        if(empty($checkAcc)){
            return Utilities::response(false, ["error" => "Account does not exist."], null);
        }
        if($accountName == ''){
            return Utilities::response(false, ["error" => "Username must not be empty."], null);
        }
        if($accountEmail == ''){
            return Utilities::response(false, ["error" => "Email must not be empty."], null);
        }
        if($accountPass == ''){
            return Utilities::response(false, ["error" => "Password must not be empty."], null);
        }
        if(Utilities::validateEmail($accountEmail) == false){
            return Utilities::response(false, ["error" => "Invalid email format."], null);  
        }else{
            $output = (new Database())->processQuery("UPDATE accounts SET account_username = ?, account_email = ?, account_password = ? WHERE account_id = ?" , [$accountName, $accountEmail, $accountPass, $accountId]);  
        }

        return Utilities::response(((!empty($output['response']) && $output['response'] == Defaults::SUCCESS) ? true : false), null, null);
    }

    public static function deleteAccount()
    {
        $userId = Utilities::fetchRequiredDataFromArray($_POST, 'Account_id');

        $output = (new Database())->processQuery("DELETE FROM accounts WHERE account_id = ?", [$userId]);

        return Utilities::response(((!empty($output['response']) && $output['response'] == Defaults::SUCCESS) ? true : false), null, null);
    }

    public static function updateProfile()
    {
        $userId = Utilities::fetchRequiredDataFromArray($_POST, 'User');
        $userName = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_POST, 'Username'));
        $userEmail = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_POST, 'Email'));
        $userTmp = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchDataFromArray($_POST, 'New_Pwd'));
        $userPwd = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_POST, 'Master_Pwd'));

        $checkUser = (new Database())->processQuery("SELECT * FROM users WHERE `user_id` = ?", [$userId]);
        foreach($checkUser as $verified){
            $pwd = $verified['user_password'];
        }
        if($userName == ''){
            return Utilities::response(false, ["error" => "Username must not be empty."], null);
        }
        if($userEmail == ''){
            return Utilities::response(false, ["error" => "Email must not be empty."], null);
        }
        if($userPwd == ''){
            return Utilities::response(false, ["error" => "Master Password must not be empty."], null);
        }
        if(Utilities::validateEmail($userEmail) == false){
            return Utilities::response(false, ["error" => "Invalid email format."], null);  
        }
        if (md5($userPwd) !== $pwd){
            return Utilities::response(false, ["error" => "Invalid Master Password!"], null);
        }
        if (strcasecmp($userTmp, $userPwd) == 0){
            return Utilities::response(false, ["error" => "Your new password is already exist."], null);
        }
        if($userTmp == ''){
            $output = (new Database())->processQuery("UPDATE users SET user_username = ?, user_email = ? WHERE `user_id` = ?" , [$userName, $userEmail, $userId]);  
        }
        else{
            $output = (new Database())->processQuery("UPDATE users SET user_username = ?, user_email = ?, user_password = md5(?) WHERE `user_id` = ?" , [$userName, $userEmail, $userTmp, $userId]); 
        }

        return Utilities::response(((!empty($output['response']) && $output['response'] == Defaults::SUCCESS) ? true : false), null, null);
    }
}
