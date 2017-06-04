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

    setTimeout(function() {
        var $streamtab = document.createElement("span");
        $streamtab.className = "streamers";
        $streamtab.append("Streamers");
        $($streamtab).insertAfter( ".room-info-display" );

        var $stream_display = document.createElement("div");
        $stream_display.id = 'streamer-display';
        $($stream_display).insertAfter( " .player_header" );
        $stream_display.style.display = 'none';

        /* Hides all other tabs except the streamer one and add/removes active in the class name */
        $('#main_player .streamers')[0].onclick = function() {
            $stream_display.style.display = 'block';
            $streamtab.className = "streamers active";
            $('#main_player #room-info-display')[0].style.display = 'none';
            $('#main_player .room-info-display')[0].className = 'room-info-display';
            $('#main_player #mods-controllers')[0].style.display = 'none';
            $('#main_player .display-mods-controls')[0].className = 'display-mods-controls';
            $('#main_player .player_container')[0].style.display = 'none';
            $('#main_player .displayVideo-el ')[0].className = 'displayVideo-el';
        };
        /* Hides the streamer tab if u click video or Info */

        $('#main_player .displayVideo-el')[0].onclick = function() {
            $stream_display.style.display = 'none';
        };
        $('#main_player .room-info-display')[0].onclick = function() {
            $stream_display.style.display = 'none';
        };
        $('#main_player .display-mods-controls')[0].onclick = function() {
            $stream_display.style.display = 'none';
        };







    }, 5000);

})();
