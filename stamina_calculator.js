$(function() {

////////////////
// INITIALIZE //
////////////////

/**
 * Load user's saved Time per Stamina
 */
if (typeof(Storage) == 'undefined') {
	// document.getElementsByClassName('recover-time')[0].value = 5;
}
else {
	document.getElementsByClassName('recover-time')[0].value = localStorage.grjkz_stamina_calc || 5;
}


/**
 * Show my contact email when button is clicked
 */
$('.contact-button').click(function() {
	$(this).parent().append('<a href="mailTo:PhilLikesMilkTea@gmail.com?subject=Ticket::Stamina Calculator">PhilLikesMilkTea@gmail.com</a>');
	$(this).hide();
});

// dynamicAds();


////////////////
// RESPONSIVE //
////////////////

/** 
 * ADs
 */
// function dynamicAds() {
// 	// responsive ad
// 	// small to large screen
// 	if (window.innerWidth > 666 && $('.responsive-main-center-ad > .responsive-ad').length > 0 ) {
// 		$('.responsive-ad').appendTo($('.main-right'));
// 	}
// 	// large to small
// 	else if (window.innerWidth <= 666 && $('.main-right > .responsive-ad').length > 0 ) {
// 		$('.responsive-ad').appendTo($('.responsive-main-center-ad'));
// 	}

// 	// 300x600 ad
// 	// small to large
// 	if (window.innerWidth > 982 && $('.large-main-center-ad > .300x600-ad').length > 0 ) {
// 		$('.300x600-ad').appendTo($('.main-left'));
// 	}
// 	// large to small
// 	else if (window.innerWidth <= 982 && $('.main-left > .300x600-ad').length > 0) {
// 		$('.300x600-ad').appendTo($('.large-main-center-ad'));
// 	}
// }

/**
 * On-Load ad placement
 */
// if (window.innerWidth > 666) {
// 	$('.responsive-ad').appendTo($('.main-right'));
// }
// if (window.innerWidth > 982) {
// 	$('.300x600-ad').appendTo($('.main-left'));
// }

/**
 * Window Resize responsiveness
 */
// $(window).resize(function() {
	// dynamicAds();
// });


////////////////////////////////
// Save Stamina Recovery Time //
////////////////////////////////

/**
 * Save User's preferred default stamina CD time
 */
$('.recovery-input').submit(function(e) {
	e.preventDefault();

	var result = document.getElementsByClassName('save-result')[0];
	if (typeof(Storage) == 'undefined') {
		result.textContent = "Couldn't save to this device :(";
	}
	else {
		localStorage.grjkz_stamina_calc = document.getElementsByClassName('recover-time')[0].value;
		result.textContent = "Saved!";
	}
});


//////////////////////////////////
// Time to reach target Stamina //
//////////////////////////////////

$('.time-to-max').submit(function(e) {
	e.preventDefault();

	var rec = Number(document.getElementsByClassName('recover-time')[0].value) || 0;
	if (!rec) { document.getElementsByClassName('time-to-max-answer').style.visibility = 'hidden'; return; }
	var c = Number(document.getElementsByClassName('tm-current-stamina')[0].value);
	var x = Number(document.getElementsByClassName('tm-target-stamina')[0].value);
	var $answerField = document.getElementsByClassName('time-to-max-answer')[0];
	if (c > x || x < 1) {
		if ($answerField.style.visibility == "visible") {
			$answerField.style.visibility = "hidden";
		}
		globalMessage("Invalid Input");
		return;
	}

	var m = (x - c) * rec; // total minutes it takes to recover x stamina
	document.getElementsByClassName('tm-answer-delta-stamina')[0].textContent = x-c;
	document.getElementsByClassName('tm-answer-time-takes')[0].textContent = getTimeIntervals(m);
	document.getElementsByClassName('tm-answer-clock')[0].textContent = getFutureTimestamp(m);
	$answerField.style.visibility = "visible";
});


//////////////////////////////
// Stamina Gained in X time //
//////////////////////////////

$('.time-to-stam').submit(function(e) {
	e.preventDefault();
	var rec = Number(document.getElementsByClassName('recover-time')[0].value) || 0;
	if (!rec) { document.getElementsByClassName('time-to-stam-answer')[0].style.visibility = 'hidden'; return; }
	var m = Number(document.getElementsByClassName('ts-minutes')[0].value) || 0;
	var h = Number(document.getElementsByClassName('ts-hours')[0].value) || 0;
	var d = Number(document.getElementsByClassName('ts-days')[0].value) || 0;
	var $answerField = document.getElementsByClassName('time-to-stam-answer')[0];
	if (m < 1 && h < 1 && d < 1) {
		if ($answerField.style.visibility == "visible") {
			$answerField.style.visibility = "hidden";
		}
		globalMessage("Invalid Time");
		return;
	}
	var s = Math.floor( ( m + (h * 60) + (d * 1440) ) / rec );
	// var t = new Date(new Date().getTime() + ( ((m * 60) + (h * 3600) + (d * 43200)) * 1000 ) );

	document.getElementsByClassName('ts-answer')[0].textContent = s;
	$answerField.style.visibility = "visible";
});


///////////////////////////////////
// Time Needed to gain X stamina //
///////////////////////////////////

$('.stam-to-time').submit(function(e) {
	e.preventDefault();
	
	var $answerField = document.getElementsByClassName('stam-to-time-answer')[0];
	var rec = Number(document.getElementsByClassName('recover-time')[0].value) || 0;
	var s = Number(document.getElementsByClassName('st-stamina')[0].value);
	
	if ( s < 1 || !rec) { // exit if input is not > 0
		if ($answerField.style.visibility == "visible") {
			$answerField.style.visibility = 'hidden'; 
		}
		globalMessage("Invalid Input");
		return;
	}
	
	var m = rec * s;
	document.getElementsByClassName('st-answer-time-takes')[0].textContent = getTimeIntervals(m);
	document.getElementsByClassName('st-answer-clock')[0].textContent = getFutureTimestamp(m); // clock only
	$answerField.style.visibility = 'visible';
});

});

