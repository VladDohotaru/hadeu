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
        url: '/api/activitati',
		dataType: "json",
		type: "GET",
        cache: false,
        timeout: 1000,
        data: { get_param: 'value' },
        success: function(data) {
<<<<<<< HEAD

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
=======
        	console.log('AJUNGE?', data);
        	$("#customers").html("<p>" + JSON.stringify(data )+ "</p>");
        },
>>>>>>> 53f4983b055d5961442bd7d3f4b4d01fe6b8a7ac
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});
