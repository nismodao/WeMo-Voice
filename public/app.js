var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
$('#start').click(function (event) {
  startButton(event);
});

window.onload = function (event) {
  startButton(event);
}
function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = 'English';
  recognition.start();
  ignore_onend = false;
  start_timestamp = event.timeStamp;
}

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.onstart = function() {
    recognizing = true;
  };
  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
      } else {
      }
      ignore_onend = true;
    }
  };
  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
  };
  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        console.log(event.results[i].isFinal);
        final_transcript += event.results[i][0].transcript;
        console.log(final_transcript);
        $.post('/', {"message":final_transcript});
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
  };
}


