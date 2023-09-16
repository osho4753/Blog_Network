import {body} from 'express-validator'

export const registerValidation = [
        body('email','Incorrect Email Format').isEmail(),
        body('password','Incorrect Password Type').isLength({min:5}),
        body('fullName','Incorrect Name Format').isLength({min:3}),
        body('imageUrl','Incorrect Avatar Type').optional().isString(),
]

export const loginValidation = [
        body('email','Incorrect Email Format').isEmail(),
        body('password','Incorrect Password Type').isLength({min:5}),
]

export const postCreateValidation = [
        body('title','Type Please Title').isLength({min:4}).isString(),
        body('text','Type Please Your Text').isLength({min:3}).isString(),
        body('tags','Incorrect Tags Format(type array)').optional().isArray(),
        body('postUrl','Incorrect Image Type').optional().isString(),
        body('comments','No comments').optional(),

]