 
$("#match-records-div,#matched-records-div").on("click", ".connect-btn",function(e){

 var sender_id=$('#sender_id').val();

 
 if(sender_id!='')
 {

        var current=$(this).find(".connect-popup-box");
        $(this).parents("#match-records-div,#matched-records-div").find(".connect-popup-box").not(current).hide();
        current.toggle();
    }
    else
    {
        $("#login-alert-modal").modal();
    }
    
    });

    $(document).on('click','.chat-notification-filter',function(){
        $('.chat-notification-filter').find('img.inactive').css('display','block');
        $('.chat-notification-filter').find('img.active').css('display','none');
        $(this).find('img.active').css('display','block');
        $(this).find('img.inactive').css('display','none');
    });

    //hide it when clicking anywhere else except the popup and the trigger
    $(document).on('click touch', function(event) {
      if (!$(event.target).parents().addBack().is('.connect-btn')) {
        $('.connect-popup-box').hide();
      }
    });
     
    // Stop propagation to prevent hiding "#tooltip" when clicking on it
    $("#match-records-div,#matched-records-div").on('click touch','.connect-btn', function(event) {
      event.stopPropagation();
    });







$(".social_search_friend").keyup(function() 
{ 
 
//alert(lang);
var search = $(this).val();
//alert(search);

var sender_id=$('#sender_id').val();

var post_id = $(this).closest("div.modal-body").find("input[name='social_post_id']").val();
var post_user_id = $(this).closest("div.modal-body").find("input[name='social_post_user_id']").val();
var loopid= $(this).closest("div.modal-body").find("input[name='social_loop_id']").val();
var page_id= $(this).closest("div.modal-body").find("input[name='page_id']").val();



//alert(post_id);
var dataString = 'search='+ search;
var html='';
if(search!='')
{
    $.ajax({
    type: "POST",
    url: bpth+"social/searchsocialfriend",
    data: dataString,
    cache: false,
    success: function(data)
    {

console.log(data);
 var dt = JSON.parse(data); 
 if(dt.friends){
 $.each(dt.friends, function( i, v ) {

if(v.image!='')
{
 var img=imagepath+v.image;
}
else{

var img=bpth+'assets/images/default_user.png';

}


if(sender_id!=v.id)
{
    
 html=html+'<li class="custom-flex flex-wrap align-items-center"><img src="'+img+'" alt="image" class="img-circle"><div class="col pr-0"><div class="social-page-name"><span class="share-friend-name">'+v.name+'</span><button class="small text-muted page-type-box" onclick="sharetofriend('+sender_id+','+v.id+','+post_id+','+post_user_id+','+loopid+','+page_id+')" >Send</button></div></div></li>';

}            

                });

                 
            }

//alert(html);
            //console.log(html);

    $("#social_share_post_friend_list-"+post_id).html(html);
    
    }
    });
}
});






$("#search_friend_by_email,#search_friend_by_page_email,#search_friend_by_event_email").keyup(function() 
{ 
 
//alert(lang);
var search = $(this).val();
//alert(search);

var sender_id=$('#sender_id').val();





//alert(post_id);
var dataString = 'search='+ search;
var html='';
if(search!='')
{
    $.ajax({
    type: "POST",
    url: bpth+"social/searchsocialfriendbyemail",
    data: dataString,
    cache: false,
    success: function(data)
    {

console.log(data);
 var dt = JSON.parse(data); 
 if(dt.friends){
 $.each(dt.friends, function( i, v ) {




    
 html=html+"<li  onClick='selectemail("+'"'+v.email+'"'+");'>"+v.email+"</li>";

           

                });

                 
            }

//alert(html);
            //console.log(html);

    $("#friend-list-social,#friend-list-page,#friend-list-event").html(html);
    
    }
    });
}
});









function selectemail(val) {
   
$("#search_friend_by_email,#search_friend_by_page_email,#search_friend_by_event_email").val(val);


$("#friend-list-social,#friend-list-page,#friend-list-event").hide();

}



$("#sendmailtouser").click(function() 
{ 
 



var sender_id=$('#sender_id').val();
var sender_name=$('#sender_name').val();


var email= $('#search_friend_by_email').val();




//alert(email);
var dataString = 'sender_id='+ sender_id+'&email='+email+'&sender_name='+sender_name;
var html='';
if(email!='')
{
    $.ajax({
    type: "POST",
    url: bpth+"social/sendfriendrequestbyemail",
    data: dataString,
    cache: false,
    success: function(data)
    {
        $("#requestsuccessmsg").html('<span style="color:green;">Friend Request has been sent to email id.</span>');
        setTimeout(function() {
            $('#search_friend_by_email').val('');
            $('#find-friend-modal').modal('hide');  
        }, 1000);
    }
    });
}
});










