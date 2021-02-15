// SID: 1155122022
// Name: Nicholas Tanryo
$(document).ready(() => {
    console.log("Loading file ...");
    loadFile();
    console.log("File loaded !");
});

function getBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
       return "Opera";
    } else if (navigator.userAgent.indexOf("Chrome") != -1 ) {
       return "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
    } else if ((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
        return "IE";
    } else {
        return "Unknown";
    }
}
function getCountry(countryID) {
    var countryName;
    $.ajaxSetup({async:false});
    url = "https://restcountries.eu/rest/v2/alpha/" + countryID;
    $.get(url, function (response) {
        countryName = response.name;
    });
    return countryName;
}
function getIP() {
    var res;
    $.ajaxSetup({async:false});
    $.get("https://ipinfo.io?token=fd78beb22fcf92", function(response){
        res = response;
    });
    return res;
}
function getOS() {
    var OS = "unknown";
    if (navigator.appVersion.indexOf("Android") != -1) OS = "Android";
    else if (navigator.appVersion.indexOf("iPhone") != -1) OS = "IOS";
    else if (navigator.appVersion.search(/.*iPad.*/) != -1) OS = "iPadOS";
    else if (navigator.appVersion.indexOf("Win") != -1) OS = "Windows";
    else if (navigator.appVersion.search(/.*Macintosh.*/) != -1) OS = "Mac";
    else if (navigator.appVersion.indexOf("Linux") != -1) OS = "Linux";
    else if (navigator.appVersion.indexOf("X11") != -1) OS = "UNIX";
    return OS;
}
function getISP() {
    var isp = "unknown";
    $.ajax({
        type: "GET",
        dataType: "json",
        async: false,
        url: "http://ip-api.com/json/?fields",
        success: function (res) {
            isp = res;
        },
        error: function (xml, status, error) {
            console.log(status, error);
        }
    });
    return isp;
}

$("#addbutton").click(function () {
    var date = new Date();
    var getIp = getIP();

    var user = {
        "ip": getIp.ip,
        "countryId": getIp.country,
        "country": getCountry(getIp.country),
        "browser": getBrowser(),
        "userAgent": navigator.userAgent,
        "Webkit": navigator.userAgent.split(" ")[7],
        "OS": getOS(),
        "ISP": getISP()
    }

    let $new = $("<li><svg><circle></circle></svg><div><h3></h3><h4></h4><p></p><a></a><ul></ul></div></li>");
    $new.addClass("media");
    $new.addClass("rest");
    $new.find("div").addClass("media-body");
    var usrbrowser = " <span>&nbsp &nbsp</span><i>  > &nbsp " + user.browser + ", ISP: " + user.ISP.isp + ", ISP region: " + user.ISP.regionName + ", ISP country: " + user.ISP.country + "</i>";
    $new.find("h3").html($("#inputsubject").val() + usrbrowser);
    var usrcountry = " <span>&nbsp &nbsp &nbsp</span><i>  > &nbsp from " + user.country + ", IP address: " +  user.ip+ "</i><br><i class='user-agent'></i>";
    $new.find("h4").html($("#inputname").val() + usrcountry);
    var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var posteddate = "Posted on &nbsp" + day[date.getDay()] + ", " + date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear() + " - " + user.OS;
    $new.find("p").html($("#inputcomment").val() + "<br>" + '<p style="text-align: right"><i>' + posteddate  + "</i></p>");
    $new.find("a").html("Reply");
    $new.find("a").attr({
        "href": "#",
        "class": "replybutton",
        "onclick": "returnForm(this)"
    });

    $new.find("ul").addClass("list-unstyled");
    $new.find("circle").addClass($("input[name=inputcolor]:checked").val());
    $("#comments").append($new);
    document.getElementById("form").reset();

    saveFile();
});

