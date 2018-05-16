var isBible = false;

var thenew = {
    "1": "It ",
    "2": ",",
    "3": "God was a formful word ",
    "4": "exhaled ",
    "5": "and spoke ",
    "6": ", in unison with the void",
    "7": "a ",
    "8": " found, but lost between darkness",
    "9": "and judged good ",
    "10": ", so there was",
    "11": "from the void, judged ",
    "12": "ordered and ",
    "13": ", as He had thought",
    "14": ", the beginning",
    "15": "— enlarged"
}

function bibleToggle() {
    for (var i in thenew) {
        var sp = document.getElementById(i);

        if (!isBible)
            sp.innerText = thenew[i];
        else
            sp.innerText = "";
    }

    isBible = !isBible;
    console.log(a);
    // TODO execute toggle bible
}