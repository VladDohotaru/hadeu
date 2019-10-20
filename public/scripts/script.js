$(document).ready(function () {
	console.log('INTRA')
	
	$(".nav-link__item").click(function(){

		let title = $(this).text();

		$(".title").html(title);

		$(".hidden").css("display","block");
	});

	$(".hidden").click(function(){
		$(".hidden").css("display", "none");
	});

	$(".close_dialog_btn").click(function(){
		$(".hidden").css("display", "none");
	});
	

});

$(document).ready(function() {
    $.ajax({
        url: '/activitati',
		dataType: "json",
		type: "GET",
        cache: false,
        timeout: 1000,
        success: function(data) {
        	console.log('AJUNGE?', data);
        	$("#customers").html("<p>" + JSON.stringify(data )+ "</p>");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});
