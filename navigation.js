$(document).ready(begin());

function begin() {
    $(".section").hide();
    openSection('report');

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

function shiftSelector(t) {
    var k = '.shift-selector .tab:nth-child(' + t + ')';
    $('.shift-selector .tab').removeClass('w3-red');
    $(k).addClass('w3-red');
}

