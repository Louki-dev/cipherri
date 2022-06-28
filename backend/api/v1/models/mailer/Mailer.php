<?php

namespace api\v1\models\mailer;

use core\misc\Utilities;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


require_once "PHPMailer/PHPMailer.php";
require_once "PHPMailer/SMTP.php";
require_once "PHPMailer/Exception.php";

class Mailer
{
    public static function sendEmail($recipient, $code, $pin){
        
        // set defaults
        $name = "Cipherri";
        $body = "<p>Your authentication code is:</p>".'<b>'.$code.'</b><br><p>Personal Identification Number: <b>'.$pin.'</b></p>';
        $subject = "Authentication Code";
        $email = "cipherri2022@gmail.com";
        
        $mail = new PHPMailer();

        // smtp settings
        $mail->isSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = "cipherri2022@gmail.com";
        $mail->Password = "1qaz!QAZ2wsx@WSX";
        $mail->Port = "587";
        $mail->SMTPSecure = "tls";

        // email settings
        $mail->isHTML(true);
        $mail->setFrom($recipient, $name);
        $mail->addAddress($email);
        $mail->Subject = ("$subject");
        $mail->Body = $body;

        return Utilities::response($mail->Send() ? true: false, ["error" => "Something went wrong with the mailer."], null);


    }
   
}
