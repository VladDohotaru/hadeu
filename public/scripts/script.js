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
	$('.add_activity').click(function () {
		window.location.href = '/activitati/activitate_noua'
	});
	
    $.ajax({
        url: '/api/activitati',
		dataType: "json",
		type: "GET",
        cache: false,
        timeout: 1000,
        data: { get_param: 'value' },
        success: function(data) {
        	let content = "<tr><th>Id</th><th>Tip</th><th>Format</th><th>Data de desfasurare</th><th>Localul</th><th>Numarul total de locuri</th><th>Numarul de locuri disponibile</th><th>Descriere</th><th>Audienta</th><th>Topic</th><th>Limba</th><th>Modificare tabel</th></tr>"
        	    $.each(data.rows, function(key, value){
        		content +=	"" + "<tr><th id='activityId'>" + value.id + 
        					"</th><th>" + value.tip + 
        				 	"</th><th>" + value.format +
        				 	"</th><th>" + value.dataDesfasurare.split("T", 1) + 
        				 	"</th><th>" + value.locatie + 
        				 	"</th><th>" + value.nrTotalLocuri + 
        				 	"</th><th>" + value.nrLocuriDisponibile + 
        				 	"</th><th>" + value.descriere + 
        				 	"</th><th>" + value.audienta + 
        				 	"</th><th>" + value.topic + 
        				 	"</th><th>" + value.limba + "</th><th><button class='modify'>Editeaza</button><button id='delete' class='modify'>Sterge</button></th></tr>";
        	    
        		$("#customers").html(content);
        	});
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});

$(document).ready(function(){

	$(".sort_by").click(function(){
		let sorting = $("input[type=radio]").prop('checked');
		if (sorting){
			console.log($("#selection option").val());
		}
	});

});



