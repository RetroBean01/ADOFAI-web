// TO DO
//
// Camera Scaling Fix
// Add Playability
// add Midspins

// Planet Variables

let sIndex = 0;
let tIndex = 0;
let trIndex = 0;

let degree = 180;
let pivotTYPE = "tile";
let planetPivot = "fire";
let pvtIndex = 0;
let plaX = 200;
let plaY = 200;
let nFIX = 0;
let bpm = 0;
let bpmSpeed = 10;
let timeTrial = 1;
let tileTravel = 0;

// Camera Variables

let camX = 200;
let camY = 200;
let camScale = 200;
let camSpeed = 30;
let camTranslateX = 200;
let camTranslateY = 200;
let camTranslateS = 200;
let camOffsetX = 0;
let camOffsetY = 0;
let camOffsetS = 0;

// Tile Variables

let TDF = [];
let twirl = 1;
let angleData = [];
let twirlActions = [];
let setSpeedActions = [];
let actions = [];
let autoplay = false;

let overshoot = 0;

let finalFix = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  frameRate(60);

  //song = loadSound("none.ogg");
  
       fetch("siqlo.json")
  .then((response) => response.json())
  .then((data) => {
    actions = data.actions;
    angleData = data.angleData;
    bpm = data.settings.bpm;

    twirlActions = [];
    setSpeedActions = [];

    actions.forEach((action) => {
      switch (action.eventType) {
        case "Twirl":
          twirlActions.push(action);
          break;
        case "SetSpeed":
          setSpeedActions.push(action);
          break;
        default:
        //console.warn(`Ignoring unknown event type: ${action.eventType}`);
      }
    });

    //console.log("Twirl Actions:", twirlActions);
    //console.log("SetSpeed Actions:", setSpeedActions);
    //console.log("angleData:", angleData);
    //console.log("bpm:", bpm);
  })
  .catch((error) => console.error("Error loading JSON:", error));
  
  for (i = 0; i < 10; i++) {
   twirlActions.push(0)
  setSpeedActions.push(0) 
  }
  
  
}

function draw() {
  background("black");
  
  if (TDF.length !== 0) {
    
  } else {
    angleDataFIX();
  }
  
  let fps = Math.round(frameRate());
  
  renderTiles(200, 200, 65, 200);

  noStroke();
  renderPlanets(plaX, plaY, 50, 50, 50);

  judgeTick(0);

  setCam(
    camTranslateX - width / 2 + camOffsetX,
    camTranslateY - height / 2 + camOffsetY,
    camTranslateS + camOffsetS,
    1
  );
  //camOffset();

  camTranslateX += (plaX - camTranslateX) / (20 - bpm / 1000);
  camTranslateY += (plaY - camTranslateY) / (20 - bpm / 1000);
  camTranslateS += (200 - camTranslateS) / (20 - bpm / 1000);

  bpmSpeed = ((180 * (bpm / 60)) / frameRate()) * timeTrial;

  //displayText(fps);
}

document.onkeypress = function (e) {
  e = e || window.event;

  //startSong();
   
  if (false) {
    
  } else {
    tileHit(TDF[pvtIndex])
  }
  
};

function renderPlanets(xpos, ypos, radius, xScaling, yScaling) {
  if (pivotTYPE == "center") {
    fill("red"); //fire planet
    ellipse(
      xpos - camX + (cos(degree) * radius) / (camScale / 100),
      ypos - camY + (sin(degree * -1) * radius) / (camScale / 100),
      xScaling / (camScale / 100),
      yScaling / (camScale / 100)
    );

    fill("blue"); //ice planet
    ellipse(
      xpos - camX + (cos(degree) * (radius * 2)) / (camScale / 100),
      ypos - camY + (sin(degree * -1) * (radius * 2)) / (camScale / 100),
      xScaling / (camScale / 100),
      yScaling / (camScale / 100)
    );
  }

  if (pivotTYPE == "tile") {
    if (planetPivot == "ice") {
      fill("red"); //fire planet
      ellipse(
        xpos - camX + (cos(degree) * (radius * 2)) / (camScale / 100),
        ypos - camY + (sin(degree * -1) * (radius * 2)) / (camScale / 100),
        xScaling / (camScale / 100),
        yScaling / (camScale / 100)
      );

      fill("blue"); //ice planet
      ellipse(
        xpos - camX,
        ypos - camY,
        xScaling / (camScale / 100),
        yScaling / (camScale / 100)
      );
    }

    if (planetPivot == "fire") {
      fill("red"); //fire planet
      ellipse(
        xpos - camX,
        ypos - camY,
        xScaling / (camScale / 100),
        yScaling / (camScale / 100)
      );

      fill("blue"); //ice planet
      ellipse(
        xpos - camX + (cos(degree) * (radius * 2)) / (camScale / 100),
        ypos - camY + (sin(degree * -1) * (radius * 2)) / (camScale / 100),
        xScaling / (camScale / 100),
        yScaling / (camScale / 100)
      );
    }
  }
}

