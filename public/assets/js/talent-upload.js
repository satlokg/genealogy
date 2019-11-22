"use strict";
function byId(e){return document.getElementById(e);}

window.addEventListener('load', onStarDocLoaded, false);

function onStarDocLoaded()
{
	var el = document.getElementById('starFileInput');
	if(el){
		el.addEventListener('change', onStarChosenFileChange, false);
	}
}

function onStarChosenFileChange(evt)
{
    var fileType = this.files[0].type;

    if (fileType.indexOf('audio') != -1){
        loadStarFileObject(this.files[0], onStarSoundLoaded);
	} else if (fileType.indexOf('image') != -1){
        loadStarFileObject(this.files[0], onStarImageLoaded);
	} else if (fileType.indexOf('video') != -1){
        loadStarFileObject(this.files[0], onStarVideoLoaded);
	}
}

function loadStarFileObject(fileObj, loadedStarCallback)
{
    var reader = new FileReader();
    reader.onload = loadedStarCallback;
    reader.readAsDataURL( fileObj );
}

function onStarSoundLoaded(evt)
{
	if($("#videostar").is(":visible")){ byId('videostar').remove(); }
	if($("#imagestar").is(":visible")){ byId('imagestar').remove(); }
	setTimeout(function () {
		//$( "#insertStarHtmAdd" ).after( "<audio id='soundstar' ></audio>" );
		$( "#insertStarHtmAdd" ).after( "<audio id='soundstar' controls><source></audio>" );
		byId('soundstar').src = evt.target.result;
		byId('soundstar').style.height = "200px";
		byId('soundstar').style.width = "200px";
		byId('soundstar').play();
	}, 1000);
}

function onStarImageLoaded(evt)
{
	if($("#videostar").is(":visible")){ byId('videostar').remove(); }
	if($("#soundstar").is(":visible")){ byId('soundstar').remove(); }
	setTimeout(function () {
		$( "#insertStarHtmAdd" ).after( "<img id='imagestar'></img>" );
		byId('imagestar').src = evt.target.result;
		byId('imagestar').style.height = "200px";
		byId('imagestar').style.width = "200px";
		byId('imagestar').style.margin = "5px 0px 0px 0px";
	}, 1000);
}

function onStarVideoLoaded(evt)
{
	if($("#imagestar").is(":visible")){ byId('imagestar').remove(); }
	if($("#soundstar").is(":visible")){ byId('soundstar').remove(); }
	setTimeout(function () {
		$( "#insertStarHtmAdd" ).after( "<video id='videostar' />" );
		byId('videostar').src = evt.target.result;
		byId('videostar').style.height = "250px";
		byId('videostar').style.width = "300px";
		byId('videostar').play();
	}, 1000);
}

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
				url:base_url+"star/starfeedback",
				data:{prodID:prodID, star_rating:star_rating, current_user:current_user,prod_typ:prod_typ},
				success:function(data){
					var dt = JSON.parse(data);
					//console.log(dt);  && $StarFeedbackCurrUsr['user_id']==$_SESSION['user_id']
					if( dt.StarFeedbackCurrUsr && dt.StarFeedbackCurrUsr.user_id == current_user ){
						var starRates = dt.StarFeedbackCurrUsr.rating;
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