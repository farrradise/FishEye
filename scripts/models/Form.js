export default class Form {
    constructor(firstName, lastName, email, message) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._message = message;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get email() {
        return this._email;
    }

    get message() {
        return this._message;
    }
}