// ==UserScript==
// @name         Dubtrack Streamer Tab
// @namespace    AngeloidIkaros
// @version      1
// @description  Gives u a new tab with a list of streamers/ Made by AngeloidIkaros and Jetman640 <3
// @author       AngeloidIkaros
// @match        https://*.dubtrack.fm/join/*
// @grant        none
// ==/UserScript==

(function(){
    var streamers = {
        streamer_list:$('<ul class="streamer_list"></ul>')
    };
    var streams = ["lirik","lolyou","tsm_dyrus","twitch","scarra","imaqtpie","boxbox"];
    var collectStreams = function(){
        //twitch_widget = $('#twitch-widget');
        var api_key = '5j0r5b7qb7kro03fvka3o8kbq262wwm';
        streams.forEach(function(stream){
            $.getJSON('https://api.twitch.tv/kraken/streams/' + stream + '?client_id=' + api_key + '&callback=?', function(data){
                //var streamelement = {};
                if(!streamers[stream])
                {
                    streamers[stream] = $('<li class="'+stream+'" value=0></li>');
                    streamers.streamer_list.append(streamers[stream]);
                }
                if(data.stream) 
                {   
                    streamers[stream][0].value = data.stream.viewers;
                    streamers[stream].html('<div class="stream_preview">'+
                                           '<img src='+data.stream.preview.medium+'>'+
                                           '</div>'+
                                           '<div class="streamer_name">'+
                                           '<a href="https://www.twitch.tv/'+stream+'">'+
                                           data.stream.channel.display_name+
                                           '</a></div>'+
                                           '<div class="stream_game" title="'+data.stream.game+'">LIVE <span class="badge__online"></span>&nbsp;'  +data.stream.game+'</span>'+
                                           '</div>'+
                                           '<span class="icon-eye-unblocked"></span><span> '+data.stream.viewers+'</span>'+
                                           '</div>'+
                                           '</li>');

                    streamers[stream].addClass('online');
                }
                else
                {    
                    streamers[stream][0].value = 0;
                    streamers[stream].html('<div class="stream_preview">'+
                                           '<img src="https://i.imgur.com/B8eDIyX.jpg">'+
                                           '</div>'+
                                           '<div class="streamer_name">'+
                                           '<a href="https://www.twitch.tv/'+stream+'">'+
                                           stream+
                                           '</a></div>'+
                                           '<span class="icon-eye-unblocked"></span><span></span>&nbsp;' +0+ ''+
                                           '</div>'+
                                           '</li>');
                    streamers[stream].removeClass('online');
                }
            });
        });


        setTimeout(function(){
            sortList(streamers.streamer_list);
        },600);};


    function sortList(ul){
        var fmol = ul;
        var smlis=fmol.children('li');
        smlis.detach().sort(
            function(a,b){
                return b.value - a.value;
            }).appendTo(fmol);

    }
    setTimeout(function() {
        {
            $('<style id="streamers_styles">'+
              'h2.stream-header {'+
              '   word-break: break-word;'+
              '  font-size: 28.8px;'+
              ' font-size: 1.8rem;'+
              ' margin: 0 0 1rem;'+
              ' font-weight: 700;'+
              ' text-align: center;'+
              '}'+
              '#main_player #stream-info-display {'+
              '   display: none;'+
              '   padding-bottom: 56.25%;'+
              '   position: relative;'+
              '    z-index: 10;'+
              '}'+
              '.badge__online {'+
              'background: red;'+
              'border-radius: 50%;'+
              'display: inline-block;'+
              'height: 0.7em;'+
              'line-height: 1;'+
              'width: 0.7em;'+
              '}'+

              '.streamer_list li {'+
              'display: inline-block;'+
              'vertical-align: top;'+
              'padding-right: 22px;'+

              '}'+
              '.stream_preview {'+
              'width: 150px;'+
              '}'+
              '.stream_game {'+
              'max-width: 150px;'+
              'overflow: hidden;'+
              'white-space: nowrap;'+
              'text-overflow: ellipsis;'+

              '}'+

              '.stream-info-display {'+
              '   height: 100%;'+
              '   width: 100%;'+
              '   position: absolute;'+
              '   top: 0;'+
              '   left: 0;'+
              '   overflow: hidden;'+
              '   padding: 0 1rem 0 0;'+
              '}'+
              '</style>').appendTo('head');
        }

        var streamerstab = $('<span class="streamers">Streamers</span>');
        streamerstab.insertAfter("#main_player .room-info-display");

        var streamers_display = $('<div id="stream-info-display" style="display: none;"><div class="stream-info-display"><div class="stream-info-display-container"><h2 class="stream-header">IKAS STREAMER LIST</h2>');
        streamers_display.insertAfter(".player_header");

        /* Hides all other tabs except the streamer one and add/removes active in the class name */
        $('#main_player .streamers')[0].onclick = function() {
            streamerstab.addClass("active");
            streamers_display[0].style.display = "block";
            $('#main_player #room-info-display')[0].style.display = 'none';
            $('#main_player .room-info-display')[0].className = 'room-info-display';
            $('#main_player #mods-controllers')[0].style.display = 'none';
            $('#main_player .display-mods-controls')[0].className = 'display-mods-controls';
            $('#main_player .player_container')[0].style.display = 'none';
            $('#main_player .displayVideo-el ')[0].className = 'displayVideo-el';
        };
        /* Hides the streamer tab if u click video or Info */

        $('#main_player .displayVideo-el')[0].onclick = function() {
            streamerstab.removeClass("active");
            streamers_display[0].style.display = "none";
            //stream_display.style.display = 'none';
        };
        $('#main_player .room-info-display')[0].onclick = function() {
            streamerstab.removeClass("active");
            streamers_display[0].style.display = "none";
            //stream_display.style.display = 'none';
        };
        $('#main_player .display-mods-controls')[0].onclick = function() {
            streamerstab.removeClass("active");
            streamers_display[0].style.display = "none";
            //stream_display.style.display = 'none';
        };



        //setInterval(requestFunction("https://api.twitch.tv/kraken/streams?client_id=2i8ckz6x3msngy8qqt8yn95mtw57asj", parseStreamers), 60000);
        collectStreams();
        setInterval(collectStreams, 60000);
        $('#main_player .stream-info-display-container').append(streamers.streamer_list);
        $('.stream-info-display').perfectScrollbar();

    }, 500);


})();
