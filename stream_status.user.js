// ==UserScript==
// @name         Dubtrack Stream Status
// @namespace    AngeloidIkaros
// @version      0.1
// @description  Gives u the current Stream Status
// @author       AngeloidIkaros
// @match        https://*.dubtrack.fm/join/*
// @grant        none
// ==/UserScript==

(function(){
    
    setTimeout(function() {
var outputEl = document.createElement('span');
outputEl.className = 'stream-countdown';
outputEl.id = 'output';
outputEl.onclick = function() {
      window.open('https://www.twitch.tv/nightblue3');
};
document.getElementsByClassName("player_header")[0].appendChild(outputEl);
}, 5000);
   var daylight = 1; // 1= For Daylight Saving 0= For no Daylight Saving
   var response, response1, streamTitle, time = 7, live = 0, day, sMinutes = 0;
					function bst() {
						var dates = [new Date(), new Date()], personDate = Date.now(), octDate, marDate;
						for (var i = 0; i < dates.length; i++) {
							dates[i].setHours(1);
							dates[i].setMonth(i * 7 + 2);
							dates[i].setDate(31);
							dates[i].setDate(dates[i].getDate() - dates[i].getDay());
							dates[i] = dates[i].getTime();
						}
						marDate = dates[0];
						octDate = dates[1];
						return personDate > marDate && personDate < octDate;
					}
					function msToTime(duration) {
					    var seconds = parseInt((duration / 1000) % 60),
					    	minutes = parseInt((duration / (1000 * 60)) % 60),
					    	hours = parseInt(duration / (60 * 60 * 1000))+ daylight ;
					    hours = (hours < 10) ? "0" + hours : hours;
					    minutes = (minutes < 10) ? "0" + minutes : minutes;
					    seconds = (seconds < 10) ? "0" + seconds : seconds;	

					    return hours + ":" + minutes + ":" + seconds;
                    }
					function displayTime (callback) {
						var loaded = false, streamTitle, stream;
						window.setInterval(function() {
							if(response && response1 && !loaded) {
								loaded = true;
								if (response.stream !== null) {
									streamTitle = response.stream.channel.status;
									live = 1;
								} else {
									streamTitle = response1.status;
									if (streamTitle.indexOf("VoHiYo") != -1) {
										live = 2;
									}
								}
								if (live == 0) {
									if (streamTitle.indexOf("Next Stream") == -1 || streamTitle.indexOf("TBA") != -1) {
										day = 8;
									} else {
										timestr = streamTitle.split("/")[2].split("-")[0].trim();
										if (timestr.indexOf("NOON") == -1) {
											if (timestr.indexOf(":") != -1) {
												minHour = timestr.split(":");
												time = parseInt(minHour[0]);
												sMinutes = parseInt(minHour[1]);
											} else {
												time = parseInt(timestr);
											}
										} else {
											time = 12;
										}
										if (streamTitle.indexOf("Monday") != -1) {
											day = 1;
										} else if (streamTitle.indexOf("Tuesday") != -1) {
											day = 2;
										} else if (streamTitle.indexOf("Wednesday") != -1) {
											day = 3;
										} else if (streamTitle.indexOf("Thursday") != -1) {
											day = 4;
										} else if (streamTitle.indexOf("Friday") != -1) {
											day = 5;
										} else if (streamTitle.indexOf("Saturday") != -1) {
											day = 6;
										} else if (streamTitle.indexOf("Sunday") != -1) {
											day = 0;
										} else {
											day = 8;
										}
										if (timestr.indexOf("PM") != -1) {
											if (time < 12) {
												time += 12;
											}
										} else if (timestr.indexOf("AM") != -1 && time < 8) {
											day += 1;
											day = day > 6 ? 0 : day;
										}
										if (bst()) {
											time -= 1;
										}
									}
								} else {
									time = 0;
								}

								callback();
							} else if (response && response1) {
								if (day == 8) {
									document.getElementById("output").innerHTML = "TO BE ANNOUNCED";
								} else if (live == 1) {
									document.getElementById("output").innerHTML = "LIVE NOW";
								} else if (live == 2){
									document.getElementById("output").innerHTML = "LIVE SOON";
								} else {
									t = timeToStream(time, day, sMinutes);
									if (t == "late") {
										document.getElementById("output").innerHTML = "LATEBLUE";
									} else {
										document.getElementById("output").innerHTML = msToTime(t);
									}
								}
							}
						}, 1);
					}
					function timeToStream(streamTime, streamDay, minutes) {
						var currentTime = new Date(), nbTime, tday, sday, dayGap;
						currentTime = new Date(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), currentTime.getUTCHours(), currentTime.getUTCMinutes(), currentTime.getUTCSeconds(), currentTime.getUTCMilliseconds());
						sday = streamDay;
						if (sday == 7) {
							dayGap = currentTime.getHours() < streamTime ? 0 : 1;
						} else {
							tday = currentTime.getDay();
							if (sday < tday) {
								sday += 7;
							}
							dayGap = sday - tday;
						}
						nbTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + dayGap, streamTime, minutes, 0, 0);
						currentTime = nbTime.getTime() - currentTime.getTime();
						if (currentTime < 0) {
							return "late";
						}
						return currentTime;

					}
					function loadResources(c) {
						document.getElementById("stream-elements-data-container").innerHTML = '<iframe src="https://player.twitch.tv/?channel=nightblue3" width="830" height="465" frameborder="0" scrolling="no"></iframe><iframe frameborder="0" scrolling="no" src="http://www.twitch.tv/nightblue3/chat" height="465" width="310" class="chat"></iframe>';
					}
					window.onload = function () {
						tChannel = "Nightblue3";
						displayTime(function() {
							loadResources(tChannel);
						});
						var xhttp = new XMLHttpRequest(), xhttp1 = new XMLHttpRequest();
						xhttp.onreadystatechange = function() {
							if (this.readyState == 4 && this.status == 200) {
								response = JSON.parse(this.responseText);
							}
						};
						xhttp.open("GET", "https://api.twitch.tv/kraken/streams/" + tChannel + "?client_id=8xoctkw36e66qyr3xluqvgvvn5e68ft", true);
						xhttp.send();
						xhttp1.onreadystatechange = function() {
							if (this.readyState == 4 && this.status == 200) {
								response1 = JSON.parse(this.responseText);
							}
						};
						xhttp1.open("GET", "https://api.twitch.tv/kraken/channels/" + tChannel + "?client_id=8xoctkw36e66qyr3xluqvgvvn5e68ft", true);
						xhttp1.send();
					};

  
		
})();
