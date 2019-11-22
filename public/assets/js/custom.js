function openCommentBox(frm_id) {
	//console.log($("#openComment_" + frm_id).parents('.openCmPrnt')); return;
	//$('.flip').slideToggle();
	$('#flip-'+frm_id).slideToggle("slow");
}

function sortRecordsBy(v){
	$( "#sort-form-field" ).val(v);
	$( "#sort-form-submit" ).trigger( "click" ); 
}

$('#prodKeyInput').keyup(function() {
	var $rows = $('#forumAppend .forum-post');
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
			reg = RegExp(val, 'i'),
			text;

		$rows.show().filter(function() {
			text = $(this).text().replace(/\s+/g, ' ');
			return !reg.test(text);
		}).hide();
	});

$('#myInput').keyup(function() {
	var $rows = $('#forumAppend .forum-post');
	var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
		reg = RegExp(val, 'i'),
		text;

		$rows.show().filter(function() {
			text = $(this).text().replace(/\s+/g, ' ');
			return !reg.test(text);
		}).hide();
		$('#searchGlobal').attr('href', bpth+'buysell/category_search?c_k='+$(this).val());
		var textLength = $('#myInput').val().length;
		if(textLength >= 1)
			$('.pagination').hide();
		else
			$('.pagination').show();
	});

$(document).ready(function() {
	$("#image3").change(function() {
		$('#image3-demo-parent').html('');
		renderImageURL(this);
	});
	
	$("#image4").change(function() {
		$('#image4-demo-parent').html('');
		renderEditImageURL(this);
	});
	
	$(window).scroll(function(){
		var lastID = $('.load-more').attr('lastID');
		//if($(window).scrollTop() + $(window).height() > $(document).height() - 100 && lastID!=0 && lastID>=1 && lastID!='' && lastID!=undefined && lastID!='undefined') {
		//if ( ( $(window).scrollTop() == $(document).height() - $(window).height() ) && lastID != 0){
		if ($(window).scrollTop() == $(document).height() - $(window).height() && lastID != 0){
			var req = $.ajax({
					type:'POST',
					url:bpth+'forum/records',
					data:'lastForumId='+lastID,
					beforeSend : function() {
						$('.load-more').show();
					},
					success: function(html) {
						//console.log(html);
						$('.load-more').remove();
						$('#forumAppend').append(html);
						var prodCnt = $("div[class*='forum-post']").length;
						setTimeout(function(){
							$('#get-count').empty();
							$('#get-count').html(prodCnt);
						}, 100);
						//console.log('bbbbbbbbbbbbbbbbb'+ prodCnt);
					},
					error:function(e){
					  // Error
					}
				});
		}
	});
	
});

function favoriteForum(frm_id){
	var status = $('#forum-fav-a-'+frm_id).attr('data-status');
	var request = $.ajax({
			type: 'POST',
			url: bpth+'forum/favforum',
			cache: false,
			data: {frm_id : frm_id, status: status},
		});

		request.done(function(data) {
			var dt = JSON.parse(data);
			//console.log(JSON.stringify(dt.allForums));
			if(dt.allForums){
				$.each(dt.allForums, function( i, v ) {
					if(v.favs && v.favs.singleForumFavs){
						if( frm_id == v.id ){
							$('#fav-forum-count-'+frm_id).html('');
							$('#fav-forum-count-'+frm_id).html(' &nbsp;'+( (v.favs.singleForumFavs[0].forumFavCount>0) ? v.favs.singleForumFavs[0].forumFavCount : ''));
							console.log('ppp'+ v.favs.singleForumFavs[0].user_fav_forum + ' == ' + v.favs.singleForumFavs[0].current_user_id);
							if(v.favs.singleForumFavs[0].user_fav_forum == v.favs.singleForumFavs[0].current_user_id){
								$("#forum-fav-a-"+frm_id).attr("data-status", "0");
							} else {
								$("#forum-fav-a-"+frm_id).attr("data-status", "1");
							}
						}
					} else {
						if( frm_id == v.id ){
							$('#fav-forum-count-'+frm_id).html('');
							$("#forum-fav-a-"+frm_id).attr("data-status", "1");
						}
					}
				});
				if(status == 1){
					//console.log('aaaaaaaaa' + status);
					$('#fav-icn-'+frm_id).css({"color": "#f90202"});
				} else {
					//console.log('qqqqqqqqqqq' + status);
					$('#fav-icn-'+frm_id).css({"color": "#777"});
				}
			}
		});

		request.fail(function(jqXHR, textStatus) {
			console.log( "Request failed: " + textStatus );
		});
}

