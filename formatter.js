var exports = module.exports = {};

module.exports = {
  sayHelloInEnglish: function() {
    console.log("HELLO");
  },

  sayHelloInSpanish: function() {
    console.log("Hola");
  },

  lineBreakFormat: function(text){
    let splitText = text.split("\n")
    console.log(splitText)
  }

};
