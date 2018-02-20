/////////*STICKY HEADER*/////////
var stickyOffset = $('.sticky').offset().top;

$(window).scroll(function(){
	var sticky = $('.sticky'),
			scroll = $(window).scrollTop();

	if (scroll >= stickyOffset) sticky.addClass('fixed');
	else sticky.removeClass('fixed');
});

/*AVOID FLICKERING*/
//if(scroll >= stickyOffset) {
//    $(o.tofixedClass).addClass(o.fixedClass).css({"margin-top":o.top,"margin-bottom":o.bottom});
//} else {
//    $(o.tofixedClass).removeClass(o.fixedClass);
//}

//*SHOW or HIDE the scrollTop button*//
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
		document.getElementById("myBtn").style.display = "block";
	} else {
		document.getElementById("myBtn").style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

/////////*INDEX ONLY*/////////
if ($('#demo').html()){
	
	/// button hide/read
	$('#demo').on('show.bs.collapse', function () {
		$(".buttonHide").show();
		$(".buttonRead").hide();
	})
	$('#demo').on('hide.bs.collapse', function () {
		$(".buttonHide").hide();
		$(".buttonRead").show();
	})
};