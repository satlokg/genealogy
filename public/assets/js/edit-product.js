$(document).ready(function (e) {
$("#uploadimage").on('submit',(function(e) {
e.preventDefault();
$("#error").empty();
      var product_id=$("#product_id").val();
	  //alert(product_id);
      var vehicles_id="c_5973617400e9d";
      var real_estate_id="c_59648dcf405a5";
      var email=$("#email").val();
      var name=$("#name").val();
      var contact=$("#contact").val();
      var title=$("#title").val();
      var price=$("#price").val();
     var cat_id=$("#cat_id").val();
      var sub_cat_id=$("#sub_cat_id").val();
      var sub_sub_cat_id=$("#sub_sub_cat_id").val();
      var streets=$("#streets").val();
      var address=$("#address").val();
      var postal=$("#postal").val();
      var description=$("#description").val();

      var year=$("#year").val();
      var property_type=$("#property_type").val();
      var operation=$("#operation").val();
      var area=$("#area").val();
         var property_name=$("#property_name").val();
      var kilometer=$("#kilometer").val();
      var brand=$("#brand").val();
      var year1=$("#year1").val();
      var beds=$("#beds").val();
	 var bath=$("#bath").val();
	 var built_year=$("#built_year").val();
	 var cooling=$("#cooling").val();
	 var heating=$("#heating").val();
	 var parking=$("#parking").val();var neighbourhood=$("#neighbourhood").val();
	 var other_spec=$("#other_spec").val();

	 
	 var property_name=$("#property_name").val();
   //alert(cat_id);
  
 if($.trim(product_id).length>0 && $.trim(email).length>0 &&  $.trim(contact).length>0 && ( $.trim(title).length>0 || $.trim(property_name).length>0 ) && $.trim(cat_id).length>0 && 
    $.trim(streets).length>0 && ( $.trim(description).length>0 || $.trim(other_spec).length>0 ) ) {
       

      if ($.trim(cat_id)==real_estate_id) {

      	
      	 if ( $.trim(property_type).length!='' && $.trim(beds).length!=0 && $.trim(bath).length!=0 && $.trim(area).length!=0 && $.trim(built_year).length!=0 && $.trim(cooling).length!=0 && $.trim(heating).length!=0 && $.trim(parking).length!=0 && $.trim(neighbourhood).length!=0 && $.trim(property_name).length!=0 && $.trim(other_spec).length!=0) {
		

		$('#send').attr('disabled','disabled');

		
     	$.ajax({
		url: "productedit", // Url to which the request is send
		type: "POST",             // Type of request to be send, called as method
		data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
		contentType: false,       // The content type used when sending data to the server.
		cache: false,             // To unable request pages to be cached
		processData:false,
		beforeSend: function(){ $("#load").css("display", "block");}, // To send DOMDocument or non processed data file it is set to false
		success: function(data)   // A function to be called if request succeeds
		{
			alert(data);
			var data1=data.split('##');
			var ads_type=data1[1];
			var amount=data1[2];
			var pay_url=data1[3];
			var custom=data1[4];
			var business=data1[5];
			var cmd=data1[6];
			var item_name=data1[7];
			var currency_code=data1[8];
			var cancel_return=data1[9];
			var return_url=data1[10];
			var rm=data1[11];
			  setTimeout( function(){$("#load").css("display", "none")}, 1000);
					if (data1[0]==1)
					 {
						 if(ads_type > 0){
						window.location.href='https://www.sandbox.paypal.com/cgi-bin/webscr?amount='+amount+'&custom='+custom+'&business='+business+'&cmd='+cmd+'&item_name='+item_name+'&currency_code='+currency_code+'&cancel_return='+cancel_return+'&return='+return_url+'&rm='+rm+'';
					  
						 } else {
							  window.location.href='myproduct';
							$("#error").html("<span style='color:#55a92e'>Update Successfully.</span>") 
						 } 	          
		         } else if (data==2) {
                   $("#error").html("<span style='color:#cc0000'>This email id is not registered in user table, Please register to continue...!</span>");
		         } else {
		         	$("#error").html("<span style='color:#cc0000'>Server Error!</span>"); 
		         }

		          
		}
		});
	     } else {

	     	if ( $.trim(property_type).length!='' && $.trim(beds).length!=0 && $.trim(bath).length!=0 && $.trim(area).length!=0 && $.trim(built_year).length!=0 && $.trim(cooling).length!=0 && $.trim(heating).length!=0 && $.trim(parking).length!=0 && $.trim(neighbourhood).length!=0 && $.trim(property_name).length!=0 && $.trim(other_spec).length!=0) 
				

	     	if(!$("#property_type").val()){
		      $('#property_type').css("border", "1px solid red");
		     }else{ $('#property_type').css("border", "1px solid #ccc")}

		     if(!$("#area").val()){
		      $('#area').css("border", "1px solid red");
		     }else{ $('#area').css("border", "1px solid #ccc")}

		     if(!$("#built_year").val()){
		      $('#built_year').css("border", "1px solid red");
		     }else{ $('#built_year').css("border", "1px solid #ccc")}
			 
			 if(!$("#beds").val()){
		      $('#beds').css("border", "1px solid red");
		     }else{ $('#beds').css("border", "1px solid #ccc")}
			 
			  if(!$("#bath").val()){
		      $('#bath').css("border", "1px solid red");
		     }else{ $('#bath').css("border", "1px solid #ccc")}
			 
			 if(!$("#cooling").val()){
		      $('#cooling').css("border", "1px solid red");
		     }else{ $('#cooling').css("border", "1px solid #ccc")}
			 
			  if(!$("#heating").val()){
		      $('#heating').css("border", "1px solid red");
		     }else{ $('#heating').css("border", "1px solid #ccc")}
			 
			 if(!$("#parking").val()){
		      $('#parking').css("border", "1px solid red");
		     }else{ $('#parking').css("border", "1px solid #ccc")}
			 
			  if(!$("#neighbourhood").val()){
		      $('#neighbourhood').css("border", "1px solid red");
		     }else{ $('#neighbourhood').css("border", "1px solid #ccc")}
			 
			 if(!$("#property_name").val()){
		      $('#property_name').css("border", "1px solid red");
		     }else{ $('#property_name').css("border", "1px solid #ccc")}
			 
			  if(!$("#utilities").val()){
		      $('#utilities').css("border", "1px solid red");
		     }else{ $('#utilities').css("border", "1px solid #ccc")}

		    $("#error").html("<span style='color:#cc0000'> Mandatory fields!</span>");
	     }


      } else if ($.trim(cat_id)==vehicles_id) {

		        
		        if ( $.trim(kilometer).length!='' && $.trim(brand).length>0 && $.trim(year1).length>0) {
		     	$.ajax({
				url: "productedit", // Url to which the request is send
				type: "POST",             // Type of request to be send, called as method
				data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
				contentType: false,       // The content type used when sending data to the server.
				cache: false,             // To unable request pages to be cached
				processData:false,
				beforeSend: function(){ $("#load").css("display", "block");}, // To send DOMDocument or non processed data file it is set to false
				success: function(data)   // A function to be called if request succeeds
				{
					//alert(data);
				   var data1=data.split('##');
					var ads_type=data1[1];
					var amount=data1[2];
					var pay_url=data1[3];
					var custom=data1[4];
					var business=data1[5];
					var cmd=data1[6];
					var item_name=data1[7];
					var currency_code=data1[8];
					var cancel_return=data1[9];
					var return_url=data1[10];
					var rm=data1[11];
					  setTimeout( function(){$("#load").css("display", "none")}, 1000);
							if (data1[0]==1)
							 {
								 if(ads_type > 0){
								window.location.href='https://www.sandbox.paypal.com/cgi-bin/webscr?amount='+amount+'&custom='+custom+'&business='+business+'&cmd='+cmd+'&item_name='+item_name+'&currency_code='+currency_code+'&cancel_return='+cancel_return+'&return='+return_url+'&rm='+rm+'';
							  
								 } else {
									  window.location.href='myproduct';
									$("#error").html("<span style='color:#55a92e'>Successfull</span>") 
								 }           
				         } else if (data==2) {
		                   $("#error").html("<span style='color:#cc0000'>This email id is not registered in user table, Please register to continue...!</span>");
				         } else {
				         	$("#error").html("<span style='color:#cc0000'>Server Error!</span>"); 
				         }  
				}
				});
	     } else {

	     	if(!$("#kilometer").val()){
		      $('#kilometer').css("border", "1px solid red");
		     }else{ $('#kilometer').css("border", "1px solid #ccc")}

		     if(!$("#brand").val()){
		      $('#brand').css("border", "1px solid red");
		     }else{ $('#brand').css("border", "1px solid #ccc")}

		     if(!$("#year1").val()){
		      $('#year1').css("border", "1px solid red");
		     }else{ $('#year1').css("border", "1px solid #ccc")}

		    $("#error").html("<span style='color:#cc0000'> Mandatory fields!</span>");
	     }

      } else {



        $.ajax({
		url: "productedit", // Url to which the request is send
		type: "POST",             // Type of request to be send, called as method
		data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
		contentType: false,       // The content type used when sending data to the server.
		cache: false,             // To unable request pages to be cached
		processData:false,
		beforeSend: function(){ $("#load").css("display", "block");}, // To send DOMDocument or non processed data file it is set to false
		success: function(data)   // A function to be called if request succeeds
		{
		//alert(data);
		var data1=data.split('##');
		var ads_type=data1[1];
		var amount=data1[2];
		var pay_url=data1[3];
		var custom=data1[4];
		var business=data1[5];
		var cmd=data1[6];
		var item_name=data1[7];
		var currency_code=data1[8];
		var cancel_return=data1[9];
		var return_url=data1[10];
		var rm=data1[11];
	      setTimeout( function(){$("#load").css("display", "none")}, 1000);
				/*if (data1[0]==1)
				 {
					 if(ads_type > 0){
					window.location.href='https://www.sandbox.paypal.com/cgi-bin/webscr?amount='+amount+'&custom='+custom+'&business='+business+'&cmd='+cmd+'&item_name='+item_name+'&currency_code='+currency_code+'&cancel_return='+cancel_return+'&return='+return_url+'&rm='+rm+'';
		          
					 } else {
						  window.location.href='myproduct';
						$("#error").html("<span style='color:#55a92e'>Successfull</span>") 
					 }           
		         } else if (data==2) {
                   $("#error").html("<span style='color:#cc0000'>This email id is not registered in user table, Please register to continue...!</span>");
		         } else {
		         	$("#error").html("<span style='color:#cc0000'>Server Error!</span>"); 
		         }*/
				 if (data==1)
				 {
		          $("#error").html("<span style='color:#55a92e'>Successfull</span>");
				 //window.location.href='productlist';
		         } else if (data==2) {
                   $("#error").html("<span style='color:#cc0000'>This email id is not registered in user table, Please register to continue...!</span>");
		         } else {
		         	$("#error").html("<span style='color:#cc0000'>Server Error!</span>"); 
		         }
		}
		});

      }

} else{
    
    if(!$("#name").val()){
      $('#name').css("border", "1px solid red"); 
     }else{ $('#email').css("border", "1px solid #ccc")}


    if(!$("#email").val()){
      $('#email').css("border", "1px solid red"); 
     }else{ $('#email').css("border", "1px solid #ccc")}

     if(!$("#contact").val() ){
      $('#contact').css("border", "1px solid red");
     }else{ $('#contact').css("border", "1px solid #ccc")}

     if(!$("#title").val()){
      $('#title').css("border", "1px solid red");
     }else{ $('#title').css("border", "1px solid #ccc")}

     if(!$("#cat_id").val()){
      $('#cat_id').css("border", "1px solid red");
     }else{ $('#cat_id').css("border", "1px solid #ccc")}

/*
     if(!$("#sub_cat_id").val()){
      $('#sub_cat_id').css("border", "1px solid red");
     }else{ $('#sub_cat_id').css("border", "1px solid #ccc")} */

     if(!$("#streets").val()){
      $('#streets').css("border", "1px solid red");
     }else{ $('#streets').css("border", "1px solid #ccc")}

    /* if(!$("#address").val()){
      $('#address').css("border", "1px solid red");
     }else{ $('#address').css("border", "1px solid #ccc")}

     if(!$("#postal").val()){
      $('#postal').css("border", "1px solid red");
     }else{ $('#postal').css("border", "1px solid #ccc")}
		*/
     if(!$("#description").val()){
      $('#description').css("border", "1px solid red");
     }else{ $('#description').css("border", "1px solid #ccc")}

      if(!$("#name").val()){
      $('#name').css("border", "1px solid red");
     }else{ $('#name').css("border", "1px solid #ccc")}

    $("#error").html("<span style='color:#cc0000'> Mandatory fields!</span>");
}
}));

// Function to preview image after validation
$(function() {
$("#image_upload").change(function() {
$("#message").empty(); // To remove the previous error message
var file = this.files[0];
var imagefile = file.type;
var match= ["image/jpeg","image/png","image/jpg"];
if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2])))
{

$("#error").html("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
return false;
}
else
{
var reader = new FileReader();
reader.onload = imageIsLoaded;
reader.readAsDataURL(this.files[0]);
}
});
});
function imageIsLoaded(e) {
$("#file").css("color","green");
$('#image_preview').css("display", "block");
$('#previewing').attr('src', e.target.result);
$('#previewing').attr('width', '250px');
$('#previewing').attr('height', '230px');
};
});