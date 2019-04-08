var message1 = document.querySelector(".message1");
var message2 = document.querySelector(".message2");
var contact1 = document.querySelector(".contact1");
var contact2 = document.querySelector(".contact2");
var condition, condition2 = false;
var numArr = [];

const from = "17076790568";

const SendMessageToGroup = async (event) => {
    event.preventDefault();

    var num = contact1.value;
    var index = 0;
    numArr = [];

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


    if (message1.value !== "" && contact1.value !== "" && numArr.length !== 0) {
        for (var i = 0; i < numArr.length; i++) {

            await fetch("https://platform.clickatell.com/messages", {
                headers: { "Content-Type": "application/json", "Authorization": "qE03wVr7R1GPNrNEN8PEBg==" },

                method: "POST",
                body: JSON.stringify({
                    "content": `${message1.value}`,
                    "to": [numArr[i]],
                    "from": `${from}`
                })
            })
                .then(res => {
                    if (res) {

                        condition2 = true;
                        message1.value = null;
                        contact1.value = null;
                    }
                })
                .catch(err => {
                    alert("network error")
                })
        }
        if (condition2) {
            alert("send successfully");
            condition2 = false;
        } else if (!condition2 && numArr.length == 1) {
            alert("send successfully");
            condition2 = false;
        }
    }
}

const SendMessageToGroup2 = async (event) => {
    event.preventDefault();

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

    if (message2.value !== "" && contact2.value !== "" && numArr2.length > 0) {

        for (var b = 0; b < numArr2.length; b++) {
            await fetch(`https://platform.clickatell.com/messages/http/send?apiKey=p29twVaKRfWDpRzyzxaA_Q==&to=${numArr2[b]}&content=${message2.value}`)
                .then(res => {

                    message2.value = null;
                    contact2.value = null;
                    condition = true;
                })
                .catch(err => {
                    alert("network error")
                })
        }


        if (condition == true) {
            alert("message send sucessfully!!")
            condition = false;
        } else if (!condition && numArr2.length == 1) {
            alert("message send sucessfully!!")
            condition = false
        }

    } else {
        alert("field is empty!!")
    }


}

