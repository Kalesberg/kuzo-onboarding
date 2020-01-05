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
    let parent = elmnt.closest('.step-content');
    let flag = true;
    let nextBtn = parent.find('.btn-next');
    parent.find('.form-control').each(function() {
      if (!$(this).val()) flag = false;
    });
    if (parent.find('.selectpicker')) {
      parent.find('.selectpicker').each(function() {
        if (!$(this).val()) flag = false;
      });
    }
    if ( flag == true ) {
      nextBtn.removeClass('disabled');
    } else {  
      nextBtn.addClass('disabled');
    }
  }
  $('input.form-control').on('change', function() {
    liveUpdateNextButton($(this));
  });
  $('.step-content select').on('change', function() {
    liveUpdateNextButton($(this));
  });

  // Change Plan
  $('#plan_method').on('change', function() {
    $('.switch-label').toggleClass('active');
    // Show changed plans
    $('.plans.active').fadeOut('300');
    $('.plans').toggleClass('active');
    $('.plans.active').fadeIn('300');
  });
  
  // Select plan when click plan items
  $('.plan').click(function() {
    // Get Plan value when click plan
    let planValue = $('input[name="plan"]:checked').val();

    $(this).find('input').prop('checked', true);
    $('.plan.active').removeClass('active');
    $(this).addClass('active');
    let parent = $(this).closest('.step-content');
    parent.find('.btn-next').removeClass('disabled');
  });
});