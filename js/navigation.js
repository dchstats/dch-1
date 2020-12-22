$(document).ready(begin());

function begin() {
    $(".section").hide();

}

function pageLoad() {
   
    $('.splash').hide();
    openSection('live');
}


function flipBack(x) {
    let mach = x.closest('.mach');
    let ms = document.querySelectorAll('.mach');
    ms.forEach(x => {
        x.classList.remove('flip');
    })
    mach.classList.add('flip');
}

function flipFront(x) {
    let mach = x.closest('.mach');
    mach.classList.remove('flip');
}



function openSection(section) {
    $(".section").hide();
    var k = "#" + section + "-sec";
    $(k).slideDown(50);
    $('.section-selector .tab').removeClass('active-tab');
    $('#' + section + "-tab").addClass('active-tab');
}

// $('.mctrend .a').css({ 'background': 'yellow' });





// document.querySelector('#trend-tab').addEventListener('click', animBar3);


// function animBar3() {
//     $('.mctrend').css({ 'width': 0 })

//     $('.mctrend').animate({ width: '100%' }, "slow", "linear")
// }
////////////////////// vanila navigation

// document.querySelector('.menu-icon').addEventListener('click', () => {
//     document.querySelector('.small-menu').classList.toggle('hide');
// })






