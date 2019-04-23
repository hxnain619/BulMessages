var message = document.querySelector(".message1");
var contact = document.querySelector(".contact1");
var div = document.querySelector("#list");
var condition;
var numArr = [];
var changedArray = [];

const SendMessageToGroup = (event) => {

    event.preventDefault();
    var num = contact.value;
    var index = 0;

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

    if (message.value !== "" && contact.value !== "") {
        changedArray = numArr.map(data => {
            if (data.length !== 0) {
                return "+" + data;
            }
        });
    }

    changedArray.forEach(async (data, i) => {
        if (data) {
            await fetch("https://cors-anywhere.herokuapp.com/" + "https://api.karix.io/message/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YmU5ZWMwZjMtZGZkMS00NzQzLTk3Y2YtZjY1YTYzNDBjNDlkOmY2MzAyZGZjLWVhYWYtNGU4MC1hMDUxLTczNGMyNDg4ZWI2OQ=="
                },
                body: JSON.stringify({
                    "channel": "sms",
                    "source": "+17203107472",
                    "destination": [
                        `${data}`
                    ],
                    "content": {
                        "text": `${message.value}`
                    }
                })
            })
                .then(res => {
                    if (res.status == 200 || res.status == 202) {

                        div.innerHTML += `Message Send to ${data}<br />`;
                        setTimeout(() => {
                            if (i === changedArray.length - 1) {
                                alert("Message Send Succesfully!!")
                                setTimeout(() => div.innerHTML = "", 1000);
                            }
                        }, 1000)
                    }
                    return res.text();
                })
                .catch(err => {

                    alert("Message Sending Failed!!! ", err)
                })
        }
    })
}