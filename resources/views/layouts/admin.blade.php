<!DOCTYPE html>
<html class="no-j" lang="en">
<head>
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Services</title>
    <meta name="description" content="">
    <link rel="stylesheet" href="{{asset('public/assets/css/bootstrap.min.css')}}">
	<link rel="stylesheet" href="{{asset('public/assets/css/bootstrap-datetimepicker.css')}}">
	<link rel="stylesheet" href="{{asset('public/assets/fonts/css/font-awesome.css')}}">
	<link rel="stylesheet" href="{{asset('public/assets/css/style.css?ver=0.6')}}">
	<link rel="stylesheet" href="{{asset('public/assets/css/animate.css')}}">
	<link rel="stylesheet" href="{{asset('public/assets/css/jquery-ui.css')}}">
	<link rel="stylesheet" href="{{asset('public/assets/css/xzoom.css')}}">
	<link rel="stylesheet" href="{{asset('public/assets/fonts/cicil/cicil.css')}}" />
	<link rel="stylesheet" href="{{asset('public/assets/sliderengine/amazingslider-1.css')}}">
	<link rel="icon" href="{{asset('public/assets/images/favicon.ico')}}">
	<link href="{{asset('public/assets/css/lightbox.css')}}" rel="stylesheet" />
	<link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>
	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900" rel="stylesheet">
	 @yield('css')
<style>
	
.gsc-results-wrapper-overlay.gsc-results-wrapper-visible{
	height: 500px;
    width: 100%;
    left: 0;
    top: 0;
}
#google-search-modal{
	top: 10%;
}
#google-search-modal .modal-content {
	border: none;
}
#google-search-modal .modal-dialog::before{
	content: "";
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-bottom: 14px solid #fff;
    left: 51%;
    bottom: 99%;
    transform: translateX(-50%);
}
</style>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC17dLfL0mRIkYlY3WRfXKAbYHDlKrkmfc"></script>
<script src="http://localhost/bhuumi/assets/js/jquery-1.12.0.min.js"></script>
<script type="text/javascript">
	$(function() {	
		if($('.alert.alert-success').is(":visible")){
			$('.alert.alert-success').fadeOut(7000);
		}
	});
	if (navigator.geolocation) {
		var vm = this;
		navigator.geolocation.getCurrentPosition(function(position){
			var geolocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			$.ajax({
				type:'POST',
				url:"http://localhost/bhuumi/home/getlocation",
				data:'latitude='+latitude+'&longitude='+longitude,
				success:function(msg){}
			});
		});
	}
			
</script>


<div id="messageInformation" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">     
			<div class="modal-body">
				<p id="msgtodisplay" class="text-center"></p>
			</div>     
		</div>
	</div>
</div>
<div id="google-search-modal" class="modal fade">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-body">
				<div id="googleSearchBox">
					<script>
						(function() {
							var cx = '015684336095294518968:4ihf8vukwp0';
							var gcse = document.createElement('script');
							gcse.type = 'text/javascript';
							gcse.async = true;
							gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
							var s = document.getElementsByTagName('script')[0];
							s.parentNode.insertBefore(gcse, s);
						})();
					</script>
					<gcse:search></gcse:search>
				</div>
			</div>
		</div>
	</div>
</div>

 

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-135542876-1"></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'UA-135542876-1');
</script>
</head>
<body>
<!--**************** START HEADER SETCION ************************-->

<div>
    <form id="getfrmlocation" name="getfrmlocation" method="POST">
    </form>
</div>
	
		
<!-- ===================  categories header starts =====================  -->
<header class="top-header-categories text-center header-categories-nav navbar-default">
    <div class="container">
        <div class="row d-flex align-items-center flex-wrap">
            <div class="col-sm-12 col-xs-12">
                <div class="inner-logo-container">
                	<a href="http://localhost/bhuumi/" title="Home" alt="Home">
                    	<img src="http://localhost/bhuumi/assets/images/green-logo.png" alt="logo" class="">
                    </a>

                    <a href="#soon-modal" title="Bhuumi Chat" data-toggle="modal" class="hidden-xs hidden-sm">
                    	<img src="http://localhost/bhuumi/assets/images/chat-con-green.png" alt="logo">
                    </a>
                    <a href="#ride-modal" data-toggle="modal" title="Bhuumi Ride" class="hidden-xs hidden-sm">
                    	<img src="http://localhost/bhuumi/assets/images/bhuumi_driver.png" alt="logo">
                    </a>
                </div>
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar">
		        	<span class="sr-only">Toggle navigation</span>
		        	<span class="icon-bar"></span>
		        	<span class="icon-bar"></span>
		        	<span class="icon-bar"></span>
		        </button>
                    

                <div class="collapse navbar-collapse" id="main-navbar">     
                <ul class="list-inline top-categories-mobile-nav">
                	<li data-title="BHUUMI Chat" class="dropdown ">
                		<a href="#soon-modal" title="BHUUMI Chat" data-toggle="modal">
							<img src="http://localhost/bhuumi/assets/images/chat-con-green.png" alt="BHUUMI Chat" class="img-responsive">
                      		<span class="menu-left">BHUUMI Chat</span> 
                    	</a>
                    </li>

                    <li data-title="BHUUMI Driver" class="dropdown">
                		<a href="#bhuumi-driver-store-modal" title="BHUUMI Driver" data-toggle="modal">
                			<img src="http://localhost/bhuumi/assets/images/bhuumi_user.png" alt="logo" class="img-responsive">
                      		<span class="menu-left">BHUUMI Driver</span> 
                    	</a>
                    </li>

                    <li data-title="BHUUMI Ride" class="dropdown">
                		<a href="#bhuumi-ride-store-modal" title="BHUUMI Ride" data-toggle="modal">
							<img src="http://localhost/bhuumi/assets/images/bhuumi_driver.png" alt="logo" class="img-responsive">
                      		<span class="menu-left">BHUUMI Ride</span> 
                    	</a>
                    </li>
				
					<li data-title="Buy or Sell" class="dropdown ">	
						<a data-title="New or used items. Your postings are free and with no cost or commission" class="dropdown-toggle disabled header-nav-title"  href="http://localhost/bhuumi/comon?catid=c_5bfd195c56980">
							<img src="{{ url('public/assets/images/dummy-img.png') }}" class="img-responsive">
							<span class="menu-left">Buy or Sell</span>
						</a>
					</li>

					<li data-title="MatchMaking" class="dropdown ">
						<a data-title="Meet, date or find your soulmate" class="dropdown-toggle disabled header-nav-title"  href="http://localhost/bhuumi/comon?catid=c_5bfd19c59f88c">
                    		<img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
							<span class="menu-left">MatchMaking</span>
                    	</a>
                	</li>

				
				<li data-title="Real Estate" class="dropdown ">	
					<a data-title="Buy, sell or rent: Residential, B&amp;B, commercial/Businesses or vacation properties.REAL ESTATE Buy, sell or rent Residential, B&B, Commercial/Businesses or Vacation properties" class="dropdown-toggle disabled header-nav-title"  href="http://localhost/bhuumi/comon?catid=c_5bfd1a7acfd27">
						<img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
						<span class="menu-left">Real Estate</span>
                    </a>
                </li>

				
				<li data-title="Services" class="dropdown active">	
					<a data-title="Connect with tradesmen, advisors, home helpers and community resources. Post your resume or make a job offering" class="dropdown-toggle disabled header-nav-title"  href="http://localhost/bhuumi/comon?catid=c_5bfd1aac16090">
                    	<img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
						<span class="menu-left">Services</span>
                    </a>
                </li>

					
				
				<li>
					<a class="header-nav-title" title="Search" data-title="Search" id="mobile-menu-search-trigger" href="javascript:void 0;">
                    	<img src="http://localhost/bhuumi//assets/images/search2.png" class="img-responsive">
                        <span class="menu-left">Search</span>
                    </a>
                    <div id="mobile-menu-search-container" style="display: none;">               	
                    	<div id="googleSearchBox">
                    		<script>
								(function() {
									var cx = '006047812671630938053:t69tmsl0pl0';
									var gcse = document.createElement('script');
									gcse.type = 'text/javascript';
									gcse.async = true;
									gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
									var s = document.getElementsByTagName('script')[0];
									s.parentNode.insertBefore(gcse, s);
								})();
							</script>
							<gcse:search></gcse:search>
						</div>
                     </div>
                  </li>
                <script>
                	$("#mobile-menu-search-trigger").click(function(){
                		$(this).next().slideToggle();
                	});
                </script>

				
				<li data-title="Social" class="dropdown active">
					<a class="dropdown-toggle disabled"   data-target="#soon-modal" data-toggle="modal"  data-toggle="dropdown" href="#soon-modal" data-title="Connect with friends, family, groups and Bhuumi users. Join or initiate a group.SOCIAL Connect with friends, family, groups and Bhuumi users. Join or initiate a group <br><strong>Coming Soon</strong>">
						<img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
                    	<span class="menu-left">Social</span>
                    </a>
                </li>

				
				<li data-title="Auto" class="dropdown active">
					<a class="dropdown-toggle disabled"  data-toggle="dropdown" href="http://localhost/bhuumi/comon?catid=c_5c7543bb19f37" data-title="Buy, sell or rent new or uses vehicles.">
						<img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
                    	<span class="menu-left">Auto</span>
                	</a>	                    
                </li>

				
				<li data-title="Bhuumi Star" class="dropdown active">
					<a class="dropdown-toggle disabled"  data-toggle="dropdown" href="http://localhost/bhuumi/comon?catid=c_5bfd1b254cec9" data-title="Share and post pictures and videos exhibiting your talent! No commercials or interruptions will occur during playback. Category One - Participants will be rewarded with cash payouts for receiving certain hits, ie: 100,000 hits wins $1,000.00 500,000 hits wins $3,000.00 Category Two - Most hits, over 1 million, will become a “Bhuumi Star” and will receive $100,000">
						<img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
                    	<span class="menu-left">A Star is Born</span>
                	</a>                    
                </li>

				
				<li data-title="Forum" class="dropdown active">
					<a class="dropdown-toggle disabled"  data-toggle="dropdown" href="http://localhost/bhuumi/comon?catid=c_5bfd1b4ac44c8" data-title="A place where Bhuumi users can connect, debate, discuss and interact. It is an “open” forum where users can have thoughtful discussions on topic ranging from politics to healthy eating tips.">
						<img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
                    	<span class="menu-left">Forum</span>
                    </a>                    
                </li>

				<li>
					<a href="http://localhost/bhuumi/user" class="log-btn" title="Login/Signup">
						<img src="http://localhost/bhuumi//assets/images/profile-outline.png" class="img-responsive">
						<span class="menu-left">Login</span>
					</a>
				</li>
			</ul>

			<ul class="list-inline top-categories desktop-nav">
				<li data-title="New or used items. Your postings are free and with no cost or commission" class="dropdown ">
					<a class="dropdown-toggle disabled header-nav-title" data-toggle="dropdown" href="http://localhost/bhuumi/comon?catid=c_5bfd195c56980" data-title="New or used items. Your postings are free and with no cost or commission">
						<img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
						<span>Buy or Sell</span>
                    </a>
                </li>

				
				<li data-title="Meet, date or find your soulmate" class="dropdown ">
					<a class="dropdown-toggle disabled header-nav-title" data-toggle="dropdown" href="http://localhost/bhuumi/comon?catid=c_5bfd19c59f88c" data-title="Meet, date or find your soulmate">
						<img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
						<span>MatchMaking</span>
					</a>
				</li>

				
				<li data-title="Buy, sell or rent: Residential, B&amp;B, commercial/Businesses or vacation properties.REAL ESTATE Buy, sell or rent Residential, B&B, Commercial/Businesses or Vacation properties" class="dropdown ">
					<a class="dropdown-toggle disabled header-nav-title" data-toggle="dropdown" href="http://localhost/bhuumi/comon?catid=c_5bfd1a7acfd27" data-title="Buy, sell or rent: Residential, B&amp;B, commercial/Businesses or vacation
						properties.REAL ESTATE Buy, sell or rent Residential, B&B, Commercial/Businesses or Vacation properties">
						<img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
						<span>Real Estate</span>
					</a>
				</li>

				
				<li data-title="Connect with tradesmen, advisors, home helpers and community
					resources. Post your resume or make a job offering" class="dropdown active">
					<a class="dropdown-toggle disabled header-nav-title" data-toggle="dropdown" href="http://localhost/bhuumi/comon?catid=c_5bfd1aac16090" data-title="Connect with tradesmen, advisors, home helpers and community resources. Post your resume or make a job offering">
						<img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
						<span>Services</span>
					</a>
				</li>

					
				
				<li>
					<a class="header-nav-title" data-title="Your one-stop search engine." id="triggerbrowse" href="#google-search-modal" data-backdrop="false" data-toggle="modal">
						<img src="http://localhost/bhuumi//assets/images/search2.png" class="img-responsive">
						<div class="a-detail-on-hover-right" id="custom-space">
							<span style="text-transform:uppercase;font-weight:900; font-size:1.6rem; color: #000;" class="text-left">Search</span>
							<p class="custom-bottom" style="margin-top:8px; font-size: 14px;font-weight: 600;    letter-spacing: 1.5px;color: #4a4444;">Your one-stop search engine.</p>
						</div>
					</a>
				</li>

				
				<li data-title="Connect with friends, family, groups and Bhuumi users. Join or initiate a group.SOCIAL Connect with friends, family, groups and Bhuumi users. Join or initiate a group <br> <strong>Coming Soon</strong>" class="dropdown ">	
					<a class="dropdown-toggle disabled"   data-target="#soon-modal" data-toggle="modal"  href="#soon-modal" data-title="Connect with friends, family, groups and Bhuumi users. Join or initiate a group.SOCIAL Connect with friends, family, groups and Bhuumi users. Join or initiate a group <br> <strong>Coming Soon</strong>">
						<img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
						<span>Social</span>
					</a>
				</li>

				
				<li data-title="Buy, sell or rent new or uses vehicles." class="dropdown ">
                    <a class="dropdown-toggle disabled"  href="http://localhost/bhuumi/comon?catid=c_5c7543bb19f37" data-title="Buy, sell or rent new or uses vehicles.">
                    	<img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
                    	<span>Auto</span>
                    </a>							                    
                </li>

				
				<li data-title="Share and post pictures and videos exhibiting your talent! No commercials or interruptions will occur during playback. Category One - Participants will be rewarded with cash payouts for receiving certain hits, ie:
					100,000 hits wins $1,000.00
					500,000 hits wins $3,000.00
					Category Two - Most hits, over 1 million, will become a
					“Bhuumi Star” and will receive $100,000" class="dropdown ">
					
					<a class="dropdown-toggle disabled"  href="http://localhost/bhuumi/comon?catid=c_5bfd1b254cec9" data-title="Share and post pictures and videos exhibiting your talent!
						No commercials or interruptions will occur during playback.
						Category One - Participants will be rewarded with cash
						payouts for receiving certain hits, ie:
						100,000 hits wins $1,000.00
						500,000 hits wins $3,000.00
						Category Two - Most hits, over 1 million, will become a
						“Bhuumi Star” and will receive $100,000">
						<img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
						<span>Bhuumi Star</span></a>
					</li>

				
				<li data-title="A place where Bhuumi users can connect, debate, discuss and
