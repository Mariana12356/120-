function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded)
}

function draw() {
image(video, 0, 0, 300, 300)
classifier.classify(video, gotResult)
}

function modelLoaded() {
  console.log("modelLoaded")
}
var previousResult = ""
function gotResult(error, results) {
  if(error) {
      console.error(error)
  }
  else{
    console.log(results)
    if((results[0].confidence > 0.5) && (previousResult != results[0].label)){
      previousResult = results[0].label
      var synth = window.speechSynthesis;       
      speakData = 'O objeto detectado é - '+results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speakData);
     synth.speak(utterThis);       
     document.getElementById("result").innerHTML = results[0].label;
     document.getElementById("precisao").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}