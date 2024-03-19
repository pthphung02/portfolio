;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#skills').length > 0 ) {
			$('#skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".loader").fadeOut("slow");
	};

	var anchorLink = function() {
		$('a[href^="#"]').on('click', function(event) {
			var target = $(this.getAttribute('href'));
			if( target.length ) {
				event.preventDefault();
				$('html, body').stop().animate({
					scrollTop: target.offset().top
				}, 1000);
			}
			if($('.menu-trigger').hasClass('active')){
				$('.menu-trigger').trigger('click')
			}
		});
	};

	var activeNav = function(){
		$(window).on('scroll', function() {
			var scrollPos = $(window).scrollTop();
			$('.section').each(function() {
				var currLink = $(this);
				var refElement = $(currLink).attr("id");
				if ((currLink.position().top-10)  <= scrollPos && currLink.position().top + currLink.height() > scrollPos) {
					$('#navbar span').removeClass("active");
					$('#navbar a[href="#'+refElement+'"] span').addClass("active");
				}
			});
		});
	}
	var sendMail = function(){
		$('#form-contact').submit(function(e) {
			// alert(0)
			e.preventDefault(); // Prevent the form from submitting normally
			
			// Serialize the form data
			var formData = $(this).serialize();
			
			// Send the form data using AJAX
			$.ajax({
				type: 'POST',
				url: '/submit', // Replace this with the URL of your server-side endpoint
				data: formData,
				success: function(response) {
					$('#alert').html(response);
					$('#alert').fadeIn();
					setTimeout(() => {
						$('#alert').fadeOut();
					}, 3000);// Show the success alert
                	$('#form-contact')[0].reset(); 
				},
				error: function(xhr, status, error) {
					console.error('Error:', error); // Log any errors to the console
				}
			});
		});
	
	}

	var toggleNav = function(){
		$('.menu-trigger').click(function(e) {
			e.preventDefault();
			// let $el = $('.menu-trigger');
			if($('.menu-trigger').hasClass('active')) {
				$('#navbar ul').removeClass('active');
				$('.menu-trigger').removeClass('active');
			} else {
				$('#navbar ul').addClass('active');
				$('.menu-trigger').addClass('active');
			}
			// $(this).toggleClass('active');
			// $('#navbar ul').toggleClass('show');
		});
	}
	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		skillsWayPoint();
		anchorLink();
		activeNav();
		sendMail();
		toggleNav();
	});


}());