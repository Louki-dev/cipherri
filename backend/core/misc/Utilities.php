<?php

namespace core\misc;

class Utilities extends \Exception
{

	public static function dd()
	{
		$output = array();

		foreach (func_get_args() as $arg) {
			array_push($output, $arg);
		}

		die(json_encode($output, JSON_PRETTY_PRINT));
	}
	public static function getCurrentDate($format = 'Y-m-d H:i:s')
	{
		return DATE($format);
	}

	public static function formatDate($date, $format)
	{
		return DATE($format, strtotime($date));
	}

	public static function randomizer($length, $type = Defaults::RAND_ALPHA_NUMERIC, $repeat = false)
	{
		$types = [
			Defaults::RAND_ALPHA_NUMERIC => implode('', array_merge(range('a', 'z'), range('A', 'Z'), range(0, 9))),
			Defaults::RAND_ALPHA => implode('', array_merge(range('a', 'z'), range('A', 'Z'))),
			Defaults::RAND_NUMERIC => implode('', range(0, 9)),
		];
		$chars = $types[$type];
		$max = strlen($chars) - 1;

		if (($repeat && $length > $max + 1) || $length < 0) {
			return self::responseWithException("Non repetitive random string can't be longer than charset");
		}

		$rand_chars = array();

		while ($length) {
			$picked = $chars[mt_rand(0, $max)];

			if ($repeat) {
				if (!array_key_exists($picked, $rand_chars)) {
					$rand_chars[$picked] = true;
					$length--;
				}
			} else {
				$rand_chars[] = $picked;
				$length--;
			}
		}

		return implode('', $repeat ? array_keys($rand_chars) : $rand_chars);
	}

	public static function response($status, $error = null, $content = null, $additional = [])
	{
		ob_end_flush();

		if (ob_get_contents()) ob_end_clean();

		die(json_encode([
			"status" => $status,
			"error" => $error,
			"content" =>  $content,
			"additional" => $additional
		], JSON_PRETTY_PRINT));
	}

	public static function responseWithException($error)
	{
		$error = is_object($error) ? $error : new \Exception($error);
		throw self::response(false, ['error' => $error->getMessage()], null);
	}

	public static function fetchRequiredDataFromArray($array, $key)
	{
		if (!empty($array[$key]) && isset($array[$key]) && $array[$key] != '') {
			return $array[$key];
		} else {
			return self::responseWithException("Required input must not be empty. (`$key`).");
		}
	}
	
	public static function fetchRequiredDataFromArrayAsArray($array, $key)
	{
		if (!empty($array[$key])) {
			return is_array($array[$key]) ? $array[$key] : json_decode($array[$key], 1);
		} else {
			return self::responseWithException("Unable to locate `$key`.");
		}
	}

	public static function fetchDataFromArrayAsArray($array, $key)
	{
		return json_decode($array[$key] ?? null, 1);
	}

	public static function fetchDataFromArray($array, $key)
	{
		//return as null coalesce
		return $array[$key] ?? null; 
	}

	public static function getHeaders()
	{
		return function_exists('apache_request_headers') ? apache_request_headers() : self::apache_request_headers_v2();
	}

	public static function apache_request_headers_v2()
	{
		$arh = array();
		$rx_http = '/\AHTTP_/';
		foreach ($_SERVER as $key => $val) {
			if (preg_match($rx_http, $key)) {
				$arh_key = preg_replace($rx_http, '', $key);
				$rx_matches = array();
				// do some nasty string manipulations to restore the original letter case
				// this should work in most cases
				$rx_matches = explode('_', $arh_key);

				if (count($rx_matches) > 0 and strlen($arh_key) > 2) {
					foreach ($rx_matches as $ak_key => $ak_val) $rx_matches[$ak_key] = ucfirst($ak_val);
					$arh_key = implode('-', $rx_matches);
				}

				$arh[strtolower($arh_key)] = $val;
			}
		}

		return ($arh);
	}

	public static function validateEmail($email)
	{
		$isValid = true;
		$atIndex = strrpos($email, "@");

		if (is_bool($atIndex) && !$atIndex) {
			$isValid = false;
		} else {
			$domain = substr($email, $atIndex + 1);
			$local = substr($email, 0, $atIndex);
			$localLen = strlen($local);
			$domainLen = strlen($domain);
			$domain_arr = explode(".", $domain);

			if ($localLen < 1 || $localLen > 64) {
				$isValid = false;
			} else if ($domainLen < 1 || $domainLen > 255) {
				$isValid = false;
			} else if ($local[0] == '.' || $local[$localLen - 1] == '.') {
				$isValid = false;
			} else if (preg_match('/\\.\\./', $local)) {
				$isValid = false;
			} else if (!preg_match('/^[A-z0-9\\+-\\.]+$/', $domain)) {
				$isValid = false;
			} else if (preg_match('/\\.\\./', $domain)) {
				$isValid = false;
			} else if (!preg_match('/^(\\\\.|[A-Za-z0-9!#%&`_=\\/$\'*+?^{}|~.-])+$/', str_replace("\\\\", "", $local))) {
				if (!preg_match('/^"(\\\\"|[^"])+"$/', str_replace("\\\\", "", $local))) {
					$isValid = false;
				}
			} else if (strrpos($domain, ".") === false) {
				$isValid = false;
			} else if (end($domain_arr) == NULL) {
				$isValid = false;
			}
		}

		return $isValid;
	}
}
