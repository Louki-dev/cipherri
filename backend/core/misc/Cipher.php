<?php

namespace core\misc;

use core\config\Env;

class Cipher extends Env
{
	private static $cipher = 'AES-128-CBC';
	private static $option = OPENSSL_RAW_DATA;
	private static $cipherKey;
	private static $cipherIv;

	public function __construct()
	{
		$env = (new Env())->getEnvFile();

		if (empty($env["KEY"])) {
			Utilities::responseWithException("Mising Encryption Key.");
		}

		if (empty($env["IV"])) {
			Utilities::responseWithException("Mising Illustration Vector.");
		}

		self::$cipherKey = $env['KEY'];
		self::$cipherIv = $env['IV'];
	}

	public static function encrypt($text)
	{
		return base64_encode(openssl_encrypt($text, self::$cipher, self::$cipherKey, self::$option, self::$cipherIv));
	}

	public static function decrypt($text)
	{
		return openssl_decrypt(base64_decode($text), self::$cipher, self::$cipherKey, self::$option, self::$cipherIv);
	}

}