interact. It is an “open” forum where users can have thoughtful
discussions on topic ranging from politics to healthy eating tips." class="dropdown ">
										

                    <a class="dropdown-toggle disabled"  href="http://localhost/bhuumi/comon?catid=c_5bfd1b4ac44c8" data-title="A place where Bhuumi users can connect, debate, discuss and
interact. It is an “open” forum where users can have thoughtful
discussions on topic ranging from politics to healthy eating tips."><img src="http://localhost/bhuumi/assets/images/dummy-img.png" class="img-responsive">
                    <span>Forum</span></a>
                    
												                    
                </li>

				                </ul>
                </div>

                <ul class="list-inline login-list" id="cht-icons">
                                            <li>
						<!-- <a href="user" class="login-btn">Login/Signup</a> -->
						<a href="http://localhost/bhuumi/user" class="log-btn" title="Login/Signup"><img src="http://localhost/bhuumi//assets/images/profile-outline.png" class="img-responsive"></a>
						</li>
                                    </ul>
           </div>
        </div>
    </div>
</header>
<!-- ===================  categories header ends =====================  -->

<main class="sticky-footer">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
            	 @yield('content')
            </div>
        </div>
    </div>
</main>



<style>


.btnRefresh, .btnRefreshContact {
    background-color: #091b4a;
    border: 0;
    padding: 6px 10px;
    margin-left:10px;
    color: #FFF;  
}
.btnAction {
    background-color: #091b4a;
    border: 0;
    padding: 10px 40px;
    color: #FFF;
    border: #F0F0F0 1px solid;
    border-radius: 4px;
    margin-left: 120px;
}

</style>

<div id="join-alert-modal" class="modal fade">
                <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                    <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
                    <h3>Join Team</h3>
                    </div>
                    <div class="modal-body">
                    <h4>Please login to post join team.</h4>
                    <p><a href="http://localhost/bhuumi/user">click here</a> to login</p>
                    </div>
                    </div>
                </div>
            </div>



            <div id="find-friend-modal" class="modal fade">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
                <h3>Find Friends</h3>
            </div>
            <div class="modal-body">

 
<div id="requestsuccessmsg"></div>
    <div class="form-group">
                    <input type="text" name="search" autocomplete="off" id="search_friend_by_email" class="form-control search_friend" placeholder="Search friends by email Id">
                     <ul class="friend-list" id="friend-list-social">
                 <span>(Please enter multiple emails with comma separated.)</span>

                    </ul>
                    </div>
                   
               
                    <div class="form-group">
                <button class="btn status-label align-items-center" id="sendmailtouser" name="submit" type="Submit">
                                   
                                    <span>Submit</span>
                                </button>
                            </div>
                
            </div>

        </div>
    </div>
</div>

<style>

