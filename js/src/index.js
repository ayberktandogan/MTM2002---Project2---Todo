import axios from "../../axios";
const Validator = require('validator')

const handleLogout = () => {
    const args = ['auth', 'token', 'userId']
    args.map(arg => localStorage.removeItem(arg))
    window.location = '/'
}

const addTodo = () => {
    const todo = document.getElementById('todo-input').value

    const newTodo = {
        text: todo
    }

    if(localStorage.getItem('auth') !== null && !Validator.isEmpty(todo)) {
        axios.post('/todo/add/' + localStorage.getItem('userId'), newTodo)
        .then(res => {
            console.log(res)
            window.location = '/'
        })
        .catch(err => console.log(err))
    }
}

const deleteTodo = () => {
    const itemId = event.target.id
    const item = {
        _id : itemId
    }
    axios.post('/todo/delete/' + localStorage.getItem('userId'), item)
    .then(res => {
        window.location = '/'
    })
    .catch(err => console.log(err))  
}
window.onload = function onload() {
    if(localStorage.getItem('auth') !== null) {
        const button = "<button class='btn btn-white waves-effect' onclick='handleLogout()'>X Çıkış yap</button>"
        document.getElementById('logout').innerHTML = button
    }
    if(localStorage.getItem('auth') === null) {
        const button = "<a class=\"btn btn-white waves-effect\" href=\"./login.html\">Login</a><a class=\"btn btn-white waves-effect\" href=\"./register.html\">Register</a>"
        document.getElementById('logout').innerHTML = button
        document.getElementById('addButton').classList.add("disabled")
    }
    if(localStorage.getItem('userId') !== null || localStorage.getItem('userId') !== undefined) {
        axios.get('/todo/' + localStorage.getItem('userId'))
        .then(res => {
            const listElement = document.getElementById('to-do-list')
            const array = res.data.todos
            array.forEach((element) => {
                const listItem = document.createElement('li')
                listItem.innerHTML = element.text + "<i class='fa fa-trash' id="+element._id+" onclick='deleteTodo()'></i>"
                listElement.appendChild(listItem)
            });
        })
    }
}

/*window.onload = function getList() {
    

    for (var i = 0; i < numberOfListItems; ++i) {
        // create an item for each one
        var listItem = document.createElement('li');

        // Add the item text
        listItem.innerHTML = listData[i];

        // Add listItem to the listElement
        listElement.appendChild(listItem);
    }
}*/


//Exports
window.handleLogout = handleLogout
window.addTodo = addTodo
window.deleteTodo = deleteTodo