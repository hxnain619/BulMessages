var message = document.querySelector(".message2");
var contact = document.querySelector(".contact2");
var div = document.querySelector("#list");
var condition;
var numArr = [];
var changedArray = [];

const SendMessageToGroup2 = (event) => {

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

            await fetch("https://sms.telnyx.com/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-profile-secret": "bMo8iH82R24BIwP8tpXDc7w4"
                },
                body: JSON.stringify({
                    "from": "+18772074921",
                    "to": `${data}`,
                    "body": `${message.value}`
                })
            })
                .then(res => {

                    if (res.status == 200) {

                        div.innerHTML += `Message Send to ${data}<br />`;
                        setTimeout(() => {
                            if (i === changedArray.length - 1) {
                                alert("Message Send Succesfully!!")
                                setTimeout(() => div.innerHTML = "", 1000);
                                return res.text();

                            }
                        }, 1000)
                    } else {
                        console.log("some error", res);
                        return res.text();
                    }
                })
                .then(res => {
                    console.log(res);

                })
                .catch(err => {
                    console.log(err.message, err);
                    
                    // alert("Message Sending Failed!!! ")
                })
        }
    })
}
