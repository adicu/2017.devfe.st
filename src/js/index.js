$(document).ready(function() {

  var w = $(window);

  if (w.scrollTop() > 0) {
    $('nav').addClass('active-nav');
  }

  w.scroll(function() {
    if (w.scrollTop() > 0) {
      $('nav').addClass('active-nav');
    }
    else {
      $('nav').removeClass('active-nav');
    }
  });

  var vh = window.innerHeight;
  var landingPage = $('.landing-page');
  var lion = $('#lion');
  var _height = 40;
  var _left = 50;

  moveLion = function() {
    // var curScroll = w.scrollTop();

    // if (curScroll < vh) {
    //   _height = 100 * ((curScroll / vh) * 0.6 + 0.4);
    //   _left = 100 * ((curScroll / vh) * 0.5 + 0.5);

    //   lion.css({
    //     'height': _height + '%',
    //     'left': _left + '%'
    //   });
    // }
    // else {
    //   lion.css({
    //     'height': '100%',
    //     'left': '100%'
    //   });
    // }
    console.log('nothing to see here :^)');
  }

  function getDistFromTop(element) {
    var distanceScrolled = document.body.scrollTop;
    var distFromTop = element.getBoundingClientRect().top;
    return distanceScrolled + distFromTop;
  }

  w.scroll(moveLion);

  $('#burger').click(function(e) {
    $(e.currentTarget).toggleClass("close");
    $('.d-f-wrapper ul').toggleClass("show");
    $('.d-f-wrapper').toggleClass("menu-open");
  });

  $('.scrolly-link').each(function(i, el) {
    $(el).click(function(e) {
      e.preventDefault();
      _y = getDistFromTop($(e.currentTarget.hash)[0]);
      navHeight = $('nav').innerHeight();
      $.scrollTo(_y - navHeight, 500);
    })
  });

  $('.top-link').each(function(i, el) {
    $(el).click(function(e) {
      e.preventDefault();
      $.scrollTo(0, 500);
    })
  });

  var md = new MobileDetect(window.navigator.userAgent);
  if (md.mobile() !== null) {
    // On mobile devices, freeze the hero.
    freezeHero();
    w.on('orientationchange', updateHero);
  }

  function freezeHero() {
    // Set landing page height to pixel value.
    landingPage.css({
      height: landingPage.height()
    });

    // Set lion size / position to pixel value.
    lion.css({
      height: lion.height(),
      top: lion.css('top'),
      transform: 'translateX(-50%)'
    });
  }

  function updateHero() {
    // reset lion and landing page to initial values so they can resize
    landingPage.removeAttr('style');
    lion.removeAttr('style');

    // then when everything has been layed out again, freeze at the new sizes
    setTimeout(freezeHero, 500);
  }

  function _easeInOutQuad(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  }

  /**
   * Scroll to the top of the page, for scrollDuration ms, calling cb when done.
   *
   * @param {int} offset - the offset from the top of the document to scroll to
   * @param {int} scrollDuration - how long the scroll should take, in ms
   * @param {function} cb - callback to call when the scroll is complete
   */
  $.scrollTo = function(offset, scrollDuration, cb) {
    cb = cb || function() {};
    var startT = Date.now();
    var startY = window.scrollY;
    var distanceToTravel = offset - startY;
    var percentComplete = 0;
    var elapsed;
    var scrollToPercent;
    var scrollToY;

    function step() {
      setTimeout(function() {
        if (percentComplete < 1) {
          elapsed = Date.now() - startT;
          percentComplete = elapsed / scrollDuration;
          scrollToPercent = _easeInOutQuad(percentComplete, elapsed, 0, 1, scrollDuration);
          scrollToY = scrollToPercent * distanceToTravel + startY;
          window.scrollTo(0, scrollToY);
          requestAnimationFrame(step);
        } else {
          window.scrollTo(0, offset);
          cb();
        }
      }, 15);
    }

    step();
  };

});
