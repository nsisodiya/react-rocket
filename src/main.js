//var HTMLtoJSX = require("htmltojsx");
import HTMLtoJSX from "htmltojsx";
import React from "react";
import ReactDom from "react-dom";

window.React = React;

var Babel = require("babel-standalone");
console.log(Babel, Babel.transform);
var converter = new HTMLtoJSX({
  createClass: true,
  outputClassName: "AwesomeComponent"
});
var inputStyle = "<style>\
  .red {\
  color: red;\
}\
</style>\
";

var inputDom = "<div>\
  <p class=\"red\">This is a App comppnent</p>\
  <p>This is not red</p>\
</div>";

var output = converter.convert(inputDom);
var output1 = Babel.transform(output, {presets: ["es2015", "react"]}).code;
var CHAR_TO_DELETE = 15;
output1 = output1.substring(CHAR_TO_DELETE) + "window.AwesomeComponent = AwesomeComponent;";
eval(output1);
console.log(output1);
ReactDom.render(<AwesomeComponent/>, document.getElementById("root"));

