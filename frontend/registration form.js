document.getElementById('userForm').addEventListener("submit", e =>{
    e.preventDefault();
    var name = e.target.name.value;
    var email  = e.target.email.value;
    var phone  = e.target.phone.value;

    if(name !== "" && email !== "" && phone !== ""){
        const obj = {
            name,
            email,
            phone
        }
        axios.post("http://localhost:3000/users/add-user", obj)
        .then((response) => {
            console.log(response)
            showNewUserOnDisplay(response.data.newUserDetails)
        })
        .catch(err => console.log(err))
    }

    e.target.name.value="";
    e.target.email.value = "";
    e.target.phone.value = "";
})

window.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    var objData = {}
    axios.get("http://localhost:3000/users")
        .then((response) => {
            objData = response.data
            showNewUserOnDisplay(objData);
            for(let i=0;i<objData.length;i++){
                var key = objData[i];
                showNewUserOnDisplay(key);
            }
        })
})

function showNewUserOnDisplay(details){
    if(details.email !== null){
        console.log(details.id)
        var display = document.querySelector(".userDetails");
        const childNode =  `<li id='${details.id}'>
                                <table>
                                    <tr>
                                        <td>Name:   ${details.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Email:  ${details.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone:  ${details.phone}</td>
                                    </tr>
                                <button type="submit" onclick="editUser('${details.id}')">Edit</button>
                                <button type="submit" onclick="deleteUsers('${details.id}')" id="delete">X</button>
                                </table>
                            </li>`
        if(details.name != null && details.email != null && details.phone != null){
            display.innerHTML += childNode
        }
    }
}

function deleteUsers(userId){
    console.log(userId)
    axios
       .get(`http://localhost:3000/users/delete-user/${userId}`)
        .then((response) => {
        console.log(response)
        removeUserDataFromDisplay(userId)
    })
    .catch(err => console.log(err))
}

function removeUserDataFromDisplay(userId){
    var parentNode = document.querySelector('.userDetails');
    var childNode = document.getElementById(userId);
    if(childNode){
        parentNode.removeChild(childNode)
    }
}

function editUser(userId){
    console.log(userId)
    axios.get(`http://localhost:3000/users/edit-user/${userId}`)
    .then((response) => {
        console.log(response)
        console.log(response.data.name)
        var name = response.data.name;
        var phone = response.data.phone;
        var email = response.data.email;
        document.getElementById('email').value = email;
        document.getElementById('name').value = name;
        document.getElementById('phone').value = phone;
        deleteUsers(userId)
    })
    
 }
