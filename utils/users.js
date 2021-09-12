let users = []

function addUser(user) {
    users.push(user)
}

function getUsers() {
    return users
}

function getUser(id) {
    return users.find(user => user.socketID === id)
}

function removeUser(id) {
    users = users.filter(user => user.socketID !== id)
}

module.exports = {addUser, getUsers, getUser, removeUser}
