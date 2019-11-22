"use strict";
function byId(e){return document.getElementById(e);}

window.addEventListener('load', onDocLoaded, false);

function onDocLoaded()
{
	var el = document.getElementById('mFileInput');
	if(el){
		el.addEventListener('change', onChosenFileChange, false);
	}
}

function onChosenFileChange(evt)
{
    var fileType = this.files[0].type;

    if (fileType.indexOf('audio') != -1)
        loadFileObject(this.files[0], onSoundLoaded, evt.target.id);

    else if (fileType.indexOf('image') != -1)
        loadFileObject(this.files[0], onImageLoaded, evt.target.id);

    else if (fileType.indexOf('video') != -1)
        loadFileObject(this.files[0], onVideoLoaded, evt.target.id);
}

function loadFileObject(fileObj, loadedCallback, elemID)
{
    var reader = new FileReader();
		reader.onload = loadedCallback;
		reader.readAsDataURL( fileObj );
}

function onSoundLoaded(evt)
{
	if($("#video").is(":visible")){ byId('video').remove(); }
	if($("#image").is(":visible")){ byId('image').remove(); }
	$('<audio id="sound" ></audio>').appendTo("#insertHtmAdd");
    byId('sound').src = evt.target.result;
	byId('sound').style.height = "200px";
	byId('sound').style.width = "200px";
    byId('sound').play();
}

function onImageLoaded(evt)
{
	if($("#video").is(":visible")){ byId('video').remove(); }
	if($("#sound").is(":visible")){ byId('sound').remove(); }
	$('<img id="image"></img>').appendTo("#insertHtmAdd");
    byId('image').src = evt.target.result;
	byId('image').style.height = "150px";
	byId('image').style.width = "150px";
	byId('image').style.margin = "5px 0px 0px 0px";
}

function onVideoLoaded(evt)
{
	if($("#image").is(":visible")){ byId('image').remove(); }
	if($("#sound").is(":visible")){ byId('sound').remove(); }
	$("<video id='video' />").appendTo("#insertHtmAdd");
    byId('video').src = evt.target.result;
	byId('video').style.height = "200px";
	byId('video').style.width = "200px";
    byId('video').play();
}