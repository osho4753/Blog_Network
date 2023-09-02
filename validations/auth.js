import {body} from 'express-validator'
export const registerValidation = [
        body('email','Incorrect Email Format').isEmail(),
        body('password','Incorrect Password Type').isLength({min:5}),
        body('fullName','Incorrect Name Format').isLength({min:3}),
        body('imageUrl','Incorrect Avatar Type').optional().isURL(),
]
