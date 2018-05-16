var isBible = true;
var isGoethe = true;

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

function goethetoggle() {
    if (isGoethe){
        document.getElementById('byian').classList.remove("invisible");
        document.getElementById('bygoethe').classList.add("invisible");    
    } else {
        document.getElementById('byian').classList.add("invisible");
        document.getElementById('bygoethe').classList.remove("invisible");    
    }
    
    isGoethe = !isGoethe;
}

function bibleToggle() {
    for (var i in thenew) {
        var sp = document.getElementById(i);

        if (isBible)
            sp.innerText = thenew[i];
        else
            sp.innerText = "";
    }

    isBible = !isBible;
}