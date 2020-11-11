function hilightCurrentDay() {
    let d = new Date();

    day = d.getDay();

    console.log("date", day);

    if (day < 6 && day > 0) {
        let today = document.getElementById(day);

        today.style.color = "#b0ffc5";
        today.style.borderColor = "#b0ffc5";
        today.style.transform = "scale(1.3)";
        today.tr.style.backgroundColor = "#b0ffc5";
    }
}

hilightCurrentDay();