function renderTiles(xpos, ypos, strokeW, tileLength) {
  //Temporary Tile Render for efficiency

  trIndex = 0;

  let xTrack = (xpos - camX);
  let yTrack = (ypos - camY);

  strokeWeight(strokeW / (camScale / 100));
  stroke("#debb7bff");

  for (let i = 0; i < angleData.length; i++) {
    if (
      xTrack < 0 - strokeW / (camScale / 100) ||
      xTrack > width + strokeW / (camScale / 100) ||
      yTrack < 0 - strokeW / (camScale / 100) ||
      yTrack > height + stroke / (camScale / 100)
    ) {
    } else {
      if (angleData[i] == 999) {
      } else {
        line(
          xTrack,
          yTrack,
          xTrack + (cos(angleData[i]) * (tileLength / 2)) / (camScale / 100),
          yTrack + (sin(angleData[i]) * (tileLength / -2)) / (camScale / 100)
        );
        
        if (setSpeedActions[trIndex].floor == i) {
          fill('red')
          noStroke()
          ellipse(xTrack, yTrack, 20, 20)
          trIndex++;
        }
        
        strokeWeight(strokeW / (camScale / 100));
  stroke("#debb7bff");
        
      }
    }
      xTrack += (cos(angleData[i]) * (tileLength / 2)) / (camScale / 100);
    yTrack += (sin(angleData[i]) * (tileLength / -2)) / (camScale / 100);
    }
        
}

function setCam(xp, yp, csc, csp) {
  camX = xp;
  camY = yp;
  camScale = csc;
  camSpeed = csp;
}

function keyReleased() {
  if (keyCode === 187) {
    camSpeed += 15;
  }

  if (keyCode === 189) {
    camSpeed -= 15;
  }
}

function camOffset() {
  if (keyIsDown(LEFT_ARROW) === true) {
    camOffsetX -= 10;
  }

  if (keyIsDown(RIGHT_ARROW) === true) {
    camOffsetX += 10;
  }

  if (keyIsDown(UP_ARROW) === true) {
    camOffsetY -= 10;
  }

  if (keyIsDown(DOWN_ARROW) === true) {
    camOffsetY += 10;
  }

  if (keyIsDown(87) === true) {
    camOffsetS -= 10;
  }

  if (keyIsDown(83) === true) {
    camOffsetS += 10;
  }
}

function keyReleased() {
  if (keyCode === 187) {
    camSpeed += 15;
  }

  if (keyCode === 189) {
    camSpeed -= 15;
  }
}

function judgeTick(angle) {
  if (autoplay) {
    if (isNaN(TDF[pvtIndex - 1])) {
      if (overshoot + bpmSpeed > 180) {
        tileHit(TDF[pvtIndex]);
      }
    } else {
      if (tileTravel > 360) {
        tileTravel -= 360;
      } else {
        if (tileTravel < 0) {
          tileTravel += 360;
        }
      }

      if (overshoot + bpmSpeed >= tileTravel) {
        tileHit(TDF[pvtIndex]);
      }
    }
  }

  degree -= bpmSpeed * twirl;
  degree = degree % 360;

  overshoot += bpmSpeed;

  if (degree < 0) {
    degree += 360;
  }
}

function tileHit(angle) {

  plaX += (cos(angle) * (200 / 2)) / (camScale / 100);
  plaY += (sin(angle) * (200 / -2)) / (camScale / 100);

  if (planetPivot == "fire") {
    planetPivot = "ice";
  } else if (planetPivot == "ice") {
    planetPivot = "fire";
  }
  degree = TDF[pvtIndex] + 180;
  degree = degree % 360;


  overshoot = 0;
  if (setSpeedActions[sIndex].floor == pvtIndex + 1) {
    if (setSpeedActions[sIndex].speedType == "Bpm") {
      //console.log(
      //  setSpeedActions[sIndex].floor +
      //    ", " +
      //    setSpeedActions[sIndex].beatsPerMinute
      //);

      bpm = setSpeedActions[sIndex].beatsPerMinute;
    } else {
      //console.log(
      //  setSpeedActions[sIndex].floor +
      //    ", " +
      //    setSpeedActions[sIndex].bpmMultiplier
      //);

      bpm = bpm * setSpeedActions[sIndex].bpmMultiplier;
    }

    sIndex++;
  }

  if (twirlActions[tIndex].floor == pvtIndex + 1) {
    //console.log("twirl: " + twirlActions[tIndex].floor + ", " + twirl);
    twirl = twirl * -1;
    tIndex++;
  }

  pvtIndex++;

  if (twirl == 1) {
    tileTravel = 180 - (TDF[pvtIndex] - TDF[pvtIndex - 1]);
  } else {
    tileTravel = 180 - (TDF[pvtIndex - 1] - TDF[pvtIndex]);
  }

  camTranslateS += 0;
}

function angleDataFIX() {
  for (let i = 0; i < angleData.length; i++) {
    if (angleData[i] >= 0) {
      TDF.push(angleData[i]);
    } else {
      TDF.push((angleData[i] + 360) % 360);
    }
  }
}

function displayText(fps) {
  text("Angle: " + round(degree), 50, 100);
  text("Position: " + round(plaX) + ", " + round(plaY), 50, 150);
  text("Angle List: " + TDF, 50, 300);
  text("FPS: " + fps, 50, 50);
  text("tileTravel: " + tileTravel, 50, 200);
  text("Tile #: " + pvtIndex, 50, 250);
  text("Tile # Angle: " + TDF[pvtIndex], 50, 350);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function startSong() {
  song.play();
}

function wait() {
  waitF--;
}
