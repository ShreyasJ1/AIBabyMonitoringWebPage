img = "";
status = "";
objects = [];
video = "";


function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
    
}

function preload() {
    alarm = loadSound("Alarm.mp3")
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            alarm.stop();
            document.getElementById("status").innerHTML = "Status - Initialized";
            document.getElementById("babychecker").innerHTML = "Baby Found";
            fill("black");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label != "person") {
                document.getElementById("babychecker").innerHTML = "Baby Not Found";
                alarm.play();
                alarm.loop();
            }
        }
    }
}

function modelLoaded() {
    console.log("CocoSSD is initialized");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;

    }
}

