//----------------------- FUNCTIONS USED -----------------------//


// AJAX request to the server
function ajaxRequest(payload = null, options = null, callback, errocallback = null) {
    try {
        var defaults = {
            type: "POST",
            cache: false,
            async: true,
            processData: true,
        };

        var object = {
            data: payload,
            dataType: "json",
            success: function (response) {
                if (response.error != null) {
                    if (response.error.error == "401! Unauthorized Access.") {
                        window.location.replace(redirect_login);//("/")
                    }
                }

                callback(response);
            },

            error: function (response) {
                if (errocallback) {
                    errocallback(response);
                }
            }
        };

        var ajaxRequest = Object.assign({}, object, defaults, options);

        return $.ajax(ajaxRequest);

    } catch (e) {
        alert(e);
    }

    return true;
}

// SET or SAVE the user to the local storage
function setToLocalStorage($object, callback = null) {
    for (var $key in $object) {
        if (typeof localStorage.getItem($key) != "undefined") {
            localStorage.removeItem($key);
        }

        localStorage.setItem($key, $object[$key]);

    }

    if (callback != null) {
        callback();
    }

    return true;
}

// UNSET or REMOVE the user from the local storage
function unsetLocalStorage($unsetKey, callback = null) {
    for (var i = 0; i < $unsetKey.length; i++) {
        localStorage.removeItem($unsetKey[i]);
    }

    if (callback != null) {
        callback();
    }
}

// Assign payload for user request
function assignAuthHeader($object = getToLocalStorage(['user_id', 'token'])) {
    var output = {
        Authorization: "no-code",
        Userid: "no-id"
    };

    for (var key in $object) {
        if (localStorage.getItem(key) == null
            || typeof localStorage.getItem(key) == 'undefined') {
            return null;
        }

        switch (key) {
            case 'token':
                output.Authorization = localStorage.getItem(key);
                break;
            case 'user_id':
                output.Userid = localStorage.getItem(key);

                break;
        }
    }

    return output;
}

// GETS the data from the local storage
function getToLocalStorage($obj) {
    var output = {};

    for (var i = 0; i < $obj.length; i++) {
        if (localStorage.getItem($obj[i]) == null
            || typeof localStorage.getItem($obj[i]) == "undefined") {
            return null;
        }
        output[$obj[i]] = localStorage.getItem($obj[i]);
    }

    return output;
}

// HIDES or CHANGE your email to asterisk ****@domain.com
const obscureEmail = (email) => {
    const [name, domain] = email.split('@');
    return `${name[0]}${new Array(name.length).join('*')}@${domain}`;
};
  


// Gets the current user ID
function checkUser() {
    var object = getToLocalStorage(['user_id']);
    var output = {
        user: "no-id"
    };
    for (var key in object) {
        if (localStorage.getItem(key) == null
            || typeof localStorage.getItem(key) == 'undefined') {
            return null;
        }

        switch (key) {
            case 'user_id':
                output.user = localStorage.getItem(key);

                break;
        }
    }
    getUser(output);
    getItems(output);
}

// Display the current user 
function getUser(data) {
    ajaxRequest(data,
        {
            url: get_user_api,
            type: "GET",
            headers: assignAuthHeader(),
            dataType: "json",
        },
        function (response_data) {
            if (response_data.status) {
                if (response_data.content != null) {
                    if (response_data.content.user.length > 0) {
                        generateUser('#current_user', response_data.content.user);
                        generateUserImg('#profile-img', response_data.content.user);
                        generateUserProfile('#profile-inputs', response_data.content.user);
                    }

                }
            } else {
                // window.location.replace(redirect_login);
            }
        }
    );
}


