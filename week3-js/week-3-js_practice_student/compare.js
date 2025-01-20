function comparenum(a, b) {
  var a = parseInt(document.getElementById("a").value);
  var b = parseInt(document.getElementById("b").value);

  var result = "";
  var diff = 0;
  if (a > b) {
    result = "A>B";
    diff = a - b;
  } else if (a < b) {
    result = "A<B";
    diff = b - a;
  } else {
    result = "A=B";
    diff = a - b;
  }
  document.getElementById("c").value = result;
  document.getElementById("d").value = diff;
}
