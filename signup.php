<!-- include the header  -->
<?php require_once __DIR__ . "/include/index-header.inc.php"; ?>
<script src="<?php echo Domain::domain();?>/cipherri/js/defined/signup.js"></script>

<title>Cipherri - Sign Up</title>
</head>

<body class="base-background">
<div class="bg-preload_after hide" id="preloader-bg"></div>

  <!-- PRELOAD -->
  <!-- <div id="loader"></div>  -->
  <div class="progress my-0 base-primary hide z-index3" id="preloader-signin">
      <div class="indeterminate base-primary_variant"></div>
  </div>
  
<div class="container">

  <div class="mt-5">

  <!-- Sign Up Input Fields -->
  <div id="login-content" class="animate__animated animate__fadeIn">
    <div class="center-div left ml-2">
        <img src="/cipherri/img/cipherri.png" width="30">
        <h4 class="white-text index-title to-h ml-1" style=" font-size: 1.7rem;">Cipherri</h4>
    </div>
    <a class="white-text to-m mt-3 right mr-2" href="/cipherri/"><i class="bi bi-arrow-left"></i> Back</a>
  <div class="row">
    <form class="col s12 rounded base-background2 py-1">
    <span class="white-text to-m fs-1">Create your Account</span>
    <div class="row mt-3">
        <div class="input-field col s6">
            <input id="create-username" type="text" class="white-text">
            <label for="create-username">Username</label>
            <span class="helper-text white-text to-m" id="create-username_text">You can use letters, numbers & periods.</span>
            <span class="helper-text white-text to-m hide" id="create-username_error">Username must not be empty.</span>
        </div>
        <div class="input-field col s6">
            <input id="create-email" type="email" class="white-text">
            <label for="create-email">Email Address</label>
            <span class="helper-text white-text to-m hide" id="create-email_error">Use a valid email.</span>
            <span class="helper-text white-text to-m hide" id="create-email_error2">Email must not be empty.</span>
        </div>
    </div>
    <div class="row mt-3">
        <div class="input-field col s6">
            <input id="create-temp" type="password" class="white-text">
            <label for="create-temp">Master Password</label>
            <span class="helper-text white-text to-m " id="create-temp_error1">Use 8 or more characters with a mix of letters, numbers & symbols.</span>
            <span class="helper-text white-text to-m hide" id="create-temp_error2">Enter a strong password.</span>
        </div>
        <div class="input-field col s6">
            <input id="create-password" type="password" class="white-text">
            <label for="create-password">Confirm Password</label>
            <span class="helper-text white-text to-m hide" id="create-password_error1">Password does not match.</span>
        </div>
    </div>

    <!-- create btn -->
    <div class="row my-0">
      <div class="col left btn-flat to-m waves-effect"><span class="white-text" id="create-clear">Clear All</span></div>
      <div class="col s5 right">
        <a class="waves-effect center btn-flat rounded-custom flow-text z-depth-0 base-primary black-text s6" id="create-account_btn">Create</a>
      </div>
    </div>
    
    </form>
  </div>
  </div>


  </div>
  
</div>
  
</body>
</html>