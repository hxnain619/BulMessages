var message1 = document.querySelector(".message1");
var message2 = document.querySelector(".message2");

var contact1 = document.querySelector(".contact1");
var contact2 = document.querySelector(".contact2");

const from = "1717-204-4530";
var condition = false;

const SendMessageToGroup = (event) => {
    var num = contact1.value;
    var index = 0;
    var numArr = [];
    for (var a = 0; a < num.length; a++) {
        if (num[a] === "\n") {
            var number = num.slice(index, a);
            numArr.push(number);
            index = a + 1;

        } else if (a == num.length - 1) {
            var number = num.slice(index, a + 1);
            numArr.push(number);
        }
    }
    
    event.preventDefault();
    if (message1.value !== "" && contact1.value !== "" && numArr.length !== 0) {
        fetch("https://platform.clickatell.com/messages", {
            headers: { "Content-Type": "application/json", "Authorization": "ekjFPgVNSCCTU7pTqPew7g==" },

            method: "POST",
            body: JSON.stringify({
                "content": `${message1.value}`,
                "to": numArr, "from": `${from}`
            })
        })
            .then(res => {
                if (res) {
                    
                    alert("message send succesfully!!");
                    message1.value = null;
                    contact1.value = null;
                }
            })
            .catch(err => {
                alert("network error")
            })

    } else {
        alert("field is empty!!")
    }
}

const SendMessageToGroup2 = (event) => {
    var num2 = contact2.value;
    var index = 0;
    var numArr2 = [];

    for (var a = 0; a < num2.length; a++) {
        if (num2[a] === "\n") {
            var number = num2.slice(index, a);
            numArr2.push(number);
            index = a + 1;

        } else if (a == num2.length - 1) {
            var number = num2.slice(index, a + 1);
            numArr2.push(number);
        }
    }

    event.preventDefault();
    if (message2.value !== "" && contact2.value !== "" && numArr2.length > 0) {
        for (var b = 0; b < numArr2.length; b++) {
            fetch(`https://platform.clickatell.com/messages/http/send?apiKey=1-2ahfpVSYu22KOCkFmm3Q==&to=${numArr2[b]}&content=${message2.value}`)
                .then(res => {
                    if (res) {
                        condition = true;
                        message2.value = null;
                        contact2.value = null;
                    }
                })
                .catch(err => {
                    alert("network error")
                })
        }
        if (condition) {
            alert("message send sucessfully!!")
        }
    } else {
        alert("field is empty!!")
    }
}

