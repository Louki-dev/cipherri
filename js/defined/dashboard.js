(function () {
    
    $(document).ready(function (e) {
        // checks the current user
        checkUser();
        
        //----------------------- KEYS UPS -----------------------//

        // keyup for Add
        $(document).on("keyup", "#add-app", function (e) {
            $('#add-app').val() == '' ? $('#add-app').addClass("invalid") &  $('#add-app_error').removeClass("hide") : $('#add-app').addClass("valid") & $('#add-app').removeClass("invalid") &  $('#add-app_error').addClass("hide"); 
        });

        $(document).on("keyup", "#add-username", function (e) {
            $('#add-username').val() == '' ? $('#add-username').addClass("invalid") &  $('#add-username_error').removeClass("hide") : $('#add-username').addClass("valid") & $('#add-username').removeClass("invalid") &  $('#add-username_error').addClass("hide"); 
        });
        $(document).on("keyup", "#add-password", function (e) {
            $('#add-password').val() == '' ? $('#add-password').addClass("invalid") &  $('#add-password_error').removeClass("hide") : $('#add-password').addClass("valid") & $('#add-password').removeClass("invalid") &  $('#add-password_error').addClass("hide"); 
        });
        $(document).on("keyup", "#add-email", function (e) {
            let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            res.test($('#add-email').val()) == false ? $('#add-email').addClass("invalid") &  $('#add-email_error2').removeClass("hide") : $('#add-email').addClass("valid") & $('#add-email').removeClass("invalid") & $('#add-email_error2').addClass("hide");

            $('#add-email').val() == '' ? $('#add-email').addClass("invalid") &  $('#add-email_error').removeClass("hide") & $('#add-email_error2').addClass("hide"): $('#add-email_error').addClass("hide"); 
        });

        // keyup for Update
        $(document).on("keyup", "#update-username", function (e) {
            $('#update-username').val() == '' ? $('#update-username').addClass("invalid") : $('#update-username').addClass("valid") & $('#update-username').removeClass("invalid"); 
        });
        $(document).on("keyup", "#update-password", function (e) {
            $('#update-password').val() == '' ? $('#update-password').addClass("invalid") : $('#update-password').addClass("valid") & $('#update-password').removeClass("invalid"); 
        });
        $(document).on("keyup", "#update-email", function (e) {
            let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            res.test($('#update-email').val()) == false ? $('#update-email').addClass("invalid") : $('#update-email').addClass("valid") & $('#update-email').removeClass("invalid");

            $('#update-email').val() == '' ? $('#update-email').addClass("invalid") : $('#update-email_error').addClass("hide"); 
        });


        //----------------------- BUTTON SUBMITION -----------------------//

        // ADD Submit 
        $(document).on("click", "#add-submit", function (e) {
            
            var username = CryptoJS.AES.encrypt(JSON.stringify($('#add-username').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            var application = CryptoJS.AES.encrypt(JSON.stringify($('#add-app').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            var email = CryptoJS.AES.encrypt(JSON.stringify($('#add-email').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            var password = CryptoJS.AES.encrypt(JSON.stringify($('#add-password').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            
            let apps = ["Facebook", "Discord", "Instagram", "Skype", "Twitter", "WhatsApp", "Vimeo"];
            var cat = $('#add-app').val() == apps[0] || $('#add-app').val() == apps[1] || $('#add-app').val() == apps[2] || $('#add-app').val() == apps[3] || $('#add-app').val() == apps[4] || $('#add-app').val() == apps[5] || $('#add-app').val() == apps[6] ? 2 : 1;

            var data = {
                user_id: $('#current-userID').val(),
                Application: application,
                Username: username,
                Email: email,
                Password: password,
                Category: cat,
            };

            if ($('#add-app').val() == '' || $('#add-username').val() == '' || $('#add-email').val() == '' || $('#add-password').val() == '') {
                let array_data = ["#add-app", "#add-username", "#add-email", "#add-password"];
                for (i = 0; i < array_data.length; i++) {
                    $(array_data[i]).hasClass("valid") ? null : $(array_data[i]).addClass("invalid");
                }
                return;
            }
         
            $("#add-submit").prop('disabled', true);
            $('#add-submit').addClass("mouse-default");
            $('#preloader-signin').removeClass("hide");
            $('#preloader-bg').removeClass("hide");
            addAccount(data);

        });

        // UPDATE Submit
        $(document).on("click", "#update-btn", function (e) {
            var username = CryptoJS.AES.encrypt(JSON.stringify($('#update-username').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            var email = CryptoJS.AES.encrypt(JSON.stringify($('#update-email').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            var password = CryptoJS.AES.encrypt(JSON.stringify($('#update-password').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            

            var data = {
                Account_id: $('#view_id').val(),
                Username: username,
                Email: email,
                Password: password,
            };

            if ($('#update-username').val() == '' || $('#update-email').val() == '' || $('#update-password').val() == '') {
                let array_data = ["#update-username", "#update-email", "#update-password"];
                for (i = 0; i < array_data.length; i++) {
                    $(array_data[i]).hasClass("valid") ? null : $(array_data[i]).addClass("invalid");
                }
                return;
            }
         
            $("#update-btn").prop('disabled', true);
            $('#update-btn').addClass("mouse-default");
            $('#preloader-signin').removeClass("hide");
            $('#preloader-bg').removeClass("hide");
            updateAccount(data);

        });

        // DELETE Submit
        $(document).on("click", "#verify-success_delete", function (e) {
            var aid = $('#view_id').val();
            
            $("#verify-success_delete").prop('disabled', true);
            $('#verify-success_delete').addClass("mouse-default");
            $('#preloader-signin').removeClass("hide");
            $('#preloader-bg').removeClass("hide");
            data = {Account_id: aid}
            deleteAccount(data);
        });

        


        //----------------------- VERIFIYING PINS -----------------------//

        // Verify PIN for VIEW
        $(document).on("click", "#verify-pin", function (e) {
            $('#preloader-signin').removeClass("hide");
            $('#preloader-bg').removeClass("hide");

            var aid = $('#view_id').val();
            var uid = $('#current-userID').val();
            var pin = CryptoJS.AES.encrypt(JSON.stringify($('#user_pin').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            ajaxRequest(
                {
                    Account: aid,
                    User: uid,
                    UserPIN: pin,
                },
                {
                    url: get_spec_account_api,
                    type: "GET",
                    headers: assignAuthHeader(),
                    dataType: "json",
                },
                function (response_data) {
                    if (response_data.status == true) {
                        if (response_data.content != null) {
                            if (response_data.content.account.length > 0) {
                                $('#preloader-signin').addClass("hide");
                                $('#preloader-bg').addClass("hide");
                                $('#verify-pin').addClass("hide");
                                $('#verify-success').removeClass("hide");
                                $('#user_pin').addClass("disabled");
                                $('#pin-icon1').addClass("hide");
                                $('#pin-icon2').removeClass("hide");
                                M.toast({ html: "Access granted", classes: 'base-secondary black-text'});
                                generateModalAccount("#account_content", response_data.content.account);
                                generatePassHide('#password-hid', response_data.content.account);

                                $(document).on("click", "#verify-success", function (e) {
                                    $('#user_pin').val("");
                                    $('#user_pin').removeClass("disabled");
                                    $('#pin-icon1').removeClass("hide");
                                    $('#pin-icon2').addClass("hide");
                                    $('#verify-success').addClass("hide");
                                    $('#verify-pin').removeClass("hide");

                                });
                            }
                        }
                    } else {
                        $('#preloader-signin').addClass("hide");
                        $('#preloader-bg').addClass("hide");
                        M.toast({ html: response_data.error.error, classes: 'base-background_error black-text'});
                    }
                }
            );

        });

        // Verify PIN for PASSW REVEAL
        $(document).on("click", "#verify-pin_pass", function (e) {
            $('#preloader-signin').removeClass("hide");
            $('#preloader-bg').removeClass("hide");

            var aid = $('#view_id').val();
            var uid = $('#current-userID').val();
            var pin = CryptoJS.AES.encrypt(JSON.stringify($('#user_pin-pass').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            ajaxRequest(
                {
                    Account: aid,
                    User: uid,
                    UserPIN: pin,
                },
                {
                    url: get_spec_account_api,
                    type: "GET",
                    headers: assignAuthHeader(),
                    dataType: "json",
                },
                function (response_data) {
                    if (response_data.status == true) {
                        if (response_data.content != null) {
                            if (response_data.content.account.length > 0) {
                                $('#preloader-signin').addClass("hide");
                                $('#preloader-bg').addClass("hide");
                                $('#verify-pin_pass').addClass("hide");
                                $('#verify-success2').removeClass("hide");
                                $('#user_pin-pass').addClass("disabled");
                                $('#pin-icon3').addClass("hide");
                                $('#pin-icon4').removeClass("hide");
                                M.toast({ html: "Access granted", classes: 'base-secondary black-text'});
                                generatePassUnhide("#password-hid", response_data.content.account);

                                $(document).on("click", "#verify-success2", function (e) {
                                    $('#user_pin-pass').val("");
                                    $('#user_pin-pass').removeClass("disabled");
                                    $('#pin-icon3').removeClass("hide");
                                    $('#pin-icon4').addClass("hide");
                                    $('#verify-success2').addClass("hide");
                                    $('#verify-pin_pass').removeClass("hide");
                                });
                            }
                        }
                    } else {
                        $('#preloader-signin').addClass("hide");
                        $('#preloader-bg').addClass("hide");
                        M.toast({ html: response_data.error.error, classes: 'base-background_error black-text'});
                    }
                }
            );

        });

        // Verify PIN for EDIT
        $(document).on("click", "#verify-pin_update", function (e) {
            $('#preloader-signin').removeClass("hide");
            $('#preloader-bg').removeClass("hide");

            var aid = $('#view_id').val();
            var uid = $('#current-userID').val();
            var pin = CryptoJS.AES.encrypt(JSON.stringify($('#user_pin_update').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            ajaxRequest(
                {
                    Account: aid,
                    User: uid,
                    UserPIN: pin,
                },
                {
                    url: get_spec_account_api,
                    type: "GET",
                    headers: assignAuthHeader(),
                    dataType: "json",
                },
                function (response_data) {
                    if (response_data.status == true) {
                        if (response_data.content != null) {
                            if (response_data.content.account.length > 0) {
                                $('#preloader-signin').addClass("hide");
                                $('#preloader-bg').addClass("hide");
                                $('#verify-pin_update').addClass("hide");
                                $('#verify-success_update').removeClass("hide");
                                $('#user_pin_update').addClass("disabled");
                                $('#pin-icon5').addClass("hide");
                                $('#pin-icon6').removeClass("hide");
                                M.toast({ html: "Access granted", classes: 'base-secondary black-text'});
                                generateUpdateAccount("#account_content_update", response_data.content.account);

                                $(document).on("click", "#verify-success_update", function (e) {
                                    $('#user_pin_update').val("");
                                    $('#user_pin_update').removeClass("disabled");
                                    $('#pin-icon5').removeClass("hide");
                                    $('#pin-icon6').addClass("hide");
                                    $('#verify-success_update').addClass("hide");
                                    $('#verify-pin_update').removeClass("hide");
                                });
                            }
                        }
                    } else {
                        $('#preloader-signin').addClass("hide");
                        $('#preloader-bg').addClass("hide");
                        M.toast({ html: response_data.error.error, classes: 'base-background_error black-text'});
                    }
                }
            );

        });

        // // Verify PIN for DELETE
        $(document).on("click", "#verify-pin_delete", function (e) {
            $('#preloader-signin').removeClass("hide");
            $('#preloader-bg').removeClass("hide");

            var aid = $('#view_id').val();
            var uid = $('#current-userID').val();
            var pin = CryptoJS.AES.encrypt(JSON.stringify($('#user_pin_delete').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            ajaxRequest(
                {
                    Account: aid,
                    User: uid,
                    UserPIN: pin,
                },
                {
                    url: get_spec_account_api,
                    type: "GET",
                    headers: assignAuthHeader(),
                    dataType: "json",
                },
                function (response_data) {
                    if (response_data.status == true) {
                        if (response_data.content != null) {
                            if (response_data.content.account.length > 0) {
                                $('#preloader-signin').addClass("hide");
                                $('#preloader-bg').addClass("hide");
                                $('#verify-pin_delete').addClass("hide");
                                $('#verify-success_delete').removeClass("hide");
                                $('#user_pin_delete').addClass("disabled");
                                $('#pin-icon7').addClass("hide");
                                $('#pin-icon8').removeClass("hide");
                                M.toast({ html: "Access granted", classes: 'base-secondary black-text' });
                                
                            }
                        }
                    } else {
                        $('#preloader-signin').addClass("hide");
                        $('#preloader-bg').addClass("hide");
                        M.toast({ html: response_data.error.error, classes: 'base-background_error black-text'});
                    }
                }
            );

        });

        //----------------------- SET ELEMENTS BACK TO DEFAULTS -----------------------//

        // Closing Modal buttons and Resets them
        $(document).on("click", "#view-account_close", function (e) {
            $('#verify-pin').removeClass("hide");
            $('#verify-success').addClass("hide");
            $('#verify-success2').addClass("hide");
            $('#verify-pin_pass').removeClass("hide");
        });
        $(document).on("click", "#update-account_close", function (e) {
            $('#verify-pin_update').removeClass("hide");
            $('#verify-success_update').addClass("hide");
        });
        $(document).on("click", "#pin-prompt_close", function (e) {
            $('#verify-pin').removeClass("hide");
            $('#verify-success').addClass("hide");
            $('#user_pin').val("");
            $('#user_pin').removeClass("disabled");
            $('#pin-icon1').removeClass("hide");
            $('#pin-icon2').addClass("hide");
            $('#verify-success2').addClass("hide");
            $('#verify-pin_pass').removeClass("hide");
        });
        $(document).on("click", "#pin-prompt_close2", function (e) {
            $('#verify-pin_pass').removeClass("hide");
            $('#verify-success2').addClass("hide");
            $('#user_pin-pass').val("");
            $('#user_pin-pass').removeClass("disabled");
            $('#pin-icon3').removeClass("hide");
            $('#pin-icon4').addClass("hide");
        });
        $(document).on("click", "#pin-prompt_close_update", function (e) {
            $('#verify-pin_update').removeClass("hide");
            $('#verify-success_update').addClass("hide");
            $('#user_pin_update').val("");
            $('#user_pin_update').removeClass("disabled");
            $('#pin-icon5').removeClass("hide");
            $('#pin-icon6').addClass("hide");
        });
        $(document).on("click", "#pin-prompt_close_delete", function (e) {
            $('#verify-pin_delete').removeClass("hide");
            $('#verify-success_delete').addClass("hide");
            $('#user_pin_delete').val("");
            $('#user_pin_delete').removeClass("disabled");
            $('#pin-icon7').removeClass("hide");
            $('#pin-icon8').addClass("hide");
        });
        $(document).on("click", "#pin-reprompt_btn", function (e) {
            $('#user_pin-pass').val("");
        });
        $(document).on("click", "#add-close", function (e) {
            let clear = ["app", "username", "email", "password"];

            for (i = 0; i < clear.length; i++){
                $('#add-' + clear[i]).hasClass("valid") || $('#add-' + clear[i]).hasClass("invalid") ? $('#add-' + clear[i]).removeClass("valid") & $('#add-' + clear[i]).removeClass("invalid") : null;
                $('#add-' + clear[i] + '_error').hasClass("hide") && $('#add-' + clear[i] + '_error2').hasClass("hide") ? null : $('#add-' + clear[i] + '_error').addClass("hide") & $('#add-' + clear[i] + '_error2').addClass("hide");
                $('#add-' + clear[i]).val("");
            }
        });


        // Redirect Page
        $(document).on("click", '#profile', function () {
            $('#preloader-signin').removeClass("hide");
            $('#preloader-bg').removeClass("hide");

            window.location.replace(redirect_profile);
  
        });

        $(document).on("click", '#vault', function () {
            $('#preloader-signin').removeClass("hide");
            $('#preloader-bg').removeClass("hide");

            window.location.replace(redirect_dashboard);
  
        });

        $(document).on("click", '#generate', function () {
            $('#preloader-signin').removeClass("hide");
            $('#preloader-bg').removeClass("hide");

            window.location.replace(redirect_generate);
  
        });


    });


})();