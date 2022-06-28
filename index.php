<!-- include the header  -->
<?php require_once __DIR__ . "/include/index-header.inc.php"; ?>
<title>Cipherri - Sign In</title>
</head>

<body class="base-background">
  <!-- PRELOAD -->
  <!-- <div id="loader"></div>  -->
  <div class="progress my-0 base-primary hide z-index3" id="preloader-signin">
      <div class="indeterminate base-primary_variant"></div>
  </div>
<div class="container">

  <div class="center-content center-align custom-content rounded py-1">
  <div class="bg-preload_after hide" id="preloader-bg"></div>


  <!-- Sign in -->
  <div id="login-content" class="animate__animated animate__fadeIn">
    <img src="/cipherri/img/cipherri.png" width="60">
    <h4 class="white-text index-title to-h" style="margin-top: 0; font-size: 3rem;">Cipherri</h4>
  <div class="row">
    <form class="col s12">
    <div class="row">
        <div class="input-field col s12">
        <input id="username" type="text" class="white-text to-h" >
        <label for="username">Username</label>
        <span class="helper-text base-error to-h left hide" id="un-error">Username must not be empty.</span>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s12">
        <input id="password" type="password" class="white-text to-h">
        <label for="password">Master Password</label>
        <span class="helper-text base-error to-h left hide" id="pw-error">Password must not be empty.</span>

        </div>
    </div>
    <a class="waves-effect waves-light btn rounded-custom flow-text z-depth-0 base-primary black-text btn-disabled" id="login" tabindex="-1">Log in</a>
    </form>
  </div>
    <p class="white-text fs-4 mt-4"><span class="to-m">New to Cipherri? </span><a class="white-text base-text1 text-hover mouse-pointer" id="sign-up"> Create an account.</a></p>
  </div>
  
  <!-- Auth -->
  <div id="device_verification-content" class="hide animate__animated animate__fadeIn">
    <img src="/cipherri/img/cipherri.png" width="60">
    <h4 class="white-text index-title to-h" style="margin-top: 0; font-size: 1.5rem;">2-Factor Authentication</h4>
    <div class="white-text rounded base-background2 py-2">
      <i class="bi bi-envelope fs-custom-1 to-m"></i>
      <p class="my-0 fs-1 fw-custom">Email</p>
      <p class="to-m">We just sent your authentication code to your email.</p>
      <div class="row mt-2">
      <p class="my-0 to-m">Authentication Code</p>
      <input type="text" id="vcode" class="white-text center fs-custom-icon input-text vcode-input" style="width: 60%;">
      <p><a class="waves-effect waves-light btn rounded-button flow-text z-depth-0 base-primary black-text mb-1 mt-3" id="verify" value="Verify" tabindex="-1">Verify</a></p>
      </div>
    </div>
    <div class="mt-5">
      <p class="white-text my-0"><span class="to-m">Having trouble verifying via email?</span><br><a class="white-text base-text1 text-hover mouse-pointer" id="resend">Re-send the authentication code.</a></p>
    </div>
  </div>

  </div>
  
</div>
  
</body>
</html>