.friend-list{float:left;list-style:none;margin-top:-3px;padding:0;position: absolute;}
.friend-list li{padding: 10px; background:#FFFFFF;  border-bottom: #bbb9b9 1px solid;}
.friend-list li:hover{background: #40aa36;color:#FFFFFF;cursor: pointer;}

</style>
<!--share-page-modal-end-->

            <div id="feedback-alert-modal" class="modal fade">
                <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                    <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
                    <h3>Feedback</h3>
                    </div>
                    <div class="modal-body">
                    <h4>Please login to post feedback.</h4>
                    <p><a href="http://localhost/bhuumi/user">click here</a> to login</p>
                    </div>
                    </div>
                </div>
            </div>

            <div id="contact-alert-modal" class="modal fade">
                <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                    <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
                    <h3>contact@bhuumi.com </h3>
                    </div>
                    <div class="modal-body">
                    <h4>Please login to post contact details.</h4>
                    <p><a href="http://localhost/bhuumi/user">click here</a> to login</p>
                    </div>
                    </div>
                </div>
            </div>

<!-- ===========================footer-section-start--for mobile -->
<footer class="footer-section-for-mobile">
    <div class="container">
        <div class="row d-flex align-items-center flex-wrap">
            
            <div class="col-md-3 col-xs-12">
                    <div class="footer-menu-mobile">
                        <ul class="list-unstyled text-center">
                            <li> <a href="#terms-modal" data-toggle="modal">Terms of Use Privacy Policy</a></li>
                        </ul>
                    </div>
            </div>

            <!-- <div class="col-sm-1 col-xs-12">
                <div class="footer-menu-mobile">
                </div>
            </div> -->

            <div class="col-md-2 col-xs-12">
                <div class="footer-menu-mobile">
                    <a href="#video-modal" class="footer-logo-1" data-toggle="modal" title="Video" alt="Video">
                        <img src="http://localhost/bhuumi/assets/images/white-logo.png">
                    </a>
                <button type="button" class="navbar-toggle collapsed navbar-footer" data-toggle="collapse" data-target="#main-navbar-footer">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                </button>
                    

                <div class="collapse navbar-collapse footer-collapse" id="main-navbar-footer">
                    <ul class="list-unstyled collapse-list">
                        <li> <a href="#donate-modal" data-toggle="modal">Donate / Invest</a></li>

                                                 <li> <a href="#aboutus-modal" data-toggle="modal">About</a></li>
                        <li> <a href="#vision-modal" data-toggle="modal">Mission / Vision</a></li>
                        
                        <li> <a href="#join-alert-modal" data-toggle="modal">Join Team</a></li>
                                            <li> <a href="#faqs-modal" data-toggle="modal">FAQ's</a></li>
                        <li> <a href="#advertise-modal" data-toggle="modal">Advertise</a></li>

                         
<li><a href="#feedback-alert-modal" data-toggle="modal">Feedback</a></li>
                                            <li> <a href="javascript:void 0">Copyright @ 2018 BHUUMI</a></li>
                    
                    </ul>
               </div>
            </div>
           </div>

           <script>
            $(function(){
               $("#main-navbar-footer").on('shown.bs.collapse',function(e){
                    var el=$(e.target).parents("footer");
                    var H=el.outerHeight(true);
                    el.css({marginTop:-H});
               });

               $("#main-navbar-footer").on('hide.bs.collapse',function(e){
                    var el2=$(e.target).parents("footer");
                    el2.css({marginTop:0});
               });
            });
           </script>


            

          
            <!-- <div class="col-sm-12">
                <div class="row">
                    <div class="col-sm-10">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="footer-menu">
                                    <h3></h3>
                                    <ul class="list-unstyled">
                                        <li> <a href="">Help build</a></li>
                                        <li> <a href="">Donate</a></li>
                                        <li> <a href="mailto:info@bhuumi.com">info@bhuumi.com</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="footer-menu">
                                    <h3></h3>
                                    <ul class="list-unstyled">
                                        <li> <a href="">Advertise</a></li>
                                        <li> <a href="">Feedback</a></li>
                                        <li> <a href="">Terms of Use Privacy Policy</a></li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="col-sm-4">
                                <div class="footer-menu">
                                    <h3></h3>
                                    <ul class="list-unstyled">
                                        <li> <a href="">FAQ</a></li>
                                        <li> <a href="">Join Team</a></li>
                                        <li> <a href="javascript:void 0">Copyright @ 2018 BHUUMI</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-2">
                        <div class="footer-menu">
                            <h3></h3>
                            <a href="https://youtu.be/7QrBVb0jph4" target="_blank" class="footer-logo">
                                <img src="assets/images/green-logo.png">
                            </a>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
    <!-- <div class="subfooter">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <span>Copyright @ 2018 | BHUUMI</span>
                </div>
                <div class="col-sm-6">
                    <span class="pull-right viprab">Created by <a href="https://viprabusiness.com/">Vipra Business</a></span>
                </div>
            </div>
        </div>
    </div> -->
</footer>
<!-- =================================footer-section-close---for -mobile -->



<footer class="footer-section">
    <div class="container">
        <div class="row d-flex align-items-center">

            <div class="col-sm-4 col-lg-2 col-xs-12">
                <div class="footer-menu">
                    <ul class="list-unstyled">
                       
						<li> <a href="#faqs-modal" data-toggle="modal">FAQ's</a></li>
                        
                        <li> <a href="#contact-alert-modal" data-toggle="modal">contact@bhuumi.com</a></li>

                                        </ul>
                </div>
            </div>
	
            <div class="col-sm-4 col-lg-2 col-xs-12">
                <div class="footer-menu">
                    <ul class="list-unstyled">
                        <li> <a href="#aboutus-modal" data-toggle="modal">About</a></li>
						<li> <a href="#advertise-modal" data-toggle="modal">Advertise</a></li>
                        </ul>
                </div>
            </div>
            

             <div class="col-sm-4 col-lg-3 col-xs-12">
                <div class="footer-menu">
                    <ul class="list-unstyled">
                      
                        <li> <a href="#help-modal" data-toggle="modal">Copyright @ 2018 BHUUMI</a></li>
                        <li> <a href="#terms-modal" data-toggle="modal">Terms of Use Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
           
              <div class="col-sm-4 col-lg-2 col-xs-12">
                <div class="footer-menu">
                    <ul class="list-unstyled">
                      
                        <li> <a href="#vision-modal" data-toggle="modal">Mission / Vision</a></li>
                        <li> <a href="#donate-modal" data-toggle="modal">Donate / Invest</a></li>
                    </ul>
                </div>
            </div>
           

            <div class="col-sm-4 col-lg-2 col-xs-12">
                <div class="footer-menu">
                    <ul class="list-unstyled">
                        
                        <li><a href="#join-alert-modal" data-toggle="modal">Join Team</a></li>
                        <li><a href="#feedback-alert-modal" data-toggle="modal">Feedback</a></li>


                    
                        <!-- <li> <a href="javascript:void 0">Copyright @ 2018 BHUUMI</a></li> -->
                    </ul>
                </div>
            </div>

            <div class="col-sm-4 col-lg-1 col-xs-12">
             <div class="footer-menu">
                    <!-- <a href="https://youtu.be/7QrBVb0jph4" target="_blank" class="footer-logo pull-right" data-toggle="modal"> -->
                    <a href="#video-modal" class="footer-logo" data-toggle="modal" alt="Video">
                        <img src="http://localhost/bhuumi/assets/images/white-logo.png">
                    </a>
                </div>
            </div>


            <!-- <div class="col-sm-12">
                <div class="row">
                    <div class="col-sm-10">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="footer-menu">
                                    <h3></h3>
                                    <ul class="list-unstyled">
                                        <li> <a href="">Help build</a></li>
                                        <li> <a href="">Donate</a></li>
                                        <li> <a href="mailto:info@bhuumi.com">info@bhuumi.com</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="footer-menu">
                                    <h3></h3>
                                    <ul class="list-unstyled">
                                        <li> <a href="">Advertise</a></li>
                                        <li> <a href="">Feedback</a></li>
                                        <li> <a href="">Terms of Use Privacy Policy</a></li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="col-sm-4">
                                <div class="footer-menu">
                                    <h3></h3>
                                    <ul class="list-unstyled">
                                        <li> <a href="">FAQ</a></li>
                                        <li> <a href="">Join Team</a></li>
                                        <li> <a href="javascript:void 0">Copyright @ 2018 BHUUMI</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-2">
                        <div class="footer-menu">
                            <h3></h3>
                            <a href="https://youtu.be/7QrBVb0jph4" target="_blank" class="footer-logo">
                                <img src="assets/images/green-logo.png">
                            </a>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>


 <!--   <div class="subfooter">
        <div class="container">
            <div class="row">
                <!-- <div class="col-sm-6">
                    <span class="viprab">Copyright @ 2018 BHUUMI</span>
                </div> -->
                <!-- <div class="col-sm-6">
                    <span class="viprab-1">Terms of Use Privacy Policy <a href="https://viprabusiness.com/"></a></span>
                </div> -->
            <!-- </div>
        </div>
    </div>  --> 
</footer>

<div id="vision-modal" class="modal fade">
					<div class="modal-dialog">
						<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
								<h3>Mission &mdash; Vision</h3>
							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-sm-12">
										<a href="http://localhost/bhuumi/">
											<img src="http://localhost/bhuumi/assets/images/main-logo.png" alt="logo" class="img-responsive center-block" style="max-width:140px;">
										</a>
										<div class="heading">
											<h4 class="text-center text-capitalize">The Infinite Portal</h4>
										</div>
										<div class="content" style="padding-top: 45px;">
											<p style="font-size: 17px;line-height: 30px;">
												MISSION &mdash; The BHUMMI mission is to empower BHUUMI users to be independent entrepreneurs who will prosper, learn and grow. BHUUMI will provide services from around the world via the Infinite Portal.
											</p>
											<p style="font-size: 17px;line-height: 30px;padding-top:25px;">
												VISION &mdash; BHUUMI is a worldwide phenomenon providing a "Route out of poverty". BHUUMI entrepreneurs will be given access to finances based on the principle of microlending. Individuals with little or no collateral who have unlimited ideas and potential to serve their community will be ideal BHUUMI entrepreneurs. They will be provided with support through education and training.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>




<div id="register-driver-modal" class="modal fade">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
        <div class="modal-header text-center">
            <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
            <a href="#ride-video-modal" data-toggle="modal"><img src="http://localhost/bhuumi/assets/images/ride-icon.png" alt="" title="Video"></a>
            <h3>BHUUMI Drivers</h3>
            <p>Pay only $1 per ride and keep all the profits!</p>
        </div>
      <div class="modal-body">
        <form role="form" action="http://localhost/bhuumi/driver/add" method="POST" id="register_driver_form">
            
                <div class="row">
                    <div class="col-sm-6 form-group">
                        <label for="d_name">
                            Name:</label>
                        <input type="text" class="form-control" id="d_name" name="d_name" placeholder="Full Name" required>
                    </div>
                    <div class="col-sm-6 form-group">
                        <label for="d_dob">
                            DOB:</label>
                        <input type="text" class="form-control" id="d_dob" name="d_dob" placeholder="DOB" onblur="ValidateDOB()" required>
                        <div class="forum-error" style="color:red;" id="lblError"></div> 
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6 form-group">
                        <label for="d_email">
                            Email:</label>
                        <input type="text" class="form-control" id="d_email" name="d_email" placeholder="Email" required>
                    </div>
                    <div class="col-sm-6 form-group">
                        <label for="d_phone">
                            Phone:</label>
                        <input type="text" class="form-control" id="d_phone" name="d_phone" placeholder="Phone" required>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 form-group">
                        <label for="d_address">
                            Address:</label>
                        <textarea class="form-control" type="textarea" name="d_address" id="d_address" style="resize:none;" placeholder="Address" maxlength="6000" rows="4"></textarea>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-4 form-group">
                        <label for="d_vehicle">
                            Model / Type of Vehicle:</label>
                        <input type="text" class="form-control" id="d_vehicle" name="d_vehicle" placeholder="Modal / Type of Vehicle" required>
                    </div>
                    <div class="col-sm-3 form-group">
                        <label for="d_v_year">
                            Year:</label>
                        <input type="text" class="form-control" id="d_v_year" name="d_v_year" placeholder="Vehicle Year" required>
                    </div>

                    <div class="col-sm-5 form-group">
                        <label for="d_v_state">
                            State Vehicle Registered in:</label>
                        <input type="text" class="form-control" id="d_v_state" name="d_v_state" placeholder="Vehicle Registered in" required>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 form-group text-center">
                        <input type="submit" class="btn btn-md btn-primary" style="width:150px; text-transform:uppercase; font-weight: 600;" value="Register">
                    </div>
                </div>


            </form>
      </div>
    </div>

  </div>
</div>

<div id="bhuumi-ride-store-modal" class="modal fade">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
        <div class="store-link-box">
            <a href="https://apps.apple.com/us/app/id1480206632">
                <img src="http://localhost/bhuumi/assets/images/appstore.png" alt="image">
            </a>
        </div>

        <div class="store-link-box">
            <a href="https://play.google.com/store/apps/details?id=com.userride.bhoomi">
                <img src="http://localhost/bhuumi/assets/images/playstore.png" alt="image">
            </a>
        </div>
      </div>
    </div>

  </div>
</div>

<div id="bhuumi-driver-store-modal" class="modal fade">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
        <div class="store-link-box">
            <a href="https://apps.apple.com/us/app/bhuumi-driver/id1480217279">
                <img src="http://localhost/bhuumi/assets/images/appstore.png" alt="image">
            </a>
        </div>

        <div class="store-link-box">
            <a href="https://play.google.com/store/apps/details?id=com.driverride.bhoomi">
                <img src="http://localhost/bhuumi/assets/images/playstore.png" alt="image">
            </a>
        </div>
      </div>
    </div>

  </div>
</div>

<div id="soon-modal" class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
        <h1 class="text-center">Coming Soon</h1>
      </div>
    </div>

  </div>
</div>

<div id="ride-modal" class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
        <h2 class="text-center">BHUUMI Ride</h2>
       <p class="text-center">  <img  src="http://localhost/bhuumi/assets/images/bhuumi_driver.png" alt="logo"></p>
       <h2 class="text-center">BHUUMI Driver</h2>
       <p class="text-center"> <img  style="height:80px;width:80px;" src="http://localhost/bhuumi/assets/images/bhuumi_user.png" alt="logo"></p>
       <P>BHUUMI Ride is designed to empower it’s users to be successful entrepreneurs who are working for themselves and their families while earning a respectful and sustainable livelihood by increasing their standard of living.
        </P>
       
       <ul style="list-style:none;">
        <li><strong>Only pay $1 to BHUUMI per ride and keep all profits</strong></li>
       <li>Get paid instantly after the ride is completed</li>
       <li> Be your own Boss</li>
       <li> Set your own schedule</li>
       <li> Use the latest technology</li>
       <li> Easy sign-up</li>
       <li> Individual BHUUMI secure ID Card</li>
       <li> Individual registered/numbered BHUUMI sticker for vehicle.</li>
       <li> Online support</li></ul>
       <h3 class="text-center">BHUUMI Ride </h3>
        <div class="store-link-box" >
            <a href="https://apps.apple.com/us/app/id1480206632">
                <img  style="height:50px;" src="http://localhost/bhuumi/assets/images/appstore.png" alt="image">
            </a>
        
            <a href="https://play.google.com/store/apps/details?id=com.userride.bhoomi">
                <img style="height:50px;" src="http://localhost/bhuumi/assets/images/playstore.png" alt="image">
            </a>
        </div>

       <h3 class="text-center">BHUUMI Driver </h3>
 <div class="store-link-box" >
            <a href="https://apps.apple.com/us/app/bhuumi-driver/id1480217279">
                <img style="height:50px;" src="http://localhost/bhuumi/assets/images/appstore.png" alt="image">
            </a>
             <a href="https://play.google.com/store/apps/details?id=com.driverride.bhoomi">
                <img style="height:50px;" src="http://localhost/bhuumi/assets/images/playstore.png" alt="image">
            </a>
        </div>

       

      </div>
    </div>

  </div>
</div>

<div id="video-modal" class="modal fade">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
        <video src="http://localhost/bhuumi/assets/video/bhuumi-footer.mp4" controls class="img-responsive"></video>
        <!-- <span><a href="https://youtu.be/7QrBVb0jph4" target="_blank">Click here</a> to open on YouTube</span> -->
      </div>
    </div>

  </div>
</div>

<div id="ride-video-modal" class="modal fade">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
        <video src="http://localhost/bhuumi/assets/video/ride.mp4" controls class="img-responsive"></video>
        <!-- <span><a href="#" target="_blank">Click here</a> to play with sound</span> -->
      </div>
    </div>

  </div>
</div>



<div id="joinus-modal" class="modal fade">
					<div class="modal-dialog">
						<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
								<h3>Come Join the BHUUMI Team!</h3>
							</div>
							<div class="modal-body">
                                
								<form role="form" action="" method="POST" id="JoinTeam_form">
									<div class="row">
										<div class="col-sm-6 form-group">
											<label for="f_nm">
												First Name:*</label>
											<input type="text" class="form-control" id="f_nm" name="f_nm" placeholder="First Name" required>
										</div>
										<div class="col-sm-6 form-group">
											<label for="l_nm">
												Last Name:*</label>
											<input type="text" class="form-control" id="l_nm" name="l_nm" placeholder="Last Name" required>
										</div>
									</div>
									
									<div class="row">
										<div class="col-sm-6 form-group">
											<label for="email">
												Email:*</label>
											<input type="email" class="form-control" id="email" name="email" placeholder="Email" required>
										</div>
										<div class="col-sm-6 form-group">
											<label for="p_nm">
												Phone Number:*</label>
											<input type="text" class="form-control" id="contact_no" name="p_nm" placeholder="Phone Number" required>
										</div>
									</div>
									
									<div class="row">
										<div class="col-sm-6 form-group">
											<label for="city">
												City:*</label>
											<input type="text" class="form-control" id="city" name="city" placeholder="City" required>
										</div>
										<div class="col-sm-6 form-group">
											<label for="state">
												State:*</label>
											<input type="text" class="form-control" id="state" name="state" placeholder="State" required>
										</div>
									</div>
									
									<div class="row">
										<div class="col-sm-6 form-group">
											<label for="postal_code">
												Zip / Postal Code:*</label>
											<input type="text" class="form-control" id="postal_code" name="postal_code" placeholder="Zip / Postal Code" required>
										</div>
										<div class="col-sm-6 form-group">
											<label for="country">
												Country:*</label>
											<input type="text" class="form-control" id="country" name="country" placeholder="Country" required>
										</div>
									</div>
									
									<div class="row">
										<div class="col-sm-12 form-group">
											<label>How did you first hear about BHUUMI?*</label>
											<input type="text" class="form-control" id="how_hear_about" name="how_hear_about" placeholder="How did you first hear about BHUUMI?" required>
										</div>
									</div>
									
									<div class="row">
										<div class="col-sm-12 form-group">
											<label>Why do you want to join our team?*</label>
											<input type="text" class="form-control" id="reason_to_join" name="reason_to_join" placeholder="Why do you want to join our team?" required>
										</div>
									</div>
									
									<div class="row">
										<div class="col-sm-12 form-group">
											<label>Which skills / experience do you possess that could enhance BHUUMI?*</label>
											<input type="text" class="form-control" id="skills_exps" name="skills_exps" placeholder="Your Skills / Experience" required>
										</div>
									</div>
									
									<div class="row">
                                        <div class="col-sm-12 form-group">
                                            <label>Is there a certain area in BHUUMI that you think would best suit your interests?*</label>
                                            <input type="text" class="form-control" id="bhuumi_interest" name="bhuumi_interest" placeholder="Is there a certain area in BHUUMI that you think would best suit your interests?" required>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-12 form-group">
                                            <label>Name a person/persons who have inspired you and in a few sentences describe why.*</label>
                                            <input type="text" class="form-control" id="bhuumi_inspired" name="bhuumi_inspired" placeholder="Name a person/persons who have inspired you and in a few sentences describe why." required>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-12 form-group">
                                            <label>If you have a chance, what changes would you like to bring about on our mother earth, BHUUMI?*</label>
                                            <input type="text" class="form-control" id="bhuumi_chance_changes" name="bhuumi_chance_changes" placeholder="If you have a chance, what changes would you like to bring about on our mother earth, BHUUMI?" required>
                                        </div>
                                    </div>
									
									<div class="row">
										<div class="col-sm-12 form-group">
											<label for="comments">
												Other Comments:</label>
											<textarea class="form-control" type="textarea" name="other_comments" id="other_comments" style="resize:none;" placeholder="Comments here..." maxlength="6000" rows="7"></textarea>
										</div>
									</div>

                                    


<div class="row">
                                        <div class="col-sm-12 form-group">
                                            <label for="comments">
                                                Captcha:</label>
                                            <input type="text" name="captcha" id="captcha" class="form-control" required placeholder="Please enter the captcha code.">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 form-group">
                                                  <div >
<img id="captcha_code" src="http://localhost/bhuumi/captcha">
<button name="submit" class="btnRefresh">Refresh </button>
</div>
                                        </div>
                                    </div>
<div id="messerror"></div>
                             
									<div class="row">
										<div class="col-sm-12 form-group text-center">
											<input type="button" class="btn btn-md btn-primary btnAction" style="width:150px; text-transform:uppercase; font-weight: 600;" value="Submit">
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>

	<div id="aboutus-modal" class="modal fade pdf-custom">
					<div class="modal-dialog modal-lg">
						<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
								<h3>About Us</h3>
							</div>
							<div class="modal-body">
								<div>
									<iframe src="https://cdn.flipsnack.com/widget/v2/widget.html?hash=fxpsvs8pr" width="100%" seamless="seamless" scrolling="no" frameBorder="0" allowFullScreen style="height:70vh;"></iframe>
									<!--<embed src="adminPanel/uploads/documents/BHUUMI-businessplan.pdf" frameborder="0" width="100%" height="500px"> 
									<iframe src="documents/BHUUMI-businessplan.pdf" width="100%" height="500px" scrolling="auto" align="middle"></iframe>-->
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div id="faqs-modal" class="modal fade">
					<div class="modal-dialog">
						<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
								<h3>FAQs</h3>
							</div>
							<div class="modal-body" style="max-height: 600px;overflow-y: scroll;">
									<div class="row">
										<div id="accordion" class="panel-group faqs col-sm-12">
																								<div class="panel panel-default" style="padding:10px;">
														<div class="panel-heading">
															<h4 class="panel-title">
																<a style="color: #668bb1;" class="collapsed" href="#faq-1" data-toggle="collapse" data-parent="#accordion">
																	<i class="fa fa-chevron-right"></i>
																	<span style="margin-left:10px;"><strong>What is BHUUMI and how is it different from other businesses?</strong></span>
																</a>
															</h4>
														</div>
														<div id="faq-1" class="panel-collapse collapse" style="height: 0px;">
															<div class="panel-body">
																<p>BHUUMI is the portal for connecting people. BHUUMI is here solely for the betterment of society. We will never sell any products or services ourselves. </p>
															</div>
														</div>
													</div>
																								<div class="panel panel-default" style="padding:10px;">
														<div class="panel-heading">
															<h4 class="panel-title">
																<a style="color: #668bb1;" class="collapsed" href="#faq-2" data-toggle="collapse" data-parent="#accordion">
																	<i class="fa fa-chevron-right"></i>
																	<span style="margin-left:10px;"><strong>How much does it cost to use the BHUUMI website?</strong></span>
																</a>
															</h4>
														</div>
														<div id="faq-2" class="panel-collapse collapse" style="height: 0px;">
															<div class="panel-body">
																<p>The BHUUMI website is free to use for everyone.</p>
															</div>
														</div>
													</div>
																								<div class="panel panel-default" style="padding:10px;">
														<div class="panel-heading">
															<h4 class="panel-title">
																<a style="color: #668bb1;" class="collapsed" href="#faq-3" data-toggle="collapse" data-parent="#accordion">
																	<i class="fa fa-chevron-right"></i>
																	<span style="margin-left:10px;"><strong>Where do BHUUMI profits go?</strong></span>
																</a>
															</h4>
														</div>
														<div id="faq-3" class="panel-collapse collapse" style="height: 0px;">
															<div class="panel-body">
																<p>BHUUMI profits will go back to BHUUMI users and help entrepreneurs start their own businesses.</p>
															</div>
														</div>
													</div>
																								<div class="panel panel-default" style="padding:10px;">
														<div class="panel-heading">
															<h4 class="panel-title">
																<a style="color: #668bb1;" class="collapsed" href="#faq-4" data-toggle="collapse" data-parent="#accordion">
																	<i class="fa fa-chevron-right"></i>
																	<span style="margin-left:10px;"><strong>Will BHUUMI ever give my information away?</strong></span>
																</a>
															</h4>
														</div>
														<div id="faq-4" class="panel-collapse collapse" style="height: 0px;">
															<div class="panel-body">
																<p>Bhuumi users are our strength and your privacy is our utmost priority. All information shared with us will remain highly confidential. User data will not be sold or shared with any entity and will be deleted every six months unless users choose otherwise.</p>
															</div>
														</div>
													</div>
																								<div class="panel panel-default" style="padding:10px;">
														<div class="panel-heading">
															<h4 class="panel-title">
																<a style="color: #668bb1;" class="collapsed" href="#faq-5" data-toggle="collapse" data-parent="#accordion">
																	<i class="fa fa-chevron-right"></i>
																	<span style="margin-left:10px;"><strong>What are some of the advantages of using BHUUMI Ride as a passenger?</strong></span>
																</a>
															</h4>
														</div>
														<div id="faq-5" class="panel-collapse collapse" style="height: 0px;">
															<div class="panel-body">
																<p>BHUUMI Ride will operate like all major ride-share companies. In addition drivers will have a BHUUMI ID. and will be vetted before they can be a BHUUMI Driver. BHUUMI riders will know that profits from each ride will go to drivers and not to a big corporation.</p>
															</div>
														</div>
													</div>
																								<div class="panel panel-default" style="padding:10px;">
														<div class="panel-heading">
															<h4 class="panel-title">
																<a style="color: #668bb1;" class="collapsed" href="#faq-6" data-toggle="collapse" data-parent="#accordion">
																	<i class="fa fa-chevron-right"></i>
																	<span style="margin-left:10px;"><strong>What are the advantages of being a BHUUMI Driver?</strong></span>
																</a>
															</h4>
														</div>
														<div id="faq-6" class="panel-collapse collapse" style="height: 0px;">
															<div class="panel-body">
																<p>BHUUMI Drivers will only pay BHUUMI $1 per trip. All other profits will remain with the BHUUMI Driver to grow and support their business.</p>
															</div>
														</div>
													</div>
																								<div class="panel panel-default" style="padding:10px;">
														<div class="panel-heading">
															<h4 class="panel-title">
																<a style="color: #668bb1;" class="collapsed" href="#faq-7" data-toggle="collapse" data-parent="#accordion">
																	<i class="fa fa-chevron-right"></i>
																	<span style="margin-left:10px;"><strong>What are some of the advantages of using the BHUUMI website?</strong></span>
																</a>
															</h4>
														</div>
														<div id="faq-7" class="panel-collapse collapse" style="height: 0px;">
															<div class="panel-body">
																<p>The website is very user friendly and easy to navigate. Users can communicate via BHUUMI Chat quickly and easily and use the site to navigate the World Wide Web.</p>
															</div>
														</div>
													</div>
																								<div class="panel panel-default" style="padding:10px;">
														<div class="panel-heading">
															<h4 class="panel-title">
																<a style="color: #668bb1;" class="collapsed" href="#faq-8" data-toggle="collapse" data-parent="#accordion">
																	<i class="fa fa-chevron-right"></i>
																	<span style="margin-left:10px;"><strong>How can I find out more information about BHUUMI?</strong></span>
																</a>
															</h4>
														</div>
														<div id="faq-8" class="panel-collapse collapse" style="height: 0px;">
															<div class="panel-body">
																<p>Our business plan and Mission / Vision statement is available on the BHUUMI website.</p>
															</div>
														</div>
													</div>
																								<div class="panel panel-default" style="padding:10px;">
														<div class="panel-heading">
															<h4 class="panel-title">
																<a style="color: #668bb1;" class="collapsed" href="#faq-9" data-toggle="collapse" data-parent="#accordion">
																	<i class="fa fa-chevron-right"></i>
																	<span style="margin-left:10px;"><strong>The website talks about BHUUMI helping create entrepreneurs. How does that work?</strong></span>
																</a>
															</h4>
														</div>
														<div id="faq-9" class="panel-collapse collapse" style="height: 0px;">
															<div class="panel-body">
																<p>Please click on Mission / Vision at the bottom of the website.</p>
															</div>
														</div>
													</div>
																								<div class="panel panel-default" style="padding:10px;">
														<div class="panel-heading">
															<h4 class="panel-title">
																<a style="color: #668bb1;" class="collapsed" href="#faq-10" data-toggle="collapse" data-parent="#accordion">
																	<i class="fa fa-chevron-right"></i>
																	<span style="margin-left:10px;"><strong>How do I contact BHUUMI for support?</strong></span>
																</a>
															</h4>
														</div>
														<div id="faq-10" class="panel-collapse collapse" style="height: 0px;">
															<div class="panel-body">
																<p>Email us at - info@bhuumi.com</p>
															</div>
														</div>
													</div>
											 
										</div>
									</div>
							</div>
						</div>
					</div>
				</div>

                <div id="donate-modal" class="modal fade">
                  <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header text-center">
                            <button type="button" class="close custom-close" data-dismiss="modal">×</button>
                            <img src="http://localhost/bhuumi/assets/images/infinite-logo.png" alt="" style="max-width: 135px;">
                            <h3 style="margin-top: 0px;">Donate / Invest</h3>
                        </div>
                      <div class="modal-body">
                        <p>
                            BHUUMI appreciates your donations and they are acceptable at any time. <br>
                            "At BHUUMI, funds collected will be dispersed in accordance with our Mission/Vision, and will empower BHUUMI users to be independent entrepreneurs who will prosper, learn and grow.
                        </p>

                        <h3>BHUUMI Rideshare Credits.</h3>
                        <p>
                            BHUUMI Ride Credits can be obtained by donating to BHUUMI in $5 increments. A $1 cost reduction will be given by drivers to riders at the end of each ride. <br>

                            For every $5 donated, ten BHUUMI Credits will be added to your BHUUMI Rideshare account. <br>

                            For example - A $50 donation will receive 100 Ride Credits, worth $100 in ride savings. After 10 rides, a total deduction of $10 will have been given.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
				
				<div id="feedback-modal" class="modal fade">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
                                <h3>Please provide your feedback below:</h3>
                            </div>
                            <div class="modal-body">
                                <form role="form"  method="POST" id="Feedback_form">
                                    <div class="row">
                                        <div class="col-sm-6 form-group">
                                            <label for="name">
                                                Your Name:*</label>
                                            <input type="text" class="form-control" id="name" name="name" placeholder="Enter your Name" required>
                                        </div>
                                        <div class="col-sm-6 form-group">
                                            <label for="email">
                                                Email:*</label>
                                            <input type="email" class="form-control" id="email" name="email" placeholder="Enter your Email" required>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 form-group">
                                            <label>How do you rate your overall experience?*</label>
                                            <p>
                                                <label class="radio-inline">
                                                    <input type="radio" name="experience" id="radio_experience" value="bad" required> Bad
                                                </label>
                                                <label class="radio-inline">
                                                    <input type="radio" name="experience" id="radio_experience" value="average" required> Average
                                                </label>
                                                <label class="radio-inline">
                                                    <input type="radio" name="experience" id="radio_experience" value="good" required=""> Good
                                                </label>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 form-group">
                                            <label for="comments">
                                                Comments:*</label>
                                            <textarea class="form-control" type="textarea" name="comments" id="comments" style="resize:none;" placeholder="Enter your Comments" maxlength="6000" rows="7" required></textarea>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-12 form-group">
                                            <label for="comments">
                                                Captcha:</label>
                                            <input type="text" name="captcha" id="captcha" class="form-control" required placeholder="Please enter the captcha code.">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 form-group">
                                                  <div >
<img id="captcha_code_feed" src="http://localhost/bhuumi/captcha">
<button name="submit" class="btnRefresh">Refresh </button>
</div>
                                        </div>
                                    </div>
<div id="messfeederror"></div>
                                    <div class="row">
                                        <div class="col-sm-12 form-group text-center">
                                            <input type="button" class="btn btn-md btn-primary btnActionFeed" style="width:150px; text-transform:uppercase; font-weight: 600;" value="Submit">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="mail-modal" class="modal fade">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
                                <h3>Please provide your details below:</h3>
                            </div>
                            <div class="modal-body">
                               
                                    <form role="form" method="POST" id="Mail_form">
                                    <div class="row">
                                        <div class="col-sm-6 form-group">
                                            <label for="name">
                                                Your Name:*</label>
                                            <input type="text" class="form-control" id="name" name="name" placeholder="Enter your Name" required>
                                        </div>
                                        <div class="col-sm-6 form-group">
                                            <label for="email">
                                                Email:*</label>
                                            <input type="email" class="form-control" id="email" name="email" placeholder="Enter your Email" required>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 form-group">
                                            <label for="mail-message">
                                                Message:*</label>
                                            <textarea class="form-control" type="textarea" name="comments" id="mailmessage" style="resize:none;" placeholder="Enter your Message" maxlength="6000" rows="7" required></textarea>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 form-group">
                                            <label for="comments">
                                                Captcha:</label>
                                            <input type="text" name="captcha" id="contact_captcha" class="form-control" required placeholder="Please enter the captcha code.">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 form-group">
                                        <div >
                                            <img id="contact_captcha_code_feed" src="http://localhost/bhuumi/captcha">
                                            <button name="submit" class="btnRefreshContact">Refresh </button>
                                        </div>
                                        </div>
                                    </div>
                                        <div id="contactuserror"></div>
                                    <div class="row">
                                        <div class="col-sm-12 form-group text-center">
                                            <input type="button" class="btn btn-md btn-primary contact_bhuumi" style="width:150px; text-transform:uppercase; font-weight: 600;" value="Submit">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


<div id="advertise-modal" class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
        <h1 class="text-center">Coming Soon</h1>
      </div>
    </div>

  </div>
</div>

<div id="terms-modal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close custom-close" data-dismiss="modal">&times;</button>
                <h3>Terms and Conditions of Use</h3>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <a href="http://localhost/bhuumi/">
                            <img src="http://localhost/bhuumi/assets/images/main-logo.png" alt="logo" class="img-responsive center-block" style="max-width:140px;">
                        </a>
                        <div class="heading">
                            <h4 class="text-center text-capitalize">The Infinite Portal</h4>
                        </div>
                        <div class="content" style="padding-top: 45px;">
                            <h4>OUR AGREEMENT</h4>
                            <p>We are glad you are here.  PLEASE READ THIS CAREFULLY AND KNOW THAT THIS IS A BINDING AGREEMENT.  If you continue to use this website, you are agreeing to be bound by the following terms and conditions of use, which together with our privacy policy governs BHUUMI’S relationship with you in relation to your use of this website. If you disagree with any part of these terms and conditions, please do not use our website.</p>

                            <h4>DISCLAIMER</h4>
                            <p>All data, software, and documentation in this website are provided “as is” without warranty of any kind, either expressed or implied. BHUUMI, its affiliates, agents and licensors cannot and do not warrant the accuracy, completeness, non-infringement, merchantability or fitness of any information contained on this site.</p>

                            <p>The information contained in this website is for general information purposes only. The information is provided by BHUUMI, and while we try to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore completely at your own risk.</p>
                            <p><strong>We will NOT</strong> be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>
                            <p>Through this website you may be able to link to other websites which are not under the control of BHUUMI. We have no control over the nature, content and availability of those sites. Our inclusion of any links here does not necessarily imply a recommendation or endorse the views expressed within those sites.</p>
                            <p>All posts by those other than BHUUMI are solely the responsibility of those parties. Posts BHUUMI deems offensive or inappropriate will be removed by BHUUMI immediately, with no recourse or right of appeal.</p>
                            <p>Every effort is made to keep the website up and running smoothly. However, BHUUMI takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control. </p>
                            <p>For all platforms in which prizes or awards might be offered, those prizes or awards will not be distributed until or unless the full parameters of the platform have been satisfied in BHUUMI’s sole judgment and discretion.</p>

                            <h4>PRIVACY MATTERS</h4>
                            <p><strong>Acceptance of this policy as our condition of your using this website</strong></p>
                            <p>It is important for you to know the Privacy Policy (the “Policy”) of BHUUMI before using any feature of the website.  By using the website, you indicate your consent to the collection and use of information as outlined in the Policy. </p>
                            <p>The Policy does not cover information collected on sites linked to this website. You should carefully check each website to learn its privacy policy because that website’s policy may significantly differ from ours. BHUUMI is not responsible for the privacy policies, practices or content of other websites you may visit. Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide while you are visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to each website in question.</p>
                            <h5>Collection and use of personal information</h5>
                            <p>We collect as much information as we can about BHUUMI visitors who use this website, including but not limited to the following information:</p>
                            <ul style="padding-left: 15px;">
                                <li>The user’s name, address, phone number and e-mail address;</li>
                                <li>Tracking information about which pages users access and utilize;</li>
                                <li>Information volunteered by the user, such as survey information.</li>
                            </ul>
                            <h5>Children may not divulge personally identifiable information</h5>
                            <p>No information should be submitted to the Web site by users under 13 years of age. On this Web site, BHUUMI does not knowingly collect or use any information from users under 13 years of age.</p>

                            <h4>Use of “cookies”</h4>
                            <p>A cookie is a small file which asks permission to be placed on your computer’s hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</p>
                            <p>We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>
                            <p>Overall, cookies help us provide you with a better website by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</p>
                            <p>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</p>

                            <h4>Sharing information</h4>
                            <p>BHUUMI will not sell, trade, or share a donor’s personal information with anyone other than our auditors or regulatory bodies upon request. BHUUMI will only provide personally identifiable information about you in response to a subpoena, a statute, a court order or a valid legal process. We will not send donor mailings on behalf of other organizations.</p>

                            <h4>Modifications to the privacy policy</h4>
                            <p>At our sole discretion, BHUUMI may change its Policy, with or without prior notice to you. When we do make changes, we will post those changes to this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective as of the date given at the beginning of these terms and conditions.</p>

                            <h4>Disputes</h4>
                            <p>Any disputes regarding this Policy, as well as any disputes arising from your use of this website, shall be governed by the laws of the State of South Carolina, without giving effect to the conflicts of law provisions thereof. By using the website, you irrevocably agree to submit to the exclusive jurisdiction of the Charleston County Court or the United States District Court for the District of South Carolina in Charleston in connection with any suit, action or other proceeding concerning the Policy and/or your use of the website.</p>


                            <h4>Data Security</h4>
                            <p>At BHUUMI, we believe that securing your personal information is important. We use industry-standard controls, technologies, and online security techniques to protect your personal information from unauthorized access.</p>


                            <h4>QUESTIONS? </h4>
                            <p>The Web site is maintained by BHUUMI. If you have questions regarding the BHUUMI or this policy, or if you would like your personal information excluded from information shared, please contact us at <strong>contact@BHUUMI.com.</strong></p>


                            <h4>Financial Transactions</h4>
                            <p>To process a charitable contribution or product purchase, it is necessary for BHUUMI to gather your name, email address, mailing address, phone, and credit card information. This data is used to verify identity and execute the financial transaction. Additionally, phone number and email address information may be used to contact you if there is a problem with the transaction.</p>
                            <p>BHUUMI may use service providers (such as merchant banks and ecommerce integrators) for the express purpose of conducting financial transactions. Personal information is kept private and secure and is not sold, rented, or traded to third parties. It is important to note that credit card numbers are used only at the time of the transaction, and are not stored following the conclusion of the transaction unless a transaction is selected that occurs on a regular basis. For transactions that recur, credit card information is stored in an encrypted format.</p>


                            <h4>Copyright</h4>
                            <p>This website and its content is copyright of the BHUUMI © BHUUMI 2019. All rights reserved.</p>
                            <p>Any redistribution or reproduction of part or all of the contents in any form is prohibited other than the following:</p>
                            <ul style="padding-left: 15px;">
                                <li>You may print or download to a local hard disk extracts for your personal and non-commercial use only.</li>
                                <li>You may copy the content to individual third parties for their personal use, but only if you acknowledge the website as the source of the material.</li>
                            </ul>
                            <p>You may not, except with our express written permission, distribute or commercially exploit the content. Nor may you transmit it or store it in any other website or other form of electronic retrieval system.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<script src="https://code.jquery.com/jquery-2.1.1.min.js" type="text/javascript"></script>
<script src="{{asset('public/assets/js/jquery-1.12.0.min.js')}}"></script>
<script src="{{asset('public/assets/js/demo.js')}}"></script>
<script src="{{asset('public/assets/js/bootstrap.min.js')}}"></script>
<script src="{{asset('public/assets/js/moment.min.js')}}"></script>
<script src="{{asset('public/assets/js/wow.min.js')}}"></script>

<script src="{{asset('public/assets/js/jquery-ui.js')}}"></script>
<script src="{{asset('public/assets/js/bootstrap-datetimepicker.min.js')}}"></script>
<script src="{{asset('public/assets/js/setup.js')}}"></script>
<script src="{{asset('public/assets/js/xzoom.min.js')}}"></script>

<!-- Chat Scripts -->
<script src="{{asset('public/assets/js/chat/socket.io.js')}}"></script>
<!-- <script src="http://localhost/bhuumi/assets/js/chat/slimscroll.js"></script> -->
<script src="{{asset('public/assets/js/chat/moment-timezone.js')}}"></script>
<script src="{{asset('public/assets/js/chat/moment-timezone-with-data-2012-2022.js')}}"></script>
<script src="{{asset('public/assets/js/chat/livestamp.js')}}"></script>

<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"></script>
<!-- End of Chat Scripts -->

<script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/js/bootstrap-editable.min.js"></script>

<script src="{{asset('public/assets/sliderengine/amazingslider.js')}}"></script>
<script src="{{asset('public/assets/sliderengine/amazingslider.js')}}"></script>
<script src="{{asset('public/assets/sliderengine/initslider-1.js')}}"></script>
<script type="text/javascript" src="{{asset('public/assets/js/num_format.js?ver=0.6')}}"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.4/jstz.min.js">
</script>
<script src="{{asset('public/assets/js/jquery.form.js')}}"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script type="text/javascript" src="{{asset('public/assets/js/lightbox.js')}}"></script>
<script type="text/javascript" src="{{asset('public/assets/js/social.js?ver=0.2')}}"></script>
<script>
    $("#video-modal, #ride-video-modal").on('hide.bs.modal', function(){
    $(this).find("video")[0].pause();
    $(this).find("video")[0].currentTime=0;
  });
</script>



<script>

     $("#d_phone").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        
              
               alert("Please Enter Numeric Value");
                return false;
    }
   });

      $("#d_v_year").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        
              
               alert("Please Enter Numeric Value");
                return false;
    }
   });

    $( function() {
        $( "#d_dob" ).datetimepicker({
            format: 'MM/DD/YYYY',
            viewMode: 'years',
            widgetPositioning:{
                horizontal: 'auto',
                vertical: 'bottom'
            },
            maxDate:{},
            icons:{
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right'
            }
        });
    });
    
    $( "#d_dob" ).on('change keyup', function(){
        var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
        if(!(date_regex.test($(this).val()))) {
            $('#dobErr').html('Invalid Date.');
            return false;
        } else {
            $('#dobErr').html('');
        }
    });
    function ValidateDOB() {

        //alert("hello");
            var lblError = document.getElementById("lblError");

            //Get the date from the TextBox.
            var dateString = document.getElementById("d_dob").value;
            var regex = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;

            //Check whether valid MM/dd/yyyy Date Format.
            if (regex.test(dateString)) {
                var parts = dateString.split("/");
                var dtDOB = new Date(parts[0] + "/" + parts[1] + "/" + parts[2]);
                var dtCurrent = new Date();
                lblError.innerHTML = "Age should be greater than 18 years."
                if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
                    return false;
                }

                if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 18) {

                    //CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
                    if (dtCurrent.getMonth() < dtDOB.getMonth()) {
                        return false;
                    }
                    if (dtCurrent.getMonth() == dtDOB.getMonth()) {
                        //CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
                        if (dtCurrent.getDate() < dtDOB.getDate()) {
                            return false;
                        }
                    }
                }
                lblError.innerHTML = "";
                return true;
            } else {
                lblError.innerHTML = "Enter date in MM/dd/yyyy format ONLY."
                return false;
            }
        }

	if( $('#sticky-message').is(':visible') ){ 
		setTimeout(function() {
			$('#sticky-message').fadeOut('slow');
		}, 4000);
	}

    $("#new-sidebar-toggle-btn").click(function(){
        $(this).parent().next("#sidebar-column-container").slideDown();
    });

    $("#sidebar-toggle-btn").click(function(){
        $(this).parents("#sidebar-column-container").slideUp();
    });
		
    // $("#sidebar-toggle-btn").click(function(){
    //     if($(this).hasClass("shrink")){
    //         $(this).removeClass("shrink").css({right:"25px"}).prev("span").css({opacity:1}).parents("#sidebar-column-container").removeClass("col-sm-1").addClass("col-sm-2").next().removeClass("col-sm-11").addClass("col-sm-10");
    //         $(this).parents("#sidebar-column-container").find(".panel-body .accordion-container, .panel-body form").css({display:"block"});
    //         $(this).parents("#sidebar-column-container").find(".panel-body #icons-on-switch").css({display:"none"});
    //     }
    //     else{
    //         $(this).addClass("shrink").css({right:"18.5px"}).prev("span").css({opacity:0}).parents("#sidebar-column-container").removeClass("col-sm-2").addClass("col-sm-1").next().removeClass("col-sm-10").addClass("col-sm-11");
    //         $(this).parents("#sidebar-column-container").find(".panel-body .accordion-container, .panel-body form").css({display:"none"});
    //         $(this).parents("#sidebar-column-container").find(".panel-body #icons-on-switch").css({display:"block"});
    //     }
    // });

    
    $("#icons-on-switch").on('click','button',function(){
        $("#sidebar-toggle-btn").removeClass("shrink").css({right:"50px"}).prev("span").css({opacity:1}).parents("#sidebar-column-container").removeClass("col-sm-1").addClass("col-sm-4").next().removeClass("col-sm-11").addClass("col-sm-8");
        $("#sidebar-toggle-btn").parents("#sidebar-column-container").find(".panel-body .accordion-container, .panel-body form").css({display:"block"});
        $("#sidebar-toggle-btn").parents("#sidebar-column-container").find(".panel-body #icons-on-switch").css({display:"none"});
    });
