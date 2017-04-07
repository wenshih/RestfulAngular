
var setIntervalId;

function checkCookieSecond(mail, $state){
	setIntervalId = setInterval(function(){checkCookie(mail, $state);},(5 * 60 * 1000));
	return setIntervalId;
}

function checkCookie(mail, $state){
	if(_.isUndefined(mail)){
		$state.go("app.login", null, {reload: true});
	}
}

function clearCookie(id, mail){
	if(_.isUndefined(mail)){
		clearInterval(id);
	}
}


function notyFun(text, type, theme){
	noty({
		text: text,
		layout: 'bottom',
		type: type,
		theme: theme,
		animation: {
		    open: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceInLeft'
		    close: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceOutLeft'
		    easing: 'swing',
		    speed: 1000 // opening & closing animation speed
		  },
		timeout: true,
	});
}