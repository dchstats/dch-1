$(document).ready(begin());

function begin() {
    $(".section").hide();
}


function openSection(section) {
    $(".section").hide();
    var k = "#" + section;
    console.log(k);
    $(k).slideDown();
}