$(function() {
    $( "#content, #content .column" ).sortable({
		connectWith: '.column',
		opacity : 0.35//,
		//handle: ".drag"
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
				connectWith: '.column'
			});
		}
    });
    $( "ul, li" ).disableSelection();
});