console.log('linked')

//////////////////////////////
// Stamina Gained in X time //
//////////////////////////////

$('.time-to-stam').submit(function(e) {
	e.preventDefault();
	
	var m = Number(document.getElementsByClassName('ts-minutes')[0].value) || 0;
	var h = Number(document.getElementsByClassName('ts-hours')[0].value) || 0;
	var d = Number(document.getElementsByClassName('ts-days')[0].value) || 0;
	var s = ( (m) + (h * 60) + (d * 1440)) / 3;
	// var t = new Date(new Date().getTime() + ( ((m * 60) + (h * 3600) + (d * 43200)) * 1000 ) );

	document.getElementsByClassName('ts-answer')[0].textContent = s;
	document.getElementsByClassName('time-to-stam-answer')[0].style.visibility = "visible";
});

///////////////////////////////////
// Time Needed to gain X stamina //
///////////////////////////////////

$('.stam-to-time').submit(function(e) {
	e.preventDefault();

	var s = Number(document.getElementsByClassName('st-stamina')[0].value);
	if (!(s > 0)) { document.getElementsByClassName('stam-to-time-answer')[0].style.visibility = 'hidden'; return; } // return if input is not > 0
	// calculate time units
	var m = s * 3;
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

