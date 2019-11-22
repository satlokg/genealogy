function chat(option){
	this.user = option.user;
	this.user_id = this.user.id;
	this.name = this.user.name;
	this.country_iso = this.user.country_iso;
	this.sender_mobile = this.user.sender_mobile;
	this.country_code = this.user.sender_country_code;
	this.site_url = option.site_url;
	this.APP_URL = option.app_url;
	this.serverTimeZone = option.serverTimeZone ? option.serverTimeZone : 'Atlantic/Azores';
	this.serverTZ = option.serverTimeZone ? option.serverTimeZone : 'Atlantic/Azores';
	this.serverTzDiff = '-01:00';
	this.localTzDiff = moment(new Date).format('Z');
	this.message_data = [];	
	this.active_chat_panel = false;
	this.conversation_id = false;
	this.socket = option.socket;
	this.uniqueNumber_previous = 0;
	this.activeChatPanelData = {};

	this.all_conversations = {list:[],s:''};
	this.all_group = {list:[],s:''};
	this.all_broadcast_group = {list:[],s:''};
	this.all_contact_list = {list:[],s:''};
	this.active_chat_list = false;
	this.defaul_user_image = '/assets/images/default_user.png';
	this.icon = (option.user.profile_picture != "")?option.user.profile_picture:this.defaul_user_image;
	this.online_users = [];
	this.shaKey = '1234123412341234';
	this.group_type ='Normal';
	this.reply_to =null;
	this.all_receiver_name = null;
	this.delete_after_time = null;
	
	var _this = this;


	// When user connect with socket

	this.socket.on('connect', function (user) {
		$('.chat_container').show();
		$('.no_connection').hide();
		_this.socket.emit('socketjoin', {id: _this.user_id, name:_this.name,icon:'',chat_status:'online' });
		_this.socket.emit('online',{id: _this.user_id,name:_this.name});
	});


	// Online user Status
	this.socket.on('chat.online_users',function(users){
		_this.online_users = JSON.parse(users);		
		_this.print("NEW USER",_this.online_users);
		_this.updateOnlineStatus();
	});

	this.setUser = function(user){

		this.user = user;
		this.user_id = this.user.id;
		this.name = this.user.name;
		this.email = this.user.email;
	}

	this.setDeleteAfter = function(key){
		this.delete_after_time = key;	
	}

    this.setActiveChatPanel  = function(key){

		this.active_chat_panel = key;
	}

	this.setActiveChatPanelData  = function(data){

		this.activeChatPanelData = data;
	}

    this.getActiveChatPanel  = function(){

		return this.active_chat_panel;
	}

	this.setLoader = function (__this){

		//__this.waitMe({effect : 'pulse'});
	}
	this.removeLoader = function (__this){

		//__this.waitMe('hide');
	}

	this.getGroupList = function (callback){

		var _this = this;

		var data = {  user_id: _this.user_id,offset:0,s:chat.all_group.s};

		if( _this.all_group.next_offset && $('.friend-list').find('.chat_list').length > 0 ){

			data.offset = _this.all_group.next_offset;
		}
		
		else if( typeof _this.all_group.next_offset !="undefined"  )
		{	
			
			if(_this.all_group.next_offset ==null){

				$('.friend-list').find('.load_more_chat_list').parent().remove();
			}			

			if($('.friend-list').find('.chat_list').length ==0 && _this.all_group['list'].length > 0){

				_this.renderGroupList();			

				if(typeof callback =="function"){

					callback();
				}

				return ;
			}
			return;
		}

		if(typeof this.user.tracking != "undefined" && this.user.tracking ){

			data.for_admin = 1;
		}

		_this.setLoader($('.member_list'));

		$.ajax({
			headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
			url:_this.site_url+'/get_group_list',						
			data: JSON.stringify(data),
			contentType: 'application/json',
    		dataType: 'json',
    		type: 'post',
			success:function(response, status, xhr){

				_this.removeLoader($('.member_list'));

				_this.serverTimeZone = response.serverTimeZone;

				if(typeof response.data != "undefindex" && response.data.length >0){
					
					$.each(response.data,function(k,v){

						_this.all_group['list'].push(v);
					});					

					_this.all_group['next_offset'] = response.next_offset;

				}
				_this.renderGroupList(response.data);			

				if(typeof callback =="function"){

					callback(response);
				}

			}   
		});
	}


	this.getiv = function(){

	 return cryptoLib.generateRandomIV(16);
	}


	this.toUnicode =  function(str) {

		var t = str.split('').map(function (value, index, array) {
			var temp = value.charCodeAt(0).toString(16).toUpperCase();
			if (temp.length > 2) {
				return '\\u' + temp;
			}
			return value;
		}).join('');
		var iv = this.getiv();
		var message_str = t?cryptoLib.encrypt(t,this.shaKey,iv):'';
		return this.mixIVMessage(message_str,iv);

	}

	this.mixIVMessage = function (msgStr,iv)
	{

		var msgLength  = msgStr.length;
		var ivLength  = iv.length;

		var msgOnePart = Math.ceil(msgLength/2);
		var msgSecondPart = (msgLength - msgOnePart);
		var ivOnePart = Math.ceil(ivLength/2);
		var ivSecondPart = (ivLength - ivOnePart);

		var text = msgOnePart.toString().split('').join('**');
		text += msgStr.substr(0,msgOnePart);		
		text += ivOnePart.toString().split('').join('**');
		text += iv.substr(0,ivOnePart);
		text += msgSecondPart.toString().split('').join('**');
		text += msgStr.substr(msgOnePart,msgStr.length);		
		text += ivSecondPart.toString().split('').join('**');
		text += iv.substr(ivOnePart,iv.length);

		return text;

	}


	this.renderGroupList = function(Last_list)
	{
		var _this = this;

		if(chat.all_group.s){
			$('#chat-list').html('');
		}		

		if(_this.all_group['list'].length ==0){

			$('#chat-list').append(_this.chatListNoData());
		}
		else{

			var list = [];
			if($('.friends-list').find('#chat-list').length >0 ){

				list = Last_list;

			}else{

				list = _this.all_group['list'];
			}

			$.each(list,function(k,v){
				var h = _this.chatListHtml(v);
				if(h){
					$('#chat-list').append(h);
				}
			});

			if(_this.all_group['next_offset']){

				if(!$('.member_list').find('.load_more_chat_list').length){

					$('.member_list').append('<p class="load_more_wrap"><a href="javascript:;" class="load_more_chat_list">Load More..</a></p>')						
				}
			}
			else{

				$('.member_list').find('.load_more_chat_list').parent().remove();
			}	
		}

		return;
		
	}


    this.renderNewMessage = function (message){
    	
		var m= JSON.parse(message);
		//console.log(m);
		
		//m.created_at = m.db_created_at;

		var group_id = m.group_id;
		var sender_id = m.sender_id;
		var sender_name = m.sender_name;
		if(member_name != null){
			var member_name = (m.group_deleted_user_id === this.user_id)?'You':m.member_name;
		}else{
			var member_name = null;
		}
		var group_deleted_user_id = m.group_deleted_user_id;

		var message_key_rel = (group_id)?'_group_'+group_id:'_user_'+sender_id;
		var data_key = this.getActiveChatPanel();
		var aData = this.activeChatPanelData;

		if(typeof this.message_data[message_key_rel] == "undefined"){

			this.message_data[message_key_rel] = {list:[],next_offset:0,max_row:0};
		}

		this.message_data[message_key_rel]['list'].unshift(m);
		if(this.message_data[message_key_rel]['next_offset'] !==null){
			this.message_data[message_key_rel]['next_offset']++;
		}
		this.message_data[message_key_rel]['max_row']++;


		var hasChatList = $("#chat-list li."+message_key_rel);

			if(hasChatList.length){
				// alert(hasChatList);
				$("#chat-list").prepend(hasChatList);
				hasChatList.find('.last_message').html(this.printMessage(m.message,member_name,sender_name));
			    hasChatList.find('.last_message_time').text(this.printHumanTime(m.created_at));
			    hasChatList.find('.last_message_time').attr('data-time',m.created_at);
			}

		if(data_key == message_key_rel){

			// you are already on the current chat panel
			if($('#chat_area_list').find('li[data-message-id="'+m.message_id+'"]').length > 0){
				return;
			}

			var date =  moment(new Date()).format('YYYY-MM-DD HH:mm:ss');


			var date = _this.getDate(date);

			var l = this.messageListHtml(m);

			var listObject = $('#chat_area_list').find('ul#date-history-'+date);

			if(listObject.length ==0){

				$('#chat_area_list').append('<ul class="list-unstyled" id="date-history-'+date+'"><div class="team-chat-date date_filter"><span>'+_this.printHumanDate(date)+'</span></div>'+l+'</ul>');
			}else{			
				listObject.append(l);
			}	

			chat.readMessage(aData.list_id);	
			

			this.scrollDownChat();

		}else{
			var hasChatList = $("#chat-list li."+message_key_rel);

			if(hasChatList.length){
				// alert(hasChatList);
				$("#chat-list").prepend(hasChatList);
			 	//var unread =  hasChatList.find('.unread_count').text();
			    hasChatList.find('.last_message').html(this.printMessage(m.message,member_name,sender_name));
			    hasChatList.find('.last_message_time').text(this.printHumanTime(m.created_at));
			    hasChatList.find('.last_message_time').attr('data-time',this.printTimeNumber(m.created_at));
			 	
			 	if(hasChatList.find('.unread_count').length){
			 		var unread =  hasChatList.find('.unread_count').text();
			 		unread = parseInt(unread)+1;
			 		hasChatList.find('.unread_count').text(unread);
			 	}else{
			 		var unread = '1';
			 		var html = '<span class="unread-count unread_count">'+unread+'</span>';
			 		hasChatList.find('.chat-dropdown').after( html );
			 	}
			 	//hasChatList.find('.unread_count').text(unread);
			}
			else{

				m.last_message = m.message;
				m.last_message_time = m.created_at;
				m.name = m.sender_name;
				m.user_id = sender_id;
				m.unread = 1;
				
				this.all_conversations['list'].unshift(m);				
				if(this.all_conversations['next_offset'] !==null){
					this.all_conversations['next_offset']++;
				}
				var val  = $('.chat_list_menu').val();

				if (val =='all_conversation')
    			{


					var l = this.chatListHtml(m);
					$('#chat-list-holder li.no-result').remove();
					$('#chat-list-holder').prepend(l);
				}
				else if(val =='group' && (typeof m.group_type == "undefined" || m.group_type == 'Normal')){

					var l = this.chatListHtml(m);
					$('#chat-list-holder li.no-result').remove();
					$('#chat-list-holder').prepend(l);
				}
			}

			
			//$('#individual-chat-list').trigger('click');
			
		}

		this.identifyMesaage(m,message_key_rel);

		// $('audio').load();

	}


	this.activeChatPanelIs = function (){

		var k =  chat.getActiveChatPanel();
        var isOneToOne = k.indexOf("_user");
        return (isOneToOne !=-1)?'one_to_one':'group';
	}


	this.updateOnlineStatus =  function(){

		var _this = this;
		$('body .user_online_status').each(function(){
	        var user_id = $(this).attr('data-id');
	        if(user_id != "-1"){
		        var url = base_url+'/socialchat/lastLogin';
		        var online_status;
		        function get_status(qwer,callback){
			        $.ajax({
			            url:url,
			            data:{user_id:user_id},
			            success:callback,
			        });
			    }
	        }
	        //var online_status = (typeof _this.online_users[user_id] !="undefined" )?'Online':'Last Seen: '+moment(userObj.last_login_time).format('LLL');
	        $(this).removeClass('typing');

	        if(user_id =="-1"){

	            $(this).attr('data-onlinestatus','');
	            $(this).attr('data-id','-1');
	            $(this).html('&nbsp');
	        }
	        else{
	        	get_status('', function(response) {

					var response = JSON.parse(response);
					var utctime = moment.utc(response.last_login_time);
					var last_date = moment(Date.parse(response.last_login_time)).format('L');
	                var current_date = moment().format('L');
					var a = moment.tz(Date.parse(last_date),this.serverTimeZone);
					
	                var new_date = a.tz(moment.tz.guess()).format('L');

	                var lastToday = moment(Date.parse(utctime)).format('LLL');
	                var b = moment.tz(Date.parse(lastToday),this.serverTimeZone);
	                var last_today = b.tz(moment.tz.guess()).format('LT');

	                var lastSeen = moment(Date.parse(utctime)).format('LLL');
	                var c = moment.tz(Date.parse(lastSeen),this.serverTimeZone);
	                var last_see = c.tz(moment.tz.guess()).format('LLL');

	                if(current_date == last_date){
	                    var last_seen = 'Last Seen:Today at '+last_today;
	                }
	                else{
	                    var last_seen = 'Last Seen: '+last_see;
	                }
	                online_status = (typeof  _this.online_users[user_id] !="undefined" )?'Online':last_seen;

		            if(typeof $(this).attr('data-last_online_time') != "undefined" ){

		            	$(this).text($(this).attr('data-last_online_time'));
		            }
		            else{
		            	$('.user_online_status').text(online_status);
		            }
		        	if(online_status =='Online'){
		        		$("ul").find("[data-receiver_id="+user_id+"]").find(".online-status").remove();
		        		$("ul").find("[data-receiver_id="+user_id+"]").find(".img-message").append('<span class="online-status user_online_status" data-id="'+user_id+'" data-onlinestatus="online"></span>');
		        		
		        		$(this).removeAttr('data-last_online_time');
		        	}else{
		        		$("ul").find("[data-receiver_id="+user_id+"]").find(".online-status").remove();
		        	
		        	}
		            $(this).attr('data-onlinestatus',online_status);
	        	});
	        }

	  });
	}

	this.getChatList = function(callback){

		var _this = this;

		var data = {  user_id: _this.user_id,offset:0,s:_this.all_conversations.s};

		if( _this.all_conversations.next_offset && $('.friend-list').find('.chat_list').length > 0 ) {

			data.offset = _this.all_conversations.next_offset;
		}
		else if( typeof _this.all_conversations.next_offset !="undefined"  )
		{

			if(_this.all_conversations.next_offset ==null){
				$('.friend-list').find('.load_more_chat_list').parent().remove();
			}
			
			if($('.friend-list').find('.chat_list').length ==0 && _this.all_conversations['list'].length > 0){
				_this.renderChatList();			

				if(typeof callback =="function"){

					callback();
				}

				return false;
			}

			return false;
		}

		if(typeof this.user.tracking != "undefined" && this.user.tracking ){

			data.for_admin = 1;
		}

		_this.setLoader($('.member_list'));

		$.ajax({
			headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
			url:base_url+'/socialchat/chatList',						
			data: JSON.stringify(data),
			contentType: 'application/json',
    		dataType: 'json',
    		type: 'post',
			success:function(response, status, xhr){
				// console.log(response);
				_this.removeLoader($('.member_list'));

				_this.serverTimeZone = response.serverTimeZone;

				if(typeof response.data != "undefindex" && response.data.length >0){
					$.each(response.data,function(k,v){

						_this.all_conversations['list'].push(v);
					});				

					_this.all_conversations['next_offset'] = response.data.next_offset;

					
				}
				_this.renderChatList(response.data);			

				if(typeof callback =="function"){

					callback(response);
				}

			} 
		});
	}

	this.getChatList(function(){
		$('#individual-chat-list').parent().addClass('active');

		$('#chat-list').find('li:first').trigger('click');


		$(".group-tags-name").each(function() {
                var id = $(this).data('id')
                $("#"+id+'_group_tags').text($(this).data('list_name'));
            });
	});




	this.renderChatList = function(Last_list)
	{
		var _this = this;
		if(_this.all_conversations.s){
			$('#chat-list').html('');
		}	

		// if((Last_list).length == 0){
		// 	$('#chat-list').append(_this.chatListNoData());
		// }

		if(_this.all_conversations['list'].length ==0){

			$('#chat-list').append(_this.chatListNoData());
		}
		else{

			var list = [];
			if($('.chat-list').find('#chat-list').length >0 ){
				list = Last_list;

			}else{

				list = _this.all_conversations['list'];
			}
			$.each(list,function(k,v){

				//unread
				var h = _this.chatListHtml(v);
				if(h){
					$('#chat-list').append(h);
				}
			});
			if(_this.all_conversations['next_offset']){

				if(!$('.friends-list').find('.load_more_chat_list').length){

					$('.friends-list').children().children().append('<p class="load_more_wrap"><a href="javascript:;" class="load_more_chat_list">Load More..</a></p>')						
				}
			}
			else{

				$('.friends-list').find('.load_more_chat_list').parent().remove();
			}	
		}

		return;
		
	}

	
	this.checkImage = function(imageSrc) {
	    return new Promise(resolve => {
		    const img = new Image();
		    img.src = imageSrc;
		    img.onload = () => resolve(imageSrc);
		    img.onerror = () => resolve(APP_URL+'assets/images/default_user.png');
		  });
	}

	this.chatListHtml = function(list){
		var chat_id = list.chat_id;
		var email =list.email;
		if(list.first_name == '')
			var name = this.unicodeToChar(list.name);
		else
			var name = this.unicodeToChar(list.first_name+' '+list.last_name);
		
		var list_name = list.group_id?this.unicodeToChar(list.group_name):name;
		var is_group = list.group_id?1:0;
		var group_type = (typeof list.group_type =="undefined")?0:list.group_type;

		//var last_message = (list.last_message)?this.printMessage(list.last_message,true):'';
		var last_message_time = (typeof list.last_message_time != 'undefined' && list.last_message_time)?this.printHumanTime(list.last_message_time):false;
		var last_message_time_n = (typeof list.last_message_time != 'undefined' && list.last_message_time)?list.last_message_time:false;
		var group_id = list.group_id;
		var receiver_id = list.user_id;
		var unread = list.unread_no;
		var last_seen = list.last_login_time;

		//var user_image = list.profile_picture1;
		if(list.image != null && list.image != ''){
			user_image = APP_URL+'/adminPanel/uploads/'+list.image;
		}else{
			user_image = APP_URL+'assets/images/default_user.png';
		}

		if(is_group == '1'){
			if(list.group_icon != null){
				user_image = list.group_icon;
			}else{

				user_image = APP_URL+'assets/images/group-default-icon.png';
			}
		}
		var toggle_image = APP_URL+'/images/chat-toggle.png';
		// var user_image = (typeof list.user_image_thumb  !="undefined" && list.user_image_thumb)?list.user_image_thumb:this.defaul_user_image;

		var unique_class = (is_group)?'_group_'+group_id:'_user_'+receiver_id;	
        var online_status = (typeof _this.online_users[receiver_id] !="undefined" )?'online':'offline';

		if($('.member_list').find('.'+unique_class).length){

			return;
		}


		var l = '<li class="left clearfix chat_list '+unique_class+'" data-last_seen="'+last_seen+'" data-list_chat_id="'+chat_id+'" data-receiver_id="'+receiver_id+'" data-group_id="'+group_id+'" data-is_group="'+is_group+'" data-list_name="'+list_name+'" data-list_icon="" data-group_type="'+group_type+'">';
			l += '<div class="list-desc offline">';
            	l += '<div class="img-message chat-circle-image" >';
					l += '<img src="'+user_image+'" alt="User Avatar" class="img-circle">';
					if(online_status == 'online' && group_type != 'broadcast'){
						l += '<span class="online-status user_online_status" data-id="'+receiver_id+'" data-onlinestatus="'+online_status+'"></span>';
					}
            	l += '</div>';
            	l += '<div class="message-desc">';
            	if(chat_id)
            	l += '<h2 class="group-tags-name" data-list_name="'+list_name+'" data-id="'+chat_id+'" id="'+chat_id+'_group_tags"  data-receiver_id="'+receiver_id+'">'+list_name+'</h2>';
            	else
            	l += '<h2 class="group-tags-name" data-list_name="'+list_name+'" data-id="'+chat_id+'" >'+list_name+'</h2>';


            	if(email != undefined){

            	l+= '<p class="last_message">'+email+'</p>';
            	}
				l += '<p class="last_message">'+this.identifyMesaage(list,null,true)+'</p>';
				l += '</div>';	
           
		     	if(last_message_time){
                		l += '<span class="message-time last_message_time chat_time" data-time="'+last_message_time_n+'">'+last_message_time+'</span>';
                	}
             //    if(group_type != 'broadcast' && group_type != 0){
             //    	l += '<div class="chat-list chat-dropdown active">';
             //            l += '<a href="#">';
             //                l += '<img src="'+toggle_image+'">';
             //                l += '</a>';


	            //                 l += '<div class="chat-toggle" style="display: none;">';
	            //                     l += '<ul>';
	            //                         l += '<li><a href="#" class="delete_chat" data-chat_id="'+chat_id+'">Delete</a></li>';
	            //                     l += '</ul>';
	            //                 l += '</div>';
             //            l += '</div>';
	            // }

            	if(typeof unread != "undefined" && unread > 0){
            		
            		l += '<span class="unread-count unread_count">'+unread+'</span>';
            	}else{
            		//l += '<span class="badge pull-right unread_count">&nbsp;</span>';
            	}	
                
            l += '</div>';
         //_this.online_users
         

        l += '</li>';

        return l;
	}


	this.getMessageList = function(receiver_id,isGroup,load_more){

		var _this = this;

		load_more  = (typeof load_more =="undefined")?false:true;

		var data = {  user_id: _this.user_id,offset:0,last_message_id:0};

		var url = 'oneToOneMessageList';
		var data_key = '';
		if(!isGroup){
			data.receiver_id = receiver_id;
			url = 'socialchat/oneToOneMessageList';
			data_key = '_user_'+receiver_id;
		}else{
			data.group_id = receiver_id;
			url = 'socialchat/get_group_message_list';
			data_key = '_group_'+receiver_id;
		}

		if(typeof _this.message_data[data_key] != "undefined"){

			var _m_data = _this.message_data[data_key];
			// console.log(_m_data);
			data.offset = _m_data.next_offset;
			
		}else{

			_this.message_data[data_key] = {list:[],next_offset:0,max_row:0};
		}


		// this.setLoader($('#chat_area'));
		$.ajax({
			headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
			url:base_url+'/'+url,						
			data: JSON.stringify(data),
			contentType: 'application/json',
    		dataType: 'json',
    		type: 'post',
			success:function(response, status, xhr){
				// _this.removeLoader($('#chat_area'));

				$.each(response.data,function(k,list){

					_this.message_data[data_key]['list'].push(list);

				});
				_this.message_data[data_key]['next_offset'] = response.next_offset;
				_this.message_data[data_key]['max_row'] = parseInt(response.max_row);
				_this.renderDataInList(data_key,response.data,load_more);
				
			}   
		});
	}

	this.identifyMesaage = function(data,data_key,returnHtml){

		var returnHtml = (typeof returnHtml != "undefined")?returnHtml:null;

		var cList = $('.main_section').find('.chat_list.'+data_key);
		var attachment = (typeof data.media_url != "undefined")?data.media_url:null;
		var attachment_type = (typeof data.chat_type != "undefined")?data.chat_type:null;
		var message = data.last_message;
		if(data.member_name != null){
			var member_name = (data.group_deleted_user_id === this.user_id)?'You':data.member_name;
		}else{
			var member_name = null;
		}
		var sender_name = (data.sender_id ==this.user_id && typeof user_id =="undefined")?'You':data.send_name;
		var mData  = '';
		if(attachment){

			if(attachment_type && attachment_type == 1){
				mData += 'Image';
				//mData += '<i class="fa fa-camera-retro"></i>';
			}
			else if(attachment_type && attachment_type == 2){

				//mData += '<i class="fa fa-video-camera"></i>';
				mData += 'Video';
			}
			else if(attachment_type && attachment_type == 3){

				//mData += '<i class="fa fa-file-audio-o"></i>';
				mData += 'Audio';
			}
			else{
				
				//mData += '<i class="fa fa-file"></i>';
				mData += 'File';
			}
		}
		else{
			mData = (message)?this.printMessage(message,member_name,sender_name):'';
		}

		if(returnHtml){
			return mData;
		}

		var list_name = data.group_id?data.group_name:data.first_name;

		var last_message_time = (typeof data.created_at != 'undefined' && data.created_at)?this.printHumanTime(data.created_at):false;
		var last_message_time_n = (typeof data.created_at != 'undefined' && data.created_at)?this.printTimeNumber(data.created_at):false;

		cList.find('.chat-img img').attr('src',data.profile_picture1);
		cList.find('.header_sec .primary-font').text(list_name);
		if(last_message_time){
			cList.find('.last_message_time').attr('data-time',last_message_time_n);
			cList.find('.last_message_time').text(last_message_time);
		}

		cList.find('.last_message').html(mData);
		cList.attr('data-list_name',list_name);
		cList.attr('data-list_name',list_name);
		cList.attr('data-list_icon',data.user_image_thumb);
	}


	this.renderDataInList = function(data_key,last_data,load_more){
		var _this = this;
		var message_data = this.message_data[data_key];

		var list_length = $('#chat_area_list').find('li').length;

		if(_this.message_data[data_key].list.length>0){
			
		}
			
		if(list_length ==0 ){

			$.each(message_data.list,function(k,v){
				_this.prependMessageList(v);
			});

		}
		else if(typeof last_data != "undefined"){

			$.each(last_data,function(k,v){
				
				if(load_more){
					_this.prependMessageList(v);
				}
				else{
					_this.appendMessageList(v);
				}
			});			
		}

		if(!message_data.next_offset){

			$('.load_more_message').addClass('hide');

		}
		else{

			$('.load_more_message').removeClass('hide');
		}

		if(!load_more){
			_this.scrollDownChat();
		}
	}


	this.getContactList = function (callback){

		var _this = this;

		var data = {  user_id: _this.user_id,offset:0,s:_this.all_contact_list.s};


		if( _this.all_contact_list.next_offset && $('.member_list').find('.chat_list').length > 0 ){

			data.offset = _this.all_contact_list.next_offset;
		}
		
		else if( typeof _this.all_contact_list.next_offset !="undefined"  )
		{	
			if( _this.all_contact_list.next_offset ==null){
				
				$('.member_list').find('.load_more_chat_list').parent().remove();
			}

			if($('.member_list').find('.chat_list').length ==0 && _this.all_contact_list['list'].length > 0){

				_this.renderContactList();			

				if(typeof callback =="function"){

					callback();
				}

				return;
			}

			return;
		}

		if(typeof this.user.tracking != "undefined" && this.user.tracking ){

			data.for_admin = 1;
		}

		_this.setLoader($('.member_list'));

		$.ajax({
			headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
			url:_this.site_url+'socialchat/getContactList',						
			data: JSON.stringify(data),
			contentType: 'application/json',
    		dataType: 'json',
    		type: 'post',
			success:function(response, status, xhr){
				//console.log(response.chat.data);
				_this.removeLoader($('.member_list'));

				_this.serverTimeZone = response.serverTimeZone;

				if(typeof response.chat.data != "undefindex" && response.chat.data.length >0){
					
					$.each(response.chat.data,function(k,v){
						_this.all_contact_list['list'].push(v);
					});					

					_this.all_contact_list['next_offset'] = response.chat.data.next_offset;

					
				}
				_this.renderContactList(response.chat.data);			

				if(typeof callback =="function"){

					callback(response);
				}

			}   
		});
	}

	this.renderContactList = function(Last_list){

		var _this = this;

		if(_this.all_contact_list.s){
			$('#chat-list').html('');
		}

		if((Last_list).length == 0){
			$('#chat-list').append(_this.chatListNoData());
		}		

		if(_this.all_contact_list['list'].length ==0){

			$('#chat-list').append(_this.chatListNoData());
		}
		else{

			var list = [];
			if($('.chat-list').find('#chat-list').length >0 ){

				list = Last_list;

			}else{

				list = _this.all_contact_list['list'];
			}


			$.each(list,function(k,v){
				var h = _this.chatListHtml(v);
				//console.log(h);
				if(h){
					$('#chat-list').append(h);
				}
			});

			if(_this.all_contact_list['next_offset']){

				if(!$('.friends-list').find('.load_more_chat_list').length){

					$('.friends-list').children().children().append('<p class="load_more_wrap"><a href="javascript:;" class="load_more_chat_list">Load More..</a></p>')						
				}
			}
			else{

				$('.friends-list').find('.load_more_chat_list').parent().remove();
			}	
		}

		return;
		
	}


	this.getAllMembers = function($grp_id){
		var group_id = $grp_id;
		var result;
		var jqXHR = $.ajax({
						headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
						url:_this.site_url+'/get_all_members',						
						data: {group_id:group_id},
			    		type: 'post',
			    		async:false,
						success:function(response){
							
							//return response;
							// response.data.forEach(function(element) {
							
							// });
						}  

					});
		return jqXHR.responseText;
	}


	this.scrollDownChat = function (){
		var objDiv = document.getElementById("scrollToBottom");
      	var delay = 300;
		setTimeout(function(){
	    	$("#scrollToBottom").mCustomScrollbar("scrollTo", "bottom");
		},delay);
	}


	this.print = function($heading,$data){
	    var $debug = true;
	    if(!$heading){
	        $heading = "PRINTING DATA START";
	    }

	    if(!$data) {
	    	$data = "NO DATA PROVIDED TO PRINT";
	    }

	    if($debug){
	        console.log('\n\n________________'+$heading+'________________'+'\n\n'+ JSON.stringify($data,null,2)+'\n\n________________PRINTING DATA END________________'+'\n\n');
	    }
	}

	this.printHumanTime = function(time,detail) {
		//console.log(time);
		var time = parseInt(time +'UTC');
		time = new Date(time);
		time = moment(time);
		var localTime = moment(moment(new Date).format('YYYY-MM-DD HH:mm:ss'));

		var duration = moment.duration(localTime.diff(time));
		//console.log(duration);
		var hours = duration.asHours();
		
		if(hours > 24 || typeof detail != "undefined"){
			return time.format('lll');

		}else{
			return time.fromNow();
		}
	}

	this.printTimeNumber = function(time) {
		
		var time = parseInt(time);
		var newtime = new Date(time);

		var a = (time instanceof Date) ? moment(time) : moment(Date.parse(time));
		return a.valueOf();
	}


	this.prependMessageList = function (m){
		var _this = this;
		var time = parseInt(m.created_at);
		var date = new Date(time);
		date = _this.getDate(date);

		var listObject = $('#chat_area_list').find('ul#date-history-'+date);

		if(listObject.length ==0){
			$('#chat_area_list').prepend('<ul class="list-unstyled" id="date-history-'+date+'"><div class="team-chat-date date_filter text-center"><span>'+_this.printHumanDate(date)+'</span></div>'+_this.messageListHtml(m)+'</ul>');
			
		}else{
			listObject.find('.date_filter').after(_this.messageListHtml(m));
		}

		// $('audio').load();
	}

	this.appendMessageList = function (m){

		date = _this.getDate(m.created_at);
		var listObject = $('#chat_area_list').find('ul#date-history-'+date);

		if(listObject.length ==0){

			$('#chat_area_list').append('<ul class="list-unstyled" id="date-history-'+date+'"><div class="team-chat-date date_filter text-center"><span>'+_this.printHumanDate(date)+'</span></div>'+_this.messageListHtml(m)+'</ul>');
		}else{
			listObject.append(_this.messageListHtml(m));
		}

		$('audio').load();
	}

	this.getDate = function(time){
		
		if(time instanceof Date){

			var a = moment(time);
			return a.format('YYYY-MM-DD');

		}
		else{
			var a = moment.tz(Date.parse(time),this.serverTimeZone);
			return a.tz(moment.tz.guess()).format('YYYY-MM-DD');
		}
	}

	this.unicodeToChar =  function(text) {
		
	   return text.replace(/\\u[\dA-F]{4}/gi, 
	          function (match) {
	               return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
	          });
	}


	this.printMessage = function(msg,member_name,sender_name){
		if(member_name != null){
			if(msg == ' left' || msg == ' left ' || msg.includes('changed the subject from') || msg.includes('changed the group icon')){
		 		return sender_name+msg;
			}
		 	else
		 		return sender_name+msg+member_name;
		}else{
			return msg;
		}
		// try{
			
		// 	var m = this.extractIvMessage(msg);
		// 	var decryptedString = (msg)?cryptoLib.decrypt(m.msg,this.shaKey, m.iv):'';

		// }catch(e){
		// 	var decryptedString = '';
		// }

		// var msg = this.unicodeToChar(decryptedString);
		// if(typeof short != "undefined"){
		// 	var t = $('<div>'+msg+'</div>').text();
		// 	var m=  t.substr(0,20);
		// 	var dot_dot =(t.length >20)?'...':'';
		// 	return m +dot_dot;
		// }
		// msg.replace(/\n/g, "<br />");
		// return msg.replace(/\n/g, "<br />");
	}

	this.getaPart = function(str,l)
	{

		var nextPartTill =l;
		nextPartTill = parseInt(nextPartTill.replace(/\*/g,''));

		str = str.slice(l.length,str.length);
		apart = str.slice(0,nextPartTill); 
		str = str.slice(apart.length,str.length);
		
		return {aPart:apart,str:str};
	}


	this.extractIvMessage = function (str)
	{
		var iv ='';
		var msg ='';

		var m = str.match(/^[0-9]{1}((\*\*[0-9])?)+/);

		if(m && typeof m[0] != "undefined"){
			var part =this.getaPart(str,m[0]);
			str = part.str;
			msg += part.aPart;
		}		

		m = str.match(/^[0-9]{1}((\*\*[0-9])?)+/);		
		if(m && typeof m[0] != "undefined"){
			
			var part = this.getaPart(str,m[0]);
			str = part.str;
			iv += part.aPart;
		}

		m = str.match(/^[0-9]{1}((\*\*[0-9])?)+/);		
		if(m && typeof m[0] != "undefined"){
			
			var part = this.getaPart(str,m[0]);
			str = part.str;
			msg += part.aPart;
		}


		m = str.match(/^[0-9]{1}((\*\*[0-9])?)+/);

		if(m && typeof m[0] != "undefined"){

			var part = this.getaPart(str,m[0]);
			str = part.str;
			iv += part.aPart; 
		}


		return {iv:iv,msg:msg};

	}


	this.printHumanDate  = function(date){

		return date = moment(Date.parse(date)).format('YYYY-MM-DD');

		/*if(date ==  moment().format('YYYY-MM-DD') ){

			return 'Today';
		}
		else if(moment(date).format('YYYY-MM-DD') == moment().add(-1, 'days').format('YYYY-MM-DD') ){

			return 'Yesterday';
		}else{

			return moment(date).format('DD MMMM,YYYY');
		}*/
	}


	this.messageListHtml = function (list,user_id,custom_class){
		// console.log(list);

		var sender_name = (list.sender_id ==this.user_id && typeof user_id =="undefined")?'You':list.sender_name;
		var message_id = list.message_id;
		var sender_id = list.sender_id;
		var send_time = list.created_at;
		var default_image = APP_URL + this.defaul_user_image;
		var group_deleted_user_id = list.group_deleted_user_id;
		if(list.member_name != null){
			var member_name = (list.group_deleted_user_id === this.user_id)?'You':list.member_name;
		}else{
			var member_name = null;
		}

		if(list.sender_image != ''){
			var receiver_image = (typeof list.sender_image  !="undefined" && list.sender_image)?APP_URL+'adminPanel/uploads/'+list.sender_image:default_image;
		}else{
			var receiver_image = APP_URL+this.defaul_user_image;
		}
		
		var list_image = receiver_image;
		//console.log(list_image);

		var message = list.message;

		var user_id = (typeof user_id =="undefined")?this.user_id:user_id;
		var iclass = (sender_id ==user_id)?'you':'other';

		if(typeof custom_class != "undefined"){

			iclass = custom_class;
		}

		var dynamic_class = iclass =='you'?'sender-wrapper':'reciever-wrapper';
		//console.log(list);
		var attachment = (typeof list.media_url != "undefined")?list.media_url:null;
		var attachment_type = (typeof list.chat_type != "undefined")?list.chat_type:null;

		var read_status = (typeof list.read_status != 'undefined')?list.read_status:'unread';
		var delivery_status = (typeof list.delivery_status != 'undefined')?list.delivery_status:'undelivered';
		var status_class  = (sender_id == this.user_id)?delivery_status+' '+read_status:'';
		var l = '';

		var deleted_class = (typeof list.deleted_at !="undefined" && list.deleted_at)?'deleted':'';

		var thumb_name = (typeof list.thumb_name  !="undefined" && list.thumb_name)?list.thumb_name:'';


		l += '<li data-sender="'+sender_id+'" class="'+deleted_class+' message-type-'+ list.message_type +' left clearfix '+iclass+' '+dynamic_class+' admin_chat '+status_class+'" data-message-id="'+message_id+'" data-message="'+message+'">';
			if(list.message_type == 'action'){
				l += '<div class="exit-add-group"><p>'+this.printMessage(message,member_name,sender_name)+'</p></div>';
			}else{
				l += '<div class="message-wrapper">';
					l += '<div class="custom-flex align-items-center">';
						if(dynamic_class == "reciever-wrapper"){
							// l += '<div class="chat-person-icon">';
							// 	l += '<img src="'+list_image+'" class="img-circle"/>';
							// l += '</div>';

							l += '<p class="sender_name" data-sender_name="'+list.sender_name+'">'+sender_name+'</p>';
						}
					l += '</div>'

				l += '<div class="message-content">';
					l += '<div class="message-content-detail chat-body1">';
						l += '<div>'+((this.printMessage(message)).replace(/<\/?[^>]+(>|$)/g, ""))+'</div>';

						if(attachment){


							if(attachment_type && attachment_type == '1'){
								var file_name = 'Image';
								l += '<p class="image_wraper"><a title="'+file_name+'" data-lightbox="image-1" data-title="My caption" target="_blank" href="'+attachment+'" download><img src="'+attachment+'" alt="'+file_name+'"></a></p>';
							}
							else if(attachment_type && attachment_type == '2'){
								var file_name = 'Video';
								l+= '<p class="image_wraper video_wrapper"><a href="javascript:void(0)" id="video-trigger"><video width="200" poster="'+thumb_name+'" controls><source src="'+attachment+'" type="video/mp4"></video></a></p>';
							}
							else if(attachment_type && attachment_type == '3'){
								var file_name = 'Audio';
								l+= '<p class="image_wraper audio_wrapper"><audio controls><source src="'+attachment+'" type="audio/mp3"></audio></p>';
							}
							else{
								var file_name = 'File';
								l += '<p class="file_wraper"><i class="fa fa-file" aria-hidden="true"></i> <a title="'+file_name+'" target="_blank" href="'+attachment+'">'+file_name+'</a></p>';
							}
						}
						//list.sender_id ==this.user_id &&
						if( typeof list.group_type != "undefined" && list.group_type == 'CWA'){

							l += '<p class="receiver_name" style="text-align:right"> To: '+list.all_receiver_name+'</p>';
						}
					l += '</div>';
					l += '<span class="chatmessage-time chat_time small text-muted" data-org-time="'+list.created_at+'" data-time="'+send_time+'">'+this.printHumanTime(send_time)+'</span>';
					l += '<span class="msg-status-icon"></span>';
				l += '</div>';

				
			l += '</div>';
			}
			
		l += '</li>';

		return l;
	}

	this.uniqueNumber = function () 
	{

	    var date = Date.now();
	    
	    if (date <= this.uniqueNumber_previous) {
	        date = ++this.uniqueNumber_previous;
	    } else {
	        this.uniqueNumber_previous = date;
	    }
	    return date+'_web';
	}

	uniqueNumber = function () 
	{

	    var date = Date.now();
	    
	    if (date <= this.uniqueNumber_previous) {
	        date = ++this.uniqueNumber_previous;
	    } else {
	        this.uniqueNumber_previous = date;
	    }
	    return date+'_web';
	}

	this.typing = function(){
	
		

		if(!this.active_chat_panel){
			_this.print("chat panel in not active.");
			return;
		}

		var aData = this.activeChatPanelData;
		if(this.activeChatPanelIs() =='one_to_one'){
			this.socket.emit('typing',{
				receiver_id:aData.list_id,
				sender_id:this.user_id,
				sender_name:this.name
			});
			chat.readMessage(aData.list_id);
		}
		else{

			this.socket.emit('typing',{
				group_id:aData.list_id,
				sender_id:this.user_id,
				sender_name:this.name
			});
			this.readGroupMessage(aData.list_id);
		}
	}


	this.readMessage = function(sender_id){

		// if(this.user.tracking != "undefined" && this.user.tracking ===true ){

		// 	return true;
		// }
		socket.emit('chat.message.read',{'sender_id':sender_id,receiver_id:this.user_id});
	}


	this.readGroupMessage = function(group_id){

		// if(this.user.tracking != "undefined" && this.user.tracking ===true ){

		// 	return true;
		// }
		socket.emit('chat.message.read',{'group_id':group_id,receiver_id:this.user_id});
	}

	this.isNumeric  = function (n) {

	  return !isNaN(parseFloat(n)) && isFinite(n);
	}


	this.sendMessage = function(message,attachment,attachment_type,filesize,duration,thumb_name){

		var data_key = this.getActiveChatPanel();
		var attachment = (typeof attachment != "undefined")?attachment:null;
		var chat_type = (typeof attachment_type != "undefined")?attachment_type:0;
		var filesize = (typeof filesize != "undefined")?filesize:0.00;
		var thumb_name = (typeof thumb_name != "undefined" && thumb_name)?thumb_name:null;

		var duration = (typeof duration != "undefined" && this.isNumeric(duration) )?Math.round(duration):0;
		// var delete_after = this.delete_after_time
		var data ={
			//'message_id':this.uniqueNumber(),
			'message':message,
			'sender_id':this.user_id,
			'sender_name':this.name,			
			'read_status':'unread',
			'delivery_status':'undelivered',
			'sender_image':this.icon,
			'duration':duration,
			'group_type':this.group_type,
			'delete_after':this.delete_after_time,
			'profile_picture':this.profile_picture,
			'sender_name':this.name,
			'sender_country_code':this.country_code,
			'sender_mobile':this.sender_mobile,
			'country_iso':this.country_iso,
			'is_deleted':0,
			'is_show_date':0,
			'is_typing':0
		};
		//var now = Date.now();
		data.attachment = attachment;
		data.chat_type = chat_type;
		data.filesize = filesize;
		data.thumb_image = thumb_name;
		data.message_type = 'normal';
		

		if(this.reply_to){
			data.reply_to = this.reply_to;
		}
		if(this.all_receiver_name){
			data.all_receiver_name = this.all_receiver_name;
		}


		
		data.message_id = this.uniqueNumber();
		if(this.activeChatPanelData.is_group){
			var group_id = this.activeChatPanelData.list_id;
			var receiver_id = 'null';
			data.group_id = this.activeChatPanelData.list_id;
			data.group_name = this.activeChatPanelData.name;

		}else{
			var group_id = 'null';
			var receiver_id = this.activeChatPanelData.list_id;
			data.receiver_id = this.activeChatPanelData.list_id;
			data.user_id = this.activeChatPanelData.list_id;
		}

		/*Get Conversation ID*/
		function get_conversation(qwer,callback){
	        var url = base_url+'/socialchat/getConversationId';
	        $.ajax({
	            url:url,
	            data:{userObj:userObj,group_id:group_id,receiver_id:receiver_id},
	            success:callback
	        });
	    }
	    get_conversation('', function(response) {
    		var res = JSON.parse(response);
        	if(response == 'null'){
        		data.conversation_id = uniqueNumber();
        	}else{
        		data.conversation_id = res.conversation_id;
        	}
        	data.created_at = Date.now();
			socket.emit('chat.send.message',data);
	    });

		
		/**Sending Server Time*/
		if(this.localTzDiff != this.serverTzDiff){
			moment.tz.setDefault(this.serverTZ);
		}

		data.created_at =  moment(new Date()).format('YYYY-MM-DD HH:mm:ss');


		var date = _this.getDate(data.created_at);
		
		var listObject = $('#chat_area_list').find('ul#date-history-'+date);

		if(listObject.length ==0){

			$('#chat_area_list').append('<ul class="list-unstyled" id="date-history-'+date+'"><div class="team-chat-date date_filter text-center"><span>'+_this.printHumanDate(date)+'</span></div>'+_this.messageListHtml(data)+'</ul>');
		}else{
			data.created_at = Date.now();
			$('.'+data_key).find('.last_message').html(this.printMessage(message));
			// console.log(data.read_status);
			$('.'+data_key).find('.last_message_time ').html(this.printHumanTime(data.created_at));
			listObject.append(_this.messageListHtml(data));
		}

		if(typeof _this.message_data[data_key] == "undefined"){

			_this.message_data[data_key] = {list:[],next_offset:0,max_row:0};
			
		}

		_this.message_data[data_key]['list'].unshift(data);

		if(_this.message_data[data_key]['next_offset'] !== null){
			_this.message_data[data_key]['next_offset']++;
		}
		_this.message_data[data_key]['max_row']++;

		this.identifyMesaage(data,data_key);
		this.scrollDownChat();

		$(".emojionearea-editor").focus();

		// $('audio').load();
	}


	this.getBroadcastGroupList = function (callback){

		var _this = this;

		var data = {  user_id: _this.user_id,offset:0,group_type:"Broadcast",s:_this.all_broadcast_group.s};

		if( _this.all_broadcast_group.next_offset && $('.member_list').find('.chat_list').length > 0 ){

			data.offset = _this.all_broadcast_group.next_offset;
		}
		
		else if( typeof _this.all_broadcast_group.next_offset !="undefined"  )
		{	
			
			if(_this.all_broadcast_group.next_offset ==null){

				$('.member_list').find('.load_more_chat_list').parent().remove();
			}			

			if($('.member_list').find('.chat_list').length ==0 && _this.all_broadcast_group['list'].length > 0){

				_this.renderBroadcastGroupList();			

				if(typeof callback =="function"){

					callback();
				}

				return ;
			}
			return;
		}

		// if(typeof this.user.tracking != "undefined" && this.user.tracking ){

		// 	data.for_admin = 1;
		// }

		_this.setLoader($('.member_list'));

		$.ajax({
			headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
			url:_this.site_url+'/get_broadcast_list',						
			data: JSON.stringify(data),
			contentType: 'application/json',
    		dataType: 'json',
    		type: 'post',
			success:function(response, status, xhr){
				
				_this.removeLoader($('.member_list'));

				_this.serverTimeZone = response.serverTimeZone;

				if(typeof response.data != "undefindex" && response.data.length >0){
					
					$.each(response.data,function(k,v){

						_this.all_broadcast_group['list'].push(v);
					});					

					_this.all_broadcast_group['next_offset'] = response.data.next_offset;

					
				}
				_this.renderBroadcastGroupList(response.data);			

				if(typeof callback =="function"){

					callback(response);
				}

			}   
		});
	}


	this.exportMessage = function (filename){

		if($('#chat_area_list').find('.admin_chat').length ==0){
			swal("No Chat Available", "", "warning");

          return false;
        }
        var start = 'IQ Rebranding Export - CHAT as at '+moment(new Date()).format('DD-MMM-YYYY hh-mm-ss A');

        var data = [];
        $('#chat_area_list').find('.message-type-normal').each(function(){

          	var li = $(this);

          	var name = li.find('.sender_name').attr('data-sender_name');
          	name = (typeof name =='undefined')?'You':name;

          	var message = li.find('.chat-body1 p:eq(0)').text();

          	var chat_time  = li.find('.chat_time').attr('data-org-time');


          	var utctime = moment.utc(chat_time);

            var lastSeen = moment(Date.parse(utctime)).format('LLL');
            var c = moment.tz(Date.parse(lastSeen),this.serverTimeZone);
            var formatted = c.tz(moment.tz.guess()).format('hh:mm A DD-MMM-YY');


          	// var formatted = moment(parseInt(chat_time)).format('hh:mm A DD-MMM-YY');


          	chat_time = chat.printHumanTime(parseInt(chat_time),true);

          	var img = li.find('.chat-body1 .image_wraper img');
          	var video = li.find('.chat-body1 .video_wrapper video');
          	var audio = li.find('.chat-body1 .audio_wrapper audio');
          	var file_wraper = li.find('.chat-body1 .file_wraper a');
          	var file_url = '';
          
          	if(img.length >0){
              	file_url = img.attr('src');
          	}
          	else if(video.length >0){

            	file_url = video.find('source').attr('src'); 
          	}
          	else if(audio.length >0){

            	file_url = audio.find('source').attr('src'); 
          	}
          	else if(file_wraper.length >0){

            	file_url = file_wraper.attr('href'); 
          	}

          	var dataString = '';

          	//('+message+') '+file_url;
          	if(message){
            	dataString += ' ('+message+')';
          	}
          	if(file_url){
            	dataString += ' (file_link)'+'\n'+file_url;
          	}

          	dataString += '\n'+'by @ '+name+ ' at '+formatted+'\n';

          	data.push(dataString);
          	//csvContent += dataString+ "\n" ;


      	});

        var end = 'End of export';

        filename = (typeof filename =='undefined')?'data.txt':filename;
        data.reverse();        
        var  csvContent = start+ '\n\n'+data.join("\n")+ '\n\n'+end;
        var blob = new Blob([csvContent], { type: 'text/plain;charset=utf-8;' });


        if (navigator.msSaveBlob) { // IE 10+
          
            navigator.msSaveBlob(blob, filename);

        } else {
         
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
	}


	this.chatListNoData = function (){

		var l = '<li class="left clearfix no-result">';
			l += '<span>No recent chat found</span>';
		l += '</li>';

		return l;
	}

	this.renderBroadcastGroupList = function(Last_list)
	{
		var _this = this;		

		if(_this.all_broadcast_group['list'].length ==0){

			$('#chat-list').append(_this.chatListNoData());
		}
		else{

			var list = [];
			if($('.friends-list').find('#chat-list').length >0 ){

				list = Last_list;

			}else{

				list = _this.all_broadcast_group['list'];
			}

			$.each(list,function(k,v){
				var h = _this.chatListHtml(v);
				if(h){
					$('#chat-list').append(h);
				}
			});

			if(_this.all_broadcast_group['next_offset']){

				if(!$('.member_list').find('.load_more_chat_list').length){

					$('.member_list').append('<p class="load_more_wrap"><a href="javascript:;" class="load_more_chat_list">Load More..</a></p>')						
				}
			}
			else{

				$('.member_list').find('.load_more_chat_list').parent().remove();
			}	
		}

		return;
		
	}


	this.sendGroupActionMessage = function(message,group_id,group_name,group_icon,user_id = null,member_name = null,send_to=null){
		// console.log("action masg");
		var data ={
			'message_id':this.uniqueNumber(),
			'message':message,
			'sender_id':this.user_id,
			'sender_name':this.name,			
			'read_status':'unread',
			'delivery_status':'undelivered',
			'sender_image_thumb':this.icon,
			'group_id':group_id,
			'group_name':group_name,
			'group_icon':group_icon,
			'message_type':'action',
			'group_deleted_user_id':user_id,
			'send_to':send_to

		};

		/*Get Conversation ID*/
		function get_conversation(qwer,callback){
			receiver_id = null;
	        var url = base_url+'/socialchat/getConversationId';
	        $.ajax({
	            url:url,
	            data:{userObj:userObj,group_id:group_id,receiver_id:receiver_id},
	            success:callback
	        });
	    }
	    get_conversation('', function(response) {
    		var res = JSON.parse(response);
        	if(response == 'null'){
        		data.conversation_id = uniqueNumber();
        	}else{
        		data.conversation_id = res.conversation_id;
        	}
        	data.created_at = Date.now();
        	data.member_name = member_name;
			// socket.emit('chat.send.message',data);
			socket.emit('chat.send.message',data);
	    });


	}



	this.sendMessageByAnotherBrowser = function (data)
	{
		if(typeof data.group_type != 'undefined' && data.group_type =='CWA' && this.group_type != 'CWA')
		{
			return;
		}	

		var is_group = false;

		if(typeof data.group_id != "undefined" && data.group_id ){
			is_group = true;
		}

		var group_id = data.group_id
        var receiver_id = data.receiver_id;

        var data_key = (!is_group)?'_user_'+receiver_id:'_group_'+group_id;

        // add message in the local list
        if($('.admin_chat[data-message-id="'+data.message_id+'"]').length ==0 ){

	        if(typeof this.message_data[data_key] == "undefined"){

				this.message_data[data_key] = {list:[],next_offset:0,max_row:0};			
			}

			this.message_data[data_key]['list'].unshift(data);

			if(this.message_data[data_key]['next_offset'] !== null){
				this.message_data[data_key]['next_offset']++;
			}
			this.message_data[data_key]['max_row']++;
		}		

        if(this.active_chat_panel == data_key && $('.admin_chat[data-message-id="'+data.message_id+'"]').length ==0 ){
        	
        	// Chat panel is active..
        	var date = this.getDate(data.created_at);
			var listObject = $('#chat_area_list').find('ul#date-history-'+date);

			if(listObject.length ==0){

				$('#chat_area_list').append('<ul class="list-unstyled" id="date-history-'+date+'"><div class="team-chat-date date_filter"><span>'+_this.printHumanDate(date)+'</span></div>'+_this.messageListHtml(data)+'</ul>');
			}else{
				
				listObject.append(this.messageListHtml(data));
			}
        }else{

			var hasChatList = $("#chat-list-holder li."+data_key);

			if(!hasChatList.length){

				data.last_message = data.message;
				data.last_message_time = data.created_at;
				data.name = data.sender_name;
				data.user_id = data.sender_id;
				data.unread = 1;
				
				_this.all_conversations['list'].unshift(data);
				if(_this.all_conversations['next_offset'] !==null){
					_this.all_conversations['next_offset']++;
				}


				var val  = $('.chat_list_menu').val();

				if (val =='all_conversation')
    			{

					var l = _this.chatListHtml(data);
					$('#chat-list-holder li.no-result').remove();
					$('#chat-list-holder').prepend(l);
				}
				else if(val =='group' && (typeof data.group_type == "undefined" || data.group_type == 'Normal')){

					var l = _this.chatListHtml(data);
					$('#chat-list-holder li.no-result').remove();
					$('#chat-list-holder').prepend(l);
				}

				// var l = _this.chatListHtml(data);
				// $('#chat-list-holder li.no-result').remove();
				// $('#chat-list-holder').prepend(l);
			}
			
		}

        
		this.identifyMesaage(data,data_key);

		// $('audio').load();
	}

	this.socket.on('chat.new.message.'+_this.user_id,function(message){
		_this.renderNewMessage(message);
	});
	

	// Listen for Delivered message ..

	this.socket.on('chat.message.delivered.'+_this.user_id,function(undelivered){

		var undelivered = JSON.parse(undelivered);	
		var receiver_id = undelivered.receiver_id;	
		var messages = undelivered.status;	
		var group_id = (typeof undelivered.group_id !="undefined" && undelivered.group_id)?undelivered.group_id:false;	
		var message_key_rel = (group_id)?'_group_'+group_id:'_user_'+receiver_id;

		if(typeof _this.message_data[message_key_rel] != "undefined"){

			$.each(_this.message_data[message_key_rel]['list'],function(k1,v1){


				$.each(messages,function(ud_k,ud_m){

					if(ud_m.message_id == v1.message_id){

						v1.delivery_status = 'delivered';
						var message_object = $('#chat_area_list li[data-message-id="'+ud_m.message_id+'"]');
						if(!message_object.hasClass('read') || !message_object.hasClass('undelivered'))
						{
							message_object.addClass('delivered');
							message_object.removeClass('undelivered');
						}
					}
				});

			})
		}

	});


	// When SMS Read

	this.socket.on('chat.message.read.'+_this.user_id,function(undelivered){
		var undelivered = JSON.parse(undelivered);	
		var receiver_id = undelivered.receiver_id;	
		var group_id = (typeof undelivered.group_id !="undefined" && undelivered.group_id)?undelivered.group_id:false;	
		var messages = undelivered.status;	
		var message_key_rel = (group_id)?'_group_'+group_id:'_user_'+receiver_id;
		
		if(typeof _this.message_data[message_key_rel] != "undefined"){

			$.each(_this.message_data[message_key_rel]['list'],function(k1,v1){
				$.each(messages,function(ud_k,ud_m){

					if(ud_m.message_id == v1.message_id){

						v1.read_status = 'read';
						var message_object = $('#chat_area_list li[data-message-id="'+ud_m.message_id+'"]');
						if(!message_object.hasClass('read'))
						{
							message_object.addClass('read');
							message_object.removeClass('unread');
							var data = {  messageid: v1.message_id};

						}
					}
				});

			})
		}

	});


	// Some is typing for you 

	this.socket.on('typing.'+this.user_id,function(typer){

		var typer = JSON.parse(typer);
		var sender_id = typer.sender_id;
		var sender_name = typer.sender_name;
		var group_id  = (typeof typer.group_id !="undefined")?typer.group_id:false;
		var data_key = (!group_id)?'_user_'+sender_id:'_group_'+group_id;

		if(_this.active_chat_panel && _this.active_chat_panel == data_key){
			
			if(_this.activeChatPanelData && _this.activeChatPanelData.is_group)
			{
				$('.user_online_status').text(sender_name+ ' is typing.');
			}else{

				$('.user_online_status').text('typing...');
			}

			$('.user_online_status').addClass('typing');

		}
		else if($('.chat_list.'+data_key).length){

			
			var isGroup = $('.chat_list.'+data_key).attr('data-group_id');

			if(isGroup == '1')
			{
				$('.chat_list.'+data_key).find('.user_online_status').text(sender_name+ ' is typing.');
			}else{

				$('.chat_list.'+data_key).find('.user_online_status').text('typing...');
			}

			$('.chat_list.'+data_key).find('.user_online_status').addClass('typing');
		}

	});


	this.socket.on('chat.error.message.sent.'+this.user_id,function(data,error){

		console.error("ERRRRRRRR");
		_this.print('chat.error.message.sent data',data);
		_this.print('chat.error.message.sent error',error);

	});

	this.socket.on('chat.message.insert.'+this.user_id,function(data){

		_this.print('Message Saved',data);
		data = JSON.parse(data)
		_this.sendMessageByAnotherBrowser(data);
	});	

	this.createGroup = function(group_id,group_type){
		var data ={
			'message_id':this.uniqueNumber(),
			'sender_id':this.user_id,
			'sender_name':this.name,			
			'read_status':'unread',
			'delivery_status':'undelivered',
			'sender_image_thumb':this.icon,
			'group_type':group_type,
			'message_type':'action',
		};

		if(this.reply_to){
			data.reply_to = this.reply_to;
		}
		if(group_type == 'normal'){
			//data.message = this.toUnicode('You were added.');
			data.message = 'You were added.';
		}else{
			data.message = this.toUnicode('Broadcast Created.');
		}

		if(this.all_receiver_name){
			data.all_receiver_name = this.all_receiver_name;
		}


		data.group_id = group_id;
		
		socket.emit('chat.send.message',data)
		socket.emit('data.not_stored_chat_list',{user_id:userObj.id});
		socket.emit('chat.group.update.action',{sender_id:userObj.id,group_id:group_id});	
	}
}