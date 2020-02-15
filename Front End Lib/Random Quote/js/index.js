// Global variables
let quoteLists = []

const colors = ['211, 47, 47', '173, 20, 87', '213, 0, 0', '74, 20, 140', '10, 0, 182', '49, 27, 146', '26, 35, 126', '25, 118, 210',
  '21, 101, 192', '2, 119, 189', '0, 96, 100', '0, 105, 92', '0, 77, 64', '46, 125, 50', '51, 105, 30', '188, 81, 0', '196, 62, 0', '221, 44, 0',
  '141, 110, 99', '62, 39, 35', '97, 97, 97', '69, 90, 100'
]

function getQuotes() {
  return $.ajax({
    url: 'https://raw.githubusercontent.com/wonyk/random-quote-generator/master/quotes.json',
    dataType: 'json',
    method: 'GET'
  })
}

function randomNum() {
  return Math.floor(Math.random() * 60)
}

function colorNum() {
  var num = Math.floor(Math.random() * colors.length)
  return colors[num]
}

function getNewQuote() {
  var num = randomNum()
  sentence = quoteLists[num].sentence
  author = quoteLists[num].author
  $('#text').html(sentence + "&rdquo;");
  $('#author').text('- ' + author);
  var uri = encodeURI('https://twitter.com/intent/tweet?text=' + sentence + '&hashtags=' + author)
  $('.twitterLink').attr('href', uri)
}

function getNewColour() {
  var randomColour = colorNum()
  $(':root').css('--background-color', 'rgba(' + randomColour + ',1)');
  $(':root').css('--hover', 'rgba(' + randomColour + ',0.85)');
}

// Main function
$(function () {
  $.when(getQuotes())
    .done(function (data) {
      quoteLists = data.quotes
      getNewQuote()
    }).fail(function (error) {
      console.log(error)
      $('#text').text("Sorry! Something went wrong, please try again.&rdquo;");
      $('#author').text('- Me');
    })

  $('#new-quote').click(function () {
    getNewQuote()
    getNewColour()
  });
})