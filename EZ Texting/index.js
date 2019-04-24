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
            var formData = new FormData();
            formData.append('User', "logan@babboitalian.com")
            formData.append('Password', "@Online101")
            formData.append('PhoneNumbers', `${data}`)
            formData.append('Message', `${message.value}`)
            await fetch("https://app.eztexting.com/sending/messages?format=json", {
                method: "POST",
                headers: {
                    "Authorization": "Basic bG9nYW5AYmFiYm9pdGFsaWFuLmNvbTpAT25saW5lMTAx"
                },
                body: formData
            })
                .then(res => {
                    if (res.status == 201) {

                        div.innerHTML += `${i} => Message Send to ${data}<br />`;
                        setTimeout(() => {
                            if (i === changedArray.length - 1) {
                                alert("Message Send Succesfully!!")
                                setTimeout(() => div.innerHTML = "", 1000);
                            }
                        }, 1000)
                    }

                    return res.text();
                })
                .then(res => console.log(res)
                )
                .catch(err => {

                    console.log(err);
                    
                })
        }
    })
}