function openDeleteForumModal(forumID, catID){
	if(forumID){
		var pth = $('#forumPostSpan').attr('data-src');

		//alert(bpth);
		//die;
		if(confirm("Are you sure you want to delete this forum?")){
			var request = $.ajax({
				type: 'POST',
				url: bpth+'forum/deleteforum',
				cache: false,
				data: {forumID: forumID, catID: catID},
			});

			request.done(function(data) {
				var dt = JSON.parse(data);
				//console.log(JSON.stringify(dt));
				setTimeout(function () {
					$('#loading-'+forumID).html('<img src="'+pth+'assets/images/loading.gif" id="imgloder"/>');
					$('#forum-post-'+forumID).remove();
					//$('.load-more').show();
				}, 3000);
			});
			
			request.fail(function(jqXHR, textStatus) {
				console.log( "Request failed: " + textStatus );
			});
		} else {
			return false;
		}
	}
}





function openDeleteSocialModal(socialID, catID){
	if(socialID){
		var pth = $('#socialPostSpan').attr('data-src');

//alert(pth);
//alert(bpth);
	//	die;
//die;
		if(confirm("Are you sure you want to delete this social post?")){
			var request = $.ajax({
				type: 'POST',
				url: bpth+'social/deletesocial',
				cache: false,
				data: {socialID: socialID, catID: catID},
			});

			request.done(function(data) {

				//alert(data);
				var dt = JSON.parse(data);
				//console.log(JSON.stringify(dt));
				setTimeout(function () {
					$('#loading-'+socialID).html('<img src="'+pth+'assets/images/loading.gif" id="imgloder"/>');
					$('#social-post-'+socialID).remove();
					//$('.load-more').show();
				}, 3000);
			});
			
			request.fail(function(jqXHR, textStatus) {
				console.log( "Request failed: " + textStatus );
			});
		} else {
			return false;
		}
	}
}









function openEditForumModal(forumID){
	if(forumID){
		var pth = $('#imgSrc').val();
		var request = $.ajax({
			type: 'POST',
			url: bpth+'forum/editforum',
			cache: false,
			data: {forumID: forumID},
		});

		request.done(function(data) {
			var dt = JSON.parse(data);
			console.log(pth);
			$('#edit-forum-modal').modal('show');
			$('#editsubject').val(dt.editForum[0].heading);
			$('#editlink').val(dt.editForum[0].youtube_video);	
			
			var str = dt.editForum[0].description;
			var regex = /<br\s*[\/]?>/gi;
			var replaceBr = str.replace(regex, "");
			$("#editmessage").html(replaceBr);
						
			$('#editForumId').val(dt.editForum[0].id);
			$('#editForumPhoto').val(dt.editForum[0].post_photo);
			if ( dt.editForum[0].post_photo && dt.editForum[0].post_photo!='' && dt.editForum[0].post_photo!=null ) {
				if (dt.editForum[0].file_extension=='mp4' || dt.editForum[0].file_extension=='mov' || dt.editForum[0].file_extension=='mpg' || dt.editForum[0].file_extension=='3gp' || dt.editForum[0].file_extension=='ogg' || dt.editForum[0].file_extension=='WEBM' || dt.editForum[0].file_extension=='m4p' || dt.editForum[0].file_extension=='mpv' || dt.editForum[0].file_extension=='mp2' || dt.editForum[0].file_extension=='m4v' || dt.editForum[0].file_extension=='mpe' || dt.editForum[0].file_extension=='mpeg' || dt.editForum[0].file_extension=='video/mp4' || dt.editForum[0].file_extension=='video/mov' || dt.editForum[0].file_extension=='video/3gp' || dt.editForum[0].file_extension=='video/ogg' || dt.editForum[0].file_extension=='video/webm' || dt.editForum[0].file_extension=='video/mpg' || dt.editForum[0].file_extension=='video/mp2' || dt.editForum[0].file_extension=='video/mpeg' || dt.editForum[0].file_extension=='video/mpe' || dt.editForum[0].file_extension=='video/mpv' || dt.editForum[0].file_extension=='video/m4p' || dt.editForum[0].file_extension=='video/m4v') {
					$("<video id='videoedit' height='200' width='200' controls><source src='"+pth + "forum-data/" + dt.editForum[0].post_photo+"'></video>").appendTo("#insertHtm");
				} else if ( dt.editForum[0].file_extension=='mp3' || dt.editForum[0].file_extension=='m4a' || dt.editForum[0].file_extension=='aac' || dt.editForum[0].file_extension=='oga' || dt.editForum[0].file_extension=='audio/mp3' || dt.editForum[0].file_extension=='audio/m4a' || dt.editForum[0].file_extension=='audio/aac' || dt.editForum[0].file_extension=='audio/oga' ) { 
					$('<audio height="200" width="200" id="soundedit" controls><source src="'+ pth + "forum-data/" + dt.editForum[0].post_photo+'"></audio>').appendTo("#insertHtm");
				} else if(dt.editForum[0].file_extension=='png' || dt.editForum[0].file_extension=='jpg' || dt.editForum[0].file_extension=='jpeg'){
					$('<img id="imageedit" height="200" width="200" src="'+ pth + "forum-data/" + dt.editForum[0].post_photo+'" alt="'+dt.editForum[0].post_photo+'" class="img-responsive">').appendTo("#insertHtm");
				}
			} else {
				$("<video id='videoedit' />").appendTo("#insertHtm");
				$('<audio id="soundedit" ></audio>').appendTo("#insertHtm");
				$('<img id="imageedit"/>').appendTo("#insertHtm");
			}
		});

		request.fail(function(jqXHR, textStatus) {
			console.log( "Request failed: " + textStatus );
		});
	}
}


