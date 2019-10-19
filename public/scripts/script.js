$(document).ready(function () {
	
	$(".nav-link__item").click(function(){

		let title = $(this).text();

		$(".title").html(title);

		$(".hidden").css("display","block");
		$.ajax({
			url: "/users",
			type: "GET",
			dataType: "application/json",
			success:     (result) => {
				console.log(result)
				$('#output').empty();
				var content = '<table><tr><th>Nr</tb><th>Username</th><th>Group</th>';
				$.each(result, (index, value) => {
					console.log(value)
				  content += '' +
				  '<tr>' +
				  '<td>' + value.id + '</td>' +
				  '<td>' + value.username + '</td>' +
				  '<td>' + value.group + '</td>' +
				  '<td><button class="make-admin" data-user="' + value.username + '">Set admin</button></td>';
				});
				content += '</table>';
				$('#output').html(content);
			  },
			  error: (err) => {
				console.log(err);
			  }
		});
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
        cache: false,
        timeout: 1000,
        success: function(data) {
        	console.log(data);
        	$("#customers").html("<p>" + JSON.stringify(data )+ "</p>");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});
