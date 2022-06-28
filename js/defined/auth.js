(function () {
    
    $(document).ready(function (e) {

        //----------------------- KEYS UPS -----------------------//

        $(document).on("keyup", "#username", function (e) {
            const uname_check = $('#username').val();
            const uname = document.getElementById("username");
            const uname_error = document.getElementById("un-error");
            
            uname_check == '' ? uname.classList.add("invalid") & uname_error.classList.remove("hide") : uname.classList.remove("invalid") & uname.classList.add("valid") & uname_error.classList.add("hide");
        });

        $(document).on("keyup", "#password", function (e) {
            const pass_check = $('#password').val();
            const pass = document.getElementById("password");
            const pass_error = document.getElementById("pw-error");

            pass_check == '' ? pass.classList.add("invalid") & pass_error.classList.remove("hide") : pass.classList.remove("invalid") & pass.classList.add("valid") & pass_error.classList.add("hide");
        });

        $(document).on("keyup", "#vcode", function (e) {
            const vcode_check = $('#vcode').val();
            const vcod = document.getElementById("vcode");

            vcode_check == '' ? vcod.classList.add("invalid") : vcod.classList.remove("invalid") & vcod.classList.add("valid");
        });


        //----------------------- BUTTON VERIFICATION -----------------------//

        // Checks the credentials if exist or not
        $(document).on("click", "#login", function (e) {
            var user = CryptoJS.AES.encrypt(JSON.stringify($('#username').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            var pass = CryptoJS.AES.encrypt(JSON.stringify($('#password').val()), TheSecret, { format: CryptoJSAesJson }).toString();

            var data = {
                username: user,
                password: pass
            };


            if (data.password == '' && data.username == '') {
                document.getElementById("username").classList.add("invalid");
                document.getElementById("password").classList.add("invalid");
                document.getElementById("un-error").classList.remove("hide");
                document.getElementById("pw-error").classList.remove("hide");
                return;
            } else {
                document.getElementById("login").disabled = true;
                document.getElementById("login").classList.add("mouse-default");
                document.getElementById("preloader-signin").classList.remove("hide");
                $('#preloader-bg').removeClass("hide");
                login(data);

                // Resend verifiation code if not recieved via email
                $(document).on("click", "#resend", function (e) {
                    login(data);
                });
            }  
        });
        
        // Verifies the authentication code
        $(document).on("click", "#verify", function (e) {
            var code = CryptoJS.AES.encrypt(JSON.stringify($('#vcode').val()), TheSecret, { format: CryptoJSAesJson }).toString();

            var vcode_data = {
                vcode: code,
            };

            if (vcode_data.vcode == '') {
                M.toast({ html: 'Authentication code is required.', classes: 'base-background_error black-text' });
                document.getElementById("vcode").classList.add("invalid");
                return;
            } else {
                document.getElementById("verify").disabled = true;
                document.getElementById("verify").classList.add("mouse-default");
                document.getElementById("preloader-signin").classList.remove("hide");
                $('#preloader-bg').removeClass("hide");
                checkVcode(vcode_data);
            }
           
        });

        // logs the user out, remove the user from local storage and redirect back to login page
        $(document).on("click", '#logout', function () {
            document.getElementById("preloader-signin").classList.remove("hide");
            $('#preloader-bg').removeClass("hide");
            unsetLocalStorage(["user_id", "token"], function () {
                window.location.replace(redirect_login);
            });
        });
    
        // Redirects the user for sign up
        $(document).on("click", '#sign-up', function () {
            document.getElementById("preloader-signin").classList.remove("hide");
            $('#preloader-bg').removeClass("hide");
            window.location.replace(redirect_signup);
        });

    });




    //----------------------- FUNCTIONS USED -----------------------//

    function login(data) {
        ajaxRequest(data,
            {
                url: login_api,
                type: "GET",
                dataType: "json",
            },
            function (response_data) {
                if (response_data.status) {
                    document.getElementById("login-content").classList.add("hide");
                    document.getElementById("device_verification-content").classList.remove("hide");
                    document.getElementById("preloader-signin").classList.add("hide");
                    $('#preloader-bg').addClass("hide");
                } else {
                    document.getElementById("preloader-signin").classList.add("hide");
                    $('#preloader-bg').addClass("hide");
                    document.getElementById("login").disabled = false;
                    document.getElementById("login").classList.remove("mouse-default");
                    M.toast({ html: response_data.error.error, classes: 'base-background_error black-text'});
                    $('#password').val("");
                    document.getElementById("password").classList.add("invalid");
                    document.getElementById("pw-error").classList.remove("hide");

                    response_data.error.error == "Incorrect password." ? document.getElementById("username").classList.add("valid") : null;
                    response_data.error.error == "Cannot find your account." ? document.getElementById("username").classList.add("invalid") : null;
                }
            }
        );
    }

    function checkVcode(vcode_data) {
        ajaxRequest(vcode_data,
            {
                url: check_vcode,
                type: "GET",
                dataType: "json",
            },
            function (response_data) {
                if (response_data.status) {
                    setToLocalStorage(response_data.content, function () {
                        window.location.replace(redirect_dashboard);
                    });
                } else {
                    document.getElementById("verify").disabled = false;
                    document.getElementById("verify").classList.remove("mouse-default");
                    document.getElementById("preloader-signin").classList.add("hide");
                    $('#preloader-bg').addClass("hide");
                    M.toast({ html: response_data.error.error, classes: 'base-background_error black-text'});
                    document.getElementById("vcode").classList.add("invalid");

                    response_data.error.error == "Incorrect verification code" ? document.getElementById("vcode").classList.add("invalid") : null;
                }
            }
        );
    }


    
})();