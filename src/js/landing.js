$(document).ready(function() {
	$('.d-f-wrapper').hover(
		function() {
			$('.d, .f').addClass("hovering");
			console.log('1');
		},
		function() {
			$('.d, .f').removeClass("hovering");
			console.log('2');
		}
	);
});