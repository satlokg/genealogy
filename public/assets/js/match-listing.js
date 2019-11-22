
    /*=================  for subcategory accordian shadow effect  ======================*/
	/*$(".match-record").click(function() {
	  window.location = $(this).find("#make-div-clickable").attr("href"); 
	  return false;
	});*/
	    (function(){
	        var catId=$("input[name='collapseswitch']").val();
	//console.log('000000000000--------'+ catId);
	        if(catId){
	            //$('#composeMatchPost').collapse('in');
				$('#composeMatchPost').addClass('in');
	        }
	    })();
	
	$(window).scroll(function(){
		var lastID = $('.load-more').attr('lastID');
		//if($(window).scrollTop() + $(window).height() > $(document).height() - 100 && lastID!=0 && lastID>=1 && lastID!='' && lastID!=undefined && lastID!='undefined') {
		if ($(window).scrollTop() == $(document).height() - $(window).height() && lastID != 0){
			var req = $.ajax({
					type:'POST',
					url:bpth+'matchmaking/records',
					data:'lastStarId='+lastID,
					beforeSend : function() {
						$('.load-more').show();
					},
					success: function(html) {
						//console.log(html);
						$('.load-more').remove();
						$('#match-records-div').append(html);
						var prodCnt = $("div[class*='match-record']").length;
						setTimeout(function(){
							$('#get-count').empty();
							$('#get-count').html(prodCnt);
						}, 100);
						console.log('bbbbbbbbbbbbbbbbb'+ prodCnt);
					},
					error:function(e){
					  // Error
					}
				});
		}
	});
	
	$('#prodKeyInput').keyup(function() {
		var $rows = $('#match-records .match-record');
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
			reg = RegExp(val, 'i'),
			text;

		$rows.show().filter(function() {
			text = $(this).text().replace(/\s+/g, ' ');
			return !reg.test(text);
		}).hide();
	});
	
	$('#myInput').keyup(function() {
	var $rows = $('#match-records .match-record');
	var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
		reg = RegExp(val, 'i'),
		text;

		$rows.show().filter(function() {
			text = $(this).text().replace(/\s+/g, ' ');
			return !reg.test(text);
		}).hide();
		$('#searchGlobal').attr('href', bpth+'buysell/category_search?c_k='+$(this).val());
	});
	
	$(".collapse").on('show.bs.collapse hide.bs.collapse', function(e){
        var icon=$(e.target).prev().find("i");
        if(icon.hasClass("fa-plus")){
            icon.removeClass("fa-plus").addClass("fa-minus");
        }
        else{
            icon.removeClass("fa-minus").addClass("fa-plus");
        }
    });
	
	
	
	function sortRecordsByPopularity(selectedTyp){
		var request = $.ajax({
			type: 'POST',
			url: bpth+'matchmaking',
			cache: false,
			data: {selectedTyp: selectedTyp}
		});
		
		request.done(function(data) {
			//var dt = JSON.parse(data);
			//console.log(data);				
		});

		request.fail(function(jqXHR, textStatus) {
			$('#ActionFailed').modal({backdrop: 'static', keyboard: false});
		});
	}
	
	function trackViewedprofileVisitor(matchid, matchuserid, currentuserid){
		//console.log(matchid+', ' + matchuserid+', '+currentuserid);
		if ( matchid && matchuserid && currentuserid ){
			var request = $.ajax({
				type: 'POST',
				url: bpth+'matchmaking/trackViewedprofileVisitor',
				cache: false,
				data: {matchid: matchid, matchuserid: matchuserid , currentuserid: currentuserid}
			});
			request.done(function(data) {
				//var dt = JSON.parse(data);
				//console.log(data);				
			});

			request.fail(function(jqXHR, textStatus) {
				$('#ActionFailed').modal({backdrop: 'static', keyboard: false});
			});
		}
	}

	function acceptDeclineConnectionReq(currUsrProfileId,senderId,ReceiverId,friendStatus,desicion){
		$('#reqAcceptBtn-'+ currUsrProfileId).attr('disbaled', 'disabled');
		var request = $.ajax({
			type: 'POST',
			url: bpth+'matchmaking/manageconnectionreq',
			cache: false,
			data: {currUsrProfileId: currUsrProfileId, senderId: senderId , ReceiverId: ReceiverId , friendStatus: friendStatus, desicion: desicion}
		});
		request.done(function(data) {
			//var dt = JSON.parse(data);
			//console.log(data);
			if( data == 'failed' ){
				$('#messageInformation').modal({backdrop: 'static', keyboard: false});
				$('#messageInformation #msgtodisplay').html('Something went wrong. Please <a onclick="location.reload();">Click here</a> to try again.');
				return false;
			} else {
				if( desicion == 'accept' ){
					$('#reqDeclineBtn-'+ currUsrProfileId).hide();
					$('#reqAcceptBtn-'+ currUsrProfileId).html('Accepted');
					$('#reqAcceptBtn-'+ currUsrProfileId).removeAttr('onclick');
					$('#reqAcceptBtn-'+ currUsrProfileId).attr('disabled', 'disbaled');
					location.reload();
				} else if( desicion == 'cancel' ){
					$('#cancelBtn-'+ currUsrProfileId).html('Connect');
					$('#cancelBtn-'+ currUsrProfileId).removeAttr('onclick');
					location.reload();
				} else if( desicion == 'decline' ){
					$('#reqAcceptBtn-'+ currUsrProfileId).hide();
					$('#reqDeclineBtn-'+ currUsrProfileId).html('Request Declined');
					$('#reqDeclineBtn-'+ currUsrProfileId).addClass('btn btn-danger');
					$('#reqDeclineBtn-'+ currUsrProfileId).css('border-color', '#d43f3a');
					$('#reqDeclineBtn-'+ currUsrProfileId).removeAttr('onclick');
					//location.reload();
				}
			}
		});

		request.fail(function(jqXHR, textStatus) {
			$('#ActionFailed').modal({backdrop: 'static', keyboard: false});
		});
	}
	
	function manageConnectionReq(matchId,senderId,ReceiverId,friendStatus,desicion,ifMatchExists){
		if ( ifMatchExists == 0 ){
			$('#matchValidateModal').modal('show'); 
		} else {
			$('#connectionBtn-'+ matchId).attr('disabled', 'disabled');
			var request = $.ajax({
					type: 'POST',
					url: bpth+'matchmaking/managerequest',
					cache: false,
					data: {action: 'friendRequestManage', matchId: matchId, senderId: senderId , ReceiverId: ReceiverId , friendStatus: friendStatus, desicion: desicion}
				});

				request.done(function(data) {
					//var dt = JSON.parse(data);
					//console.log(dt);
					if( data == 'already sent' ){
						$('#messageInformation').modal({backdrop: 'static', keyboard: false});
						$('#messageInformation #msgtodisplay').html('You have already sent a connection request to this user. <a onclick="location.reload();">Click here</a> to view other users.');
						return false;
					} else if( data == 'connection error' ){
						$('#ActionFailed').modal({backdrop: 'static', keyboard: false});
						return false;
					} else {
						$('#connectionBtn-'+ matchId).html('Cancel Request');
						$('#connectionBtn-'+ matchId).removeAttr('disabled');
						$('#connectionBtn-'+ matchId).attr('onclick', 'acceptDeclineConnectionReq("'+matchId+'","'+senderId+'","'+ReceiverId+'","'+desicion+'","cancel")');
					}
				});

				request.fail(function(jqXHR, textStatus) {
					$('#ActionFailed').modal({backdrop: 'static', keyboard: false});
				});
		}
	}
	
	function favoirateMatch(match_id){
		//console.log(match_id + ' ppp ' + cat_id + ' ppp ' + subcat_id); return;
		var status = $('#match-fav-a-'+match_id).attr('data-status');
		var request = $.ajax({
				type: 'POST',
				url: bpth+'matchmaking/favmatch',
				cache: false,
				data: {match_id : match_id, status: status},
			});

			request.done(function(data) {
				var dt = JSON.parse(data);
				//console.log(JSON.stringify(dt.allMatches));
				if(dt.allMatches){
					$.each(dt.allMatches, function( i, v ) {
						if(v.favs && v.favs.singleMatchFavs){
							if( match_id == v.id ){
								$('#fav-match-count-'+match_id).html('');
								$('#fav-match-count-'+match_id).html(' &nbsp;'+( (v.favs.singleMatchFavs[0].matchFavCount>0) ? v.favs.singleMatchFavs[0].matchFavCount : '') );
								console.log('ppp'+ v.favs.singleMatchFavs[0].user_fav_match + ' == ' + v.favs.singleMatchFavs[0].current_user_id);
								if(v.favs.singleMatchFavs[0].user_fav_match == v.favs.singleMatchFavs[0].current_user_id){
									$("#match-fav-a-"+match_id).attr("data-status", "0");
								} else {
									$("#match-fav-a-"+match_id).attr("data-status", "1");
								}
							}
						} else {
							if( match_id == v.id ){
								$('#fav-match-count-'+match_id).html('');
								$("#match-fav-a-"+match_id).attr("data-status", "1");
							}
						}
					});
					if(status == 1){
						//console.log('aaaaaaaaa' + status);
						$('#fav-icn-'+match_id).css({"color": "#f90202"});
					} else {
						//console.log('qqqqqqqqqqq' + status);
						$('#fav-icn-'+match_id).css({"color": "#777"});
					}
				}
			});

			request.fail(function(jqXHR, textStatus) {
				$('#ActionFailed').modal({backdrop: 'static', keyboard: false});
			});
	}
	
	$(document).ready(function(){
		var cnt=0;
		var bsurl = $("#m_fl_inpt").attr('data-url');
		console.log(bsurl);
		if (window.File && window.FileList && window.FileReader) {
			$("#m_fl_inpt").on("change", function(e) {
				var filesCnt = $(this).attr('data-count');
				var files = e.target.files,
					filesLength = files.length;
				//var sm = parseInt(filesCnt) + 1;
				var cont = parseInt(filesCnt) + parseInt(filesLength);
				$(this).attr('data-count', cont);
					console.log(filesLength + ', ' +cont);
				for (var i = 0; i < filesLength; i++) {
					if(cont <= 6){
						var f = files[i]
						var fileReader = new FileReader();
							fileReader.onload = (function(e) {
								var file = e.target;
								var rr=/^data:image/;
								var ext=rr.test(file.result);
								if(ext){
									$("<span class=\"pip\" style='width:80px;'>" +
									"<img style='height:80px; width:80px;' class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
									"<br/><span class=\"remove\"><i class='fa fa-times-circle' aria-hidden='true'></i></span>" +
									"</span>").appendTo("#imagesPrev").click(function(){
										$(this).find(".remove").parent(".pip").remove();
										cnt--;
									});
								} else {
									$("<span class=\"pip\" style='width:80px;'>" +
										"<img style='height:80px; width:80px;' class=\"imageThumb\" src=\"" + bsurl + "assets/images/video-player.png\" title=\"" + file.name + "\"/>" +
										"<br/><span class=\"remove\"><i class='fa fa-times-circle' aria-hidden='true'></i></span>" +
										"</span>").appendTo("#imagesPrev").click(function(){
											$(this).find(".remove").parent(".pip").remove();
											cnt--;
										});
								}
							});
							fileReader.readAsDataURL(f);
							cnt++;
					} else {
						alert("Six Max upload allowed"); 
						return false;
					}
				}
			});
		} else {
			alert("Your browser doesn't support to File API")
		}
	});
	
	$(document).on("click",".remove",function() {
		$(this).parent(".pip").remove();
		var cnt = $("#m_fl_inpt").attr('data-count');
		//console.log('gggggggggg' + cnt);
		var newCnt = ( cnt - 1 );
		$("#m_fl_inpt").attr('data-count', newCnt);
		var removedImg = $(this).parent(".pip").find('.imageThumb').attr('src');
		//console.log('gggggggggg' + removedImg);
		//console.log('hhhh ' +  bpth+'matchmaking/removeAttachment');
		if ( $(this).parent(".pip").find('.imageThumb').attr('match-id') ) {
			var request = $.ajax({
				type: 'POST',
				url: bpth+'matchmaking/removeAttachment',
				cache: false,
				data: {matchid: $(this).parent(".pip").find('.imageThumb').attr('match-id'), attachmentid: $(this).parent(".pip").find('.imageThumb').attr('attachment-id'), attachmentsrc: $(this).parent(".pip").find('.imageThumb').attr('attachment-src')}
			});
			request.done(function(data) {
				//var dt = JSON.parse(data);
				//console.log(data);				
			});

			request.fail(function(jqXHR, textStatus) {
				$('#ActionFailed').modal({backdrop: 'static', keyboard: false});
			});
		}
		//console.log(removedImg);
	});
	
	    var i=100;
    $("#category-accordion a[data-toggle='collapse']").each(function(){
		if($(this))
        $(this).css({'zIndex':i--})
    });
	