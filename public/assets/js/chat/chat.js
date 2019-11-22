function pp(data)
{
	console.log(data);
}

function ___htmlEncode(e){
 	return $('<div/>').text(e).html().replace(/&/g,'&amp;');
}

function ___htmlDecode(e){
 	return $('<div/>').html(e).text();
}

function ___dateComponents(date) {
	if(date)
	{
		return moment(date).unix();
	}
	else
	{
		return 0;
	}
}

function ___localTime(date,format) {

	if(!format)
		format ='LT';

	var date = moment.tz(date, "Asia/Kolkata");
	/*date = date.format();
	date = new Date(date).toString();
	return moment(date).format(format);*/
	myzone = moment.tz.guess();
	return moment(date, format).tz(myzone).format(format);
}

function ___isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function base64_decode(data)
{
	return (data) ? atob(data) : '';
}

function base64_encode(data)
{
	return (data) ? btoa(data) : '';
}

function ___uniqueID()
{
	return Math.floor(Math.random() * 20)*(Date.now());
}

function userListing(users)
{
    $('#userlistings').html(null);
    var HTML = '';
    HTML += '';
    var HTML1 = '';
    HTML1 += '';
    var HTML2 = '';
    HTML2 += '';
	$('.noChatUserFound').html('');
	$('#userlistingsconnected').html('');
	$('#userlistingsnotconnected').html('');

	$.each(users.senderDetails.sender_info, function(key,val) {
		console.log("sen"+val.id);
        if(val.id != userObj.id)
        {
            HTML1 += userListTemplateConnection(val);
        }
    });

    console.log(HTML1);
    if (HTML1=='') {
	    HTML1 += '<li class="noRecordFound" style="display: block;">No Users Found</li>';
	    $('.hided').show();
	    $('.noChatUserFoundC').html(HTML1);
    }else{
	    $('.hided').show();
	    setTimeout(function(){
	    	$('#userlistingsconnected').html(HTML1);
	    	$("ul#userlistingsconnected li:first-child").click();
	    	$("ul#userlistingsconnected li:first-child").addClass("chat-active");
		},300);
	}
}

$(document).on("keyup", ".emojionearea-editor", function(event) {
	var code = event.keyCode ? event.keyCode : event.which;
	if (code === '13' || code === 13) {

		var offset = Intl.DateTimeFormat().resolvedOptions().timeZone;
		var now = moment.utc().format('YYYY-MM-DD HH:mm:ss');

		var stillUtc = moment.utc(now).toDate();
		var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');

		var timezone_offset_minutes = new Date().getTimezoneOffset();
		timezone_offset_minutes = timezone_offset_minutes == 0 ? 0 : -timezone_offset_minutes;
		
		var messagetosend = $('.emojionearea-editor').html().trim();
	    var sender_id = userObj.id;
	    var receiver_id = $('#get_receiver_id').val();
	    var product_id = $('#product_id').val();
	    var product_type = $('#product_type').val();

	    var msgObj = {
	    	"receiver_id" : receiver_id,
	    	"product_id" : product_id,
	    	"product_type" : product_type,
	        "chat_message": messagetosend,
	        "sender_id": sender_id,
	        "created_at" : now,
	        "timezone_offset_minutes": timezone_offset_minutes
	    };
	    if(!receiver_id)
	    {
	        alert('SELECT A USER');
	    }
	    else if(sending == false && messagetosend && receiver_id)
	    {
	        sending = true;
	        $('input#messageToSend').val(null);
	        sendChatMessage(msgObj);
	    }
	}

});

$('#chat-submit-socket').click(function(e){

    e.preventDefault();
    var messagetosend = $('.emojionearea-editor').html().trim();
    var sender_id = userObj.id;
    var receiver_id = $('#get_receiver_id').val();
    var product_id = $('#product_id').val();
    var product_type = $('#product_type').val();
    
	var offset = Intl.DateTimeFormat().resolvedOptions().timeZone;
	var now = moment.utc().format('YYYY-MM-DD HH:mm:ss');

	var stillUtc = moment.utc(now).toDate();
	var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');  
	var timezone_offset_minutes = new Date().getTimezoneOffset();
	timezone_offset_minutes = timezone_offset_minutes == 0 ? 0 : -timezone_offset_minutes;
    
    var msgObj = {
    	"receiver_id" : receiver_id,
    	"product_id" : product_id,
    	"product_type" : product_type,
        "chat_message": messagetosend,
        "sender_id": sender_id,
        "created_at": now,
        "timezone_offset_minutes": timezone_offset_minutes
    };
    if(!receiver_id)
    {
        alert('SELECT A USER');
    }
    else if(sending == false && messagetosend && receiver_id)
    {
        sending = true;
        $('input#messageToSend').val(null);
        sendChatMessage(msgObj);
    }
})

// $(document).on('keyup','#messageToSend',function(){
// 	socket.emit('chat.start.typing', $('#contactingUser').val(), userObj.id, userObj.sender, function(data){});
// })

// $(document).on('blur','#messageToSend',function(){
// 	setTimeout(function(){
// 		socket.emit('chat.stop.typing', $('#contactingUser').val(), userObj.id, function(data){});
// 	},1000)
// })

