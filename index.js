document.getElementById("start").onclick = function () {
  var box1 = [];
  var box2 = [];

  for (x = 1; x <= 10; x++) {
    box2.push(x);
  }

  resetTrueFalse();
  resetOnce();

  document.getElementById("result").value = "";
  document.getElementById("falseSpan").style.display = "none";
  document.getElementById("trueSpan").style.display = "none";

  for (x = 1; x <= 10; x++) {
    var number = document.getElementById("number" + x).checked;
    if (number == true) {
      box1.push(x);
    }
  }

  if (box1.length == 0) {
    document.getElementById("modalContent").textContent =
      "You must choose at least one table";
    modal.style.display = "block";
    return;
  }

  const randomBox1Number = box1[Math.floor(Math.random() * box1.length)];

  document.getElementById("times1").value = randomBox1Number;

  const randomBox2Number = box2[Math.floor(Math.random() * box2.length)];

  document.getElementById("times2").value = randomBox2Number;

  document.getElementById("result").focus();
};

var wrongOnce = false;
var times1Once = null;
var times2Once = null;
var resultOnce = null;

function resetOnce() {
  wrongOnce = false;
  times1Once = null;
  times2Once = null;
  resultOnce = null;
}

document.getElementById("check").onclick = function () {
  resetTrueFalse();
  times1 = document.getElementById("times1").value;
  times2 = document.getElementById("times2").value;
  result = document.getElementById("result").value;

  if (times1 == "" || times2 == "" || result == "") {
    document.getElementById("modalContent").textContent =
      "You must fill all fields";
    modal.style.display = "block";
    return;
  }

  if (
    wrongOnce &&
    times1 == times1Once &&
    times2 == times2Once &&
    result == resultOnce
  ) {
    return;
  }

  checkNumber = times1 * times2;

  var div = document.createElement("div");

  var correctCount = document.getElementById("correctCount").textContent;
  var wrongCount = document.getElementById("wrongCount").textContent;

  if (checkNumber == result) {
    // If user is Right
    document.getElementById("trueSpan").style.display = "inline-block";
    document.getElementById("check").style.visibility = "hidden";
    div.className = "logRight";
    var audio = new Audio("sounds/right3.wav");
    audio.play();

    correctCount++;
    document.getElementById("correctCount").textContent = correctCount;
  } else {
    // If user is wrong
    wrongOnce = true;
    times1Once = times1;
    times2Once = times2;
    resultOnce = result;
    div.className = "logWrong";
    document.getElementById("falseSpan").style.display = "inline-block";

    var audio = new Audio("sounds/wrong2.mp3");
    audio.play();
    wrongCount++;
    document.getElementById("wrongCount").textContent = wrongCount;
  }

  var logMessage = document.createTextNode(
    times1 + " x " + times2 + " = " + result
  );
  div.appendChild(logMessage);
  document.getElementById("log").appendChild(div);
};

function resetTrueFalse() {
  document.getElementById("falseSpan").style.display = "none";
  document.getElementById("trueSpan").style.display = "none";
  document.getElementById("check").style.display = "inline-block";
  document.getElementById("check").style.visibility = "visible";
}

// Get the input field
var input = document.getElementById("result");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
  trueSpan = document.getElementById("trueSpan").style.display;
  if (trueSpan == "inline-block") {
    document.getElementById("start").click();
    return;
  }

  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("check").click();
  }
});

// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