function openEditSocialModal(socialID){

	//alert("hello");
	if(socialID){
		var pth = $('#imgSrc').val();
		//alert(pth);
		var request = $.ajax({
			type: 'POST',
			url: bpth+'social/editsocial',
			cache: false,
			data: {socialID: socialID},
		});

		request.done(function(data) {

			//alert(data);
			var dt = JSON.parse(data);
			console.log(pth);

//alert($('#edit-social-modal').val());
			
			$('#edit-social-modal').modal('show');
			//$('#editdescription').val(dt.editSocial[0].description);
			//$('#editlink').val(dt.editForum[0].youtube_video);	
			$('#insertHtm').empty();
			var str = dt.editSocial[0].description;
			var regex = /<br\s*[\/]?>/gi;
			var replaceBr = str.replace(regex, "");
			 $("#editdescription").val(replaceBr);
			 //$("#post_status").append('<option value="'+dt.editSocial[0].post_status+'" selected>'+dt.editSocial[0].post_status+'</option>');
						
						$("div.input-group-append select").val(dt.editSocial[0].post_status);
			 $('#editSocialId').val(dt.editSocial[0].id);
			 $('#editSocialPhoto').val(dt.editSocial[0].image_audio_video);
			if ( dt.editSocial[0].image_audio_video && dt.editSocial[0].image_audio_video!='' && dt.editSocial[0].image_audio_video!=null ) {
			 	if (dt.editSocial[0].file_extension=='mp4' || dt.editSocial[0].file_extension=='mov' || dt.editSocial[0].file_extension=='mpg' || dt.editSocial[0].file_extension=='3gp' || dt.editSocial[0].file_extension=='ogg' || dt.editSocial[0].file_extension=='WEBM' || dt.editSocial[0].file_extension=='m4p' || dt.editSocial[0].file_extension=='mpv' || dt.editSocial[0].file_extension=='mp2' || dt.editSocial[0].file_extension=='m4v' || dt.editSocial[0].file_extension=='mpe' || dt.editSocial[0].file_extension=='mpeg' || dt.editSocial[0].file_extension=='video/mp4' || dt.editSocial[0].file_extension=='video/mov' || dt.editSocial[0].file_extension=='video/3gp' || dt.editSocial[0].file_extension=='video/ogg' || dt.editSocial[0].file_extension=='video/webm' || dt.editSocial[0].file_extension=='video/mpg' || dt.editSocial[0].file_extension=='video/mp2' || dt.editSocial[0].file_extension=='video/mpeg' || dt.editSocial[0].file_extension=='video/mpe' || dt.editSocial[0].file_extension=='video/mpv' || dt.editSocial[0].file_extension=='video/m4p' || dt.editSocial[0].file_extension=='video/m4v') {
			 		$("<video id='videoedit' height='82' width='82' controls><source src='"+pth + "social-data/" + dt.editSocial[0].image_audio_video+"'></video>").appendTo("#insertHtm");
			 	} else if ( dt.editSocial[0].file_extension=='mp3' || dt.editSocial[0].file_extension=='m4a' || dt.editSocial[0].file_extension=='aac' || dt.editSocial[0].file_extension=='oga' || dt.editSocial[0].file_extension=='audio/mp3' || dt.editSocial[0].file_extension=='audio/m4a' || dt.editSocial[0].file_extension=='audio/aac' || dt.editSocial[0].file_extension=='audio/oga' ) { 
			 		$('<audio height="200" width="82" id="soundedit" controls><source src="'+ pth + "social-data/" + dt.editSocial[0].image_audio_video+'"></audio>').appendTo("#insertHtm");
			 	} else if(dt.editSocial[0].file_extension=='png' || dt.editSocial[0].file_extension=='jpg' || dt.editSocial[0].file_extension=='jpeg'){
			 		$('<img id="imageedit" height="82" width="82" src="'+ pth + "social-data/" + dt.editSocial[0].image_audio_video+'" alt="'+dt.editSocial[0].image_audio_video+'" class="img-responsive">').appendTo("#insertHtm");
				}
			} else {
			 	// $("<video id='videoedit' />").appendTo("#insertHtm");
			 	// $('<audio id="soundedit" ></audio>').appendTo("#insertHtm");
			 	// $('<img id="imageedit"/>').appendTo("#insertHtm");
			 }
		});

		request.fail(function(jqXHR, textStatus) {
			console.log( "Request failed: " + textStatus );
		});
	}
}

