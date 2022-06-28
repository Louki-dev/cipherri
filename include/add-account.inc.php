<div class="fixed-action-btn z-index1">
  <a class="btn-floating btn-large modal-trigger" data-target="account-add">
  <i class="bi bi-plus-lg base-primary black-text"></i>
  </a>
</div>

<!-- Add Account Modal-->
<div id="account-add" class="modal rounded transparent modal-fixed-footer">
<div class="modal-content base-background2 white-text">
    <div class="center-div brand-logo left">
    <img src="/cipherri/img/cipherri.png" width="29" class="ml-2">
    <span class="white-text index-title fs-2 ml-1 to-h">Add Item</span>
    </div>
    <span class="right"><i class="bi bi-x-lg fs-1 to-h modal-close"></i></span>
    <br>
    <div class="row mt-4">
        <div class="input-field col s12">
            <input id="add-app" type="text" class="white-text autocomplete">
            <label for="add-app">Application *</label>
            <span class="helper-text white-text to-m hide" id="add-app_error">Application name is required.</span>
        </div>
        <div class="input-field col s12 mt-3">
            <input id="add-username" type="text" class="white-text">
            <label for="add-username">Username *</label>
            <span class="helper-text white-text to-m hide" id="add-username_error">Username is required.</span>
        </div>
        <div class="input-field col s12 mt-3">
            <input id="add-email" type="email" class="white-text">
            <label for="add-email">Email Address *</label>
            <span class="helper-text white-text to-m hide" id="add-email_error">Email is required.</span>
            <span class="helper-text white-text to-m hide" id="add-email_error2">Use a valid email.</span>
        </div>
        <div class="input-field col s12 mt-3">
            <input id="add-password" type="password" class="white-text">
            <label for="add-password">Password *</label>
            <span class="helper-text white-text to-m hide" id="add-password_error">Password is required.</span>
        </div>
    </div>
</div>
<div class="modal-footer base-background2">
    <a class="waves-effect btn-flat white-text to-m left" id="add-close">Clear All</a>
    <a class="waves-effect btn-flat base-text3" id="add-submit">Submit</a>
</div>
</div>