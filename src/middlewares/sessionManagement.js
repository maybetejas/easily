import UserModel from "../models/user.model.js"

export const sessionCheck = (req, res, next) => {
    if (req.session.user) {
        const usersArray = UserModel.returnUsers();
        const user = usersArray.find(user => req.session.user === user.email);

        // Set the user's name in res.locals if the user exists
        res.locals.name = user ? user.name : null;
    } else {
        res.locals.name = null;  // No user logged in
    }

    next(); 
}