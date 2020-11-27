$(document).ready(begin());

function begin() {
    $(".section").hide();
    openSection('live');
}







function openSection(section) {
    $(".section").hide();
    var k = "#" + section + "-sec";
    $(k).slideDown(50);
    $('.section-selector .tab').removeClass('active-tab');
    $('#' + section + "-tab").addClass('active-tab');
}


document.querySelector('#trend-tab').addEventListener('click', animBar);
function animBar() {
    k = document.querySelector('.invisible');
    if (k) {
        k.classList.toggle('invisible');
        setTimeout(animBar, 1);
    }
}
////////////////////// vanila navigation

// document.querySelector('.menu-icon').addEventListener('click', () => {
//     document.querySelector('.small-menu').classList.toggle('hide');
// })






