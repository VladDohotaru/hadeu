$('#getUsers').click(function () {
	console.log('CLICK')
	// let title = $(this).text();

	// $(".title").html(title);

	// $(".hidden").css("display","block");
	$.ajax({
		url: "/api/users",
		type: "GET",
		success:     function (response) {
			console.log('RESULT', response)
			$('#users').empty();
			var content = '<tr><th>id</th><th>Username</th><th>Tip</th>';
			for(var i = 0; i < response.count; i++) {
				content += '' +
				'<tr>' +
				'<td>' + response.rows[i].id + '</td>' +
				'<td>' + response.rows[i].username + '</td>' +
				'<td>' + response.rows[i].type + '</td>';
			}
			
			
			$('#users').html(content);
		},
		error: function (err) {
			console.log('ERR', err);
		}
	});
});

