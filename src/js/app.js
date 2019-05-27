// humberger style  
  $(".js-hamburger").click(function(){
    $("body").toggleClass("mini");
    $(".hamburger-toggle").toggleClass("is-opened");
  });

  $(window).scroll(function () {
    if  ( ($(document).height() - $(window).height()) - $(window).scrollTop() < 30 ){
       $( ".customizer" ).addClass( "bottom" );
    }else{
      $( ".customizer" ).removeClass( "bottom" );
    }  
 });