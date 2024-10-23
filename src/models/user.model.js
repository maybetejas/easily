export default class UserModel {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static returnUsers(){
        return users;
    }

    static autenticateUser(body) {
        const user = users.find(user => body.email === user.email && body.password === user.password);
        return user ? true : false;
    }

    static register(body) {
        console.log(body);
        
        users.push(new UserModel(body.name, body.email, body.password));
        return true
    }
}

const users = [
    new UserModel('Alice Johnson', 'alice@example.com', 'password123'),
    new UserModel('Bob Smith', 'bob@example.com', 'secret456'),
    new UserModel('Charlie Brown', 'charlie@example.com', 'pass789')
];