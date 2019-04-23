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
            console.log(message.value, data);
            
            await fetch("https://rest.clicksend.com/v3/sms/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic Y2FkZW56YTAxOToxMEZFM0VFQS05OUUxLTYxQzctRThBMS1ERDIzODk1QTVEOTg="
                },
                body: JSON.stringify({
                    "messages": [{
                        "body": `${message.value}`,
                        "to": `${data}`
                    }]
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
                    console.log(res);
                    
                    return res.text();
                })
                .then(res => console.log(res)
                )
                .catch(err => {

                    alert("Message Sending Failed!!! ", err)
                })
        }
    })
}