// Display the items from the user
function getItems(data) {
    generateEmptyTemplate('#all_items');
    generateEmptyTemplate('#all_socials');
    generateEmptyTemplate('#all_others');

    ajaxRequest(data,
        {
            url: get_items_api,
            type: "GET",
            headers: assignAuthHeader(),
            dataType: "json", 
        },
        function (response_data) {
            if (response_data.status) {
                if (response_data.content != null) {
                    // all items
                    if (response_data.content.items.length > 0) {
                        $('#items-paginate').pagination({
                            dataSource: response_data.content.items,
                            pageSize: 6,
                            showPageNumbers: false,
                            showNavigator: true,
                            callback: function (data, pagination) {
                                generateItems('#all_items', data);
                            }
                        });
                    }
                    // others
                    if (response_data.content.category[1].length > 0) {
                        $('#others-paginate').pagination({
                            dataSource: response_data.content.category[1],
                            pageSize: 6,
                            showPageNumbers: false,
                            showNavigator: true,
                            callback: function (data, pagination) {
                                generateItems('#all_others', data);
                            }
                        });
                    }
                    // social
                    if (response_data.content.category[2].length > 0) {
                        $('#socials-paginate').pagination({
                            dataSource: response_data.content.category[2],
                            pageSize: 6,
                            showPageNumbers: false,
                            showNavigator: true,
                            callback: function (data, pagination) {
                                generateItems('#all_socials', data);
                            }
                        });
                    }
                }
            } else {
                // window.location.replace(redirect_login);
            }
        }
    );
}


// Displays the current user in the side Navigation
function generateUser($elem, $content) {
    $($elem).empty(); //empty the data first before adding or append to avoid replication

    for (var num = 0; num < $content.length; num++) {
        // place the data from content users
        $html = [
            '<a><div class="user_profile-img to-h mouse-default">'+$content[num].user_username.charAt(0)+'</div></a>',
            '<a><span class="white-text name to-h trans_upper">'+$content[num].user_username+' <small class="to-m">#0'+$content[num].user_pin+'</small></span></a>',
            '<a><span class="white-text email to-h">'+$content[num].user_email+'</span></a>',
            '<input type="text" class="hide" value='+$content[num].user_id+' id="current-userID">',
        ]
        $($elem).append($html.join("")); //returns an array as a string and append it to the element
    }

}

// Displays the user profile in dashboard
function generateUserImg($elem, $content) {
    $($elem).empty(); 

    for (var num = 0; num < $content.length; num++) {
        $html = [
            '<div class="user_profile-img2 to-h mouse-pointer">'+$content[num].user_username.charAt(0)+'</div>',
        ]
        $($elem).append($html.join("")); 
    }

}


// Displays the items from the dashboard
function generateItems($elem, $content) {
    $($elem).empty(); 

    for (var num = 0; num < $content.length; num++) {
        $html = [
            '<div class="col s12">',
                '<a class="modal-trigger" data-target="item-modal-div" id="account'+$content[num].account_id+'" data-id="'+$content[num].account_id+'"><div class="py-3 base-background2 rounded-custom white-text mt-2 mouse-pointer white_text-bg_hover"><i class="bi bi-'+($content[num].account_application.match(icons[0].app) || $content[num].account_application.match(icons[1].app) || $content[num].account_application.match(icons[2].app) || $content[num].account_application.match(icons[3].app) || $content[num].account_application.match(icons[4].app) || $content[num].account_application.match(icons[5].app) || $content[num].account_application.match(icons[6].app)  || $content[num].account_application.match(icons[7].app) || $content[num].account_application.match(icons[8].app) || $content[num].account_application.match(icons[9].app) || $content[num].account_application.match(icons[10].app) || $content[num].account_application.match(icons[11].app)  || $content[num].account_application.match(icons[12].app) || $content[num].account_application.match(icons[13].app) ? $content[num].account_application.toLowerCase() : 'question-circle')+' left to-h flow-text ml-2"></i><p class="center-div truncate to-m flow-text">'+$content[num].account_username+'</p></div></a>',
            '</div>',
        ]
        $($elem).append($html.join("")); 
        
        $(document).on("click", "#account"+$content[num].account_id, function (e) {
            e.preventDefault();
            var account_id = $(e.currentTarget).attr('data-id');
            $('#view_id').val(account_id);
        });
    }

}