</script>

<script>
var acc = document.getElementsByClassName("accordion-container");
var i;

$(window).load(function(){
    var b=$('.accordion.active');
    var panel = b.next();
    panel[0].style.maxHeight = panel[0].scrollHeight + "px";
});

for (i = 0; i < acc.length; i++) {

  acc[i].addEventListener("mouseenter", function() {
    var b=this.querySelector('.accordion');
    //b.classList.add("active");
    var panel = b.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px"; 
  });

  acc[i].addEventListener("mouseleave", function() {
    var b=this.querySelector('.accordion');
   // b.classList.remove("active");
    var panel = b.nextElementSibling;
      panel.style.maxHeight = null; 
  });


}  
</script>

<!-- <script>
$(document).ready(function(){
  $('.dropdown-submenu a.test').hover(function(e){
    $(this).next('ul').toggle();
    e.stopPropagation();
  });
});
</script> -->
<script>
/*$(document).ready(function(){
    $("#product_search").keyup(function(){

        $.ajax({
        type: "POST",
        url: "home/searchproduct",
        data:'keyword='+$(this).val(),
        beforeSend: function(){
            $("#product_search").css("background","#FFF url(LoaderIcon.gif) no-repeat 165px");
        },
        success: function(data){
            alert(data);
            $("#suggesstion-box").show();
            $("#suggesstion-box").html(data);
            $("#product_search").css("background","#FFF");
        }
        });
    });
});

function selectCountry(val) {
$("#product_search").val(val);
$("#suggesstion-box").hide();
}*/

