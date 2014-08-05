var depthShadow = [ '0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0.0)',
					'0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26)',
					'0 6px 20px 0 rgba(0, 0, 0, 0.19), 0 8px 17px 0 rgba(0, 0, 0, 0.2)',
					'0 17px 50px 0 rgba(0, 0, 0, 0.19), 0 12px 15px 0 rgba(0, 0, 0, 0.24)',
					'0 25px 55px 0 rgba(0, 0, 0, 0.21), 0 16px 28px 0 rgba(0, 0, 0, 0.22)',
					'0 40px 77px 0 rgba(0, 0, 0, 0.22), 0 27px 24px 0 rgba(0, 0, 0, 0.2)' ];

var center = function() {
	console.log(0);
	$('.paper-column').each(function() {
		var size = $(this).attr('content-size');
		if (size === undefined) return;

		$(this).children('.paper, .paper-column').each(function() {
			$(this).css({ 'width': size, 'position': 'relative', 'left': '50%' });
			var padding = parseInt($(this).css('padding-left')) + parseInt($(this).css('padding-right'));
			$(this).css({ 'width': '-=' + padding + 'px' });
			var totalWidth = parseInt($(this).css('width')) + padding;
			if ($(this).hasClass('paper') || $(this).hasClass('left')) {
				$(this).css('margin-left', -0.5 * totalWidth);
			} else if ($(this).hasClass('right')) {
				$(this).css('margin-right', -0.5 * totalWidth);
			}
		});

		$(this).children('.paper-column.half').each(function() {
			var paperWidth = parseInt($(this).width());
			$(this).css({ 'width': 0.5 * paperWidth, 'position': 'relative', 'left': '50%' });
		});
	});
}

var circling = function() {
	$('.circle').each(function() {
		var width = $(this).width();
		$(this).css({ 'border-radius': width, 'height': width });
	});
}

$(document).ready(function(){
	center();
	circling();
	$(window).resize(function() {
		center();
		circling();
	});

	//  adding depth shadow
	$('*').each(function() {
		if ($(this).attr('z-depth') === undefined) return;
		$(this).addClass('depth' + $(this).attr('z-depth'));
		// var intensity = parseInt($(this).attr('z-depth')) + 1 + '00'

		// color
		// $(this).css('background-color', colors['blue-' + intensity]);
	});

	// .hover-float floating effect
	$('.hover-float').each(function() {
		$(this).hover(function() {
			var depth = parseInt($(this).attr('z-depth'));
			if (depth == 5) return;
			$(this).animate({ boxShadow: depthShadow[depth + 1], scale: 1.1 }, 250, 'swing', function() {
				$(this).removeClass('depth' + depth);
				$(this).addClass('depth' + (depth + 1));
			});
		}, function() {
			var depth = parseInt($(this).attr('z-depth'));
			if (depth == 5) return;
			$(this).animate({ boxShadow: depthShadow[depth], scale: 1 }, 250, 'swing', function() {
				$(this).removeClass('depth' + (depth + 1));
				$(this).addClass('depth' + depth);
			});
		});
	});

	// .click-float floating effect
	$('.click-float').each(function() {
		var depth = parseInt($(this).attr('z-depth'));

		$(this).click(function() {
			if ($(this).hasClass('depth' + depth)) {
				$(this).animate({ boxShadow: depthShadow[depth + 1], scale: 1.02 }, 250, 'swing', function() {
					$(this).removeClass('depth' + depth);
					$(this).addClass('depth' + (depth + 1));
				});
			} else {
				$(this).animate({ boxShadow: depthShadow[depth], scale: 1 }, 250, 'swing', function() {
					$(this).removeClass('depth' + (depth + 1));
					$(this).addClass('depth' + depth);
				});
			}
		});
	});

	// standardizes tabsize
	var maxWidth = -1;
	$('nav ul li').each(function() {
		if (maxWidth < $(this).width())
			maxWidth = $(this).width();
	});

	$('nav ul li').each(function() {
		$(this).width(maxWidth);
	});


});


















































