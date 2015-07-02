function randomNumber() {
    Math.floor(Math.random() * (1000000) + 1);
}

function handleUpdates() {
    handleCarousels();
    handleEditables();
    handleModals();
}

function handleModals() {
	var elm = $('#content #modal');
	var btn = $('#content #btnModal');
	var random = randomNumber();
	var elmId = 'modal-' + random;

    elm.attr('id', elmId);
	btn.attr('data-target', '#' + elmId);
}

function handleCarousels() {
	var elm = $('#content #myCarousel');
	var random = randomNumber();
	var elmId = 'carousel-' + random;

	elm.attr('id', elmId);

	elm.find('.carousel-indicators li').each(function(current,element){
		$(element).attr('data-target', '#' + elmId);
	});

	elm.find('.left').attr('href','#' + elmId);
	elm.find('.right').attr('href','#' + elmId);
}

function handleEditables() {
    $('#content .editable').click(function(event) {
        event.target.prop('contenteditable', true);
    });
    $('#content .editable').blur(function(event) {
        $(event.target.id).prop('contenteditable', false);
    });
}

$(function() {
    $( "#content, #content .column" ).sortable({
		connectWith: '.column',
		opacity : 0.35,
		handle: ".drag"
    });
    
    $( ".draggable" ).draggable({
        connectToSortable: ".column",
        helper: "clone",
		drag: function(event, ui) {
			ui.helper.width('auto');
		},
		stop: function( event, ui ) {
			$('#content .column').sortable({ 
				opacity : 0.35,
				connectWith: '.column',
                handle: ".drag"
			});
			console.log(event.target.id);
			handleUpdates();
		}
    });

    $( "ul, li" ).disableSelection();
});