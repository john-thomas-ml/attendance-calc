document.getElementById('attendance-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let curr = parseInt(document.getElementById("curr").value);
    let tot = parseInt(document.getElementById("tot").value);
    let req = parseInt(document.getElementById("req").value);

    let resultElement = document.getElementById("result");
    resultElement.classList.remove("error", "success"); 

    if (isNaN(curr) || isNaN(tot) || isNaN(req) || curr < 0 || tot <= 0 || req < 1 || req > 100) {
        resultElement.innerText = "Please enter valid numbers and ensure all inputs are within range.";
        resultElement.classList.add("error");
        return;
    }

    if (curr > tot) {
        resultElement.innerText = "Classes attended cannot be more than total classes.";
        resultElement.classList.add("error");
        return;
    }

    let result = "";

    if ((curr / tot) <= (req / 100)) {
        let classes = Math.ceil((req * tot - 100 * curr) / (100 - req));
        let percentage = Math.floor(((curr + classes) / (tot + classes)) * 100);
        result = `You need to attend ${classes} more classes, and your percentage will become ${percentage}%.`;
    } else {
        let classes = Math.ceil((100 * curr - req * tot) / req) - 1;
        let percentage = Math.floor((curr / (tot + classes)) * 100);
        result = `You can miss ${classes} classes, and your percentage will become ${percentage}%.`;
    }

    resultElement.innerText = result;
    resultElement.classList.add("success");
});
