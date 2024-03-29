let current_tab = "profile_button";
console.log(window.localStorage.getItem("authToken"))
showResultForGetUserInfo()
async function showResultForGetUserInfo() {
    let link = "http://127.0.0.1:9950/main/"
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", link);
    let address = document.getElementById('register_address');
    let first_name = document.getElementById('register_first_name');
    let last_name = document.getElementById('register_last_name');
    let cash = document.getElementById('cash');
    let welcomeName = document.getElementById('welcomeName');
    let username = document.getElementById('username');
    let drobptn = document.getElementById('drobptn');

    xhttp.onload = function() {
        const result = JSON.parse(this.response);
        if(parseInt(result.authToken) > 0)
        {
            address.placeholder = result.address
            first_name.placeholder = result.firstname
            last_name.placeholder = result.lastname
            cash.innerText = result.charge
            welcomeName.innerText = result.firstname
            username.innerText = result.firstname
            drobptn.innerText = result.firstname
        }
        console.log(this.response)
    }

    xhttp.open("POST", link);
    xhttp.setRequestHeader('Access-Control-Allow-Origin', link);
    xhttp.setRequestHeader('Access-Control-Allow-Credentials', 'true');
    xhttp.setRequestHeader("Usecase", "Getuserinfo");
    xhttp.setRequestHeader("AuthToken", window.localStorage.getItem("authToken"));

    xhttp.send();

}

async function charge()
{
    let link = "http://127.0.0.1:9950/main/"
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", link);
    xhttp.onload = function() {
        showResultForGetUserInfo()
    }
    xhttp.open("POST", link);
    xhttp.setRequestHeader('Access-Control-Allow-Origin', link);
    xhttp.setRequestHeader('Access-Control-Allow-Credentials', 'true');
    xhttp.setRequestHeader("Usecase", "Chargemoney");
    xhttp.setRequestHeader("AuthToken", window.localStorage.getItem("authToken"));
    xhttp.send();
}


async function logout()
{
    window.localStorage.setItem("authToken","0")
    window.location.href = "../Part1/main_page.html"
}

function tabs_handler() {
    document.getElementById("main_div2").style.display = "none";



}

function tab_changer(element) {
    if(!element.id.includes(current_tab)) {
        let index = element.id.charAt(element.id.length - 1);
        let other_element_id;
        if(current_tab == "profile_button") {
            other_element_id = "bills_button";


        }
        if(current_tab == "bills_button") {
            other_element_id = "profile_button";


        }
        if(index == "2") {

            document.getElementById(other_element_id + "1").style.backgroundColor = "grey";
            document.getElementById(current_tab + "1").style.backgroundColor = "#e2e2e2";

        }
        if(index == "1") {
            document.getElementById(other_element_id + "2").style.backgroundColor = "grey";
            document.getElementById(current_tab + "2").style.backgroundColor = "#e2e2e2";

        }

        current_tab = element.id.substring(0, element.id.length - 1);
        if(current_tab == "profile_button"){
            document.getElementById("main_div2").style.display = "none";
            document.getElementById("main_div1").style.display = "block";

        }

        if(current_tab == "bills_button") {
            document.getElementById("main_div1").style.display = "none";
            document.getElementById("main_div2").style.display = "flex";

        }

    }

}



const error_type =
    {
        GREEN_STATE : "green state",
        VALUE_SIZE_OVERFLOW : {
            ADDRESS: "address overflow",
            DEFAULT : "default overflow"
        },
        INVALID_PASSWORD_PATTERN : {
            INVALID_SIZE : "invalid size",
            INVALID_CHARACTER : "invalid character",
            LACK_OF_NUMBER : "doesn't have any number",
            LACK_OF_ALPHABET : "doesn't have any alphabet charcter"
        },
        INVALID_EMAIL_PATTERN : "invalid email pattern",
        EMPTY_INPUT : "empty input"
    };

declare_type = [];

function clear_value_from_white_space(target)
{
    switch (target.id) {
        case 'register_first_name':
        case 'register_last_name':
        case 'login_email':
        case 'register_email':
            let id = target.id
            let infoCell = document.getElementById(id)
            let value = infoCell.value
            console.log(value.length)
            let begin = 0
            let end = value.length
            while(value.charAt(begin) == ' ' && end > begin)
                begin += 1
            while(value.charAt(end - 1) == ' ' && end > begin)
                end -= 1
            infoCell.value = value.substring(begin, end)
            break;
    }

    change_on_input(target)
}

//listener on inputs
function change_on_input(target) {
    switch (target.id) {
        case 'register_first_name':
        case 'register_last_name':
            input_checker(target.id, "name")
            break;
        case 'login_email':
        case 'register_email':
            input_checker(target.id, "email")
            break;
        case 'login_password':
        case 'register_password':
            input_checker(target.id, "pass")
            break;
        case 'register_address':
            input_checker(target.id, "address")
            break;
    }
}