var imagepath='http://localhost/bhuumi/adminPanel/uploads/';
</script>
<script>
    $(function() {
        $.ajax({
            url: "http://localhost/bhuumi/home/searchproduct",
            type: "POST",
            dataType: "json",
            success: function(data){
                if(data!=''){
                    var availableLocation = data;
                    $("#product_search").autocomplete({
                        source: availableLocation
                    });
                }
            }
        });
    });
    $(function() {
        $.ajax({
            url: "http://localhost/bhuumi/home/locationsearch",
            type: "POST",
            dataType: "json",
            success: function(data){
                if(data!=''){
                    var availableLocation = data;
                    $("#product_location").autocomplete({
                        source: availableLocation
                    });
                }
            }
        });
    });

$(document).on('click','#social-comment',function(){
        var _this = $(this);
        var cat_id = $(_this).parent().parent().find("#cat_id").val();
      

      var postUserId = $(_this).parent().parent().find("#postUserId").val();
 //alert(postUserId);
        var socialId = $(_this).parent().parent().find("#socialId").val();
          var comment = $.trim($(_this).parent().prev().find("#comment-text").val());
 
 var postloopId=$.trim($(_this).parent().parent().find("#postloopId").val());
//alert(postloopId);

var pageId=$.trim($(_this).parent().parent().find("#page_id").val());


          var count= $('.count-comment-'+socialId+'-'+postloopId).text();

        //alert(count);
        if(comment != ''){

            
            $.ajax({
            type: "POST",
            url: "http://localhost/bhuumi/social/comment",
            data:'cat_id='+cat_id+'&socialId='+socialId+'&comment_social='+comment+'&postUserId='+postUserId+'&pageId='+pageId,
            success:function(data){

             //alert(data);
 

                console.log(data);
                var result = JSON.parse(data);
               
                console.log(result.curr_user.status);
                if(result.curr_user.status == false){
                    _this.parent().prev().find(".error").css("color", "red");
                    _this.parent().prev().find(".error").html('Please Login First.');
                    _this.parent().prev().find(".error").css("display", "block");
                    $(_this).parent().prev().find("#comment-text").val('');
                }else{
                    var image = result.curr_user.image;


                    var date = moment(new Date()).format("Do MMM, YYYY");


                    if(image != ''){
                        var img = 'http://localhost/bhuumi/adminPanel/uploads/'+image;
                    }else{
                        var img = 'http://localhost/bhuumi/assets/images/default_user.png';
                    }
                   // alert(img);
                     var html= '<li class="social-comment-list-item"> <article class="custom-flex flex-wrap"> <img src="'+img+'" alt="'+result.curr_user.name+'" class="img-responsive forum-comment-img" style="max-height:40px; max-width:40px; border-radius:100%;"> <div class="col pr-0"> <div class="social-comment-name"> <a href="#">'+result.curr_user.name+'</a> <span class="small text-muted">1 secs ago</span> </div> <p class="social-comment text-muted">'+comment+'</p> <div class="social-comment-action"> <a href="#" class="comment-replies-btn"><i class="fa fa-mail-reply"></i>&nbsp;&nbsp;Reply</a> <form class="add-replies-form"><input type="hidden" name="cat_id" id="cat_id" value="c_5bfd1adc613e2"><input type="hidden" name="page_id" id="page_id" value="'+pageId+'"> <input type="hidden" name="socialId" id="socialId" value="'+socialId+'"> <input type="hidden" name="commentId" id="commentId" value="'+result.comment_id.scalar+'"><input type="hidden" name="postUserId" id="postUserId" value="'+postUserId+'"> <div class="form-group"> <textarea style="resize:none;" class="form-control" placeholder="Write your reply..." id="reply-text" name="reply_social" value="" rows="3" cols="50" required=""></textarea><div id="reply-error-12" class="error" style="display:none;color:red;">Please enter reply.</div> </div> <div class="text-right"> <button type="button" class="btn status-label align-items-center" id="social-comment-reply"> <i class="fa fa-arrow-circle-right mr-1"></i> <span>Reply</span> </button> </div> </form> </div> <div class="social-comment-replies">  <ul class="list-unstyled social-comment-replies-list"> </ul>  </div> </div> </article> </li>';

$('#comment-data-'+socialId+'-'+postloopId).append('<li class="social-friend-list-item" ><a href="#" class="custom-flex flex-wrap align-items-center"><img src="'+img+'" alt="'+result.curr_user.name+'" class="img-circle" style="max-height:40px; max-width:40px; border-radius:100%;"><div class="col pr-0"><div class="social-friend-name"><span>'+result.curr_user.name+'</span></div></div></a></li>');



count++;

if(count>1)
{

    $('.comment-text-'+socialId).html('&nbsp;&nbsp;Comments');
}
else
{
    $('.comment-text-'+socialId).html('&nbsp;&nbsp;Comment');
}

$('.count-comment-'+socialId+'-'+postloopId).text(count);
//$(_this).parent().parent().parent().prepend('hello');



                    /*if($(_this).parent().parent().parent().find('.list-unstyled social-comment-list:last')[0]){                                        $(_this).parent().parent().find('.list-unstyled social-comment-list:last').after(html);
                                }else{
                                    alert('hello');
                                    $(_this).parent().parent().find('.list-unstyled social-comment-list').prepend('hello');
                                }*/

                                $(_this).parents(".add-comment-form").prev("ul.social-comment-list").append(html);

                                _this.parent().prev().find(".error").css("color", "green");
                                _this.parent().prev().find(".error").html('Comment Posted Successfully');
                                _this.parent().prev().find(".error").css("display", "block");

                                $(_this).parent().prev().find("#comment-text").val('');  
                                  setTimeout(function() {
  _this.parent().prev().find(".error").css("display", "none");

}, 5000);
                 

                }
                
                
            }

        });
        }else{
            _this.parent().prev().find(".error").css("color", "red");
            _this.parent().prev().find(".error").html('Please Enter Comment');
            _this.parent().prev().find(".error").css("display", "block");
            $(_this).parent().prev().find("#comment-text").val('');
        }
    });


