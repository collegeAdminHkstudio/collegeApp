document.addEventListener("DOMContentLoaded", function() {
  var toggleButton = document.getElementById("toggle-button");
  var messageBox = document.getElementById("message-box");

  toggleButton.addEventListener("click", function() {
    if (messageBox.textContent === "We Are Open Today!") {
      messageBox.textContent = "Sorry we are closed today";
      messageBox.style.backgroundColor = "red";
    } else {
      messageBox.textContent = "We Are Open Today!";
      messageBox.style.backgroundColor = "black";
    }
  });
});