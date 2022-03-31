video="";
  status=""
 objects=[];
function preload()
{
    video=createVideo("mv4.mp4")
    video.hide()
}

function setup()
{
    canvas=createCanvas(600,250)
    canvas.position(600,350)
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="status:detecting objects"
}

function modelLoaded()
{
    console.log("model is loaded")
    status=true
    video.loop()
    video.speed(1)
    video.volume(1)
}

function draw()
{
    image(video,0,0,480,480)
    if(status!="")
    {
        objectDetector.detect(video,gotResult)
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="status:objects detected"
            document.getElementById("number_of_objects").innerHTML="number of objects"+objects.length;
            fill("white")
            persent=floor(objects[i].confidence*100)
            text(objects[i].label+" "+persent+"%",objects[i].x+15,objects[i].y+15)
            noFill()
            stroke("white")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}

function gotResult(error,result)
{
 if(error)
 {
     console.error(error)
 }
 else
 {
     console.log(result)
     objects=result;
 }
}