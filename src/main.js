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
var input = "<div>Hello world from HTML!</div>";
var output = converter.convert(input);
var output1 = Babel.transform(output, {presets: ["es2015", "react"]}).code;
var CHAR_TO_DELETE = 15;
output1 = output1.substring(CHAR_TO_DELETE) + "window.AwesomeComponent = AwesomeComponent;";
var output2 = eval(output1);
ReactDom.render(<AwesomeComponent/>, document.getElementById("root"));
console.log(window.AwesomeComponent, output2);

