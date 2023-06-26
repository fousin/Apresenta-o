$(document).ready(function() {
    $('.carousel-imagens').carousel();
});

function toInicio() {
    $(window).scrollTop($('#inicio').position().top);
}

function toServicos() {
    $(window).scrollTop($('#servicos').position().top);
}

function toSobre() {
    $(window).scrollTop($('#sobre').position().top);
}

function toContato() {
    $(window).scrollTop($('#contato').position().top);
}

function toMapa() {
    $(window).scrollTop($('#mapa').position().top);
}