function renderEditImageURL(file) {
	if (file.files && file.files[0]) {
		var reader = new FileReader();
			reader.onload = function(e) {
				var file = e.target;
				var rr=/^data:image/;
				var ext=rr.test(file.result);
				if(ext){
					$("<img style='height:100px; width:100px;' class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>").appendTo("#image4-demo-parent");
					$('#imagePreview').html('');
					$("#image4-demo-parent").css({"height": "100px", "width": "100px", "border-radius": "100%"});
				} else {
					$("<img style='height:100px; width:100px;' class=\"imageThumb\" src=\<?php echo base_url(); ?>assets/images/video-player.png\" title=\"" + file.name + "\"/>").appendTo("#image4-demo-parent");
					$("#image4-demo-parent").css({"height": "100px", "width": "100px", "border-radius": "100%", "margin-top": "5px", "margin-bottom": "10px", "margin-left": "80px"});
				}
			}	
			reader.readAsDataURL(file.files[0]);
	}
}

function renderImageURL(file) {
	if (file.files && file.files[0]) {
		var reader = new FileReader();
			reader.onload = function(e) {
				var file = e.target;
				var rr=/^data:image/;
				var ext=rr.test(file.result);
				if(ext){
					$("<img style='height:150px; width:150px; border-radius:100%;' class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>").appendTo("#image3-demo-parent");
					$("#image3-demo-parent").css({"height": "150px", "width": "150px", "border-radius": "100%", "margin-top": "5px", "margin-bottom": "10px", "margin-left": "80px"});
				} else {
					$("<img style='height:150px; width:150px; border-radius:100%;' class=\"imageThumb\" src=\<?php echo base_url(); ?>assets/images/video-player.png\" title=\"" + file.name + "\"/>").appendTo("#image3-demo-parent");
					$("#image3-demo-parent").css({"height": "150px", "width": "150px", "border-radius": "100%", "margin-top": "5px", "margin-bottom": "10px", "margin-left": "80px"});
				}
			}	
			reader.readAsDataURL(file.files[0]);
	}
}

