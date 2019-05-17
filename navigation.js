$(document).ready(begin());

function begin() {
    $(".section").hide();
    openSection('summary');

    $('.section-selector .tab').click(
        function () {
            $('.section-selector .tab').removeClass('w3-sand');
            $(this).addClass('w3-sand');
        }
    );
}


function openSection(section) {
    $(".section").hide();
    var k = "#" + section;

    $(k).slideDown(100);
}

