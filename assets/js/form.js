$('document').ready(function () {
  // Init Animation
  new WOW().init({
    offset: 300
  });

  function activeNextElement(className) {
    let old = $(className + '.active');
    old.next().addClass('active');
    old.removeClass('active');
    old.next().css({
      left: '100px',
      opacity: 0
    });
    old.next().animate({
      opacity: 1,
      left: 0
    }, 300);
  }

  function activePrevElement(className) {
    let old = $(className + '.active');
    old.prev().addClass('active');
    old.prev().css({
      left: '-100px',
      opacity: 0
    });
    old.prev().animate({
      opacity: 1,
      left: 0
    }, 300);
    old.removeClass('active');
  }

  function liveUpdateNextButton(elmnt) {
    let parent = elmnt.closest('.step-content');
    let flag = true;
    let nextBtn = parent.find('.btn-next');
    parent.find('.form-control').each(function () {
      if (!$(this).val()) flag = false;
      if ($(this).hasClass('error')) flag = false;
    });
    if (parent.find('.selectpicker')) {
      parent.find('.selectpicker').each(function () {
        if (!$(this).val()) flag = false;
      });
    }
    if (flag == true) {
      nextBtn.removeClass('disabled');
    } else {
      nextBtn.addClass('disabled');
    }
  }

  function calculateTotalCost(weeklyCost, planType) {
    let originalCost;
    switch (planType) {
      case 0:
        originalCost = weeklyCost;
        break;
      case 1:
        originalCost = weeklyCost * 12 * 0.9;
        break;
    }
    originalCost = Math.floor(originalCost);
    let rest = originalCost % 10;
    if (rest < 5) return originalCost - rest;
    else if (rest >= 5 && rest <= 9) return originalCost - rest + 5;
  }
  // Init Testimonial Slider
  $('.testimonials').slick({
    dots: false,
    arrows: true,
    autoplay: true,
    slideToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });
  // Init DatePicker
  $(document).on('click', '#birthday', function () { 
    var me = $("#birthday");
    me.datepicker({
      showOn: 'focus',
      altFormat: "mm/dd/yy",
      dateFormat: "mm/dd/yy",
      minDate: '1/1/1900',
      maxDate: '12/31/2300'
    }).focus();
    me.mask('99/99/9999');
  }).on('select', '#birthday', function () {
    var me = $("#birthday");
    me.mask('99/99/9999');
  });
  // Show next content when click next button
  $('.btn-next').click(function () {
    $('.btn-back').show();
    activeNextElement('.step-content');
    activeNextElement('.step-link');
    $('.form-header .btn-back').css({
      opacity: 1,
      visibility: 'visible'
    });
  });
  $('#btn_next3').click(function () {
    let plan = $('.plan.active');
    let planName = plan.find('.plan-name').text();
    let planPrice = plan.find('.price').text();
    $('#chosen_plan_price').text(planPrice);
    $('#chosen_plan_name').text(planName);
    let totalCost;
    let priceValue = planPrice.match(/\d+/);
    if ($('.plans.active').attr('id') == 'weekly_plan') {
      $('#step4').removeClass('annual');
      $('#step4').addClass('weekly');
      totalCost = calculateTotalCost(priceValue, 0)
    }
    if ($('.plans.active').attr('id') == 'annual_plan') {
      $('#step4').removeClass('weekly');
      $('#step4').addClass('annual');
      totalCost = calculateTotalCost(priceValue, 1)
    }
    $('#bill_today').text('$' + totalCost);
  });
  // Show prev content when click prev button
  $('.btn-back').click(function () {
    activePrevElement('.step-content');
    activePrevElement('.step-link');
    if ($('.step-content').first().hasClass('active')) {
      $(this).hide();
      $('.form-header .btn-back').css('opacity', 0);
    }
  });

  // Active Next button when all fields are selected
  $('input.form-control').on('input', function() {
    liveUpdateNextButton($(this));
  });
  $('input.form-control').keydown(function () {
    liveUpdateNextButton($(this));
  });
  $('.step-content select').change(function () {
    liveUpdateNextButton($(this));
  });

  // Change Plan
  $('#plan_method').change(function () {
    $('.switch-label').toggleClass('active');
    // Show changed plans
    $('.plans').toggleClass('active');
    // Init plan select when change mode
    $('.plan.active').removeClass('active');
    $('#btn_next3').removeClass('valid');
    $('#btn_next3').addClass('disabled');
  });

  // Select plan when click plan items
  $('.plan').click(function () {
    // Get Plan value when click plan

    $(this).find('input').prop('checked', true);
    $('.plan.active').removeClass('active');
    $(this).addClass('active');
    let parent = $(this).closest('.step-content');
    parent.find('.btn-next').removeClass('disabled');
  });

  // Add active class when click selectpicker
  $('.selectpicker').on('changed.bs.select', function () {
    $(this).closest('.bootstrap-select').addClass('active');
  });

  // Stripe Integration
  if ($('#payment_form').length > 0) {

    // Create a Stripe client.
    var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

    // Create an instance of Elements.
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
      base: {
        icon: false,
        color: '#32325d',
        fontFamily: '"AvenirMedium", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '15px',
        '::placeholder': {
          color: '#a6a6a6'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element.
    var card = elements.create('card', {
      style: style,
    });

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function (event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
      document.getElementById('btn_enroll').classList.remove('disabled');
    });

    // Handle form submission.
    var form = document.getElementById('payment_form');
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      stripe.createToken(card).then(function (result) {
        if (result.error) {
          // Inform the user if there was an error.
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          stripeTokenHandler(result.token);
        }
      });
    });

    // Submit the form with the token ID.
    function stripeTokenHandler(token) {
      // Insert the token ID into the form so it gets submitted to the server
      var form = document.getElementById('payment_form');
      var hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('value', token.id);
      form.appendChild(hiddenInput);

      // Submit the form
      form.submit();
    }
  }

  if ($('#phonenumber').length > 0) {
    $('#phonenumber').intlTelInput({
      autoHideDialCode:true,
      nationalMode: true,
      autoPlaceholder:"aggressive",
      separateDialCode: true,
      preferredCountries: ["us","ca"],
      utilsScript: "assets/plugins/intl-tel-input/js/utils.js"
    });
  }

  // Form Validation
  $('form').validate({
    rules: {
      phonenumber: {
        required: true,
        intlTelNumber: true
      },
    }
  });

  // create a custom phone number rule called 'intlTelNumber'
  jQuery.validator.addMethod("intlTelNumber", function(value, element) {
    let flag = this.optional(element) || $(element).intlTelInput("isValidNumber");
    if ( !flag ) {
      $(element).closest('.iti').addClass('error');
    } else {
      $(element).closest('.iti').removeClass('error');
    }
    return flag;
  }, "Please enter a valid International Phone Number");
});