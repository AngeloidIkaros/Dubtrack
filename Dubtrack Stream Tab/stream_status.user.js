// ==UserScript==
// @name         Dubtrack Streamer Tab
// @namespace    AngeloidIkaros
// @version      1
// @description  Gives u a new tab with a list of streamers
// @author       AngeloidIkaros
// @match        https://*.dubtrack.fm/join/*
// @grant        none
// ==/UserScript==

(function(){

    setInterval(function() {
        user_name = "sodapoppin";
        api_key = "5j0r5b7qb7kro03fvka3o8kbq262wwm";
        twitch_widget = $("#twitch-widget");

        twitch_widget.attr("href","https://twitch.tv/" + user_name);

        $.getJSON('https://api.twitch.tv/kraken/streams/' + user_name + '?client_id=' + api_key + '&callback=?', function(data) {	
            if (data.stream) {
                twitch_widget.html("<span class='online'></span>"+ user_name + " Online! Playing: " +  data.stream.game + "<span class='viewers'>Viewers: " + data.stream.viewers + "</span>");
            } else {
                twitch_widget.html("<span class='offline'></span> Offline");
            }  
        });
    }, 60000);


    setTimeout(function() {
        var streamerstab = $('<span class="streamers">Streamers</span>');
        streamerstab.insertAfter("#main_player .room-info-display");


        var streamers_display = $('<div id="streamer-display" style="display: none;"><div class="stream-display-container"><h2 class="stream-header">IKAS STREAMER LIST</h2></div><div class="description"><a href="#" class="twitch-widget" id="twitch-widget" target="_blank"></a></div>');
        streamers_display.insertAfter(".player_header");

        /* Hides all other tabs except the streamer one and add/removes active in the class name */
        $('#main_player .streamers')[0].onclick = function() {
            streamers_display[0].style.display = "block";
            streamerstab.addClass("active");
            $('#main_player #room-info-display')[0].style.display = 'none';
            $('#main_player .room-info-display')[0].className = 'room-info-display';
            $('#main_player #mods-controllers')[0].style.display = 'none';
            $('#main_player .display-mods-controls')[0].className = 'display-mods-controls';
            $('#main_player .player_container')[0].style.display = 'none';
            $('#main_player .displayVideo-el ')[0].className = 'displayVideo-el';
        };
        /* Hides the streamer tab if u click video or Info */

        $('#main_player .displayVideo-el')[0].onclick = function() {
            streamers_display[0].style.display = 'none';
        };
        $('#main_player .room-info-display')[0].onclick = function() {
            streamers_display[0].style.display = 'none';
        };
        $('#main_player .display-mods-controls')[0].onclick = function() {
            streamers_display[0].style.display = 'none';
        };
        var user_name, api_key, twitch_widget;


    }, 5000);

})();
