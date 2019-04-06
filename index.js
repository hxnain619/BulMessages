var message1 = document.querySelector(".message1");
var message2 = document.querySelector(".message2");
var number1 = document.querySelector(".number1");
var number2 = document.querySelector(".number2");
var number3 = document.querySelector(".number3");
var number4 = document.querySelector(".number4");
var number5 = document.querySelector(".number5");
var number6 = document.querySelector(".number6");

const from = "1717-204-4530";

const SendMessageToGroup = (event) => {

    event.preventDefault();
    if (message1 !== "" || number1 !== "") {
        fetch("https://platform.clickatell.com/messages", {
            headers: { "Content-Type": "application/json", "Authorization": "ekjFPgVNSCCTU7pTqPew7g==" },

            method: "POST",
            body: JSON.stringify({
                "content": `${message1.value}`,
                "to": [`${number1.value}`, `${number2.value}`, `${number3.value}`], "from": `${from}`
            })
        })
            .then(res => {
                if (res) {
                    console.log(res);
                    alert("message send succesfully!!");
                    grpArray.push({
                        "form": 17172044530,
                        "to": [number1.value, number2.value, number3.value],
                        "message": message1.value
                    })

                    message1.value = null;
                    number1.value = null;
                    number2.value = null;
                    number3.value = null;
                }
            })
            .catch(err => {
                console.log(err);
                alert("cant able to send")
            })


    } else {
        alert("field is empty!!")
    }
}
var contact = [];
var condition = false;

const SendMessageToGroup2 = async (event) => {

    event.preventDefault();

    if (message2 !== "" || number4 !== "") {
        contact.push(number4.value, number5.value, number6.value);
        for (var a = 0; a < contact.length; a++) {
            await fetch(`https://platform.clickatell.com/messages/http/send?apiKey=1-2ahfpVSYu22KOCkFmm3Q==&to=${contact[a]}&content=${message2.value}`)
                .then(res => {
                    if (res) {
                        message2.value = null;
                        number4.value = null;
                        number5.value = null;
                        number6.value = null;
                        condition = true;
                    }
                })
                .catch(err => {
                    alert("cant able to send")
                })
        }
        if(condition){
            alert("message send sucessfully!!")
        }
    } else {
        alert("field is empty!!")
    }
}

