<?php 

namespace api\v1\models\user;

use core\misc\Utilities;
use core\misc\Database;
use core\misc\Defaults;
use api\v1\models\mailer\Mailer;
use api\v1\models\process\Aes;


use mysqli;
use PDOStatement;

class Tokenizer {

    const SKEY = "UtMspn4Ywt7xUOI4";

    public static function addUser()
    {
        $userName = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_POST, 'Username'));
        $userEmail = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_POST, 'Email'));
        $userTemp = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_POST, 'Master_Password'));
        $userPass = Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_POST, 'Confirm_Password'));

        $checkuserName = (new Database())->processQuery("SELECT * FROM users WHERE `user_username` = ?", [$userName]);
        $checkuserEmail = (new Database())->processQuery("SELECT * FROM users WHERE `user_email` = ?", [$userEmail]);

        if (!empty($checkuserName)){
            return Utilities::response(false, ["error" => "Username is already exist."], null);  
        }
        if (!empty($checkuserEmail)){
            return Utilities::response(false, ["error" => "Email is already exist."], null);  
        }
        if(Utilities::validateEmail($userEmail) == false){
            return Utilities::response(false, ["error" => "Invalid email format."], null);  
        }
        if (strcasecmp($userTemp, $userPass) != 0){
            return Utilities::response(false, ["error" => "Password does not match."], null);  
        }
        else{
            $output = (new Database())->processQuery("INSERT INTO users (user_username, user_password, user_email) VALUES (?,?,?)", [$userName, md5($userPass), $userEmail]);
        }

        return Utilities::response(((!empty($output['response']) && $output['response'] == Defaults::SUCCESS) ? true : false), null, null);
    }

    public static function login(){
        $username = trim(Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchDataFromArray($_GET, 'username')));
        $password = md5(trim(Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchDataFromArray($_GET, 'password'))));
        $output = [];


        $checkuser = (new Database())->processQuery("SELECT * from users WHERE user_username = ?", [$username]);

        foreach ($checkuser as $user){
            $verify_pass = $user['user_password'];
            $verify_email = $user['user_email'];
        }
        if(!empty($checkuser)){

            $random = Utilities::randomizer(6);
            $pin = rand(1000, 600000);
            if ($verify_pass == $password){
                $vcode = (new Database())->processQuery("UPDATE users SET user_vcode = ?,  user_pin = ? WHERE user_username = ? AND user_password = ?" , [
                    $random,
                    $pin,
                    $username,
                    $user['user_password']
                ]);  

                // Mailer::sendEmail($verify_email, $random, $pin);
                return Utilities::response(true , null, $output);
            } else{
                return Utilities::response(false, ["error" => "Incorrect password."], null);
            }
            
        }else{
            return Utilities::response(false, ["error" => "Cannot find your account."], null);
        }
    }

    public static function checkVcode(){
        $vcode = trim(Aes::cryptoJsAesDecrypt(self::SKEY,Utilities::fetchRequiredDataFromArray($_GET, 'vcode')));
        $check_code = (new Database())->processQuery("SELECT * from users WHERE user_vcode = ?", [
            $vcode
        ]);

        if(!empty($check_code)){
            $userObj = reset($check_code);
            $userId = Utilities::fetchRequiredDataFromArray($userObj, 'user_id');
            $token = (new Database())->processQuery("SELECT * from token WHERE token_user_id = ?", [
                $userId
            ]);

            $random = Utilities::randomizer(255);
            if(empty($token)){
                $tk = (new Database())->processQuery("INSERT INTO token (token_user_id, token_token, token_created_at) VALUES (?, ?, now())", [
                    $userId,
                    $random
                ]);
            }else{
                $tk = (new Database())->processQuery("UPDATE token SET token_token = ?, token_updated_at = now() WHERE token_user_id = ?" , [
                    $random,
                    $userId
                ]);
            }
            // (new Database())->processQuery("UPDATE users SET user_status = ? WHERE `user_id` = ?" , [1,$userId]);

            return Utilities::response(true , null, ["token" => $random, "user_id" => $userId]);
        }else{
            return Utilities::response(false, ["error" => "Invalid verification code"], null);
        }
    }

    public static function checkToken(){
        $headers = Utilities::getHeaders();
        $authorization = Utilities::fetchRequiredDataFromArray($headers, "Authorization" );
        $userId = Utilities::fetchRequiredDataFromArray($headers, "Userid");

        $tokenObj = (new Database())->processQuery("Select * from token WHERE token_user_id =? AND token_token = ?", [
            $userId,
            $authorization
        ]);
        
        return Utilities::response(empty($tokenObj) ? false: true, null, null);
        
        // Utilities::dd($tokenObj);
    }

    
}