function addcomment(self) {
    var date = new Date();
    var getIp = getIP();

    var user = {
        "ip": getIp.ip,
        "countryId": getIp.country,
        "country": getCountry(getIp.country),
        "browser": getBrowser(),
        "userAgent": navigator.userAgent,
        "Webkit": navigator.userAgent.split(" ")[7],
        "OS": getOS(),
        "ISP": getISP()
    }

    let $new = $("<li><svg><circle></circle></svg><div><h3></h3><h4></h4><p></p><a></a><ul></ul></div></li>");
    $new.addClass("media");
    $new.addClass("rest");
    $new.find("div").addClass("media-body");
    var usrbrowser = " <span>&nbsp &nbsp</span><i>  > &nbsp " + user.browser + ", ISP: " + user.ISP.isp + ", ISP region: " + user.ISP.regionName + ", ISP country: " + user.ISP.country + "</i>";
    $new.find("h3").html($(".inputsubject").val() + usrbrowser);
    var usrcountry = " <span>&nbsp &nbsp &nbsp</span><i>  > &nbsp from " + user.country + ", IP address: " +  user.ip+ "</i><br><i class='user-agent'></i>";
    $new.find("h4").html($(".inputname").val() + usrcountry);
    var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var posteddate = "Posted on &nbsp" + day[date.getDay()] + ", " + date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear() + " - " + user.OS;
    $new.find("p").html($(".inputcomment").val() + "<br>" + '<p style="text-align: right"><i>' + posteddate  + "</i></p>");
    $new.find("a").html("Reply");
    $new.find("a").attr({
        "href": "#",
        "class": "replybutton",
        "onclick": "returnForm(this)"
    });
    $new.find("circle").addClass($("input[name=inputcolor]:checked").val());

    $(self).parent().parent().next().append($new);
    $(self).parent().parent().remove();

    saveFile();
}

function returnForm(self) {
    let form = '<div id="extra-form" class="collapse subcomment-form"><form class="form" class="main-comment-form"><div class="form-row"><div class="name form-group col-xs-6"><label for="name">Name</label><input type="text" class="inputname form-control" placeholder="Enter Name" autocomplete="off"></div><div class="subject form-group col-xs-6"><label for="subject">Subject</label><input type="text" class="inputsubject form-control" placeholder="Enter Subject" autocomplete="off"></div></div><div class="form-group"><label class="form-check-label" for="comment">Your Comment</label><textarea type="checkbox" class="inputcomment form-control" placeholder="Enter Comment" rows="4"></textarea></div><div><div class="form-check"><input type="radio" class="form-check-input" name="inputcolor" value="red"><label class="form-check-label">Red</label></div><div class="form-check"><input type="radio" class="form-check-input" name="inputcolor" value="blue"><label class="form-check-label">Blue</label></div><div class="form-check"><input type="radio" class="form-check-input" name="inputcolor" value="green"><label class="form-check-label">Green</label></div><div class="form-check"><input type="radio" class="form-check-input" name="inputcolor" value="yellow"><label class="form-check-label">Yellow</label></div></div><br><button type="button" class="addbutton btn btn-primary" onclick="addcomment(this)">Add Comment</button></form></div>';

    if ($(self).siblings().length < 5 || ($(self).siblings().length > 5 ) && $("#extra-form").length > 0) {
        $("#extra-form").slideUp();
        setTimeout(() => {
            $("#extra-form").remove();
        }, 400);
        setTimeout(() => {
            $(self).after(form);
            $(self).next().slideDown();
        }, 400);
    } else if ($(self).siblings().length = 5 && $("#extra-form").length > 0) {
        $(self).parent().find(".subcomment-form").slideUp();
        setTimeout(() => {
            $(".subcomment-form").remove();
        }, 450);
    } else {
        $(self).after(form);
        $(self).next().slideDown();
    }
}

function saveFile() {
    var comments = $("#comments").html();

    $.ajax({
    	url:"/comments.txt",
    	type: "PUT",
    	data: comments,
    	processData: false,
        contentType: "text/plain;charset=utf-8",
    }).done(function(response){
    		console.log(response);
    });
}

function loadFile() {
    $.get("comments.txt", function(text) {
		$("#comments").html(text);
        console.log("Initialization successful");
    });
}