$("#social_page_search_friend").keyup(function() 
{ 
 
//alert(lang);
var search = $(this).val();


var sender_id=$('#sender_id').val();


var page_user_id = $(this).closest("div.modal-body").find("input[name='social_page_user_id']").val();
var page_id= $(this).closest("div.modal-body").find("input[name='page_id']").val();
var dataString = 'search='+ search;
var html='';
if(search!='')
{
    $.ajax({
    type: "POST",
    url: bpth+"social/searchsocialfriend",
    data: dataString,
    cache: false,
    success: function(data)
    {
        //alert(data);

console.log(data);
 var dt = JSON.parse(data); 
 if(dt.friends){
 $.each(dt.friends, function( i, v ) {

if(v.image!='')
{
 var img=imagepath+v.image;
}
else{

var img=bpth+'assets/images/default_user.png';

}



if(sender_id!=v.id)
{
    //alert('hello');
    
 html=html+'<li class="custom-flex flex-wrap align-items-center"><img src="'+img+'" alt="image" class="img-circle"><div class="col pr-0"><div class="social-page-name"><span class="share-friend-name">'+v.name+'</span><button class="small text-muted page-type-box" onclick="sharetopagefriend('+sender_id+','+v.id+','+page_id+','+page_user_id+')">Send</button></div></div></li>';

//alert(html);
}            

                });

                 
            }


            //console.log(html);

    $("#page_share_post_friend_list-"+page_id).html(html);
    
    }
    });
}
});









$("#social_event_search_friend").keyup(function() 
{ 
 
//alert(lang);
var search = $(this).val();


var sender_id=$('#sender_id').val();



var event_user_id = $(this).closest("div.modal-body").find("input[name='social_event_user_id']").val();
var event_id= $(this).closest("div.modal-body").find("input[name='event_id']").val();
var dataString = 'search='+ search;
var html='';
if(search!='')
{
    $.ajax({
    type: "POST",
    url: bpth+"social/searchsocialfriend",
    data: dataString,
    cache: false,
    success: function(data)
    {
       // alert(data);

console.log(data);
 var dt = JSON.parse(data); 
 if(dt.friends){
 $.each(dt.friends, function( i, v ) {

if(v.image!='')
{
 var img=imagepath+v.image;
}
else{

var img=bpth+'assets/images/default_user.png';

}



if(sender_id!=v.id)
{
    //alert('hello');
    
 html=html+'<li class="custom-flex flex-wrap align-items-center"><img src="'+img+'" alt="image" class="img-circle"><div class="col pr-0"><div class="social-page-name"><span class="share-friend-name">'+v.name+'</span><button class="small text-muted page-type-box" onclick="sharetoeventfriend('+sender_id+','+v.id+','+event_id+','+event_user_id+')">Send</button></div></div></li>';

//alert(html);
}            

                });

                 
            }


            //console.log(html);

    $("#event_share_post_friend_list-"+event_id).html(html);
    
    }
    });
}
});











 $("#search_friend").keyup(function() 
{ 
 
//alert(lang);
var search = $(this).val();
//alert(search);

var sender_id=$('#sender_id').val();


var dataString = 'search='+ search;
var html='';
if(search!='')
{
    $.ajax({
    type: "POST",
    url: bpth+"social/searchfriend",
    data: dataString,
    cache: false,
    success: function(data)
    {

console.log(data);
 var dt = JSON.parse(data); 
 if(dt.friends){
 $.each(dt.friends, function( i, v ) {

if(v.image!='')
{
 var img=imagepath+v.image;
}
else{

var img=bpth+'assets/images/default_user.png';

}


if(sender_id!=v.id)
{

 html=html+'<div class="col-xs-12 col-sm-6 col-md-2 sub-div match-record" id="match-'+v.id+'" style="cursor:pointer;"><div class="product-card product-card-custom"><figure class="zero-padding"><a id="make-div-clickable1" href="#" ><img src="'+img+'" alt="" class="img-responsive"></a></figure><summary class="clearfix" style="margin-top:20px;"><h4 class="product-heading text-center"><a href="#">'+v.name+'</a></h4><button type="button" class="connect-btn btn btn-primary" id="connectionBtn-10" style="position:relative;"><span id="connect'+v.id+'">Connect</span><div class="connect-popup-box" id="popup'+v.id+'"><ul class="list-unstyled connect-option-list" style="margin-bottom: 0;"><li><a href="#" value="1">Friends</a></li><li><a href="#" value="2">Family</a></li></ul><input type="hidden" name="reciever_id" id="reciever_id" value="'+v.id+'"></div></button> </summary></div></div>';
       }            

                });

                 
            }

//alert(html);
            //console.log(html);

    $("#match-records-div").html(html);
    
    }
    });
}else
{
    $("#match-records-div").html(html);
}   
});