// POST Request from ADD submit
function addAccount(data) {
    ajaxRequest(data,
        {
            url: add_account_api,
            type: "POST",
            headers: assignAuthHeader(),
            dataType: "json",
        },
        function (response_data) {
            if (response_data.status == true) {
                window.location.replace(redirect_dashboard);
            } else {
                $('#preloader-signin').addClass("hide");
                $('#add-submit').removeClass("mouse-default");
                $("#add-submit").prop('disabled', false);
                M.toast({ html: response_data.error.error, classes: 'base-background_error black-text'});
            }
        }
    );
}

// POST Request from UPDATE submit
function updateAccount(data) {
    ajaxRequest(data,
        {
            url: update_account_api,
            type: "POST",
            headers: assignAuthHeader(),
            dataType: "json",
        },
        function (response_data) {
            if (response_data.status == true) {
                window.location.replace(redirect_dashboard);
            } else {
                $('#preloader-signin').addClass("hide");
                $('#update-btn').removeClass("mouse-default");
                $("#update-btn").prop('disabled', false);
                M.toast({ html: response_data.error.error, classes: 'base-background_error black-text' });
                
            }
        }
    );
}

// POST Request from DELETE submit
function deleteAccount(data) {
    ajaxRequest(data,
        {
            url: delete_account_api,
            type: "POST",
            headers: assignAuthHeader(),
            dataType: "json",
        },
        function (response_data) {
            if (response_data.status == true) {
                window.location.replace(redirect_dashboard);
            } else {
                $('#preloader-signin').addClass("hide");
                $('#verify-success_delete').removeClass("mouse-default");
                $("#verify-success_delete").prop('disabled', false);
                M.toast({ html: response_data.error.error, classes: 'base-background_error black-text' });
                
            }
        }
    );
}

// Displays the specified Item
function generateModalAccount($elem, $content) {
    $($elem).empty(); 
    for (var num = 0; num < $content.length; num++) {

        $html = [     
            '<i class="bi bi-'+($content[num].account_application.match(icons[0].app) || $content[num].account_application.match(icons[1].app) || $content[num].account_application.match(icons[2].app) || $content[num].account_application.match(icons[3].app) || $content[num].account_application.match(icons[4].app) || $content[num].account_application.match(icons[5].app) || $content[num].account_application.match(icons[6].app)  || $content[num].account_application.match(icons[7].app) || $content[num].account_application.match(icons[8].app) || $content[num].account_application.match(icons[9].app) || $content[num].account_application.match(icons[10].app) || $content[num].account_application.match(icons[11].app)  || $content[num].account_application.match(icons[12].app) || $content[num].account_application.match(icons[13].app) ? $content[num].account_application.toLowerCase() : 'question-circle')+' to-h flow-text ml-2 center-div mb-3" style="font-size: 6rem;"></i>',
            '<div class="row white-text container">',
                '<div class="col s12"><p class="to-m">Application:</p><input type="text" class="fs-1 to-h white-text " value="'+$content[num].account_application+'" disabled></div>',
                '<div class="col s12 mt-3"><p class="to-m">Username:</p><input type="text" class="fs-1 to-h white-text " value="'+$content[num].account_username+'" disabled></p></div>',
                '<div class="col s12 mt-3"><p class="to-m">Email Address:</p><input type="text" class="fs-1 to-h white-text " value="' + $content[num].account_email + '" disabled></p></div>',
                '<div id="password-hid"></div>',
            '</div>'
        ]

        $($elem).append($html.join("")); 
    }

}

// Encrypts the original text before display password
function generatePassHide($elem, $content) {
    $($elem).empty(); 
    for (var num = 0; num < $content.length; num++) {
        var pass = CryptoJS.AES.encrypt($content[num].account_password, "Passphrase");

        $html = [     
                '<div class="col s12 mt-3"><p class="to-m">Password:</p><div class="center-div"><input type="password" class="fs-1 to-h white-text " value="' + pass.ciphertext.toString(CryptoJS.enc.Base64) + '" disabled><button class="btn-flat white-text to-m modal-trigger modal-close" data-target="pin-view_pass" id="pin-reprompt_btn"><i class="bi bi-eye"></i></button></div></div>',
        ]

        $($elem).append($html.join("")); 
    }

}