async function declare_error(id, type)
{
    let infoCell = document.getElementById(id);
    infoCell.style.border = "1px solid #ff0000";
    declare_type[id] = type;
    let errorcell = document.getElementById(id + "_error");
    switch(type)
    {
        case error_type.EMPTY_INPUT:
            errorcell.innerText = "* باید پر شود."
            break;
        case error_type.INVALID_EMAIL_PATTERN:
            errorcell.innerText = "* ایمیل نا معتبر است."
            break;
        case error_type.INVALID_PASSWORD_PATTERN.INVALID_SIZE:
            errorcell.innerText = "* رمز عبور باید حداقل ۸ رقم باشد."
            break;
        case error_type.INVALID_PASSWORD_PATTERN.LACK_OF_NUMBER:
            errorcell.innerText = "* رمز عبور باید عدد داشته باشد."
            break;
        case error_type.INVALID_PASSWORD_PATTERN.LACK_OF_ALPHABET:
            errorcell.innerText = "* رمز عبور باید شامل حروف انگلیسی باشد."
            break;
        case error_type.INVALID_PASSWORD_PATTERN.INVALID_CHARACTER:
            errorcell.innerText = "* رمز عبور فقط باید شامل حروف انگلیسی و اعداد باشد."
            break;
        case error_type.VALUE_SIZE_OVERFLOW.DEFAULT:
            errorcell.innerText = "* فیلد باید کمتر از ۲۵۶ کاراکتر باشد."
            break;
        case error_type.VALUE_SIZE_OVERFLOW.ADDRESS:
            errorcell.innerText = "* آدرس باید کمتر از ۱۰۰۱ کاراکتر باشد."
            break;

    }
}

async function declare_green_state(id)
{
    let infoCell = document.getElementById(id);
    infoCell.style.border = "1px solid #00ff00";
    declare_type[id] = error_type.GREEN_STATE;
    let errorcell = document.getElementById(id + "_error");
    errorcell.innerText = ""

}

async function input_checker(id, type)
{
    let infoCell = document.getElementById(id)
    let value = infoCell.value
    if(type != "address")
    {
        if(value.length > 255)
        {
            declare_error(id, error_type.VALUE_SIZE_OVERFLOW.DEFAULT)
            return;
        }
    }
    else
    {
        if(value.length > 1000)
        {
            declare_error(id, error_type.VALUE_SIZE_OVERFLOW.ADDRESS)
            return;
        }
    }

    if(type == "pass")
    {
        if(value.length < 8)
        {
            declare_error(id, error_type.INVALID_PASSWORD_PATTERN.INVALID_SIZE)
            return;
        }
        else if(/^([a-zA-Z0-9]{8,})$/.test(value) == false)
            declare_error(id, error_type.INVALID_PASSWORD_PATTERN.INVALID_CHARACTER)
        else if(/^([0-9]{8,})$/.test(value) == true)
            declare_error(id, error_type.INVALID_PASSWORD_PATTERN.LACK_OF_ALPHABET)
        else if(/^([a-zA-Z]{8,})$/.test(value) == true)
            declare_error(id, error_type.INVALID_PASSWORD_PATTERN.LACK_OF_NUMBER)
        else
            declare_green_state(id);
        return;

    }
    else if(type == "email")
    {
        if(/^[a-z0-9A-Z\_\.\-]{1,}\@[a-z0-9\_\-\.]{1,}\.[a-z]{1,}$/.test(value) == false)
        {
            declare_error(id,error_type.INVALID_EMAIL_PATTERN)
            return;
        }
    }
    else
    {
        if(value.length == 0)
        {
            declare_error(id, error_type.EMPTY_INPUT)
            return;
        }
    }
    declare_green_state(id)
}


// Get the modal
var modal = document.getElementById("back_of_modal");

function load_modal(target) {
    let is_basic_check_successfull = false;
    let errorcell = document.getElementById("basic_error");
    let content_cell = document.getElementById('modal_content');

    content_cell.innerHTML = "";
    content_cell.setAttribute('class', 'modal_content_class');

    is_basic_check_successfull = create_register_modal_content();

    if(is_basic_check_successfull)
    {
        errorcell.innerText = ""
        modal.style.display = "block";
    }
    else
        errorcell.innerText = "اطلاعات به درستی وارد نشده اند."
    document.getElementById("back_of_modal").classList.add("showModal");
    return false;
}

function create_register_modal_content()
{
    let password = document.getElementById('register_password').value;
    let address = document.getElementById('register_address').value;
    let first_name = document.getElementById('register_first_name').value;
    let last_name = document.getElementById('register_last_name').value;

    let content_cell = document.getElementById('modal_content');

    showResultForChangeInfo(password, first_name, last_name, address, content_cell)


    return true;
}

async function showResultForChangeInfo(password, firstname, lastname, address, content_cell) {
    let link = "http://127.0.0.1:9950/main/"
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", link);

    xhttp.onload = function() {
        const result = JSON.parse(this.response);
        console.log(this.response)
        if(parseInt(result.authToken) > 0)
        {
            content_cell.innerText = "تغییرات با موفقیت اعمال شد."
            content_cell.style.color = "green"
        }
        else
        {
            content_cell.innerText = "تغییرات اعمال نشد."
            content_cell.style.color = "red"
        }
        showResultForGetUserInfo()
    }

    xhttp.open("POST", link);
    xhttp.setRequestHeader('Access-Control-Allow-Origin', link);
    xhttp.setRequestHeader('Access-Control-Allow-Credentials', 'true');
    xhttp.setRequestHeader("Usecase", "changeinfo");
    if(password.length > 0)
        xhttp.setRequestHeader("Password", password);
    if(firstname.length > 0)
        xhttp.setRequestHeader("Firstname", firstname);
    if(lastname.length > 0)
            xhttp.setRequestHeader("Lastname", lastname);
    if(address.length > 0)
            xhttp.setRequestHeader("Address", address);
    xhttp.setRequestHeader("AuthToken", window.localStorage.getItem("authToken"));

    xhttp.send();

}

window.onclick = function(event) {
    if (event.target == modal)
        get_out();
}

function get_out()
{
    document.getElementById("back_of_modal").classList.add("hideModal");
    document.getElementById("back_of_modal").classList.remove("showModal");
}
























