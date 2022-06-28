<?php
namespace api\v1\controllers;

use api\v1\models\user\Tokenizer;


class Auth
{

    public function actionLogin()
    {
        return Tokenizer::login();
    }

    public function actionCheckToken()
    {
        return Tokenizer::checkToken();
    }

    public function actionCheckVcode()
    {
        return Tokenizer::checkVcode();
    }

    public function actionAddUser()
    {
        return Tokenizer::addUser();
    }

}
