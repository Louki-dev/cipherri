(function () {
    
    $(document).ready(function (e) {

        //trigger generate password on click (desktop)
        $(document).on("click", "#slider", function (e) {
            generatePwd();
        });


        // slider for desktop
        $(document).on("mousemove", "#slider", function (e) {
            
            // indicates the password length
            if ($('#slider').val() > 0) {
                $('#pwd_length').html($('#slider').val());
            } else {
                $('#pwd_length').html("0");
                
            }
             
        });

        // slider for mobile
        $(document).on("touchmove", "#slider", function (e) {
            generatePwd();

            // indicates the password length
            if ($('#slider').val() > 0) {
                $('#pwd_length').html($('#slider').val());
            } else {
                $('#pwd_length').html("0");
            }
        });

        // copy the password on click
        $(document).on("click", "#copyPwd", function (e) {
            copyPassword();
        });

 
    });


    //----------------------- FUNCTIONS USED -----------------------//

    function generatePwd() {
        let complexity = $('#slider').val();
        let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        let lower = "abcdefghijklmnopqrstuvwxyz";
        let number = "1234567890";
        let symbol = "!@#$%^&*()_+";
        let values = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+";
        let password = "";

        let array = ["#upper", "#lower", "#number", "#symbol"];
        let type = [upper, lower, number, symbol]
        let empty = [];
        
        for (var i = 0; i <= complexity; i++){
            if ($(array[0]).prop("checked") == true) {
                var up = type[0].charAt(Math.floor(Math.random() * Math.floor(type[0].length - 1)));
                empty.push(up);
            } 
            if ($(array[1]).prop("checked") == true) {
                var low = password + type[1].charAt(Math.floor(Math.random() * Math.floor(type[1].length - 1)));
                empty.push(low);
            } 
            if ($(array[2]).prop("checked") == true) {
                var num = password + type[2].charAt(Math.floor(Math.random() * Math.floor(type[2].length - 1)));
                empty.push(num);
            } 
            if ($(array[3]).prop("checked") == true) {
                var sbl = password + type[3].charAt(Math.floor(Math.random() * Math.floor(type[3].length - 1)));
                empty.push(sbl);
            } 
            if ($(array[0]).prop("checked") == false && $(array[1]).prop("checked") == false && $(array[2]).prop("checked") == false && $(array[3]).prop("checked") == false) {
                var def = password + values.charAt(Math.floor(Math.random() * Math.floor(values.length - 1)));
                empty.push(def);
            }
        }
        password = empty.sort(() => Math.random() - .5).join('');

        // display generated password
        $('#display_pwd').val(password.slice(0, complexity));

        // let reglower = /^(?=.*?[a-z]).*$/;
        // let regupper = /^(?=.*?[A-Z]).*$/;
        // let regnumber = /^(?=.*?[0-9]).*$/;
        // let regsymbol = /^(?=.*?[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]).*$/;
        // let regall = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^a-zA-Z])(?=.*?[0-9])(?=.*?[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]).*$/;

        // password strength
        ($('#slider').val() > 0 ? $('#pwd_indicator').addClass("veryweak_pwd") : $('#pwd_indicator').removeClass("veryweak_pwd"));
        ($('#slider').val() > 6 ? $('#pwd_indicator').addClass("weak_pwd") & $('#pwd_indicator').removeClass("veryweak_pwd") : $('#pwd_indicator').removeClass("weak_pwd") );
        ($('#slider').val() > 8 ? $('#pwd_indicator').addClass("medium_pwd") & $('#pwd_indicator').removeClass("weak_pwd") : $('#pwd_indicator').removeClass("medium_pwd") );
        ($('#slider').val() > 9 ? $('#pwd_indicator').addClass("strong_pwd") & $('#pwd_indicator').removeClass("medium_pwd") : $('#pwd_indicator').removeClass("strong_pwd"));

    }

    function copyPassword() {
        const textarea = document.createElement('textarea');
        const password = $('#display_pwd').val();

        if (!password) {
            return;
        }
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();

        alert("Password copied to clipboard!");
    }
})();