$('#single-match-tbl > tbody  > tr > td input, #single-match-tbl > tbody  > tr > td button').hide();
	$('#edit-match-id').on('click', function(){
		$('#single-match-tbl > tbody  > tr > td').each(function() {
			$('#single-match-tbl > tbody  > tr > td span').hide();
			$('#single-match-tbl > tbody  > tr > td input, #single-match-tbl > tbody  > tr > td button').show();
		});
	});
	
	var newVal = addCommas($('#annualIncome').html());
	$('#annualIncome').html(newVal);
	//console.log('gggggggggggg' +newVal );
	
	function addCommas(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
	
	$("#contact_no_prod_det").text(function(i, text) {
        text = text.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        return text;
    });
	
	$("#product-video-modal").on('show.bs.modal', function(e){
		var anc=$(e.relatedTarget).attr("data-src");
		$(this).find("video").attr("src", anc);
	});
	
	 /* 1. Visualizing things on Hover - See next part for action on click */
	  $('#stars li').on('mouseover', function(){
		var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
	   
		// Now highlight all the stars that's not after the current hovered star
		$(this).parent().children('li.star').each(function(e){
		  if (e < onStar) {
			$(this).addClass('hover');
		  }
		  else {
			$(this).removeClass('hover');
		  }
		});
		
	  }).on('mouseout', function(){
		$(this).parent().children('li.star').each(function(e){
		  $(this).removeClass('hover');
		});
	  });
	  
		/* 2. Action to perform on click */
		$('#stars li').on('click', function(){
			var prodID = parseInt($(this).data('productid'));
			var star_rating = parseInt($(this).data('value'), 10);
			var prod_typ = $(this).data('producttype');
			var current_user = $(this).data('currentuser');
			var base_url = $(this).data('baseurl');
			//console.log('prodID ' + prodID + 'star_rating ' + star_rating + 'current_user ' +current_user);
			$.ajax({
				type:"POST",
				url:base_url+"matchmaking/matchfeedback",
				data:{prodID:prodID, star_rating:star_rating, current_user:current_user,prod_typ:prod_typ},
				success:function(data){
					var dt = JSON.parse(data);
					//console.log(dt);  && $MatchFeedbackCurrUsr['user_id']==$_SESSION['user_id']
					if( dt.MatchFeedbackCurrUsr && dt.MatchFeedbackCurrUsr.user_id == current_user ){
						var starRates = dt.MatchFeedbackCurrUsr.rating;
						var stars = $(this).parent().children('li.star');
						//console.log(starRates);
						$('.star').removeClass('selected');
						for (i = 1; i <= starRates; i++) {
							$('#star-'+i).addClass('selected');
						}
					}
				}
			});
	  });
	  
	  $('.starwl').on('click', function(){
		  $('#login-alert-modal').modal('show');
	  });
	
	$(".readMore").on("click", function(){
		var id = $(this).attr('data-id');
		var htm = $(this).attr('data-desc');
		$('#main-desc-'+id).html('');
		$('#main-desc-'+id).html(htm);
	});
	
	function submitForm(){
		var navbar_height = parseInt($('.top-header-categories').css('height').replace('px', ''));
		if( $('#date_of_birth').val()=='' || $('#religion').val()=='' || $('#mother_tongue').val()=='' || $('#marital_status').val()=='' || $('#community').val()=='' || $('#education').val()=='' || $('#line_of_education').val()=='' || $('#working_status').val()=='' || $('#company_name').val()=='' || $('#designation').val()=='' || $('#annual_income').val()=='' || $('#diet').val()=='' || $('#height').val()=='' || $('#body_type').val()=='' || $('#complexion').val()=='' || $('#is_smoking').val()=='' || $('#is_drinking').val()=='' || $('#about_me').val()=='' || $('#looking_for').val()=='' ){
			$('#single-match-tbl > tbody  > tr > td input').each(function() {
				if($(this).val()==''){
					$('<div class="error" style="font-size: 12px;color: red;">Please enter '+ $(this).attr('id') + '</div>').insertAfter(this);
					$('html, body').stop().animate({
						scrollTop: $('.card-detail_new').offset().top - navbar_height - 25
					}, 600);
				}
			});
			return false;
		} else {
			var dataObj = {match_id : $('#match_id').val(),date_of_birth : $('#date_of_birth').val(), religion: $('#religion').val(), mother_tongue: $('#mother_tongue').val(), marital_status: $('#marital_status').val(), community: $('#community').val(), education: $('#education').val(), line_of_education: $('#line_of_education').val(), working_status: $('#working_status').val(), company_name: $('#company_name').val(), designation: $('#designation').val(), annual_income: $('#annual_income').val(), diet: $('#diet').val(), height: $('#height').val(), body_type: $('#body_type').val(), complexion: $('#complexion').val(), is_smoking: $('#is_smoking').val(), is_drinking: $('#is_drinking').val(), about_me: $('#about_me').val(), looking_for: $('#looking_for').val()};
			var request = $.ajax({
					type: 'POST',
					url: bpth+'matchmaking/updatematch',
					cache: false,
					data: dataObj,
				});

				request.done(function(data) {
					//var dt = JSON.parse(data);
					//console.log(JSON.stringify(dt));
					if(data=='success'){
						location.reload();
					}
				});

				request.fail(function(jqXHR, textStatus) {
					console.log( "Request failed: " + textStatus );
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
				//console.log(JSON.stringify(dt)); return;
				if(dt.visitedProfiles){
					$.each(dt.visitedProfiles, function( i, v ) {
						//console.log(v[0].id); return;
						if(v[0].favs && v[0].favs.singleMatchFavs){
							if( match_id == v[0].id ){
								$('#fav-match-count-'+match_id).html('');
								$('#fav-match-count-'+match_id).html(' &nbsp;'+( (v[0].favs.singleMatchFavs[0].matchFavCount>0) ? v[0].favs.singleMatchFavs[0].matchFavCount : '') );
								console.log('ppp'+ v[0].favs.singleMatchFavs[0].user_fav_match + ' == ' + v[0].favs.singleMatchFavs[0].current_user_id);
								if(v[0].favs.singleMatchFavs[0].user_fav_match == v[0].favs.singleMatchFavs[0].current_user_id){
									$("#match-fav-a-"+match_id).attr("data-status", "0");
								} else {
									$("#match-fav-a-"+match_id).attr("data-status", "1");
								}
							}
						} else {
							if( match_id == v[0].id ){
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

    function validContactus() {
        $(".errlogin").html('');
        // alert("hello");
        if (document.getElementById('name').value == "") {
            $("#errname").html('Please enter your name.');
            document.getElementById("name").focus();
            return false;
        }
        if(document.getElementById("name").value.length < 3)
        {
            $("#errname").html('Please enter Name in greater than 3 characters');
            document.getElementById("name").focus();
            return false
        }
        if (document.getElementById('email_id').value == "") {
            $("#erremail_id").html('Please enter your email address.');
            document.getElementById("email_id").focus();
            return false;
        }
        var email = document.getElementById("email_id").value;
        if (!(/^\w+([\.-]?\w+)*\@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email))) {
            $("#erremail_id").html("Please enter your valid email address");
            document.getElementById("email_id").focus();
            return false;
        }
        /*if (document.getElementById('contact_no').value == "") {
            $("#errcontact_no").html('Please enter your Contact Number.');
            document.getElementById("contact_no").focus();
            return false;
        }
        if(isNaN(document.getElementById('contact_no').value.trim())){
            $("#errcontact_no").html('Please enter Contact in numeric only');
            document.getElementById("contact_no").focus();
            return false;
        }
        if(document.getElementById("contact_no").value.length > 13)
        {
            $("#errcontact_no").html('Please enter Contact in less than 13 digit');
            document.getElementById("contact_no").focus();
            return false;
        }   
        if(document.getElementById("contact_no").value.length < 10)
        {
            $("#errcontact_no").html('Please enter Contact in greater than 10 digit');
            document.getElementById("contact_no").focus();
            return false
        }*/
        if (document.getElementById('message').value == "") {
            $("#errmessage").html('Please enter your comments.');
            document.getElementById("message").focus();
            return false;
        }
        return true;
        
    }
	
	
	 function  favourite(pid){
        var userId="";
        // alert(userId);
        //alert(pid);
        $.ajax({
            type:"POST",
            url:"/bhuumi/home/favouriteproduct",
            data:{prodId:pid,userId:userId},
            success:function(result){
                //alert(result);
                if(result==1) {
                    $(".fav-" + pid).addClass('fav_product');
                    //$(".fav-" + pid).val("'></i>");
                    //alert(result);
                    // <i class="fa fa-heart fav"></i>
                }
            }
        });
    }
	
	
	$(function() {
        $('.readmore a.more').on('click', function () {
            var $parent = $(this).parent();
            if ($parent.data('visible')) {
                $parent.data('visible', false).find('.ellipsis').show()
                    .end().find('.moreText').hide()
                    .end().find('a.more').text('show more');
            } else {
                $parent.data('visible', true).find('.ellipsis').hide()
                    .end().find('.moreText').show()
                    .end().find('a.more').text('show less');
            }
        });
    });