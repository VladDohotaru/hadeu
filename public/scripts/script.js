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
        data: { get_param: 'value' },
        success: function(data) {

        	let content = "<tr><th>Tip</th><th>Format</th><th>Data de desfasurare</th><th>Localul</th><th>Numarul total de locuri</th><th>Numarul de locuri disponibile</th><th>Descriere</th><th>Audienta</th><th>Topic</th><th>Limba</th></tr>"
        	    $.each(data.rows, function(key, value){
        		content +=	"" + "<tr><th>" + value.tip + 
        				 	"</th><th>" + value.format +
        				 	"</th><th>" + value.dataDesfasurare + 
        				 	"</th><th>" + value.locatie + 
        				 	"</th><th>" + value.nrTotalLocuri + 
        				 	"</th><th>" + value.nrLocuriDisponibile + 
        				 	"</th><th>" + value.descriere + 
        				 	"</th><th>" + value.audienta + 
        				 	"</th><th>" + value.topic + 
        				 	"</th><th>" + value.limba + "</th></tr>"
        	    
        		$("#customers").html(content);
        	});
          },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});
