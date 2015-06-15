// ==UserScript==
// @name         JoinBot MSG2015
// @namespace    http://steamcommunity.com/groups/MSG2015
// @version      0.1
// @description  AutoJoins the rooms when ready.
// @author       Soragnamdan
// @match        http://steamcommunity.com/minigame/
// @grant        GM_xmlhttpRequest
// ==/UserScript==

//GET USER ID
var UserId = g_steamID;
//GET CURRENT TIME
var offset = (new Date().getTimezoneOffset())/(-60);
var time = new Date();
var hour = time.getHours();
//GET TIME FOR VALVE
var valvetime = ((hour-offset)-7);
console.log(valvetime);

//GET ROOM ID
function loadID(){
    var roomID;
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://pastebin.com/raw.php?i=ga7euzDF",
        onload: function(response) {
            roomID=(response.responseText).split(",");
            console.log(roomID);
        }
    });
    return roomID;
}

var GameId;


var canJoin = false; //Checks if player is in game and/or can join;
if((document.getElementsByClassName("main_btn")[0].firstChild.innerHTML!="Resume Your Game")||true){
    console.log("You may join !");
    canJoin=true;
    loadID();
    DrawGUI();
}
else{
    console.log("User already in game. Don't want to kick him...");
}

function DrawGUI(){
    var div = document.createElement('div');
    div.setAttribute("style", "position:relative; top:-165px!important;");
    div.className = 'main_btn';
    div.innerHTML = '<a href="#" onclick="JoinGame('+GameId+')" class="main_btn"><span>Join Grouped Game !</span></a>';
    document.getElementsByClassName('section_play')[0].appendChild(div);
}


