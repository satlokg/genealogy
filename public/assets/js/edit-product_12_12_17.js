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
      
      var kilometer=$("#kilometer").val();
      var brand=$("#brand").val();
      var year1=$("#year1").val();
     
   //alert(cat_id);
 if($.trim(product_id).length>0 && $.trim(email).length>0 &&  $.trim(contact).length>0 && $.trim(title).length>0 &&  $.trim(price).length>0 && $.trim(cat_id).length>0 && $.trim(sub_cat_id).length>0 && 
    $.trim(streets).length>0 && $.trim(description).length>0) {
       
      if ($.trim(cat_id)==real_estate_id) {
      	 if ( $.trim(property_type).length!='' && $.trim(property_type).length>0 && $.trim(area).length>0 && $.trim(year).length>0) {
			  
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
		    setTimeout( function(){$("#load").css("display", "none")}, 1000);

				if (data==1)
				 {
					 window.location.href='myproduct';
		          $("#error").html("<span style='color:#55a92e'>Successfull</span>")	          
		         } else if (data==2) {
                   $("#error").html("<span style='color:#cc0000'>This email id is not registered in user table, Please register to continue...!</span>");
		         } else {
		         	$("#error").html("<span style='color:#cc0000'>Server Error!</span>"); 
		         }

		          
		}
		});
	     } else {

	     	if(!$("#property_type").val()){
		      $('#property_type').css("border", "1px solid red");
		     }else{ $('#property_type').css("border", "1px solid #ccc")}

		     if(!$("#area").val()){
		      $('#area').css("border", "1px solid red");
		     }else{ $('#area').css("border", "1px solid #ccc")}

		     if(!$("#year").val()){
		      $('#year').css("border", "1px solid red");
		     }else{ $('#year').css("border", "1px solid #ccc")}

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
			      setTimeout( function(){$("#load").css("display", "none")}, 1000);

						if (data==1)
						 {
							 window.location.href='myproduct';
				          $("#error").html("<span style='color:#55a92e'>Successfull</span>")	          
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
	      setTimeout( function(){$("#load").css("display", "none")}, 1000);

				if (data==1)
				 {
					 window.location.href='myproduct';
		          $("#error").html("<span style='color:#55a92e'>Successfull</span>")	          
		         } else if (data==2) {
                   $("#error").html("<span style='color:#cc0000'>This email id is not registered in user table, Please register to continue...!</span>");
		         } else {
		         	$("#error").html("<span style='color:#cc0000'>Server Error!</span>"); 
		         }
		}
		});

      }

} else{
    

    if(!$("#email").val()){
      $('#email').css("border", "1px solid red"); 
     }else{ $('#email').css("border", "1px solid #ccc")}

     if(!$("#contact").val() ){
      $('#contact').css("border", "1px solid red");
     }else{ $('#contact').css("border", "1px solid #ccc")}

     if(!$("#title").val()){
      $('#title').css("border", "1px solid red");
     }else{ $('#title').css("border", "1px solid #ccc")}

     if(!$("#price").val()){
      $('#price').css("border", "1px solid red");
     }else{ $('#price').css("border", "1px solid #ccc")}

     if(!$("#cat_id").val()){
      $('#cat_id').css("border", "1px solid red");
     }else{ $('#cat_id').css("border", "1px solid #ccc")}

     if(!$("#sub_cat_id").val()){
      $('#sub_cat_id').css("border", "1px solid red");
     }else{ $('#sub_cat_id').css("border", "1px solid #ccc")}

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