function likeForum(forum_id, cat_id, subcat_id){
	//console.log(forum_id + ' ppp ' + cat_id + ' ppp ' + subcat_id); return;
	var status = $('#like-forum-'+forum_id).attr('data-status');
	var request = $.ajax({
			type: 'POST',
			url: bpth+'forum/like',
			cache: false,
			data: {forumID : forum_id, catID: cat_id, subcatID: subcat_id, status: status},
		});

		request.done(function(data) {
			var dt = JSON.parse(data);
			//console.log(JSON.stringify(dt.allForums));
			if(dt.allForums){
				$.each(dt.allForums, function( i, v ) {
					//console.log(JSON.stringify(v));
					if(v.likes && v.likes.singleForumLikes){
						//console.log('pppppp'+v.likes +'&&'+ v.likes.singleForumLikes);
						//console.log('jjjj'+ forum_id + ' == ' + v.id);
						if( forum_id == v.id ){
							$('#countLike-'+forum_id).html('');
							//console.log('dddddd' + v.likes.singleForumLikes[0].forumLikeCount);
							$('#countLike-'+forum_id).html(' &nbsp;'+( (v.likes.singleForumLikes[0].forumLikeCount>0) ? v.likes.singleForumLikes[0].forumLikeCount : '') );
							//console.log('ppp'+ v.likes.singleForumLikes[0].user_liked_forum + ' == ' + v.likes.singleForumLikes[0].current_user_id);
							if(v.likes.singleForumLikes[0].user_liked_forum == v.likes.singleForumLikes[0].current_user_id){
								$("#like-forum-"+forum_id).attr("data-status", "0");
							} else {
								$("#like-forum-"+forum_id).attr("data-status", "1");
							}
						}
					} else {
						if( forum_id == v.id ){
							$('#countLike-'+forum_id).html('');
							$("#like-forum-"+forum_id).attr("data-status", "1");
						}
					}
				});
				if(status == 1){
					//console.log('aaaaaaaaa' + status);
					$('#like-span-'+forum_id).css({"color": "red"});
				} else {
					//console.log('qqqqqqqqqqq' + status);
					$('#like-span-'+forum_id).css({"color": "#337ab7"});
				}
			}
		});

		request.fail(function(jqXHR, textStatus) {
			console.log( "Request failed: " + textStatus );
		});
}


function likeSocial(post_id,count,loopid){

	


	//console.log(forum_id + ' ppp ' + cat_id + ' ppp ' + subcat_id); return;
	var status = $('#status-'+post_id+'-'+loopid).val();
	var post_user_id=$('#user_id-'+post_id+'-'+loopid).val();
//alert(status);
	//alert(post_user_id);
	var count= $('.count-'+post_id+'-'+loopid).text();
	var page_id=$('#page_id-'+post_id+'-'+loopid).val();

	//alert(page_id);

	if(status==0){
		status='1';
       count++;
	}
	else
	{
		status='0';
		count--;
	}
	//var status='1';

	//alert(bpth);
	     var request = $.ajax({
			type: 'POST',
			url: bpth+'social/like',
			cache: false,
			data: {postID : post_id,status: status,post_user_id: post_user_id,page_id:page_id},
		});

		request.done(function(data) {
			//alert(data);
			var dt = JSON.parse(data);
			//console.log(JSON.stringify(dt.allForums));
			if(dt.curr_user){

console.log(dt.curr_user.id);

				
if(count>1)
{

	$('.like-coment-text-'+post_id+'-'+loopid).html('&nbsp;&nbsp;Likes');
}
else
{
	$('.like-coment-text-'+post_id+'-'+loopid).html('&nbsp;&nbsp;Like');
}


//alert(status);


				if(status == 1){
					//console.log('aaaaaaaaa' + status);
$('#likes-data'+post_id).append('<li class="social-friend-list-item" id="like-'+post_id+'-'+dt.curr_user.id+'"><a href="#" class="custom-flex flex-wrap align-items-center"><img src="'+imagepath+dt.curr_user.image+'" alt="'+dt.curr_user.name+'" class="img-circle" style="max-height:40px; max-width:40px; border-radius:100%;"><div class="col pr-0"><div class="social-friend-name"><span>'+dt.curr_user.name+'</span></div></div></a></li>');


					 $('.count-'+post_id+'-'+loopid).text(count);
					$('#status-'+post_id+'-'+loopid).val(status);
					$('#like-text-'+post_id+'-'+loopid).css({"color": "#40aa36"});
					$('#like-icon-'+post_id+'-'+loopid).css({"color": "#40aa36"});
				} else {
					//console.log('qqqqqqqqqqq' + status);
					$('#like-'+post_id+'-'+dt.curr_user.id).remove();
					$('.count-'+post_id+'-'+loopid).text(count);
                    $('#status-'+post_id+'-'+loopid).val(status);
					$('#like-text-'+post_id+'-'+loopid).css({"color": "#337ab7"});
					$('#like-icon-'+post_id+'-'+loopid).css({"color": "#63636"});
					
				}
			}
		});

		request.fail(function(jqXHR, textStatus) {
			console.log( "Request failed: " + textStatus );
		});
}

