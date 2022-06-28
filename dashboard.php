<!-- include the header  -->
<?php require_once __DIR__ . "/include/header.inc.php"; ?>
<title>Cipherri - My Vault</title>
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
<?php require_once __DIR__ . "/include/content.inc.php"; ?>

<!-- Button Modals -->
<?php require_once __DIR__ . "/include/add-account.inc.php"; ?>
<?php require_once __DIR__ . "/include/pin-prompt.inc.php"; ?>
<?php require_once __DIR__ . "/include/view-account.inc.php"; ?>
<?php require_once __DIR__ . "/include/update-account.inc.php"; ?>


  
</body>
</html>