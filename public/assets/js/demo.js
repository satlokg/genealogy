$(document).ready(function(){
$(".parallax").css("background-size","100% auto");
$(".parallax1").css("background-size","150% auto");
	$(window).scroll(function(){
		$(".parallax").each(function(){
			var speed=0.5;
			var st=$(window).scrollTop();
			var pos= (speed * st);
			var x=$(this).offset();
			var y=(x.top) + pos;
			var ito=x.top;
			var disp_height=$( window ).height();
			if(ito <= (st+disp_height+disp_height))
			{
				var p=(((st + disp_height)-ito) * speed)-(speed * disp_height);
				$(this).css("background-position","0 "+p+"px");
//				$(this).html("display height= "+disp_height+"<br>scroll top= "+st+"<br>Background Position= "+p);
			}

		});
		$(".parallax1").each(function(){
			var speed=0.3;
			var st=$(window).scrollTop();
			var pos= (speed * st);
			var x=$(this).offset();
			var y=(x.top) + pos;
			var ito=x.top;
			var disp_height=$( window ).height();
			if(ito <= (st+disp_height+disp_height))
			{
				var p=(((st + disp_height)-ito) * speed)-(speed * disp_height)*2;
				$(this).css("background-position",p+"px"+" 0px");
				$(this).html("display height= "+disp_height+"<br>scroll top= "+st+"<br>Background Position= "+p);
			}
		});
		
	});
	
});