function likeSocialPage(page_id,user_id){

	


	//console.log(forum_id + ' ppp ' + cat_id + ' ppp ' + subcat_id); return;
	var status = $('#status-val-'+page_id).val();
	var page_user_id=$('#user_id-'+page_id).val();
 
	

	//alert(page_id);

	if(status==0){
		status='1';
       
	}
	else
	{
		status='0';
		
	}

	//alert(status);
	//var status='1';

	//alert(bpth);
	     var request = $.ajax({
			type: 'POST',
			url: bpth+'page/like',
			cache: false,
			data: {page_id : page_id,status:status,page_user_id:page_user_id,user_id:user_id},
		});

		request.done(function(data) {
			//alert(status);
			//var dt = JSON.parse(data);
			//console.log(JSON.stringify(dt.allForums));
			if(status == 1){

					//alert(status);
					//console.log('aaaaaaaaa' + status);

					
					$('#status-val-'+page_id).val(status);
					$('#status-'+page_id).css({"color": "#091b4a"});
					
				} else {
					//console.log('qqqqqqqqqqq' + status);
					
					
                   $('#status-val-'+page_id).val(status);
					$('#status-'+page_id).css({"color": "#fff"});
					
					
				}
			
		});

		request.fail(function(jqXHR, textStatus) {
			console.log( "Request failed: " + textStatus );
		});
}


function followSocialPage(page_id,user_id){

	


	//console.log(forum_id + ' ppp ' + cat_id + ' ppp ' + subcat_id); return;
	var status = $('#status-follow-val-'+page_id).val();
	var page_user_id=$('#user_id-follow-'+page_id).val();
 
	

	//alert(page_id);

	if(status==0){
		status='1';
       
	}
	else
	{
		status='0';
		
	}

	//alert(status);
	//var status='1';

	//alert(bpth);
	     var request = $.ajax({
			type: 'POST',
			url: bpth+'page/follow',
			cache: false,
			data: {page_id : page_id,status:status,page_user_id:page_user_id,user_id:user_id},
		});

		request.done(function(data) {
			
			if(status == 1){

					

					
					$('#status-follow-val-'+page_id).val(status);
					$('#follow-'+page_id).css({"color": "#091b4a"});
					$('#follow-text-'+page_id).text('Following');
					
				} else {
										
                   $('#status-follow-val-'+page_id).val(status);
					$('#follow-'+page_id).css({"color": "#fff"});
					$('#follow-text-'+page_id).text('Follow');
					
					
				}
			
		});

		request.fail(function(jqXHR, textStatus) {
			console.log( "Request failed: " + textStatus );
		});
}


function read_notification(){



	
var user_id = $('#not_user_id').val();
	

//alert(user_id);
	var request = $.ajax({
			type: 'POST',
			url: bpth+'social/read_notification',
			cache: false,
			data: {user_id:user_id},
		});

		request.done(function(data) {
			
			//alert(data);
		});

		
}










