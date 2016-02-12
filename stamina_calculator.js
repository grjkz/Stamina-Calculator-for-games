$(function() {

////////////////
// INITIALIZE //
////////////////

if (typeof(Storage) == 'undefined') {
	document.getElementsByClassName('recover-time')[0].value = 5;
}
else {
	document.getElementsByClassName('recover-time')[0].value = localStorage.grjkz_stamina_calc || 5;
}

$('.contact-button').click(function() {
	$(this).parent().append('<a href="mailTo:PhilLikesMilkTea@gmail.com?subject=Ticket::Stamina Calculator">PhilLikesMilkTea@gmail.com</a>');
	$(this).hide();
});


////////////////
// RESPONSIVE //
////////////////

/** 
 * ADs
 */
function dynamicAds() {
	// responsive ad
	// small to large screen
	if (window.innerWidth > 666 && $('.responsive-main-center-ad > .responsive-ad').length > 0 ) {
		$('.responsive-ad').appendTo($('.main-right'));
	}
	// large to small
	else if (window.innerWidth <= 666 && $('.main-right > .responsive-ad').length > 0 ) {
		$('.responsive-ad').appendTo($('.responsive-main-center-ad'));
	}

	// 300x600 ad
	// small to large
	if (window.innerWidth > 982 && $('.large-main-center-ad > .300x600-ad').length > 0 ) {
		$('.300x600-ad').appendTo($('.main-left'));
	}
	// large to small
	else if (window.innerWidth <= 982 && $('.main-left > .300x600-ad').length > 0) {
		$('.300x600-ad').appendTo($('.large-main-center-ad'));
	}
}




if (window.innerWidth > 666) {
	$('.responsive-ad').appendTo($('.main-right'));
}
if (window.innerWidth > 982) {
	$('.300x600-ad').appendTo($('.main-left'));
}


$(window).resize(function() {
	dynamicAds();
});

////////////////////////////////
// Save Stamina Recovery Time //
////////////////////////////////

$('.save-recover-time').click(function() {
	var result = document.getElementsByClassName('save-result')[0];
	if (typeof(Storage) == 'undefined') {
		result.textContent = "Couldn't save to this device :(";
	}
	else {
		localStorage.grjkz_stamina_calc = document.getElementsByClassName('recover-time')[0].value;
		result.textContent = "Saved!";
	}
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
	var s = ( (m) + (h * 60) + (d * 1440)) / rec;
	// var t = new Date(new Date().getTime() + ( ((m * 60) + (h * 3600) + (d * 43200)) * 1000 ) );

	document.getElementsByClassName('ts-answer')[0].textContent = s;
	document.getElementsByClassName('time-to-stam-answer')[0].style.visibility = "visible";
});

///////////////////////////////////
// Time Needed to gain X stamina //
///////////////////////////////////

$('.stam-to-time').submit(function(e) {
	e.preventDefault();
	var rec = Number(document.getElementsByClassName('recover-time')[0].value) || 0;
	var s = Number(document.getElementsByClassName('st-stamina')[0].value);
	if (!(s > 0) || !rec) { document.getElementsByClassName('stam-to-time-answer')[0].style.visibility = 'hidden'; return; } // return if input is not > 0
	// calculate time units
	var m = s * rec;
	var d = Math.floor( m / 1440 );
	var r = m % 1440; // remainder in minutes
	var h = Math.floor( r / 60);
	// calculate end time
	var t = new Date(new Date().getTime() + (1000 * m * 60) ); // milisecond * total minutes * seconds in a minute
	m = r % 60;
	console.log(t.toTimeString());
	var a = document.getElementsByClassName('stam-to-time-answer-field')[0].children;
	if (d > 0 ) {
		a[0].textContent = (d == 1) ? d + " day" : d + " days";
		t = t.toString().split(' ');
		t.splice(-2,1);
		t.splice(3,1);
		t[3] = t[3].substring(0,5);
		document.getElementsByClassName('st-answer-clock')[0].textContent = t.join(' '); // full datetime without GMT
	} else {
		a[0].textContent = "";
		t = t.toTimeString().split(' ');
		t[0] = t[0].substring(0,5);
		t.splice(1,1);
		document.getElementsByClassName('st-answer-clock')[0].textContent = t.join(' '); // clock only
	}
	if (h > 0) {
		a[1].textContent = (h == 1) ? h + " hour" : h + " hours";
	} else { a[1].textContent = ""; }
	if (m > 0) {
		a[2].textContent = (m == 1) ? m + " minute" : m + " minutes";
	} else { a[2].textContent = ""; }
	document.getElementsByClassName('stam-to-time-answer')[0].style.visibility = 'visible';
});



});
