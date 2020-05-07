document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    // var elems = document.querySelectorAll('.pushpin');
    // var instances = M.Pushpin.init(elems);
});


// $('.pushpin-demo-nav').each(function () {
//     var $this = $(this);
//     var $target = $('#' + $(this).attr('data-target'));
//     $this.pushpin({
//         top: $target.offset().top,
//         bottom: $target.offset().top + $target.outerHeight() - $this.height()
//     });
// });