// This is script for homepage 
$(document).ready(function() {
  // Init Animation
  new WOW().init({offset: 300});
  // Scroll to Animation
  $('.main-header .nav-link').on('click', function() {
    var sectionTo = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(sectionTo).offset().top
    }, 1500);
  });
  // Add sticky class when scroll
  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
      $(".main-header").addClass("sticky");
    } else {
      $('.main-header').removeClass('sticky');
    }
  }); 
  function playVideo(targetNum) {
    let popup = $('#video_popup');
     popup.css({'opacity' : '0', 'display' : 'flex'}).animate({
      opacity: 1
    }, 300);
    let targetVideoId = '#video_' + targetNum;
    $('#popup_video_slider').slick({
      dots: false,
      arrows: false,
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: parseInt(targetNum),
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: false
          }
        }
      ]
    });
    setTimeout(() => {
      $(targetVideoId)[0].play();
    }, 1500);
  }
  $('.main-video-slider-wrapper .btn-play').click(function() {
    let activeSlider = $('.main-video-sliders .slick-active');
    let targetElement = activeSlider.find('.video-slider');
    let targetNum = $(targetElement).data('target');
    playVideo(targetNum);
  });
  $('#mobile_review_slider .btn-play').click(function() {
    let targetNum = $(this).data('target');
    playVideo(targetNum);
  });
  $('#popup_video_slider').on('beforeChange', function() {
    $('.slick-current video')[0].pause();
  });
  // Popup Close Button
  $('#video_popup .btn-close').click(function() {
    $('#video_popup').fadeOut('300');
    $('.slick-current video')[0].pause();
  });
  // Slider Custom Arrow Buttons
  $('#video_popup .btn-prev').click(function() {
    $('#popup_video_slider').slick('slickPrev');
  });
  $('#video_popup .btn-next').click(function() {
    $('#popup_video_slider').slick('slickNext');
  });
  // Mobile slider for review 
  $('#mobile_review_slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  });
  // Mobile Curriculum Slider
  $('#mobile_curriculum_slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  });
  // auto play videos
  // Change header when click toggle button
  $('.btn-navbar-collapse').click(function() {
    $(this).closest('nav').toggleClass('open');
  });
  // Desktop client text slider
  $('.client-review-slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    draggable: false
  });
  // Main Client text slider
  $('.main-video-sliders').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    draggable: false,
    asNavFor: '.client-review-slider', 
  });
  // Secondary video
  $('.secondary-video-sliders').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 1,
    draggable: false
  });
  $('#reviews .btn-prev').click(function() {
    $('.secondary-video-sliders').slick('slickPrev');
    $('.main-video-sliders').slick('slickPrev');
  });
  $('#reviews .btn-next').click(function() {
    $('.secondary-video-sliders').slick('slickNext');
    $('.main-video-sliders').slick('slickNext');
  });
  $('.btn-collapse-content').click(function() {
    let parent = $(this).closest('.plan-content');
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $(parent).find('.plan-detail').fadeIn(300);
      $(this).find('.text').text('Hide Details');
    }
    else {
      $(parent).find('.plan-detail').fadeOut(300);
      $(this).find('.text').text('Show Details');
    } 
  });
  $('.faq-item').each(function(index) {
    if (index < 4) {
      $(this).addClass('show');
    }
  })
  $('#faq .btn-see-all').click(function() {
    $(this).toggleClass('show');
    if ($(this).hasClass('show')) {
      $('.faq-item').addClass('show');
      $(this).html('Show Less');
    } else {
      $('.faq-item').each(function(index) {
        if (index >= 4)
          $(this).removeClass('show');
      });
      $(this).html('Show All');
    }
  });
});