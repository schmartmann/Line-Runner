
"use strict"; $(function(){

  console.log("js here")

  var responsivevoice = $(".responsivevoice")

  responsivevoice.on("click", function(){
    var text = $(this).text()
    responsiveVoice.speak(text)
  });

});//bottom
