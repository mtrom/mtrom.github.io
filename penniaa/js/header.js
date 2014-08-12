$(window).load(function(){

	$('.loading').css({ display: 'none' });

	centering();
	circling();

	var bannerHeight = $('.banner-background img').innerHeight();
	var bannerWidth  = $('.banner-background img').innerWidth();

	// distance between bottom of navbar and text
	var navbarBottomMargin = 6;

	// height of navbar text
	var navListHeight = $('.banner-background .nav ul').height() ;

	// offset needed for blur to be positioned correctly
	var blurOffset = 43;

	// don't know why I have to do this
	$('.banner-background').height(bannerHeight);

	$(window).scroll(function() {
		if ($(window).scrollTop() < 0) {
			// display banner, not navbar
			$('.navbar-background').css({ display: 'none' });
			$('.banner-background > img').css({ display: 'initial' });
			$('.banner-background').css({ 'background-color': '' });
			
			// move image up at different rate as navbar/image
			$('.banner-logo img').height(bannerHeight);
			$('.banner-background > img').css({ 'margin-top': 0 });
			$('.banner-background .nav').css({ 'margin-top': 0 - navListHeight - navbarBottomMargin });
			$('.banner-background .nav-blur').css({ 'margin-top': 0 - navListHeight - navbarBottomMargin - blurOffset });

			// opacity of image
			$('.banner-background > img').css({ opacity: 1 });
			$('.banner-background .nav-blur').css({ opacity: 1 });
			
		} else if ($(window).scrollTop() < bannerHeight - 100) {
			// display banner, not navbar
			$('.navbar-background').css({ display: 'none' });
			$('.banner-background > img').css({ display: 'initial' });
			$('.banner-background').css({ 'background-color': '' });
			
			// move image up at different rate as navbar/image
			$('.banner-logo img').height(bannerHeight - $(window).scrollTop());
			$('.banner-background > img').css({ 'margin-top': 0.5 * $(window).scrollTop() });
			$('.banner-background .nav').css({ 'margin-top': -0.5 * $(window).scrollTop() - navListHeight - navbarBottomMargin });
			$('.banner-background .nav-blur').css({ 'margin-top': -0.5 * $(window).scrollTop() - navListHeight - navbarBottomMargin - blurOffset });

			// opacity of image
			$('.banner-background > img').css({ opacity: 1 - ($(window).scrollTop() / (bannerHeight - 75)) });
			$('.banner-background .nav-blur').css({ opacity: 1 - ($(window).scrollTop() / (bannerHeight - 75)) });

		} else if ($(window).scrollTop() < bannerHeight - 75) {
			// display banner, not navbar
			$('.navbar-background').css({ display: 'none' });
			$('.banner-background > img').css({ display: 'initial' });
			$('.banner-background').css({ 'background-color': '' });

			// still move banner, just not logo
			$('.banner-logo img').height(100);
			$('.banner-background > img').css({ 'margin-top': 0.5 * $(window).scrollTop() });
			$('.banner-background .nav').css({ 'margin-top': -0.5 * $(window).scrollTop() - navListHeight - navbarBottomMargin });
			$('.banner-background .nav-blur').css({ 'margin-top': -0.5 * $(window).scrollTop() - navListHeight - navbarBottomMargin - blurOffset });

			// opacity of image
			$('.banner-background > img').css({ opacity: 1 - ($(window).scrollTop() / (bannerHeight - 75)) });
			$('.banner-background .nav-blur').css({ opacity: 1 - ($(window).scrollTop() / (bannerHeight - 75)) });

		} else {
			// final height of stuff
			$('.banner-logo img').height(100);
			$('.navbar-background').height(75);

			// display navbar, not banner
			$('.navbar-background').css({ display: 'initial' });
			$('.banner-background > img').css({ display: 'none' });
			$('.banner-background').css({ 'background-color': 'transparent' });

			// make sure actual nav is in the right place
			$('.navbar-background .nav  ul#left').css({ position: 'fixed', left: '0'});
			$('.navbar-background .nav ul#right').css({ position: 'fixed', right: '0'});
		}

		$('.sidebar > ul > li').each(function() {
			var top = $('#' + $(this).attr('anchor')).offset().top - 100;
			var bottom = -1;
			if ($(this).next().attr('anchor') === undefined)
				bottom = $('.footer').offset().top - 100;
			else 
				bottom = $('#' + $(this).next().attr('anchor')).offset().top - 100;
			

			if ($(window).scrollTop() >= top && $(window).scrollTop() < bottom)
				$(this).css({ 'border-left': '5px solid #5B92E5' });
			else
				$(this).css({ 'border-left': '5px solid transparent' });

		});

		centering();

	});

	$(window).trigger('scroll');

	$(window).resize(function() {
		centering();
		circling();
	});

	// standardizes tabsize
	// var maxWidth = -1;
	// $('.nav ul li').each(function() {
	// 	if (maxWidth < $(this).width())
	// 		maxWidth = $(this).width();
	// });
	// $('.nav ul li').each(function() {
	// 	$(this).width(maxWidth);
	// });

	// not sure what this does...
	$('.navbar-background .nav ul').each(function() {
		// 75 because for some god damn reason it won't work any other way
		$(this).css({ top: 75 - navListHeight - navbarBottomMargin });
	});

	// vertical centering for portraits
	$('.portrait').each(function() {
		$(this).css('margin-top', 0.5 * ($(this).siblings('.bio').height() - $(this).height()));
	});

	$('.nav > ul > a > li').hover(function() {
		$(this).children('.nav-dropdown').css({ display: 'initial' });
	}, function() {
		$(this).children('.nav-dropdown').css({ display: 'none' });
	});

	// sidebar stuff
	$('.col-md-3').each(function() {
		$(this).height($(this).siblings('.col-md-6').height());
	});
	$('.sidebar').stick_in_parent({ offset_top: 100 });

	// sidebar
	$('.sidebar > ul > li').each(function() {
		var anchor = $(this).attr('anchor');
		$(this).click(function() {
			$('html, body').animate({
		        scrollTop: $('#' + anchor).offset().top - 100
		    }, 500);
		});
	});



});

var centering = function() {
	$('.center, .break').each(function() {
		var padding = parseInt($(this).css('padding-left')) + parseInt($(this).css('padding-right'));
		var totalWidth = parseInt($(this).css('width')) + padding;
		$(this).css({ 'left': '50%', 'margin-left': -0.5 * totalWidth })
	});
}

var circling = function() {
	$('.circle').each(function() {
		var width = $(this).width();
		$(this).css({ 'border-radius': width, 'height': width });
	});
}