$(document).on('click','#social-comment-reply',function(){
        var _this = $(this);
        var cat_id = $(_this).parent().parent().find("#cat_id").val();
       // alert(cat_id);
        var postUserId = $(_this).parent().parent().find("#postUserId").val();
        var socialId = $(_this).parent().parent().find("#socialId").val();
         var commentId = $(_this).parent().parent().find("#commentId").val();
         //alert(commentId);
          var reply = $.trim($(_this).parent().prev().find("#reply-text").val());
          var pageId = $.trim($(_this).parent().parent().find("#page_id").val());

        ;
        if(reply != ''){
            $.ajax({
            type: "POST",
            url: "http://localhost/bhuumi/social/reply",
            data:'cat_id='+cat_id+'&socialId='+socialId+'&commentId='+commentId+'&reply_social='+reply+'&postUserId='+postUserId+'&pageId='+pageId,
            success:function(data){

               // alert(data);
                console.log(data);
                var result = JSON.parse(data);
                console.log(result.status);
                if(result.status == false){
                    _this.parent().prev().find(".error").css("color", "red");
                    _this.parent().prev().find(".error").html('Please Login First.');
                    _this.parent().prev().find(".error").css("display", "block");
                    $(_this).parent().prev().find("#reply-text").val('');
                }else{
                    var image = result.image;
                    var date = moment(new Date()).format("Do MMM, YYYY");
                    if(image != ''){
                        var img = 'http://localhost/bhuumi/adminPanel/uploads/'+image;
                    }else{
                        var img = 'http://localhost/bhuumi/assets/images/default_user.png';
                    }
                    var html = '<li class="social-comment-replies-list-item"><article class="custom-flex flex-wrap"><img src="'+img+'" alt="'+result.name+'" class="img-circle"><div class="col pr-0"><div class="social-comment-replies-name"><a href="#">'+result.name+'</a><span class="small text-muted">1 secs ago</span></div><p class="social-comment-replies text-muted">'+reply+'</p></div></article></li>';
                    



                                $(_this).parents(".social-comment-action").next(".social-comment-replies").find(".social-comment-replies-list").append(html);

                                _this.parent().prev().find(".error").css("color", "green");
                                _this.parent().prev().find(".error").html('Reply Posted Successfully');
                                _this.parent().prev().find(".error").css("display", "block");



                                $(_this).parent().prev().find("#reply-text").val(''); 

                                setTimeout(function() {
  _this.parent().prev().find(".error").css("display", "none");

}, 5000);
                }
                
                
            }

        });
        }else{
            _this.parent().prev().find(".error").css("color", "red");
            _this.parent().prev().find(".error").html('Please Enter Reply');
            _this.parent().prev().find(".error").css("display", "block");
            $(_this).parent().prev().find("#reply-text").val('');
        }
    });

    $(document).on('click','#comment-submit',function(){
        var _this = $(this);
        var cat_id = $(_this).parent().parent().find("#cat_id").val();
        var forumId = $(_this).parent().parent().find("#forumId").val();
        var comment = $.trim($(_this).parent().prev().find("#comment-text").val());
        if(comment != ''){
            $.ajax({
            type: "POST",
            url: "http://localhost/bhuumi/forum/comment",
            data:'cat_id='+cat_id+'&forumId='+forumId+'&comment_forum='+comment,
            success:function(data){
                console.log(data);
                var result = JSON.parse(data);
                console.log(result.status);
                if(result.status == false){
                    $('#login-alert-modal').modal('show');
                    // _this.parent().prev().find(".error").css("color", "red");
                    // _this.parent().prev().find(".error").html('Please Login First.');
                    // _this.parent().prev().find(".error").css("display", "block");
                    $(_this).parent().prev().find("#comment-text").val('');
                }else{
                    var image = result.image;
                    var date = moment(new Date()).format("Do MMM, YYYY");
                    if(image != ''){
                        var img = 'http://localhost/bhuumi/adminPanel/uploads/'+image;
                    }else{
                        var img = 'http://localhost/bhuumi/assets/images/default_user.png';
                    }
                    var html = '';
                    html =  '<div class="forum-post-comment row" style="padding: 10px;">'+
                                    '<div class="custom-flex col-sm-12">'+
                                        '<img src="'+img+'" alt="'+result.name+'" class="img-responsive forum-comment-img" style="max-height:40px; max-width:40px; border-radius:100%;">'+
                                            '<div class="col-sm-12">'+
                                            '<h5>'+result.name+'&nbsp;&nbsp;&nbsp;'+'<span>'+date+'</span></h5>'+
                                            '</div>'+
                                    '</div>'+
                                    '<div class="post-content col-sm-12" style="border-bottom: #ece4e4 1px solid;;">'+
                                        '<p>'+comment+'</p>'+
                                    '</div>'+
                                '</div>';
                                if($(_this).parent().parent().find('.forum-post-comment:last')[0]){                                        $(_this).parent().parent().find('.forum-post-comment:last').after(html);
                                }else{
                                    $(_this).parent().parent().parent().find('.proDiv').prepend(html);
                                }
                                _this.parent().prev().find(".error").css("color", "green");
                                _this.parent().prev().find(".error").html('Comment Posted Successfully');
                                _this.parent().prev().find(".error").css("display", "block");

                                $(_this).parent().prev().find("#comment-text").val('');    
                }
                
                
            }

        });
        }else{
            _this.parent().prev().find(".error").css("color", "red");
            _this.parent().prev().find(".error").html('Please Enter Comment');
            _this.parent().prev().find(".error").css("display", "block");
            $(_this).parent().prev().find("#comment-text").val('');
        }
    });


    $(document).on('click','#star-comment',function(){
        var _this = $(this);
        var cat_id = $(_this).parent().parent().find("#cat_id").val();
        var starId = $(_this).parent().parent().find("#starId").val();
        var comment = $.trim($(".comment-text").val());

        if(comment != ''){
            $.ajax({
            type: "POST",
            url: "http://localhost/bhuumi/star/comment",
            data:'cat_id='+cat_id+'&starId='+starId+'&comment_star='+comment,
            success:function(data){
                var result = JSON.parse(data);
                if(result.status == false){
                    $('#login-alert-modal').modal('show');
                    // _this.parent().prev().find(".error").css("color", "red");
                    // _this.parent().prev().find(".error").html('Please Login First.');
                    // _this.parent().prev().find(".error").css("display", "block");
                    $(".comment-text").val('');
                }else{
                    var image = result.image;
                    var date = moment(new Date()).format("Do MMM, YYYY");
                    if(image != ''){
                        var img = 'http://localhost/bhuumi/adminPanel/uploads/'+image;
                    }else{
                        var img = 'http://localhost/bhuumi/assets/images/default_user.png';
                    }
                    var html = '';
                    html =  '<div class="forum-post-comment row" style="padding: 10px;">'+
                                    '<div class="custom-flex col-sm-12">'+
                                        '<img src="'+img+'" alt="'+result.name+'" class="img-responsive forum-comment-img" style="max-height:40px; max-width:40px; border-radius:100%;">'+
                                            '<div class="col-sm-12">'+
                                            '<h5>'+result.name+'&nbsp;&nbsp;&nbsp;'+'<span>'+date+'</span></h5>'+
                                            '</div>'+
                                    '</div>'+
                                    '<div class="post-content col-sm-12" style="border-bottom: #ece4e4 1px solid;;">'+
                                        '<p>'+comment+'</p>'+
                                    '</div>'+
                                '</div>';
                                if($(_this).parent().parent().find('.forum-post-comment:last')[0]){                                        $(_this).parent().parent().find('.forum-post-comment:last').after(html);
                                }else{
                                    $(_this).parent().parent().parent().find('.proDiv').prepend(html);
                                }
                                _this.parent().prev().find(".error").css("color", "green");
                                _this.parent().prev().find(".error").html('Comment Posted Successfully');
                                _this.parent().prev().find(".error").css("display", "block");

                                $(".comment-text").val('');
                    
                }


                
            }

        });
        }else{
            _this.parent().prev().find(".error").css("color", "red");
            _this.parent().prev().find(".error").html('Please Enter Comment');
            _this.parent().prev().find(".error").css("display", "block");
            $(".comment-text").val('');
        }
    });

    $(document).on('click', '.contact_bhuumi',function(){
    var formdata=$('#Mail_form').serialize();

    $.ajax({
        type: "POST",
        url: "http://localhost/bhuumi/feedback/adddetails",
        data:formdata,
        success:function(data){
            if(data == '0')
            {
                $('#contactuserror').html('<span style="color:red;">Please fill all the details.</span>');
            }
            if(data == '1')
            {
                $('#contactuserror').html('<span style="color:green;">Details submitted successfully.</span>');
                setTimeout(function() {
                    location.reload();
                }, 4000);
            }
            if(data == '3')
            {            
                $('#contactuserror').html('<span style="color:red;">Please enter the correct captcha code.</span>');
            }
            if(data == '2')
            {
                $('#contactuserror').html('<span style="color:red;">Please enter the captcha code.</span>');
            }
            setTimeout(function() {

                $('#contactuserror').html('');
            }, 4000);
        }
    });               
});
</script>
<!--<script>
        var textbox11=$('#textbox1').val();
        var textbox21=$('#textbox2').val();
        //alert(textbox11);
        //alert(textbox21);
