// ==UserScript==
// @name         Props Button
// @namespace    AngeloidIkaros
// @version      1
// @description  try to take over the world!
// @author       AngeloidIkaros
// @match        https://*.dubtrack.fm/join/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
 setTimeout(function() {
$('head').append('<link rel="stylesheet" type="text/css" href="https://raw.githubusercontent.com/AngeloidIkaros/Dubtrack-Stuff/master/Dubtrack%20Stream%20Countdown/props_button.css" />');

var propsButton = document.createElement('span');
propsButton.className = 'props-button fi-like';
propsButton.onclick = function() {
      $('#chat-txt-message').val("!props");
	    Dubtrack.room.chat.sendMessage();	
};
document.getElementsByClassName("chat-text-box-icons")[0].appendChild(propsButton);
}, 5000);
   
})();