// Descrypts the cipher text before display the original text
function generatePassUnhide($elem, $content) {
    $($elem).empty(); 
    for (var num = 0; num < $content.length; num++) {
        $html = [     
                '<div class="col s12 mt-3"><p class="to-m">Password:</p><div class="center-div"><input type="text" class="fs-1 to-h white-text" value="' + $content[num].account_password + '" disabled></div></div>',
        ]

        $($elem).append($html.join("")); 
    }

}

// Displays the specified item for Update
function generateUpdateAccount($elem, $content) {
    $($elem).empty(); 
    for (var num = 0; num < $content.length; num++) {

        $html = [     
            '<i class="bi bi-'+($content[num].account_application.match(icons[0].app) || $content[num].account_application.match(icons[1].app) || $content[num].account_application.match(icons[2].app) || $content[num].account_application.match(icons[3].app) || $content[num].account_application.match(icons[4].app) || $content[num].account_application.match(icons[5].app) || $content[num].account_application.match(icons[6].app)  || $content[num].account_application.match(icons[7].app) || $content[num].account_application.match(icons[8].app) || $content[num].account_application.match(icons[9].app) || $content[num].account_application.match(icons[10].app) || $content[num].account_application.match(icons[11].app)  || $content[num].account_application.match(icons[12].app) || $content[num].account_application.match(icons[13].app) ? $content[num].account_application.toLowerCase() : 'question-circle')+' to-h flow-text ml-2 center-div mb-3" style="font-size: 6rem;"></i>',
            '<div class="row white-text container">',
                '<div class="col s12 input-field"><p class="to-m">Application:</p><input type="text" class="fs-1 to-h white-text disabled" value="'+$content[num].account_application+'" disabled></div>',
                '<div class="col s12 mt-3 input-field"><p class="to-m">Username:</p><input type="text" class="fs-1 to-h white-text valid" value="'+$content[num].account_username+'" id="update-username"></p></div>',
                '<div class="col s12 mt-3 input-field"><p class="to-m">Email Address:</p><div class="center-div"><input type="text" class="fs-1 to-h white-text valid" value="' + $content[num].account_email + '" id="update-email"></div></div>',
                '<div class="col s12 mt-3 input-field"><p class="to-m">Password:</p><div class="center-div"><input type="password" class="fs-1 to-h white-text valid" value="' + $content[num].account_password + '" id="update-password"></div></div>',
            '</div>'
        ]

        $($elem).append($html.join("")); 
    }

}

// Displays the content if there are no items 
function generateEmptyTemplate($elem) {
    $($elem).empty();
    $html = [
        '<div class="center mt-5">',
        '<img src="/cipherri/img/cipherri.png" width="150">',
        '<h5 class="white-text to-m fw-bold flow-text">Welcome to Cipherri</h5><p class="to-m">Your vault is now ready to be filled with data.</p>',
        '</div>'
    ];

    $($elem).html($html.join(""));
}


// Displays the current user in the Profile Page
function generateUserProfile($elem, $content) {
    $($elem).empty(); //empty the data first before adding or append to avoid replication

    for (var num = 0; num < $content.length; num++) {
        // place the data from content users
        $html = [
            '<div class="row mt-3" >',
                '<div class="input-field col s6">',
                    '<input id="profile-username" type="text" class="white-text" value="' + $content[num].user_username + '">',
                    '<label for="profile-username" class="active">Username</label>',
                    
                '</div>',
                '<div class="input-field col s6">',
                    '<input id="profile-email" type="email" class="white-text" value="' + $content[num].user_email + '">',
                    '<label for="profile-email" class="active">Email</label>',
                '</div>',
            '</div>',
            '<div class="row mt-3">',
                '<div class="input-field col s6">',
                    '<input id="profile-temp" type="password" class="white-text" value="">',
                    '<label for="profile-temp" class="">New Password <small>( Optional )</small></label>',
                '</div>',
                '<div class="input-field col s6">',
                    '<input id="profile-password" type="password" class="white-text" value="">',
                    '<label for="profile-password" class="">Master Password</label>',
                '</div>',
            '</div>',

        ]
        $($elem).append($html.join("")); //returns an array as a string and append it to the element
    }

}