</script> -->
			<script>
			
			function getCountryCode(cname) { //console.log('vvvvvvvvvvv' +cname);
				var dataString = 'cname=' + cname;
				$.ajax({
					type: "POST",
					url: "http://localhost/bhuumi/user/getcountrycode",
					data: dataString,
					cache: false,
					success: function (data) {
						console.log( ' dddddddddd ' + data );
						///if( data ) {
							//$("#country_code_select").removeProp("selected");
							//var selectedCountry = $("#country_name option:selected").text();
							//$("#country").val(selectedCountry);
							//$("#country_code_select").val(data).trigger('change');
							$("#country_code_select").val('+'+data);
							$("#country_code").val(data);
							//$("#country_code_select option[value='" + data + "']").attr("selected","selected");
							//$("#country_code_select").attr('disabled',true);
					//	}
					}
				});
			}

           

			
			function mylocationAjax() {
			$.ajax({
			   type: "POST",
			   url: "http://localhost/bhuumi/user/signupLocation",
			   data:'latitude='+28.619792600000004+'&longitude='+77.3824551,
			   success:function(data){
				   //alert(data);
				   var result = data.split("#");
				   //alert(typeof result);
						$("#location").val(result[0]);
						$("#country").val(result[1]);
						//console.log(' AAAAAAAAAAAAAA ' + result[1]); 
						$("#country_name").val(result[1]).trigger('change');
						//$("#country_name option[value='" + result[1] + "']").attr("selected","selected");
						$("#administrative_area_level_1").val(result[2]);
						$("#locality").val(result[3]);
						$("#postal_code").val(result[4]);
						getCountryCode(result[1]);
					}

			});
			}









 $('.btnActionFeed').click(function(){


       // alert('hello');

        var formdata=$('#Feedback_form').serialize();

       

$.ajax({
               type: "POST",
               url: "http://localhost/bhuumi/feedback/add",
               data:formdata,
               success:function(data){

                


                 if(data=='0')
                {
         
         $('#messfeederror').html('<span style="color:red;">Please fill all the details.</span>');
          


                }
                 if(data=='1')
                {
         
         $('#messfeederror').html('<span style="color:green;">Feedback submitted successfully.</span>');
          setTimeout(function() {

            location.reload();
            
        }, 4000);


                }
                if(data=='3')
                {
                    
    $('#messfeederror').html('<span style="color:red;">Please enter the correct captcha code.</span>');
 
 
                }
                   if(data=='2')
                   {


             $('#messfeederror').html('<span style="color:red;">Please enter the captcha code.</span>');  
       
                   }

                   setTimeout(function() {

            $('#messfeederror').html('');
        }, 4000);



                 
                    


               

              
              }

            });       
        
    });
 







  
    $('.btnAction').click(function(){

       

        var formdata=$('#JoinTeam_form').serialize();

$.ajax({
               type: "POST",
               url: "http://localhost/bhuumi/feedback/join_team",
               data:formdata,
               success:function(data){

               

              
                if(data=='0')
                {
         
         $('#messerror').html('<span style="color:red;">Please fill all the details.</span>');
          


                }
                 if(data=='1')
                {
         
         $('#messerror').html('<span style="color:green;">Congratulations! Your information sent successfully. One of our experts will get in touch with you as soon as possible..</span>');
          setTimeout(function() {

            location.reload();
            
        }, 4000);


                }
                if(data=='3')
                {
                  $('#messerror').html('<span style="color:red;">Please enter the correct captcha code.</span>');
 
 
                }
                   if(data=='2')
                   {


             $('#messerror').html('<span style="color:red;">Please enter the captcha code.</span>');  
       
                   }

                   setTimeout(function() {

            $('#messerror').html('');
        }, 4000);



                 
                    }

            });       
        
    });
    
    $('.btnRefresh').click(function(){
          $("#captcha_code").attr('src','http://localhost/bhuumi/captcha');
             $("#captcha_code_feed").attr('src','http://localhost/bhuumi/captcha');
             

          return false;
    })
    $('.btnRefreshContact').click(function(){
          $("#contact_captcha_code").attr('src','http://localhost/bhuumi/captcha');
             $("#contact_captcha_code_feed").attr('src','http://localhost/bhuumi/captcha');
             

          return false;
    })




			</script>
		

