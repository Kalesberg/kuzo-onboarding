$('document').ready(function() {
  $('.testimonials').slick({
    dots: false,
    arrows: true,
    autoplay: true,
    slideToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });
  $('.btn-next').click(function() {
    let old = $('.step-content.active');
    old.next().addClass('active');
    if ($('.step-content').first().hasClass('active')) {
      $('.btn-back').show();
    }
    // if ($('.step-content').last().hasClass('active')) {
    //   $('.btn-next').fadeOut('300');
    // }
    old.removeClass('active');
  });
  $('.btn-back').click(function() {
    let old = $('.step-content.active');
    old.prev().addClass('active');
    if ($('.step-content').last().hasClass('active')) {
      $('.btn-next').show();
    }
    if ($('.step-content').first().hasClass('active')) {
      $('.btn-back').hide();
    }
    old.removeClass('active');
  });

  // Active Next button when all fields are selected
  function liveUpdateNextButton(elmnt) {
    let parent = elmnt.closest('fieldset');
    let flag = true;
    let nextBtn = parent.find('.btn-next');
    parent.find('.form-control').each(function() {
      if (!elmnt.val()) flag = false;
    });
    parent.find('.selectpicker').each(function() {
      console.log(elmnt.val(), flag);
      if (!elmnt.val()) flag = false;
    })
    if ( flag == true ) {
      nextBtn.removeClass('disabled');
    } else {  
      nextBtn.addClass('disabled');
    }
  }
  $('input.form-control').on('change', function() {
    liveUpdateNextButton($(this));
  });
  $('fieldset select').on('change', function() {
    liveUpdateNextButton($(this));
  });
});