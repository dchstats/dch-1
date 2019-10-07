$(document).ready(begin());

function begin() {
    $(".head").addClass("w3-teal").addClass("w3-border-0");
    $(".unit").addClass("w3-teal").addClass("w3-small")
    $(".section").hide();
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