$("#match-records-div,#matched-records-div").on("click", "li",function(e){
        
    var request_type = $(this).find('a').attr("value");
    var reciever_id=$(this).parents('.match-record').find('#reciever_id').val();
    
    var sender_id=$('#sender_id').val();

    var type=$(this).parents('.match-record').find('button').val();



if(sender_id=='')
{

 $("#login-alert-modal").modal();

}
else
{

     $.ajax({
    type: "POST",
    url: bpth+"social/requestacceptfriend",
    data: {sender_id : sender_id, reciever_id: reciever_id, request_type: request_type,type:type},
    cache: false,
    success: function(data)
    {

        if(type=='accept')
{
$('#accept'+reciever_id).html('Connected');
$('#decline'+reciever_id).parent().hide();
$('#accept'+reciever_id).parent("button").addClass("cancel-req-btn").removeClass("connect-btn");

$("#popup"+reciever_id).html('<ul class="list-unstyled connect-option-list" style="margin-bottom: 0;"><li><a href="#" value="1">Friends</a></li><li><a href="#" value="2">Family</a></li></ul>');
}
else
{

        
$('#connect'+reciever_id).html('Cancel Request');

$('#connect'+reciever_id).parent("button").addClass("cancel-req-btn").removeClass("connect-btn");
$('#connect'+reciever_id).parent("button").val('cancel');
// $("#popup"+reciever_id).remove();

}
}

    });


}

      
    });



//$("button").on("click",function(e){

//$("#matched-records-div").on("click", ".connect-btn",function(e){

$("#match-records-div,#matched-records-div").on("click", ".cancel-req-btn",function(e){
       




 
var type=$(this).val();
    //alert(type);  
        
   // var request_type = $(this).find('a').attr("value");
    var reciever_id=$(this).parents('.match-record').find('#reciever_id').val();
    
    var sender_id=$('#sender_id').val();
  //  alert(sender_id);

   // alert(reciever_id);

//alert(type);

//die;

if(sender_id=='')
{

 $("#login-alert-modal").modal();

}
else
{

     $.ajax({
    type: "POST",
    url: bpth+"social/cancelrequestfriend",
    data: {sender_id : sender_id, reciever_id: reciever_id,type:type},
    cache: false,
    success: function(data)
    {
       // alert(data);

       if(type=='cancel')
       {
        
$('#connect'+reciever_id).html('Connect');

//$('#connect'+reciever_id).html('Cancel Request');

$('#connect'+reciever_id).parent("button").addClass("connect-btn").removeClass("cancel-req-btn");
$('#connect'+reciever_id).parent("button").val('');

}



if(type=='decline')
{

$('#decline'+reciever_id).html('Declined');
$('#accept'+reciever_id).parent().hide();

$("#popup"+reciever_id).html('<ul class="list-unstyled connect-option-list" style="margin-bottom: 0;"><li><a href="#" value="1">Friends</a></li><li><a href="#" value="2">Family</a></li></ul>');


}

//location.reload();

//$('#match-records').load('find_friends #match-records', function() { });


}

    });


}

      
    });


function share_to_all(user_id, post_id,post_user_id,countshare,loopid,pageid){




        if(user_id && post_id){

           // alert('hello');
            var request = $.ajax({
                type: 'POST',
                url: bpth+"social/sharetoall",
                cache: false,
                data: {user_id: user_id, post_id: post_id,post_user_id:post_user_id,pageid:pageid}
            });
            request.done(function(data) {


//alert(data);


var countshare=$('.count-shares-'+post_id+'-'+loopid).text();
//countshare=parseInt(countshare);

        countshare++;


 


//alert(countshare);


$('.count-shares-'+post_id+'-'+loopid).html(countshare);


                if(countshare>1)
{

    $('#share-comment-text-'+post_id+'-'+loopid).html('&nbsp;&nbsp;Shares');
}
else
{
    $('#share-comment-text-'+post_id+'-'+loopid).html('&nbsp;&nbsp;Share');
}

console.log(data);
                var result = JSON.parse(data);


var image = result.image;


//alert(imagepath);
                    var date = moment(new Date()).format("Do MMM, YYYY");


                    if(image != ''){
                        var img = imagepath+image;
                    }else{
                        var img = imagepath+'/assets/images/default_user.png';
                    }


$('#share-data-'+post_id+'-'+loopid).append('<li class="social-friend-list-item" ><a href="#" class="custom-flex flex-wrap align-items-center"><img src="'+img+'" alt="'+result.name+'" class="img-circle" style="max-height:40px; max-width:40px; border-radius:100%;"><div class="col pr-0"><div class="social-friend-name"><span>'+result.name+'</span></div></div></a></li>');



            
              //  var dt = JSON.parse(data);
              //  console.log(dt); 

setTimeout(function() { location.reload();  }, 3000);

            });

            request.fail(function(jqXHR, textStatus) {
              
            });
        }
    }

