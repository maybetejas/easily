import { validationResult } from 'express-validator';
import UserModel from '../models/user.model.js'

export default class UserController {
    
    renderHome(req, res) {
        res.render('home.ejs');
    }

    renderLogin(req, res) {
        res.render('login.ejs', { errors: null, userNotFound: false })
    }

    postLogin(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg)
            res.render('login.ejs', { errors: errorMessages, userNotFound: false })
        } else {
            const loggedIn = UserModel.autenticateUser(req.body);
            if (loggedIn) {
                req.session.user = req.body.email;
                return res.redirect('/');
            } else {
                res.render('login.ejs', { errors: null, userNotFound: true })
            }
        }

    }

    logoutUser(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.redirect('/'); // Redirect to home in case of an error
            }

            res.redirect('/'); // Redirect to login after session is destroyed
        });
    }

    registerUser(req, res) {
        console.log(req.body.name);
        
        const registerStatus = UserModel.register(req.body);
        if (registerStatus){
            res.redirect('/login');
        }
    }
}