function chatwithuser(user,pid,pty)
{
	$('#inputMessageDiv').hide();
    $('#get_receiver_id').val(user);
    $('#userlistingsconnected li').each(function(){
    	$(this).removeClass('chat-active');
    });
    $('#chat-user-area-'+user).addClass('chat-active');

    if(user != $('#contactingUser').val())
    {
    	$('#messages').html(null);
    	$('#contactingUser').val(user);

    	var tz = jstz.determine(); // Determines the time zone of the browser client
    	var timezone = tz.name();

        socket.emit('chat.message.list',userObj.id,user,userObj.api_token,pid,pty,timezone, function(data){
            sentmessage = '';
            if(data)
            {
            	$('#add_msg_history').html(data);
            }
       		scrollToBottom();
        });
	}
}


function userListTemplateConnection(data,callback) 
{
	var pid = String(getUrlParameter('pid'));
	var pty = String(getUrlParameter('pty'));
	var isOnline = 'offline';
	var isOnlineCheck = (usersonline[data.id] != undefined) ? true : false;
    var onclickFunc = "chatwithuser("+data.id+",'"+pid+"','"+pty+"');";
    var LISTTEMPLATE = '';
    if(data.image!= ''){
    	var user_img = APP_URL+'adminPanel/uploads/'+data.image;
    }else{
    	var user_img = APP_URL+'assets/images/user.png';
    }

	isOnline = (isOnlineCheck == true) ? 'online-member' : 'offline';

	LISTTEMPLATE = '<li class="'+(data.message ? "" : "")+' chat-user '+isOnline+'" onclick="'+onclickFunc+'" id="chat-user-area-'+data.id+'" data-time-stamp="'+___dateComponents(data.created_at)+'">'
	    			   +'<div class="list-desc">'
	    			        +'<div class="img-message">'
	    			            +'<img id="user-profile-img-'+data.id+'" src="'+user_img+'">'
	    			            +'<span id="chat-online-'+data.id+'" class="online-status"></span>'
	    			        +'</div>'
	    			        +'<div class="message-desc">'
								+'<h4 id="chat-user-'+data.id+'" class="user-name">'+data.name+'</h4>'
								+'<p id="chat-text-'+data.id+'">'+((data.message) ? ___htmlDecode(data.message) : "Contact "+data.name)+'</p>'
	    			        +'</div>';
           		LISTTEMPLATE+='<span id="chat-time-'+data.id+'" class="message-time">'+(data.created_at ? ___localTime(data.created_at,'MMM D') : "")+'</span>';
			LISTTEMPLATE+='</div>'
	    			+'</li>';


	return LISTTEMPLATE;
}

// function messageTemplate(val) 
// {
// 	calssAttach = val.sender_id == userObj.id ? 'sender-wrapper' : '';
// 	readClass = val.sender_id == userObj.id ? val.seen_status : '';
//     MESSAGETEMPLATE = 	'<li class="'+calssAttach+'">'+
// 						    '<div class="message-wrapper">'+
// 						        '<div class="chat-person-icon">'+
// 						            '<img src="'+APP_URL+val.sender.profile_image+'">'+
// 						        '</div>'+
// 						        '<div class="message-content">'+
// 						            '<h2 class="author-name">'+val.sender.sender+'</h2>'+
// 						            '<div class="message-content-detail">'+
// 						                '<p>'+___htmlDecode(val.message)+'</p>'+
// 						            '</div>'+
// 						        '</div>'+
// 						        '<span class="chatmessage-time '+readClass+'">'+___localTime(val.created_at,'LT')+'</span>'+
// 						    '</div>'+
// 						'</li>';
// 	return MESSAGETEMPLATE;
// }

// function updateOnlineUser(data,callback) 
// {
// 	usersonline = [];
// 	counter = 0;
// 	$.each(data, function(key,val) {
// 		usersonline[val.id] = val;
// 		$('#chat-user-area-'+val.id).addClass('online-member');
// 		$('#chat-user-area-'+val.id).removeClass('offline');
// 		counter++;
// 		if(counter == data.length)
// 		{
// 			callback(true);
// 		}
// 	});
// }

// function sortOnlineUsers() {
// 	var alphabeticallyOrderedLis = $(".chat-user");
// 	alphabeticallyOrderedLis.sort(function(a, b) {
// 		return String.prototype.localeCompare.call($(a).find('.user-name').text().toLowerCase(), $(b).find('.user-name').text().toLowerCase());
// 	})

// 	$("#userlistings").html(alphabeticallyOrderedLis);

// 	liListOn = $(".chat-active");
// 	liListOn.sort(function(a, b){
// 	    return $(b).data("time-stamp")-$(a).data("time-stamp")
// 	}).prependTo("ul#userlistings");
// }

