
$(document).ready(function() {
    const tutorial = [
        "[data-content='Start Tutorial']",
        "[data-content='New Private Key (KAS)']",
        "[data-content='Send private key (KAS) to Server']",
        "[data-content='New Private Key (KBS)']",
        "[data-content='Send private key (KBS) to Server']",

        "[data-content='Encrypt - using available key (KAS)']",
        "[data-content='Send Encrypted to Bob - through Server']",
        
        "[data-content='Decrypt using key KAS']",
        "[data-content='Encrypt using key KBS']",
        "[data-content='Send to Bob']",

        "[data-content='Decrypt - using available key (KBS)']",
    ];

    for (let step = 0; step < tutorial.length; step++) {
        $(tutorial[step]).on("click", function() {
            $(tutorial[step+1]).popup("show")
        })
    }
    
    $(tutorial[0]).popup("show")
});