////////////////
// FUNCTINONS //
////////////////


/**
 * Get the Timestamp of the future time
 * @param  {int} m Total minutes needed to reach target time
 * @return {string} t Returns future target datetime or time (eg: 16:12 EST || Sun Jan 1 22:30 EST)
 */
function getFutureTimestamp(m) {
	var t = new Date(new Date().getTime() + (1000 * m * 60) );

	if (t.getTime() - new Date().getTime() >= 86400000) { // if diff is more than a day
		t = t.toString().split(' ');
		t.splice(-2,1);
		t.splice(3,1);
		t[3] = t[3].substring(0,5);
	}
	else {
		t = t.toTimeString().split(' ');
		t[0] = t[0].substring(0,5);
		t.splice(1,1);
	}
	return t.join(' ');
}


/**
 * Converts minutes into human readable time period of days, hours and minutes
 * @param  {int} m Minutes
 * @return {string}   "X days Y hours Z minutes"
 */
function getTimeIntervals(m) {
	var x = {};
	var d = Math.floor( m / 1440 );
	var r = m % 1440; // remainder in minutes
	var h = Math.floor( r / 60);
	// calculate end time
	var min = r % 60;

	if (d > 0) {
		x.d = (d == 1) ? d + " day" : d + " days";
	} else { x.d = ""; }
	if (h > 0) {
		x.h = (h == 1) ? h + " hour" : h + " hours";
	} else { x.h = ""; }
	if (min > 0) {
		x.m = (min == 1) ? min + " minute" : min + " minutes";
	} else { x.m = ""; }

	// add spaces where necessary
	if (x.d && x.h) {
		x.d += " ";
	}
	if (x.h && x.m) {
		x.h += " ";
	}
	return (x.d + x.h + x.m);
}


/**
 * Displays a global message to user
 * @param  {string} m String to output
 * @param  {string} c String color
 */
function globalMessage(m, c) {
	var $global = document.getElementById('global-message');
	$global.textContent = m;
	$global.style.color = c ? c : "red";
	$global.style.display = 'inline-block';
	setTimeout(function() {
		$global.style.display = "none";
	}, 2500);
}