// ANIMACAO INPUT RANGE ASSOCIANDO A MUDANÇA AO CSS = hue-color

function inicia(){
  animainicia = setInterval(function() {
    var slider = $('#shade').val(function(i, val) {
      document.documentElement.style.setProperty('--hue-color', val);
       return +val + 1;     
    });
  }, 100);
}

// Starta animação do input range

inicia();

// Stop animação do input range

function pararanimacao(){
  clearInterval(animainicia);
}
document.getElementById("shade").addEventListener("click", pararanimacao);

// PICK COR VARIAVEL HSL

let slider = document.querySelector('#shade');
slider.value = 0;
slider.addEventListener('input', function(){
  document.documentElement.style.setProperty('--hue-color', this.value);
});

// adiciona script fundo LINES no desktop = retira do mobile
$(function(){
  if($('body').width() > 400) { $('head').append('<script src="./assets/js/linhas.js" id="remove_me_on_mobile"><\/script>'); }
});

// Alteram para o Dark Theme
$(".switch").on("click", () => {
    $(".switch").toggleClass("switch-on");
    $(".texto-light").toggleClass("texto-dark");
    $(".cor").toggleClass("cor-dark");
    $(".cartao").toggleClass("cartao-dark");
    $(".cartaodentro").toggleClass("cartaodentro-dark");
    $(".theme-switch").toggleClass("theme-switch-on");
    $(".fundowhite").toggleClass("fundodark");
    $(".head").toggleClass("head-dark");
    $(".janela").toggleClass("janela-dark");
    $(".frame").toggleClass("frame-on");
    $(".sobrepoe").toggleClass("sobrepoe-dark");
    $(".cartaodentro").toggleClass("cartaodentro-on");
    $(".teste").toggleClass("teste-on");
    $(".ctinput").toggleClass("ctinput-dark");
    $("canvas").toggleClass("canvas-on");
});

// janelas
$('.modal-sobremim').on('click', function () {
  $('#sobremim').addClass('mostrar');
  $('#sobremim-secao').addClass('mostrar');
  $('#habilidades').removeClass('mostrar');
  $('#habilidades-secao').removeClass('mostrar');
  $('#servicos').removeClass('mostrar');
  $('#servicos-secao').removeClass('mostrar');
  $('#portfolio').removeClass('mostrar');
  $('#portfolio-secao').removeClass('mostrar');
  $('#contato').removeClass('mostrar');
  $('#contato-secao').removeClass('mostrar');
});
$('.modal-habilidades').on('click', function () {
  $('#habilidades').addClass('mostrar');
  $('#habilidades-secao').addClass('mostrar');
  $('#sobremim').removeClass('mostrar');
  $('#sobremim-secao').removeClass('mostrar');
  $('#servicos').removeClass('mostrar');
  $('#servicos-secao').removeClass('mostrar');
  $('#portfolio').removeClass('mostrar');
  $('#portfolio-secao').removeClass('mostrar');
  $('#contato').removeClass('mostrar');
  $('#contato-secao').removeClass('mostrar');
});
$('.modal-servicos').on('click', function () {
  $('#servicos').addClass('mostrar');
  $('#servicos-secao').addClass('mostrar');
  $('#sobremim').removeClass('mostrar');
  $('#sobremim-secao').removeClass('mostrar');
  $('#habilidades').removeClass('mostrar');
  $('#habilidades-secao').removeClass('mostrar');
  $('#portfolio').removeClass('mostrar');
  $('#portfolio-secao').removeClass('mostrar');
  $('#contato').removeClass('mostrar');
  $('#contato-secao').removeClass('mostrar');
});
$('.modal-portfolio').on('click', function () {
  $('#portfolio').addClass('mostrar');
  $('#portfolio-secao').addClass('mostrar');
  $('#sobremim').removeClass('mostrar');
  $('#sobremim-secao').removeClass('mostrar');
  $('#habilidades').removeClass('mostrar');
  $('#habilidades-secao').removeClass('mostrar');
  $('#servicos').removeClass('mostrar');
  $('#servicos-secao').removeClass('mostrar');
  $('#contato').removeClass('mostrar');
  $('#contato-secao').removeClass('mostrar');
});
$('.modal-contato').on('click', function () {
  $('#contato').addClass('mostrar');
  $('#contato-secao').addClass('mostrar');
  $('#sobremim').removeClass('mostrar');
  $('#sobremim-secao').removeClass('mostrar');
  $('#habilidades').removeClass('mostrar');
  $('#habilidades-secao').removeClass('mostrar');
  $('#servicos').removeClass('mostrar');
  $('#servicos-secao').removeClass('mostrar');
  $('#portfolio').removeClass('mostrar');
  $('#portfolio-secao').removeClass('mostrar');
});


// Fecha todas
$('.btn-fechar').on('click', function () {
  $('#sobremim, #sobremim-secao, #habilidade, #habilidades-secao, #servicos, #servicos-secao, #portfolio, #portfolio-secao, #contato, #contato-secao').removeClass('mostrar');
});


// Sobre mim
$('.trigger-formacao').on('click', function () {
  $(this).toggleClass("ativa-bt");
  $('#formacao').toggleClass('cresce');
});
$('.trigger-xp').on('click', function () {
  $(this).toggleClass("ativa-bt");
  $('#experiencia').toggleClass('cresce');
});


// Habilidades
$('.trigger-linguagens').on('click', function () {
  $(this).toggleClass("ativa-bt");
  $('#linguagens').toggleClass('esconder');
});
$('.trigger-softwares').on('click', function () {
  $(this).toggleClass("ativa-bt");
  $('#softwares').toggleClass('esconder');
});
$('.trigger-design').on('click', function () {
  $(this).toggleClass("ativa-bt");
  $('#design').toggleClass('esconder');
});

//trigger servicos box
$('.boxserv').click(function() {
  $(this).toggleClass('selected');  
});

// portfolio
jQuery(function(){
  jQuery('.showSingle').click(function(){
        jQuery('.targetDiv').hide(500);
        jQuery('#div'+ $(this).attr('target')).show(500);
  });
});

//Relogio
function updateClock() {
  var currentTime = new Date();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();
  var shortDays = [
      'Dom',
      'Seg',
      'Ter',
      'Qua',
      'Qui',
      'Sex',
      'Sab'
];
  var longDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
  var months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];  
  d = new Date();
  m = d.getMonth();
  month = (months[m]);
  date = d.getDate();
  year = d.getFullYear();
  x = d.getDay();   
  var day = (shortDays[x]);
  var longDay = (longDays[x]);  
  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
  currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;  
  // "AM" or "PM"
  var timeOfDay = (currentHours < 12) ? "AM" : "PM";  
  // Converte horas em 12/12
  currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;  
  // Converte hora de "0" a "12"
  currentHours = (currentHours === 0) ? 12 : currentHours;  
  // Composição da string
  var currentTimeString = day + " " + currentHours + ":" + currentMinutes + " " + timeOfDay;
  var longTimeString = longDay + ", " + month + " " + date + ", " + year;
  $("#clock").html(currentTimeString);
  $("#date").html(longTimeString);  
}
// Relogio
$(document).ready(function() {
  updateClock();
  setInterval('updateClock()', 10000);
});
// Click = Jump Dock
$("footer div").click(function() {
  $(this).removeClass("jump");
  this.offsetWidth = this.offsetWidth;
  $(this).addClass("jump");
});
