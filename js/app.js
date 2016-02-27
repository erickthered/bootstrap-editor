function randomNumber() {
    Math.floor(Math.random() * (1000000) + 1);
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
        $(this).attr('contenteditable', true);
    });

    $('#content .editable').blur(function(event) {
        $(this).attr('contenteditable', false);
    });
}

function handleEvents() {
    var elements = $('#content .remove');
    $.each(elements, function(i, e) {
        if (elements[i].getAttribute('configured') != 1) {
            elements[i].addEventListener('click', function() {
                var parent = elements[i].parentElement;
                parent.parentElement.removeChild(parent);
            });
            elements[i].setAttribute('configured', 1);
        }
    });
}

function handleUpdates() {
    handleCarousels();
    handleEditables();
    handleModals();
    handleEvents();
}

function updatePreview() {
    $('#preview').html($('#editor').html());
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
			handleUpdates();
		}
    });

    $( "ul, li" ).disableSelection();

    $("#btn-preview").click(function() {
        $('#content').hide('slow', function() {
            updatePreview();
            $('#preview').show('slow');
            $('#btn-edit').parent().removeClass('active');
            $('#btn-preview').parent().addClass('active');
        });
    });

    $("#btn-edit").click(function() {
        $('#preview').hide('slow', function() {
            $('#btn-preview').parent().removeClass('active');
            $('#btn-edit').parent().addClass('active');
            $('#content').show('slow');
        });
    });
});