$(".collapse").on('show.bs.collapse hide.bs.collapse', function(e){
        var icon=$(e.target).prev().find("i");
        if(icon.hasClass("fa-plus")){
            icon.removeClass("fa-plus").addClass("fa-minus");
        }
        else{
            icon.removeClass("fa-minus").addClass("fa-plus");
        }
    });
	
	$(".readMore").on("click", function(){
		var id = $(this).attr('data-id');
		var htm = $(this).attr('data-desc');
		$('#main-desc-'+id).html('');
		$('#main-desc-'+id).html(htm);
	});
	
	$(".reportAbuscls").on("click", function(){
		var attr = $(this).attr('data-forumid');

		$("#report-forum-modal #abuseForumid").val(attr);
	});


	$(".reportAbusclsSocial").on("click", function(){
		var attr = $(this).attr('data-socialid');

		//alert(attr);
		$("#report-social-modal #abuseSocialid").val(attr);
	});
	
	function validateForumDetails(){
		var url = $("#link").val();
        if (url != undefined || url != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
            }
            else {
                $("#validate_link").html('Please enter valid youtube share link!!');
				$("#link").focus();
				return false;
            }
        } else {
			return true;
		}
		/*
		var youtube = $("#link").val();
		var pattern1 = new RegExp("https://www.youtube.com/watch");
		var pattern2 = new RegExp("https://m.youtube.com/watch");
		var pattern3 = new RegExp("https://m.youtube.com/embed");
		var pattern4 = new RegExp("https://m.youtube.com");
		var pattern5 = new RegExp("https://youtu.be/");
		if ( pattern1.test(youtube) || pattern2.test(youtube) || pattern3.test(youtube) || pattern4.test(youtube) || pattern5.test(youtube) ) {
		} else {
			$("#validate_link").html('Please enter valid youtube share link!!');
			$("#link").focus();
			return false;
		}*/
	}
	
		/*=================  for subcategory accordian shadow effect  ======================*/
    var i=100;
    $("#category-accordion a[data-toggle='collapse']").each(function(){
        $(this).css({zIndex:i--})
    });

	    (function(){
	        var catId=$("input[name='collapseswitch']").val();
	//console.log('000000000000--------'+ catId);
	        if(catId){
	            //$('#composeForum').collapse('in');
				$('#composeForum').addClass('in');
	        }
	    })();




	/*Ajax For Report Abuse*/
	$(document).on('click','#report_abuse',function(){
	    var _this = $(this);
	    var abusedForum = _this.parent().parent().find("#abuseForumid").val();
	    var cat_id = _this.parent().parent().find(".abuse_cat_id").val();
	    var comment = $.trim($("#abuse_reason").val());

	    if(comment != ''){
	    	if(comment.length < 15){
	    		_this.parent().prev().find('.error').css('color','red');
	    		_this.parent().prev().find('.error').html('Reason must be greater than 15 characters');
	    		_this.parent().prev().find('.error').css('display','block');

	    		return false;
	    	}
	        $.ajax({
		        type: "POST",
		        url: bpth+"forum/report",
		        data:'reportReason='+comment+'&cat_id='+cat_id+'&abusedForum='+abusedForum,
		        success:function(data){
		            var result = JSON.parse(data);
		            if(result == '1'){
		            	_this.parent().prev().find('.error').html('Forum reported successfully');
		            	_this.parent().prev().find('.error').css('color','green');
		            	_this.parent().prev().find('.error').css('display','block');
		            }
		            $("#report-forum-modal").modal('hide');
		            $("#abuse_reason").val('');
		            _this.parent().prev().find('.error').css('display','hidden');
		            $(document).find("[data-forumid='" + abusedForum + "']").css('color','red'); 
		        }
		    });
	    }else{
	    	_this.parent().prev().find('.error').css('color','red');
	    	_this.parent().prev().find('.error').html('Please Enter Reason');
	    	_this.parent().prev().find('.error').css('display','block');
	    }
	});


	$(document).on('click','#report_abuse_social',function(){
	    var _this = $(this);
	    var abusedSocial = _this.parent().parent().find("#abuseSocialid").val();
	    //var cat_id = _this.parent().parent().find(".abuse_cat_id").val();
	    var comment = $.trim($("#abuse_reason").val());

	    //alert(abusedSocial);
	    //die;

	    if(comment != ''){
	    	if(comment.length < 15){
	    		_this.parent().prev().find('.error').css('color','red');
	    		_this.parent().prev().find('.error').html('Reason must be greater than 15 characters');
	    		_this.parent().prev().find('.error').css('display','block');

	    		return false;
	    	}
	        $.ajax({
		        type: "POST",
		        url: bpth+"social/report",
		        data:'reportReason='+comment+'&abusedSocial='+abusedSocial,
		        success:function(data){

		        	//alert(data);
		            var result = JSON.parse(data);
		            if(result == '1'){
		            	_this.parent().prev().find('.error').html('Social reported successfully');
		            	_this.parent().prev().find('.error').css('color','green');
		            	_this.parent().prev().find('.error').css('display','block');
		            }
		            $("#report-social-modal").modal('hide');
		            $("#abuse_reason").val('');
		            _this.parent().prev().find('.error').css('display','hidden');
		            $(document).find("[data-socialid='" + abusedSocial + "']").css('color','red'); 
		        }
		    });
	    }else{
	    	_this.parent().prev().find('.error').css('color','red');
	    	_this.parent().prev().find('.error').html('Please Enter Reason');
	    	_this.parent().prev().find('.error').css('display','block');
	    }
	});


