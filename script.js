window.onload = function () {
  var file = document.getElementById("fileupload");

  file.onchange = function () {
    var files = this.files;

    var audio1 = document.getElementById("audio1");
    audio1.src = URL.createObjectURL(files[0]);
    console.log(audio1.src, files[0]);
    audio1.load();
    audio1.play();

    var audioCtx = new AudioContext();
    var audioSource = audioCtx.createMediaElementSource(audio1);
    var analyser = audioCtx.createAnalyser();

    var canvas = document.getElementById("canvas1");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 64;
    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);
    var dataArray = new Uint8Array(bufferLength);
    var barWidth = (canvas.width / bufferLength) * 2.5;

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    let barHeight;
    let x = 0;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    function animate() {
      requestAnimationFrame(animate);
      x = 0;
      analyser.getByteFrequencyData(dataArray);
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var r = barHeight + 25 * (i / bufferLength);
        var g = 250 * (i / bufferLength);
        var b = 50;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    }
    animate();
  };
};
