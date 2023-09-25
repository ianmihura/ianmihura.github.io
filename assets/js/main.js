$( document ).ready(function() {
    $(".preview").scrollTop($(window.location.hash))

    $("li").on("click", function() {
        let title = $(this).attr("data-title")
        window.location.hash = `#${title}`
    })
})
