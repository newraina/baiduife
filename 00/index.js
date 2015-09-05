function selectied(element) {
    alert(element.getAttribute("font-size"));
}

window.onload = function () {
    var clickimage = document.getElementById("me");
    clickimage.onclick = alert("you");
}

