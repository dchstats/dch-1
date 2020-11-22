$(document).ready(begin());

function begin() {
    $(".section").hide();
    openSection('live-sec');
}


function openSection(section,tab) {
    $(".section").hide();
    var k = "#" + section;
    $(k).slideDown(50);
    $('.section-selector .tab').removeClass('active-tab');
    $('#' + tab).addClass('active-tab');
}


////////////////////// vanila navigation

// document.querySelector('.menu-icon').addEventListener('click', () => {
//     document.querySelector('.small-menu').classList.toggle('hide');
// })






