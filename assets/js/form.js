$('document').ready(function () {
  // Init Animation
  new WOW().init({offset: 300});
  
  function activeNextElement(className) {
    let old = $(className + '.active');
    old.next().addClass('active');
    old.removeClass('active');
  }
  function activePrevElement(className) {
    let old = $(className + '.active');
    old.prev().addClass('active');
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
  // Show next content when click next button
  $('.btn-next').click(function () {
    $('.btn-back').show();
    activeNextElement('.step-content');
    activeNextElement('.step-link');
    $('.form-header .btn-back').css('opacity', 1);
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
    $('.plans.active').fadeOut('300');
    $('.plans').toggleClass('active');
    $('.plans.active').fadeIn('300');
  });

  // Select plan when click plan items
  $('.plan').click(function () {
    // Get Plan value when click plan
    let planValue = $('input[name="plan"]:checked').val();

    $(this).find('input').prop('checked', true);
    $('.plan.active').removeClass('active');
    $(this).addClass('active');
    let parent = $(this).closest('.step-content');
    parent.find('.btn-next').removeClass('disabled');
  });

  // Add active class when click selectpicker
  $('.selectpicker').on('changed.bs.select', function() {
    $(this).closest('.bootstrap-select').addClass('active');
  });
  $('.selectpicker').on('rendered.bs.select', function() {
    let delay = $(this).data('wow-delay');
    let parent = $(this).closest('.bootstrap-select');
    parent.attr('data-wow-delay', delay);
    parent.addClass('wow fadeInLeft');
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
      style: style
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

  // Form Validation
  $('form').validate({
    rules: {
      birthday: {
        dateISO: true
      },
      phonenumber: {
        phoneUS: true
      }
    }
  });
});