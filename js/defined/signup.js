(function () {
    
    $(document).ready(function (e) {

        //----------------------- KEYS UPS -----------------------//

        $(document).on("keyup", "#create-username", function (e) {
            const cname_check = $('#create-username').val();
            const cname = document.getElementById("create-username");
            const cname_text = document.getElementById("create-username_text");
            const cname_error = document.getElementById("create-username_error");
            
            cname_check == '' ? cname.classList.add("invalid") & cname_error.classList.remove("hide") & cname_text.classList.add("hide") : cname.classList.remove("invalid") & cname.classList.add("valid") & cname_text.classList.add("hide") & cname_error.classList.add("hide");
        });

        $(document).on("keyup", "#create-email", function (e) {
            const cmail_check = $('#create-email').val();
            const cmail = document.getElementById("create-email");
            const cmail_error = document.getElementById("create-email_error");
            const cmail_error2 = document.getElementById("create-email_error2");
            let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            res.test(cmail_check) == false ? cmail.classList.add("invalid") & cmail_error.classList.remove("hide") : cmail_error.classList.add("hide") & cmail.classList.remove("invalid") & cmail.classList.add("valid");

            cmail_check == '' ? cmail.classList.add("invalid") & cmail_error2.classList.remove("hide") & cmail_error.classList.add("hide") : cmail.classList.add("valid") & cmail_error2.classList.add("hide");
        });

        $(document).on("keyup", "#create-temp", function (e) {
            const ctemp_check = $('#create-temp').val();
            const ctemp = document.getElementById("create-temp");
            const ctemp_error1 = document.getElementById("create-temp_error1");
            const ctemp_error2 = document.getElementById("create-temp_error2");
            const check_temp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,255}$/;
            const ctemp_errorText1 = "Use 8 or more characters with a mix of letters, numbers & symbols.";
            const ctemp_errorText3 = "Password must not be empty.";
            
            ctemp_check.length < 8 ? ctemp.classList.add("invalid") & ctemp_error1.classList.remove("hide") : ctemp.classList.remove("invalid") & ctemp_error1.classList.add("hide");
            ctemp_check.length < 8 ? ctemp_error2.classList.add("hide") : ctemp_error2.classList.remove("hide");
            
            ctemp_check == '' ? ctemp_error1.innerHTML = ctemp_errorText3 : ctemp_error1.innerHTML = ctemp_errorText1;
            ctemp_check == '' ? ctemp_error2.classList.add("hide") : "";
            
            ctemp_check.match(check_temp) ? ctemp.classList.add("valid") & ctemp.classList.remove("invalid") & ctemp_error2.classList.add("hide") : ctemp.classList.add("invalid");
            
        });

        $(document).on("keyup", "#create-password", function (e) {
            const cpass_check = $('#create-password').val();
            const ctemp_check = $('#create-temp').val();
            const cpass = document.getElementById("create-password");
            const cpass_error1 = document.getElementById("create-password_error1");
            const cpass_errorText1 = "Confirm password must not be empty.";
            const cpass_errorText2 = "Password does not match.";
            
            cpass_check == '' ? cpass.classList.add("invalid") & cpass_error1.classList.remove("hide") : cpass.classList.remove("invalid") & cpass.classList.add("valid") & cpass_error1.classList.add("hide");
            cpass_check == '' ? cpass_error1.innerHTML = cpass_errorText1 : cpass_check != ctemp_check ? cpass_error1.innerHTML = cpass_errorText2 : "";

            cpass_check != ctemp_check ? cpass_error1.classList.remove("hide") & cpass.classList.add("invalid") : "";
            
        });




        //----------------------- BUTTON SUBMITION -----------------------//

        // CREATE submit
        $(document).on("click", "#create-account_btn", function (e) {
            var username = CryptoJS.AES.encrypt(JSON.stringify($('#create-username').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            var email = CryptoJS.AES.encrypt(JSON.stringify($('#create-email').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            var temp = CryptoJS.AES.encrypt(JSON.stringify($('#create-temp').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            var pass = CryptoJS.AES.encrypt(JSON.stringify($('#create-password').val()), TheSecret, { format: CryptoJSAesJson }).toString();

            var data = {
                Username: username,
                Email: email,
                Master_Password: temp,
                Confirm_Password: pass,
            };

            if ($('#create-username').val() == '' || $('#create-email').val() == '' || $('#create-temp').val() == '' || $('#create-password').val() == '') {
                let array_data = ["username", "email", "temp", "password"];
                for (i = 0; i < array_data.length; i++){
                    document.getElementById("create-" + array_data[i]).classList.contains("valid") ? null : document.getElementById("create-" + array_data[i]).classList.add("invalid"); 
                }
                return;
            }
            $('#preloader-signin').removeClass("hide");
            $('#preloader-bg').removeClass("hide");
            $("#create-account_btn").prop('disabled', true);
            $('#create-account_btn').addClass("mouse-default");
            signupUser(data);
            
    
        });
        


        //----------------------- SET BACK TO DEFAULT -----------------------//

        // Clears all the input fields
        $(document).on("click", "#create-clear", function (e) {
            let ids = ["username", "email", "temp", "password"];
            let ids_text = ["create-temp_error2", "create-password_error1", "create-username_error", 'create-email_error2', "create-email_error"];
            for (i = 0; i < ids.length; i++){
                document.getElementById("create-" + ids[i]).classList.contains("valid") || document.getElementById("create-" + ids[i]).classList.contains("invalid") ? document.getElementById("create-" + ids[i]).classList.remove("valid", "invalid") : null; 

                $('#create-' + ids[i]).val("");
            }

            for (ii = 0; ii < ids_text.length; ii++){
                document.getElementById(ids_text[ii]).classList.add("hide");
            }
            document.getElementById("create-username_text").classList.remove("hide");
            document.getElementById("create-temp_error1").classList.remove("hide");
            document.getElementById("create-temp_error1").innerHTML = "Use 8 or more characters with a mix of letters, numbers & symbols.";
        });

    });


    //----------------------- FUNCTIONS USED -----------------------//
    
    // POST request for CREATE user
    function signupUser(data) {
        ajaxRequest(data,
            {
                url: add_user_api,
                type: "POST",
                dataType: "json",
            },
            function (response_data) {
                if (response_data.status == true) {
                    window.location.replace(redirect_login); 
                } else {
                    document.getElementById("preloader-signin").classList.add("hide");
                    $('#preloader-bg').addClass("hide");
                    document.getElementById("create-account_btn").disabled = false;
                    document.getElementById("create-account_btn").classList.remove("mouse-default");
                    M.toast({ html: response_data.error.error, classes: 'base-background_error black-text'});

                    response_data.error.error == "Username is already exist." ? document.getElementById("create-username").classList.add("invalid"): null;
                    response_data.error.error == "Email is already exist." ? document.getElementById("create-email").classList.add("invalid") : null;

                }
            }
        );
    }
    
})();