<script src="http://localhost/bhuumi/assets/js/jquery.cookie.js"></script>
<script>
	
	/*$(".service-record").on("click",function() {
		var dataid = $(this).find("#make-div-clickable").attr("data-id");
		var datauid = $(this).find("#make-div-clickable").attr("data-uid");
		var datacuid = $(this).find("#make-div-clickable").attr("data-cuid");
		var href = $(this).find("#make-div-clickable").attr("href");
		trackViewedProducts(dataid, datauid, datacuid);
		window.location = href;
		return false;
	});*/
	
    /*=================  for subcategory accordian shadow effect  ======================*/
    var i=100;
    $("#category-accordion .dropdown").each(function(){
        $(this).css({zIndex:i--})
    });
</script>
<script>
    (function(){
        var catId=$("input[name='collapseswitch']").val();
        if(catId){
            $('#compose').collapse();
        }
    })();

$('#prodKeyInput').keyup(function() {
	var $rows = $('#service-records .service-record');	
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
			reg = RegExp(val, 'i'),
			text;

		$rows.show().filter(function() {
			text = $(this).text().replace(/\s+/g, ' ');
			return !reg.test(text);
		}).hide();
	});

$('#myInput').keyup(function() {
	var $rows = $('#service-records .service-record');
	var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
		reg = RegExp(val, 'i'),
		text;

		$rows.show().filter(function() {
			text = $(this).text().replace(/\s+/g, ' ');
			return !reg.test(text);
		}).hide();
		$('#searchGlobal').attr('href', 'http://localhost/bhuumi/buysell/category_search?c_k='+$(this).val());
		var textLength = $('#myInput').val().length;
		if(textLength >= 1)
			$('.pagination').hide();
		else
			$('.pagination').show();
	});


$(window).scroll(function(){
		var lastID = $('.load-more').attr('lastID');
		var filterCountry = '';
		var filterState = '';
		var filterctCity = '';
		var filterctMinPrice = '';
		var filterctMaxPrice = '';
		var filterctCurrency = '';
		if (filterCountry) { var filter_country = filterCountry; } else { var filter_country = ''; }
		if (filterState) { var filter_state = filterState; } else { var filter_state = ''; }
		if (filterctCity) { var filter_city = filterctCity; } else { var filter_city = ''; }
		if (filterctMinPrice) { var filter_price_min = filterctMinPrice; } else { var filter_price_min = ''; }
		if (filterctMaxPrice) { var filter_price_max = filterctMaxPrice; } else { var filter_price_max = ''; }
		if (filterctCurrency) { var filter_currency = filterctCurrency; } else { var filter_currency = ''; }
		if ($(window).scrollTop() == $(document).height() - $(window).height() && lastID != 0){
			//to fetch the scroll height
			var req = $.ajax({
					type:'POST',
					url:'http://localhost/bhuumi/services/records',
					data: {lastServiceId : lastID, prod_typ: 'services', catid: 'c_5bfd1aac16090',subid: '',subtosubid: '',filter_country:filter_country,filter_state:filter_state,filter_city:filter_city,filter_price_min:filter_price_min,filter_price_max:filter_price_max,filter_currency:filter_currency},
					beforeSend : function() {
						$('.load-more').show();
					},
					success: function(html) {
						//console.log(html);
						$('.load-more').remove();
						console.log(html);
						if( lastID > 0 ){
							$('#service-records').append(html);
							var prodCnt = $("div[class*='service-record']").length;
							setTimeout(function(){
								$('#get-count').empty();
								$('#get-count').html(prodCnt);
							}, 100);
							//console.log('bbbbbbbbbbbbbbbbb'+ prodCnt);
						}
					},
					error:function(e){
					  // Error
					}
				});
	}
	});
	
	function favoirateServices(service_id, catid, subid, subtosubid,e){
		e.stopPropagation();
		//console.log(service_id + ' ppp ' + cat_id + ' ppp ' + subcat_id); return;
		var status = $('#services-fav-a-'+service_id).attr('data-status');
		var request = $.ajax({
				type: 'POST',
				url: 'http://localhost/bhuumi/services/favservice',
				cache: false,
				data: {service_id : service_id, status: status, catid: catid, subid: subid, subtosubid: subtosubid},
			});

			request.done(function(data) {
				var dt = JSON.parse(data);
				console.log(JSON.stringify(dt.productDetail));
				if(dt.productDetail){
					$.each(dt.productDetail, function( i, v ) {
						if(v.favs && v.favs.singleProductsFavs){
							if( service_id == v.id ){
								$('#fav-services-count-'+service_id).html('');
								$('#fav-services-count-'+service_id).html(' &nbsp;'+( (v.favs.singleProductsFavs[0].productFavCount>0) ? v.favs.singleProductsFavs[0].productFavCount : '') );
								console.log('ppp'+ v.favs.singleProductsFavs[0].user_fav_prod + ' == ' + v.favs.singleProductsFavs[0].current_user_id);
								if(v.favs.singleProductsFavs[0].user_fav_prod == v.favs.singleProductsFavs[0].current_user_id){
									$("#services-fav-a-"+service_id).attr("data-status", "0");
								} else {
									$("#services-fav-a-"+service_id).attr("data-status", "1");
								}
							}
						} else {
							if( service_id == v.id ){
								$('#fav-services-count-'+service_id).html('');
								$("#services-fav-a-"+service_id).attr("data-status", "1");
							}
						}
					});
					if(status == 1){
						//console.log('aaaaaaaaa' + status);
						$('#fav-icn-'+service_id).css({"color": "#f90202"});
					} else {
						//console.log('qqqqqqqqqqq' + status);
						$('#fav-icn-'+service_id).css({"color": "#777"});
					}
				}
			});

			request.fail(function(jqXHR, textStatus) {
				$('#ActionFailed').modal({backdrop: 'static', keyboard: false});
			});
	}
	
	function trackViewedProducts(product_id, productuserid, currentuserid){
		$.cookie('oa_uid', '', { expires: -1, path: '/'});
		//console.log(product_id+', ' + productuserid+', '+currentuserid); return;
		if ( product_id && productuserid && currentuserid ){
			var request = $.ajax({
				type: 'POST',
				url: 'http://localhost/bhuumi/autos/trackViewedProducts',
				cache: false,
				data: {product_id: product_id, productuserid: productuserid , currentuserid: currentuserid}
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
	
	$( "#web_url" ).on('change keyup', function(){
		 var urlRegex = /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;
		if(!(urlRegex.test($(this).val()))) {
			console.log('error');
			$('#urlErr').html('Invalid website URL.');
			return false;
		} else {
			console.log('no - error');
			$('#urlErr').html('');
		} 
	});

</script>
 @yield('js')
</body>
</html>
