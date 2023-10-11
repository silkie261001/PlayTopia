var $messages = $('.messages-content');
var serverResponse = "wala";


var suggession;
//speech reco
try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
}

$('#start-record-btn').on('click', function(e) {
  recognition.start();
});

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
 document.getElementById("MSG").value= speechToText;
  //console.log(speechToText)
  insertMessage()
}


function listendom(no){
  console.log(no)
  //console.log(document.getElementById(no))
document.getElementById("MSG").value= no.innerHTML;
  insertMessage();
}

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    
    displayInitialConvo();
  }, 100);

});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}



function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  fetchmsg() 
  
  $('.message-input').val(null);
  updateScrollbar();

}

document.getElementById("mymsg").onsubmit = (e)=>{
  e.preventDefault() 
  insertMessage();  // User's message is getting acknowledged
  // serverMessage("hello"); // Bot's reply
  // speechSynthesis.speak( new SpeechSynthesisUtterance("hello")) // text to speech

}

function serverMessage(response2) {


  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="css/bot.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
  

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="css/bot.png" /></figure>' + response2 + '</div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
  }, 100 + (Math.random() * 20) * 100);

}


function fetchmsg(){

     var url = 'http://localhost:5000/send-msg';
      
      const data = new URLSearchParams();
      for (const pair of new FormData(document.getElementById("mymsg"))) {
          data.append(pair[0], pair[1]);
          console.log(pair)
      }
    
      console.log("abc",data)
        fetch(url, {
          method: 'POST',
          body:data
        }).then(res => res.json())
         .then(response => {
          
          if(response.Intent=="suggest song's"||response.Intent=="search songs"){
            serverMessage(response.Reply) //this display's the spotify controls as message
            setTimeout(()=>{
              serverSpotify(response);
            },1500)
           
          }
          else{
            serverMessage(response.Reply); //this only display's the message
          }
          speechSynthesis.speak( new SpeechSynthesisUtterance(response.Reply))
        
          
         })
          .catch(error => console.error('Error h:', error));

}


function displayInitialConvo(){ //function that display's initial conversation
  //earlier method multiple message couldn't be displayed due to random timeout's
  setTimeout(function() {
    $('<div class="message new"><figure class="avatar"><img src="css/bot.png" /></figure>' + "hello i am customer support bot type hi and i will show you quick buttions" + '</div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
  }, 100);
  setTimeout(()=>{
    $('<div class="message new"><figure class="avatar"><img src="css/bot.png" /></figure>' + "I can suggest you song based on genre" + '</div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
  },500)
  setTimeout(()=>{
    $('<div class="message new"><figure class="avatar"><img src="css/bot.png" /></figure>' + "if you have a search query type search:<query>" + '</div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
    $('<div class="message new"><figure class="avatar"><img src="css/bot.png" /></figure>' + 'eg: search cupid from kpop' + '</div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
  },1000)
}


function serverSpotify(reply){ //this method create's the three spotify controller's
  
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="css/bot.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
  

  setTimeout(function() {
    $('.message.loading').remove();
    let content="";
    
    for(let i=0;i<3;i++){
      content+=generateEmbed(
        reply.uri[i] //reply.uri is a array containing the uri for iframe integration of track's
      );
    }
    $(`<div class="new message">${reply.Reply}</div>`)
    $(`<div class="new message spotify-holder">${content}</div>`).appendTo($('.mCSB_container')).addClass('new');
    
    updateScrollbar();
  }, 100 + (Math.random() * 20) * 100);

}

function generateEmbed(id){//create's the iframe that embed's the spotify
  return `<iframe frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" height="100%" src="https://open.spotify.com/embed/track/${id}"></iframe>`
}


