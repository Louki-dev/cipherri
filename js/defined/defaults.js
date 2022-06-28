(function () {
    
    $(document).ready(function (e) {

        $('.tooltipped').tooltip();
        $('.dropdown-trigger').dropdown();
        $('.tabs').tabs();
        $('.sidenav').sidenav({ 'edge': 'right' });
        $('.modal').modal({
            "dismissible": false
        });
        $('input.autocomplete').autocomplete({
            data: {
                "Facebook": "https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png",
                "Instagram": "https://cdn4.iconfinder.com/data/icons/social-media-2210/24/Instagram-512.png",
                "Google": 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
                "Twitter": "https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png",
                "Skype": "https://cdn-icons-png.flaticon.com/512/174/174869.png",
                "Discord": 'https://www.svgrepo.com/show/331368/discord-v2.svg',
                "Twitch": "https://cdn-icons-png.flaticon.com/512/5968/5968819.png",
                "Vimeo": "https://cdn.freebiesupply.com/logos/large/2x/vimeo-icon-blue-logo-png-transparent.png",
                "WhatsApp": 'https://cdn-icons-png.flaticon.com/512/174/174879.png',
                "Wordpress": "https://cdn-icons-png.flaticon.com/512/174/174881.png",
                "Github": "https://cdn-icons-png.flaticon.com/512/25/25231.png",
                "Paypal": 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/PayPal_Logo_Icon_2014.svg/666px-PayPal_Logo_Icon_2014.svg.png',
                "Pinterest": "https://cdn-icons-png.flaticon.com/512/174/174863.png",
                "Steam": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
            },
        }); 
    });

})();