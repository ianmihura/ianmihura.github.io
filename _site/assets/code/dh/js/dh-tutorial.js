
$(document).ready(function() {
    const tutorial = [
        "[data-content='Start Tutorial']",
        "[data-content='New Private Data Alice']",
        "[data-content='New Private Data Bob']",

        "[data-content='Send public key (A) to Bob - through Server']",
        "[data-content='Send to B']",
        "[data-content='Bob Use to generate Key K']",
        "[data-content='Send public key (B) to Alice - through Server']",
        "[data-content='Send to A']",
        "[data-content='Alice Use to generate Key K']",
        
        "[data-content='Alice Encrypt - using available key K']",
        "[data-content='Send Encrypted to Bob - through Server']",
        "[data-content='Send message to B']",
        "[data-content='Bob Decrypt - using available key K']",
    ];
    let flip = true;

    for (let step = 0; step < tutorial.length; step++) {
        $(tutorial[step]).on("click", function() {
            if (tutorial[step] == "[data-content='Send to B']") {
                if (flip) {
                    $("[data-content='Bob Use to generate Key K']").popup("show")
                } else {
                    $("[data-content='Bob Decrypt - using available key K']").popup("show")
                }
                flip = !flip
            } else {
                $(tutorial[step+1]).popup("show")
            }
        })
    }

    $(tutorial[0]).popup("show")
});