function share_to_page_all(user_id, page_id,page_user_id){





        if(user_id && page_id){

           // alert('hello');
            var request = $.ajax({
                type: 'POST',
                url: bpth+"page/sharetopageall",
                cache: false,
                data: {user_id: user_id, page_id: page_id,page_user_id:page_user_id}
            });
            request.done(function(data) {


//alert(data);
 alert("Page Shared Successfully.");


            
              //  var dt = JSON.parse(data);
              //  console.log(dt); 

setTimeout(function() { location.reload();  }, 3000);

            });

            request.fail(function(jqXHR, textStatus) {
              
            });
        }
    }


    function share_to_event_all(user_id, event_id,event_user_id){





        if(user_id && event_id){

           // alert('hello');
            var request = $.ajax({
                type: 'POST',
                url: bpth+"event/sharetoeventall",
                cache: false,
                data: {user_id: user_id, event_id: event_id,event_user_id:event_user_id}
            });
            request.done(function(data) {



alert("Event Shared Successfully.");


            
              //  var dt = JSON.parse(data);
              //  console.log(dt); 

setTimeout(function() { location.reload();  }, 3000);

            });

            request.fail(function(jqXHR, textStatus) {
              
            });
        }
    }


function sharetofriend(sender_id, reciever_id, post_id,post_user_id,loopid,page_id){



        if(sender_id && post_id){

           // alert('hello');
            var request = $.ajax({
                type: 'POST',
                url: bpth+"social/sharetofriend",
                cache: false,
                data: {sender_id: sender_id, post_id: post_id,reciever_id:reciever_id,post_user_id:post_user_id,page_id:page_id}
            });
            request.done(function(data) {


//alert(data);
var countshare=$('.count-shares-'+post_id+'-'+loopid).text();
//countshare=parseInt(countshare);

        countshare++;


 


//alert(countshare);


$('.count-shares-'+post_id+'-'+loopid).html(countshare);


                if(countshare>1)
{

    $('#share-comment-text-'+post_id+'-'+loopid).html('&nbsp;&nbsp;Shares');
}
else
{
    $('#share-comment-text-'+post_id+'-'+loopid).html('&nbsp;&nbsp;Share');
}

console.log(data);
                var result = JSON.parse(data);


var image = result.image;


//alert(imagepath);
                    var date = moment(new Date()).format("Do MMM, YYYY");


                    if(image != ''){
                        var img = imagepath+image;
                    }else{
                        var img = imagepath+'/assets/images/default_user.png';
                    }

                     $("#sharemsg"+post_id+'-'+loopid).html('<span style="color:green;">Post shared successfully.</span>');     
    

                    setTimeout(function() {

 $("#sharemsg"+post_id+'-'+loopid).html(''); 

    location.reload();
}, 3000);


$('#share-data-'+post_id+'-'+loopid).append('<li class="social-friend-list-item" ><a href="#" class="custom-flex flex-wrap align-items-center"><img src="'+img+'" alt="'+result.name+'" class="img-circle" style="max-height:40px; max-width:40px; border-radius:100%;"><div class="col pr-0"><div class="social-friend-name"><span>'+result.name+'</span></div></div></a></li>');



            
              //  var dt = JSON.parse(data);
              //  console.log(dt);                
            });

            request.fail(function(jqXHR, textStatus) {
              
            });
        }
    }

