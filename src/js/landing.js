$(document).ready(function() {
  var w = $(window);

  w.scroll(function() {
    if (w.scrollTop() > 0) {
      $('nav').addClass("active-nav");
    }
    else {
      $('nav').removeClass("active-nav");
    }
  });

  $('#burger').click(function(e) {
    $(e.currentTarget).toggleClass("close");
    $('.d-f-wrapper ul').toggleClass("show");
    $('.d-f-wrapper').toggleClass("menu-open");
  });



 //  var dfLock = false;
 //  var transitionDuration = 800;

	// $('.d-f').hover(
	// 	function() {
 //      if (!dfLock) {
 //        dfLock = true;
 //        $('.d, .f').addClass("hovering");
 //      }
 //    },
 //    function() {
 //      $('.d, .f').removeClass("hovering");
 //      dfLock = false;
 //    }
 //  );
});