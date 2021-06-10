const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const mail = document.getElementById('mail');
const submitEntry = document.getElementById('submitEntry');
const checkEntries = document.getElementById('checkEntries');
const entriesDiv = document.getElementById('Entries');


fname.addEventListener('keyup', checkAlpha);
lname.addEventListener('keyup', checkAlpha);
mail.addEventListener('keyup', checkMail);
submitEntry.addEventListener('click', submitEvent);
checkEntries.addEventListener('click', getSubmissions);

function clearFields(){
    fname.value = '';
    lname.value = '';
    mail.value = '';
}

function checkAlpha(e) {
    const alphaRE = /^[a-zA-Z]+$/i;
    if (alphaRE.exec(e.target.value) || e.target.value === '') {
        e.target.classList.remove('invalid');
    } else {
        e.target.classList.add('invalid');
    }
}


function checkMail(e) {
    const mailRE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (mailRE.exec(e.target.value) || e.target.value === '') {
        e.target.classList.remove('invalid');
    } else {
        e.target.classList.add('invalid');
    }
}

function checkForm(e) {
    let message = validateForm();
    showPrompt(message);
    return message;
}

function validateForm() {
    let form = document.querySelectorAll("input:not([type='submit'])");
    form = Array.from(form);
    for (let i = 0; i < form.length; i++) {
        if (form[i].value === '') {
            return 'Fill all the fields';
        } else if (form[i].classList.contains('invalid')) {
            return 'Form Invalid';
        }
    }
    return '';
}

function showPrompt(message) {
    if(message){
        const prompt = document.getElementById('prompt');
        prompt.innerHTML = '';
        let div = document.createElement('div');
        div.classList = 'card';
        div.innerHTML = message;

        prompt.appendChild(div);
        setTimeout(() => prompt.innerHTML = '', 3000);
    }
}

function submitEvent(e){
    e.preventDefault();
    if(!checkForm()){
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const mail = document.getElementById('mail').value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const response = this.responseText;
        console.log(response);
    }
    };
    xmlhttp.open("POST", "./php/include/writeUser.php?", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(`firstName=${fname}&lastName=${lname}&email=${mail}`);
}
clearFields();
}
function getSubmissions(e){
    entriesDiv.innerHTML = '';
    e.preventDefault();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        myObj.forEach((user) => {
            const div = document.createElement('div');
            div.className = 'user-item';
            div.innerHTML = `
            <p>Name: ${user.firstName} ${user.lastName}</p>
            <p>E-mail: ${user.email} </p>
            `;
            entriesDiv.append(div);
        })
    }
    };
    xmlhttp.open("GET", "./php/include/readUser.php", true);
    xmlhttp.send();
}