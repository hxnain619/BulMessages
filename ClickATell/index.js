var message1 = document.querySelector(".message1");
var message2 = document.querySelector(".message2");
var contact1 = document.querySelector(".contact1");
var contact2 = document.querySelector(".contact2");
var div = document.querySelector("#list");
var condition, condition2 = false;
var numArr = [];




const from = "15012428780";
const triger = () => {

}
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
            if (numArr[i].length !== 0) {
                await fetch("https://platform.clickatell.com/messages", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "n-GjVRC2TbOF_1J8Ly8UuA=="
                    },

                    method: "POST",
                    body: JSON.stringify({
                        "content": `${message1.value}`,
                        "to": [numArr[i]],
                        "from": `${from}`
                    })
                })
                    .then(res => {
                        if (res) {

                            div.innerHTML += `Message Send to ${numArr[i]}<br />`
                            condition2 = true;
                        }
                    })
                    .catch(err => {
                        alert("network error")
                        console.log(err.message);
                        
                    })
            }
        }
        setTimeout(() => div.innerHTML = "", 1000);
        if (condition2) {
            alert("Message send successfully");
            condition2 = false;
        } else if (!condition2 && numArr.length === 1) {
            alert("Message send successfully");
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
            if (numArr2[b].length !== 0) {
                await fetch(`https://platform.clickatell.com/messages/http/send?apiKey=CImNQbsAQACViPIJ2kHxoA==&to=${numArr2[b]}&content=${message2.value}`)
                    .then(res => {
                        if (res) {

                            div.innerHTML += `Message Send to ${numArr2[b]}<br />`
                            condition = true;
                        }
                    })
                    .catch(err => {
                        alert("network error")
                    })
            }
        }

        setTimeout(() => div.innerHTML = "", 2000);
        if (condition) {
            alert("Message send successfully");
            condition = false;
        } else if (!condition && numArr2.length === 1) {
            alert("Message send successfully");
            condition = false;
        }

    } else {
        alert("field is empty!!")
    }


}

