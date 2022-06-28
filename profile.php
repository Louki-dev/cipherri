<!-- include the header  -->
<?php require_once __DIR__ . "/include/header.inc.php"; ?>
<script src="<?php echo Domain::domain();?>/cipherri/js/defined/profile.js"></script>
<title>Cipherri - Profile</title>
</head>

<body class="base-background">
<div class="bg-preload_after hide" id="preloader-bg"></div>

  <!-- PRELOAD -->
  <div id="loader"></div> 
  <div class="progress my-0 base-primary z-index3 hide" id="preloader-signin">
      <div class="indeterminate base-primary_variant"></div>
  </div>

<!-- Navigaiton -->
<?php require_once __DIR__ . "/include/navigation.php"; ?>

<!-- Dashboard Content -->
<?php require_once __DIR__ . "/include/profile-content.inc.php"; ?>


  
</body>
</html>