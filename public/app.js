var word = '';
var recognizing = false;

$(window).keypress(function(e) {
  if (e.keyCode == 0 || e.keyCode == 32) {
    startListen(event);
  }
});

window.onload = function (event) {
  startListen(event);
}

var recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = true;
recognition.onstart = function() {
  recognizing = true;
};

var startListen = function (event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  word = '';
  recognition.lang = 'English';
  recognition.start();
}

recognition.onend = function() {
  recognizing = false;
};

recognition.onresult = function(event) {
  var interim_transcript = '';
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      word += event.results[i][0].transcript;
      $.post('/', {"message":word});
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }
};