function sendChatMessage(msgObj)
{
	socket.emit('chat.send.message', msgObj, function(data){
		console.log(data);
		$('#add_msg_history').append(data);
		
        sending = false;
        scrollToBottom();
        $('.emojionearea-editor').html('');
        console.log(msgObj);

        var offset = Intl.DateTimeFormat().resolvedOptions().timeZone;
		var now = moment.utc().format('MMM D');


        var receiver_id = msgObj.receiver_id;
        $('#chat-text-'+receiver_id).html(msgObj.chat_message);
        $('#chat-time-'+receiver_id).html(now);

        $('#chat-user-area-'+receiver_id).prependTo("ul#userlistingsconnected");
    });
}

function acknowledegeMessage(data)
{
	socket.emit('chat.message.acknowledge', data, function(data){
      
    });
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function getChatUserList(search)
{
	var uid = getUrlParameter('uid');
	var pid = getUrlParameter('pid');
	var pty = getUrlParameter('pty');
	var opa = getUrlParameter('opa');
	var user = $('#get_receiver_id').val();

    search = search ? search : null;
    socket.emit('chat.user.list', userObj.api_token,search,user,uid,pid,pty,opa, function(data){
    	console.log(data);
    	userListing(data);
    	// userListing(data.senderDetails);
    });
}


function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = ("0" + hours).slice(-2);
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

$(document).ready(function(){

	if(userObj.api_token != undefined)
	{
		socket.emit('join', userObj, function(responseData){});
		
		setTimeout(function(){
			getChatUserList();
		}, 500);

		socket.on('chat.message.'+userObj.id,function(data){
			var mySubString = data.substring(
			    data.lastIndexOf("<span id") + 10, 
			    data.lastIndexOf("</span>&nbsp;") - 10
			);
			var date = new Date(mySubString+ ' UTC');
			date.toString();
			var conv = formatAMPM(date);

			var newsubstr = data.substring(
			    data.lastIndexOf("<span id") + 31, 
			    data.lastIndexOf("</span>&nbsp;")
			);
			var testusr = data.substring(
			    data.lastIndexOf("data-user-id='") + 14, 
			    data.lastIndexOf("<div class='outgoing_msg_img'>") -2
			);
			console.log(testusr);
			$('#'+testusr).prependTo('ul#userlistingsconnected');
			
			var receiver_id = testusr.replace("chat-user-area-","");
			
			console.log(receiver_id);
			var offset = Intl.DateTimeFormat().resolvedOptions().timeZone;
			var now = moment.utc().format('MMM D');
			
			var message = data.substring(
				data.lastIndexOf('<p>') +3,
				data.lastIndexOf('</p>')
				);
			$('#chat-user-area-'+receiver_id).click();
			
			$('#chat-text-'+receiver_id).html(message);
			$('#chat-time-'+receiver_id).html(now);


			var orgdata = data;
			var newdata = data.replace("class='outgoing_msg'","class='incoming_msg'");
			var newdata = newdata.replace("class='outgoing_msg_img'","class='incoming_msg_img'");
			var newdata = newdata.replace("class='sent_msg'","class='received_msg'");
			var newdata = newdata.replace("<div class='received_msg'>","<div class='received_msg'><div class='received_withd_msg'>");
			// var newdata = newdata.replace("</span>","</span></div>");
			var newdata = newdata.replace(newsubstr,conv);
			console.log(newdata);


			var sameuser = $('.chat-active').attr('id');
			var search = newdata.search(sameuser);
			if(search>1){
				$('#add_msg_history').append(newdata);
				scrollToBottom();
			}


	    });
	  
	    socket.on('users',function(data){
	    	// updateOnlineUser(data,function(status){
	    	// 	if(status == true)
	    	// 	{

	    	// 	}
	    	// })
	    });

		socket.on('chat.user.start.typing.'+userObj.id, function (user) {
			if($('#contactingUser').val() == user.sender_id)
			{
				$('#messageToSend').attr('placeholder',user.action)
			}
		});

		socket.on('chat.user.stop.typing.'+userObj.id, function (user) {
			if($('#contactingUser').val() == user.sender_id)
			{
				$('#messageToSend').attr('placeholder',user.action)
			}
		});

		socket.on('disconnect', function (user) {
			$.each(user,function(i,v){
				$('#chat-user-area-'+v.sender_id).removeClass('online-member');
				$('#chat-user-area-'+v.sender_id).addClass('offline');
			});
			sortOnlineUsers();
		});
	}
});

$(document).on('keyup','#user-search-box',function(e){
    var count = 0;
    var user = $("#user-search-box").val();
    user = user.trim();
    if((user.trim() || e.keyCode == 8) && user.length>=3){
        socket.emit('chat.user.list', userObj.api_token,user, function(data){
	        userListing(data.data)
	    });
    }
    else if(e.keyCode == 8 && user.length==0){
    	user = user.trim();
        socket.emit('chat.user.list', userObj.api_token,user, function(data){
	        userListing(data.data)
	    });
    }
    else{
    	$('#userlistings').html('');
    	$('#userlistingsconnected').html('');
    	$('#userlistingsnotconnected').html('');
    	$('.noRecordFound').html('');
    	$('.noChatUserFound').html('');
    	$('.noChatUserFoundC').html('');
    	$('.hided').hide();
    	$('#userlistings').html('<li class="noRecordFounder" style="display: block;">Please enter 3 or more characters</li>');
    }
});