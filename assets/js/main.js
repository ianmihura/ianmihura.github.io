$( document ).ready(function() {
    // $(".preview").scrollTop($(window.location.hash))

    // $("li").on("click", function() {
    //     let title = $(this).attr("data-title")
    //     window.location.hash = `#${title}`
    // })

    $(".back-to-top").on("click", function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    })

    addEventListener("scroll", () => {
        if (document.body.scrollTop < 200) {
            $(".back-to-top").hide();
        } else {
            $(".back-to-top").show();
        }
    })
})
