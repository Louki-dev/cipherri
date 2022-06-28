(function () {
    
    $(document).ready(function (e) {

        //----------------------- KEYS UPS -----------------------//

        $(document).on("keyup", "#profile-username", function (e) {
            const cname_check = $('#profile-username').val();
            const cname = document.getElementById("profile-username");
            
            cname_check == '' ? cname.classList.add("invalid") : cname.classList.remove("invalid") & cname.classList.add("valid");
        });

        $(document).on("keyup", "#profile-email", function (e) {
            const cmail_check = $('#profile-email').val();
            const cmail = document.getElementById("profile-email");
            let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            res.test(cmail_check) == false ? cmail.classList.add("invalid") : cmail.classList.remove("invalid") & cmail.classList.add("valid");

            cmail_check == '' ? cmail.classList.add("invalid") : cmail.classList.add("valid");
        });

        $(document).on("keyup", "#profile-temp", function (e) {
            const ctemp_check = $('#profile-temp').val();
            const ctemp = document.getElementById("profile-temp");
            const check_temp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,255}$/;

            ctemp_check.length < 8 ? ctemp.classList.add("invalid") : ctemp.classList.remove("invalid");

            ctemp_check == '' ? ctemp.classList.add("invalid") : ctemp.classList.add("valid");
            
            ctemp_check.match(check_temp) ? ctemp.classList.add("valid") & ctemp.classList.remove("invalid") : ctemp.classList.add("invalid");
        });

        $(document).on("keyup", "#profile-password", function (e) {
            const cpass_check = $('#profile-password').val();
            const cpass = document.getElementById("profile-password");
            
            cpass_check == '' ? cpass.classList.add("invalid") : cpass.classList.remove("invalid") & cpass.classList.add("valid");

            
        });




        //----------------------- BUTTON SUBMIT-----------------------//

        // profile submit
        $(document).on("click", "#profile-account_btn", function (e) {
            var username = CryptoJS.AES.encrypt(JSON.stringify($('#profile-username').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            var email = CryptoJS.AES.encrypt(JSON.stringify($('#profile-email').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            var temp = CryptoJS.AES.encrypt(JSON.stringify($('#profile-temp').val()), TheSecret, { format: CryptoJSAesJson }).toString();
            var pass = CryptoJS.AES.encrypt(JSON.stringify($('#profile-password').val()), TheSecret, { format: CryptoJSAesJson }).toString();

            const check_temp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,255}$/; //strong pwd regex

            var data = {
                User: $('#current-userID').val(),
                Username: username,
                Email: email,
                New_Pwd: temp,
                Master_Pwd: pass,
            };
           
            // if there is a value
            if ($('#profile-temp').val() != '') {
                if ($('#profile-temp').val().match(check_temp)) {
                    $('#preloader-signin').removeClass("hide");
                    $('#preloader-bg').removeClass("hide");
                    $("#profile-account_btn").prop('disabled', true);
                    $('#profile-account_btn').addClass("mouse-default");
                    UpdateUser(data);
                    return;
                }
                else {
                    M.toast({ html: "Please input a strong password", classes: 'base-background_error black-text'});
                    return;
                }
            } else {
                // else no value
                $('#preloader-signin').removeClass("hide");
                $('#preloader-bg').removeClass("hide");
                $("#profile-account_btn").prop('disabled', true);
                $('#profile-account_btn').addClass("mouse-default");
                UpdateUser(data);
                return;
            }
            
        });
        


    });


    //----------------------- FUNCTIONS USED -----------------------//
    
    function UpdateUser(data) {
        ajaxRequest(data,
            {
                url: update_profile_api,
                type: "POST",
                headers: assignAuthHeader(),
                dataType: "json",
            },
            function (response_data) {
                if (response_data.status == true) {
                    M.toast({ html: "User profile successfully updated. Page will redirected in a moment.", classes: 'base-secondary black-text' });
    
                    setTimeout(function () {
                        window.location.replace(redirect_dashboard); 
                    }, 4000);
                } else {
                    document.getElementById("preloader-signin").classList.add("hide");
                    $('#preloader-bg').addClass("hide");
                    document.getElementById("profile-account_btn").disabled = false;
                    document.getElementById("profile-account_btn").classList.remove("mouse-default");
                    M.toast({ html: response_data.error.error, classes: 'base-background_error black-text'});

                    response_data.error.error == "Username must not be empty." ? document.getElementById("profile-username").classList.add("invalid"): null;
                    response_data.error.error == "Email must not be empty." ? document.getElementById("profile-email").classList.add("invalid") : null;

                }
            }
        );
    }

    
})();