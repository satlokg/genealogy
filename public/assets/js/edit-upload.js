"use strict";
function byId(e){return document.getElementById(e);}

window.addEventListener('load', onEditDocLoaded, false);

function onEditDocLoaded()
{
	var el = document.getElementById('mEditFileInput');
	if(el){
		el.addEventListener('change', onEditChosenFileChange, false);
	}
}

function onEditChosenFileChange(evt)
{
    var fileType = this.files[0].type;

    if (fileType.indexOf('audio') != -1){
        loadEditFileObject(this.files[0], onEditSoundLoaded);
	} else if (fileType.indexOf('image') != -1){
        loadEditFileObject(this.files[0], onEditImageLoaded);
	} else if (fileType.indexOf('video') != -1){
        loadEditFileObject(this.files[0], onEditVideoLoaded);
	}
}

function loadEditFileObject(fileObj, loadedEditCallback)
{
    var reader = new FileReader();
    reader.onload = loadedEditCallback;
    reader.readAsDataURL( fileObj );
}

function onEditSoundLoaded(evt)
{
	if($("#videoedit").is(":visible")){ byId('videoedit').remove(); }
	if($("#imageedit").is(":visible")){ byId('imageedit').remove(); }
	$('<audio id="soundedit" ></audio>').appendTo("#insertHtm");
    byId('soundedit').src = evt.target.result;
	byId('soundedit').style.height = "200px";
	byId('soundedit').style.width = "200px";
    byId('soundedit').play();
}

function onEditImageLoaded(evt)
{
	if($("#videoedit").is(":visible")){ byId('videoedit').remove(); }
	if($("#soundedit").is(":visible")){ byId('soundedit').remove(); }
	$('<img id="imageedit"></img>').appendTo("#insertHtm");
    byId('imageedit').src = evt.target.result;
	byId('imageedit').style.height = "200px";
	byId('imageedit').style.width = "200px";
	byId('imageedit').style.margin = "5px 0px 0px 0px";
}

function onEditVideoLoaded(evt)
{
	if($("#imageedit").is(":visible")){ byId('imageedit').remove(); }
	if($("#soundedit").is(":visible")){ byId('soundedit').remove(); }
	$("<video id='videoedit' />").appendTo("#insertHtm");
    byId('videoedit').src = evt.target.result;
	//console.log('opopopop'+ evt.target.result);
	byId('videoedit').style.height = "200px";
	byId('videoedit').style.width = "200px";
    byId('videoedit').play();
}