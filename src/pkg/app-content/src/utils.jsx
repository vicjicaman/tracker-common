import _ from 'lodash'

export const centerContent = (id) => {
  setTimeout(function() {
    const ids = "#" + id.safeId() + "_card";

    var elem_top = $(ids).offset()['top'];
    var offsetHeight = $(ids).height();
    var viewport_height = $(window).height();

    // Scroll to the middle of the viewport
    var my_scroll = elem_top - (viewport_height / 2) + (offsetHeight / 2);
    if (offsetHeight > viewport_height) {
      my_scroll = elem_top - 100;
    }
    var body = $('html, body');
    body.animate({
      scrollTop: my_scroll
    }, 500, 'swing');
    //$(window).scrollTop(my_scroll);
  }, 50)
}
