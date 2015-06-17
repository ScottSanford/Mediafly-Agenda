$(document).ready(function(){

	document.addEventListener('touchmove', function(event) {
    	event.preventDefault();
    }, false);

    $(function() {
    	FastClick.attach(document.body);
	});

	$("#menu").mmenu();


	$('.menu-edit, .menu-save, .menu-load, .menu-close').bind("touchend click" , function(){
		$('#menu').trigger('close.mm');
	})

	$('.menu-close').bind('touchend click', function(){
		mflyCommands.close();
	})


	$('.menu-annotations').bind("touchend click" , function(){
		// mflyCommands.showAnnotations(500,500,500,500);
		$('#menu').trigger('close.mm');
		
		var clicked = true;		
		if (clicked) {
			var timesRun = 0;
			var interval = setInterval(function(){
				timesRun += 1;
				mflyCommands.showAnnotations(500,500,500,500);
				if (timesRun  === 1) {
					clearInterval(interval);
				}
			}, 500);
		}
	})

});