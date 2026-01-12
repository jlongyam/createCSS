function createStyle(s_style) {
  var d = document, style = d.createElement('style');
  d.appendChild(style);
  if ('styleSheet' in style) style.styleSheet.cssText = s_style;
  else style.appendChild(d.createTextNode(s_style));
}