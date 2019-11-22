$(".starRecord").click(function() {
	window.location = $(this).find("#make-div-clickable").attr("href"); 
	return false;
});

if( $.cookie('st_bl')!='' && $.cookie('st_bl')!=null ){
	$('#composeStar').addClass('in');
	$.cookie('st_bl', '', { expires: -1, path: '/bhuumi/star'});
}


function sortRecordsBy(v){
	$( "#sort-form-field" ).val(v);
	$( "#sort-form-submit" ).trigger( "click" ); 
}

$('#prodKeyInput').keyup(function() {
	var $rows = $('#starRecords .starRecord');
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
			reg = RegExp(val, 'i'),
			text;

		$rows.show().filter(function() {
			text = $(this).text().replace(/\s+/g, ' ');
			return !reg.test(text);
		}).hide();
	});

$('#myInput').keyup(function() {
	var $rows = $('#starRecords .starRecord');
	var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
		reg = RegExp(val, 'i'),
		text;

		$rows.show().filter(function() {
			text = $(this).text().replace(/\s+/g, ' ');
			return !reg.test(text);
		}).hide();
		$('#searchGlobal').attr('href', bpth+'buysell/category_search?c_k='+$(this).val());
	});

$(window).scroll(function(){
		var lastID = $('.load-more').attr('lastID');
		//if($(window).scrollTop() + $(window).height() > $(document).height() - 100 && lastID!=0 && lastID>=1 && lastID!='' && lastID!=undefined && lastID!='undefined') {
		if ($(window).scrollTop() == $(document).height() - $(window).height() && lastID != 0){
			var req = $.ajax({
					type:'POST',
					url:bpth+'star/records',
					data:'lastStarId='+lastID,
					beforeSend : function() {
						$('.load-more').show();
					},
					success: function(html) {
						//console.log(html);
						$('.load-more').remove();
						$('#starRecords').append(html);
						var prodCnt = $("div[class*='starRecord']").length;
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

function likeTalent(str_id){
		//console.log(str_id + ', and ');
		var starID = str_id;
		var request = $.ajax({
				type: 'POST',
				url: bpth+'star/liketalent',
				cache: false,
				data: {star_id: str_id},
			});
			//console.log('opoooooooooooooooooooooooooooooooo' + ''); return;
			request.done(function(data) {
				var dt = JSON.parse(data);
				//console.log(JSON.stringify(dt));
				if(dt[0].status == 1){
					//console.log(dt[0].id + ', kkkkkkkkkkkkkkk' + dt[0].status);
					//$('#star-'+dt[0].id).html('');
					$('#like-icn-'+dt[0].id ).removeClass("fa-star-o");
					$('#like-icn-'+dt[0].id ).addClass("fa-star");
					$('#like-icn-'+dt[0].id ).css({"color": "#337ab7"});
					$('#like-star-count-'+dt[0].id).html('<strong>'+dt[0].likes.singleStarLikes[0].starLikeCount+'</strong>');
				}
			});
				
			request.fail(function(jqXHR, textStatus) {
				console.log( "Request failed: " + textStatus );
			});
	}
	
	function favoirateTalent(star_id,e){
		e.stopPropagation();
		//console.log(star_id + ' ppp ' + cat_id + ' ppp ' + subcat_id); return;
		var status = $('#star-fav-a-'+star_id).attr('data-status');
		var request = $.ajax({
				type: 'POST',
				url: bpth+'star/favtalent',
				cache: false,
				data: {star_id : star_id, status: status},
			});

			request.done(function(data) {
				var dt = JSON.parse(data);
				//console.log(JSON.stringify(dt.allStars));
				if(dt.allStars){
					$.each(dt.allStars, function( i, v ) {
						if(v.favs && v.favs.singleStarFavs){
							if( star_id == v.id ){
								$('#fav-star-count-'+star_id).html('');
								$('#fav-star-count-'+star_id).html(' &nbsp;'+( (v.favs.singleStarFavs[0].starFavCount>0) ? v.favs.singleStarFavs[0].starFavCount : '') );
								console.log('ppp'+ v.favs.singleStarFavs[0].user_fav_star + ' == ' + v.favs.singleStarFavs[0].current_user_id);
								if(v.favs.singleStarFavs[0].user_fav_star == v.favs.singleStarFavs[0].current_user_id){
									$("#star-fav-a-"+star_id).attr("data-status", "0");
								} else {
									$("#star-fav-a-"+star_id).attr("data-status", "1");
								}
							}
						} else {
							if( star_id == v.id ){
								$('#fav-star-count-'+star_id).html('');
								$("#star-fav-a-"+star_id).attr("data-status", "1");
							}
						}
					});
					if(status == 1){
						//console.log('aaaaaaaaa' + status);
						$('#fav-icn-'+star_id).css({"color": "#f90202"});
					} else {
						//console.log('qqqqqqqqqqq' + status);
						$('#fav-icn-'+star_id).css({"color": "#777"});
					}
				}
			});

			request.fail(function(jqXHR, textStatus) {
				console.log( "Request failed: " + textStatus );
			});
	}
	
	function getAttachmentType(get_type){
		//console.log('pppppppppppppppp' + get_type);
		if( get_type == 'youtube_url' ){
			$("div.desc").hide();
			$("#addYTurl").show();
		} else if( get_type == 'custom_attachment' ) {
			$("div.desc").hide();
			$("#addAttachment").show();
		}
		$('#attachment_type_val').val(get_type);
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
	            //$('#composeStar').collapse('in');
				$('#composeStar').addClass('in');
	        }
	    })();
	
	$(".collapse").on('show.bs.collapse hide.bs.collapse', function(e){
        var icon=$(e.target).prev().find("i");
        if(icon.hasClass("fa-plus")){
            icon.removeClass("fa-plus").addClass("fa-minus");
        }
        else{
            icon.removeClass("fa-minus").addClass("fa-plus");
        }
    });
