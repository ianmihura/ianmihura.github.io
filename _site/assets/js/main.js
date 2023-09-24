$( document ).ready(function() {
    $(".preview").scrollTop($(window.location.hash))

    $("li").on("click", function(e) {
        let id = $(this).attr("data-id")
        window.location.hash = `#${id}`
    })
})
