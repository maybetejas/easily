
import { body } from 'express-validator';

export const validateJobApplication = [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('contact').notEmpty().withMessage('Contact number is required.')
    .isLength({ min: 10, max: 10 }).withMessage('Contact number must be 10 digits long.')
    .matches(/^\d+$/).withMessage('Contact number must contain only digits.'),
    body('resume').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Resume file is required.');
        }
        const fileType = req.file.mimetype.split('/')[1];
        if (!['pdf'].includes(fileType)) {
            throw new Error('Only PDF files are allowed.');
        }
        return true;
    }),
];


export const validateLogin = [
    body('email').isEmail().withMessage('enter valid email'),
    body('password').notEmpty().withMessage("password can't be empty")
];