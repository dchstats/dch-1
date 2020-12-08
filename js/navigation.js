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




// document.querySelector('#trend-tab').addEventListener('click', animBar3);
function animBar() {
    k = document.querySelector('.invisible');
    if (k) {
        k.classList.remove('invisible');
        setTimeout(animBar, 1);
    }
}

function animBar2() {
    for (i = 0; i < 48; i++) {
        for (j = 0; j < 5; j++) {
            let k = `.invisible:eq(${j * 48 + i})`
            let l = $(k);
            l.removeClass('invisible')
            console.log(l);
        }

    }
}

function animBar3() {
    $('.mctrend').css({ 'width': 0 })

    $('.mctrend').animate({ width: '100%' }, "slow", "linear")
}
////////////////////// vanila navigation

// document.querySelector('.menu-icon').addEventListener('click', () => {
//     document.querySelector('.small-menu').classList.toggle('hide');
// })