function sharetopagefriend(sender_id, reciever_id, page_id,page_user_id){

 

        if(sender_id && page_id){

           // alert('hello');
            var request = $.ajax({
                type: 'POST',
                url: bpth+"page/sharetofriend",
                cache: false,
                data: {sender_id: sender_id, page_id: page_id,reciever_id:reciever_id,page_user_id:page_user_id}
            });
            request.done(function(data) {




            $("#sharepagemsg"+page_id).html('<span style="color:green;">Page shared successfully.</span>');     
    
      setTimeout(function() {

 $("#sharepagemsg"+page_id).html(''); 
 location.reload();    
    
}, 3000);


              //  var dt = JSON.parse(data);
              //  console.log(dt);                
            });

            request.fail(function(jqXHR, textStatus) {
              
            });
        }
    }


    function sharetopagefriendbyemail(sender_id,name, page_id,page_user_id){

var email=$('#search_friend_by_page_email').val();
 


        if(sender_id && page_id){

           // alert('hello');
            var request = $.ajax({
                type: 'POST',
                url: bpth+"page/sharetofriendbyemailid",
                cache: false,
                data: {sender_id: sender_id, page_id: page_id,email:email,page_user_id:page_user_id,name:name}
            });
            request.done(function(data) {


            $("#sharepagemsgbyemail"+page_id).html('<span style="color:green;">Page shared successfully.</span>');     
    
   
        setTimeout(function() {

            $("#sharepagemsgbyemail"+page_id).html('');
            $('#search_friend_by_page_email').val('');
            $('#share-page-modal-to-email-id').modal('hide');
            //location.reload();    
            
        }, 2000);


              //  var dt = JSON.parse(data);
              //  console.log(dt);                
            });

            request.fail(function(jqXHR, textStatus) {
              
            });
        }
    }



  function sharetoeventfriendbyemail(sender_id,name, event_id,event_user_id){

var email=$('#search_friend_by_event_email').val();
 
//alert(email);

        if(sender_id && event_id){

           // alert('hello');
            var request = $.ajax({
                type: 'POST',
                url: bpth+"event/sharetofriendbyemailid",
                cache: false,
                data: {sender_id: sender_id, event_id: event_id,email:email,event_user_id:event_user_id}
           
            });
            request.done(function(data) {



            $("#shareeventmsgbyemail"+event_id).html('<span style="color:green;">Event shared successfully.</span>');     
    
    //alert(data);
      setTimeout(function() {

 $("#shareeventmsgbyemail"+event_id).html('');
 $('#search_friend_by_event_email').val('');
 $('#share-event-modal-to-email-id').modal('hide');
 //location.reload();    
    
}, 2000);


              //  var dt = JSON.parse(data);
              //  console.log(dt);                
            });

            request.fail(function(jqXHR, textStatus) {
              
            });
        }
    }


    function sharetoeventfriend(sender_id, reciever_id, event_id,event_user_id){

 

        if(sender_id && event_id){

           // alert('hello');
            var request = $.ajax({
                type: 'POST',
                url: bpth+"event/sharetofriend",
                cache: false,
                data: {sender_id: sender_id, event_id: event_id,reciever_id:reciever_id,event_user_id:event_user_id}
            });
            request.done(function(data) {




            $("#shareeventmsg"+event_id).html('<span style="color:green;">Event shared successfully.</span>');     
    
      setTimeout(function() {

 $("#shareeventmsg"+event_id).html(''); 
 location.reload();    
    
}, 3000);


              //  var dt = JSON.parse(data);
              //  console.log(dt);                
            });

            request.fail(function(jqXHR, textStatus) {
              
            });
        }
    }


function acceptevent(event_id, sender_id){



    var status=$('#eventstatus').val();

    if(status=='0' || status=='2')
    {
        status='1';
    }
    else
    {
        status='0';
    }

 

        if(sender_id && event_id){

           // alert('hello');
            var request = $.ajax({
                type: 'POST',
                url: bpth+"event/acceptevent",
                cache: false,
                data: {sender_id: sender_id, event_id: event_id,status:status}
            });
            request.done(function(data) {



            $('#eventstatus').val(status);

            if(status=='1'){
            $("#accepteventmsg").html('Accepted');
            $("#declineeventmsg").html('Decline');
        }
        else
        {
             $("#accepteventmsg").html('Accept');
        }
      


              //  var dt = JSON.parse(data);
              //  console.log(dt);                
            });

            request.fail(function(jqXHR, textStatus) {
              
            });
        }
    }

    function declineevent(event_id, sender_id){



    var status=$('#eventstatus').val();

    if(status=='1' || status=='0')
    {
        status='2';
    }
    else
    {
        status='0';
    }

 

        if(sender_id && event_id){

           // alert('hello');
            var request = $.ajax({
                type: 'POST',
                url: bpth+"event/acceptevent",
                cache: false,
                data: {sender_id: sender_id, event_id: event_id,status:status}
            });
            request.done(function(data) {



            $('#eventstatus').val(status);

            if(status=='2'){
            $("#declineeventmsg").html('Declined');
            $("#accepteventmsg").html('Accept');
        }
        else
        {
             $("#declineeventmsg").html('Decline');
        }
      


              //  var dt = JSON.parse(data);
              //  console.log(dt);                
            });

            request.fail(function(jqXHR, textStatus) {
              
            });
        }
    }


