$(document).ready(function() {
	var count=0;
  if (window.File && window.FileList && window.FileReader) {
    $("#image2").on("change", function(e) {
      var files = e.target.files,
        filesLength = files.length;
      for (var i = 0; i < filesLength; i++) {
		  
        if(count<=5){
			var f = files[i]
        var fileReader = new FileReader();
        fileReader.onload = (function(e) {
          var file = e.target;
		  var rr=/^data:image/;
		  var ext=rr.test(file.result);
		  
		  if(ext){
			$("<span class=\"pip\">" +
            "<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
            "<br/><span class=\"remove\"><i class='fa fa-times-circle' aria-hidden='true'></i></span>" +
            "</span>").appendTo("#image2-demo-parent").click(function(){
				$(this).find(".remove").parent(".pip").remove();
				count--;
			});
						
		  }
		  else{
          $("<span class=\"pip\">" +
            "<img class=\"imageThumb\" src=\"default-demo-image.png\" title=\"" + file.name + "\"/>" +
            "<br/><span class=\"remove\"><i class='fa fa-times-circle' aria-hidden='true'></i></span>" +
            "</span>").appendTo("#image2-demo-parent").click(function(){
				$(this).find(".remove").parent(".pip").remove();
				count--;
			});
			
		  }
        });
		
		
        fileReader.readAsDataURL(f);
		count++;
		}
		else{alert("Six Max upload allowed"); return false;}
      }
    });
  } else {
    alert("Your browser doesn't support to File API")
  }
});

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