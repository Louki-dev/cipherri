<!-- PIN PROMPT Modal VIEW-->
<div id="pin-account" class="modal rounded transparent">
<div class="modal-content base-background2 white-text">
    <div class="center-div brand-logo left">
    <img src="/cipherri/img/cipherri.png" width="29" class="ml-2" title="Cipherri">
    <span class="white-text index-title fs-2 ml-1 to-h" id="account-title">Cipherri</span>
    </div>
    <span class="right" id="pin-prompt_close"><i class="bi bi-x-lg fs-1 to-h modal-close"></i></span>
    <br>
    <span id="pin-icon1" class=""><i class="bi bi-lock-fill center-div mt-5" style="font-size: 6rem;"></i></span>
    <span id="pin-icon2" class="hide"><i class="bi bi-unlock-fill center-div mt-5" style="font-size: 6rem;"></i></span>
    <h5 class="white-text to-m center mt-3">PIN Prompt</h5>
    <p class="to-m center">Please enter your PIN code</p>
    <div class="row mt-4 center-div my-0">
        <input type="password" class="white-text to-h center fs-custom-icon input-text" id="user_pin" style="width: 60%;" pattern="[0-9]*" inputmode="numeric">
    </div>
</div>
<div class="modal-footer base-background2">
    <a class="waves-effect btn-flat base-text3 modal-trigger hide modal-close" data-target="view-account" id="verify-success">Proceed</a>
    <a class="waves-effect btn-flat base-text3" id="verify-pin">Verify</a>
</div>
</div>


<!-- PIN REPROMPT Modal VIEW-->
<div id="pin-view_pass" class="modal rounded transparent">
<div class="modal-content base-background2 white-text">
    <div class="center-div brand-logo left">
    <img src="/cipherri/img/cipherri.png" width="29" class="ml-2" title="Cipherri">
    <span class="white-text index-title fs-2 ml-1 to-h" id="account-title">Cipherri</span>
    </div>
    <span class="right" id="pin-prompt_close2"><i class="bi bi-x-lg fs-1 to-h modal-close"></i></span>
    <br>
    <span id="pin-icon3" class=""><i class="bi bi-lock-fill center-div mt-5" style="font-size: 6rem;"></i></span>
    <span id="pin-icon4" class="hide"><i class="bi bi-unlock-fill center-div mt-5" style="font-size: 6rem;"></i></span>
    <h5 class="white-text to-m center mt-3">PIN Reprompt</h5>
    <p class="to-m center">Please enter your PIN code</p>
    <div class="row mt-4 center-div my-0">
        <input type="password" class="white-text to-h center fs-custom-icon input-text" id="user_pin-pass" style="width: 60%;" pattern="[0-9]*" inputmode="numeric">
    </div>
</div>
<div class="modal-footer base-background2">
    <a class="waves-effect btn-flat base-text3 modal-trigger hide modal-close" data-target="view-account" id="verify-success2">Proceed</a>
    <a class="waves-effect btn-flat base-text3" id="verify-pin_pass">Verify</a>
</div>
</div>



<!-- PIN PROMPT Modal UPDATE-->
<div id="pin-account_update" class="modal rounded transparent">
<div class="modal-content base-background2 white-text">
    <div class="center-div brand-logo left">
    <img src="/cipherri/img/cipherri.png" width="29" class="ml-2" title="Cipherri">
    <span class="white-text index-title fs-2 ml-1 to-h" id="account-title">Cipherri</span>
    </div>
    <span class="right" id="pin-prompt_close_update"><i class="bi bi-x-lg fs-1 to-h modal-close"></i></span>
    <br>
    <span id="pin-icon5" class=""><i class="bi bi-lock-fill center-div mt-5" style="font-size: 6rem;"></i></span>
    <span id="pin-icon6" class="hide"><i class="bi bi-unlock-fill center-div mt-5" style="font-size: 6rem;"></i></span>
    <h5 class="white-text to-m center mt-3">PIN Prompt</h5>
    <p class="to-m center">Please enter your PIN code</p>
    <div class="row mt-4 center-div my-0">
        <input type="password" class="white-text to-h center fs-custom-icon input-text" id="user_pin_update" style="width: 60%;" pattern="[0-9]*" inputmode="numeric">
    </div>
</div>
<div class="modal-footer base-background2">
    <a class="waves-effect btn-flat base-text3 modal-trigger hide modal-close" data-target="update-account" id="verify-success_update">Proceed</a>
    <a class="waves-effect btn-flat base-text3" id="verify-pin_update">Verify</a>
</div>
</div>


<!-- PIN PROMPT Modal DELETE-->
<div id="pin-account_delete" class="modal rounded transparent">
<div class="modal-content base-background2 white-text">
    <div class="center-div brand-logo left">
    <img src="/cipherri/img/cipherri.png" width="29" class="ml-2" title="Cipherri">
    <span class="white-text index-title fs-2 ml-1 to-h" id="account-title">Cipherri</span>
    </div>
    <span class="right" id="pin-prompt_close_delete"><i class="bi bi-x-lg fs-1 to-h modal-close"></i></span>
    <br>
    <span id="pin-icon7" class=""><i class="bi bi-lock-fill center-div mt-5" style="font-size: 6rem;"></i></span>
    <span id="pin-icon8" class="hide"><i class="bi bi-unlock-fill center-div mt-5" style="font-size: 6rem;"></i></span>
    <h5 class="white-text to-m center mt-3">PIN Prompt</h5>
    <p class="to-m center">Please enter your PIN code</p>
    <p class="white-text to-s center fw-lighter">Once you've deleted it, there's no going back.</p>

    <div class="row mt-3 center-div my-0">
        <input type="password" class="white-text to-h center fs-custom-icon input-text" id="user_pin_delete" style="width: 60%;" pattern="[0-9]*" inputmode="numeric">
    </div>
</div>
<div class="modal-footer base-background2">
    <a class="waves-effect btn-flat base-text3 modal-trigger hide" data-target="delete-account" id="verify-success_delete">Delete</a>
    <a class="waves-effect btn-flat base-text3" id="verify-pin_delete">Verify</a>
</div>
</div>