import $ from "jquery";
window.jQuery = $;
window.$ = $;

/**
 * PS: This module is here for test purposes
 */

export default function () {
  $(document).ready(function() {
    setWindowProps();
  });
}
/**
 * set the size of the body element in pixels, so the children elements can use relative width and height
 */
function setWindowProps() {
  let width = $(window).width(); // get the window width
  let height = $(window).height();// get the window height
  $("html").height(height);
  $("html").width(width);
  $(".mainWraper").height("100%").width("100%").parent().height("100%").width("100%");
  // updates the html height and width everytime the window resizes
  $(window).on("resize", function() {
    let width = $(window).width();
    let height = $(window).height();
    $("html").height(height);
    $("html").width(width);
  });
}
