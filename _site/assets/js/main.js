document.addEventListener('DOMContentLoaded', function () {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));

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