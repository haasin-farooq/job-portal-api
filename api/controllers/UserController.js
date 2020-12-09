/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const Joi = require('joi'); 
const UtilService = require('../services/UtilService');

module.exports = {

    signup: async (req, res) => {
        try {
            const schema = Joi.object().keys({
                email: Joi.string().required().email(),
                password: Joi.string().required()
            })
    
            const { email, password } = await schema.validateAsync(req.allParams());
            const encryptedPassword = await UtilService.hashPassword(password);

            const user = await User.create({email, password: encryptedPassword});
    
            return res.ok(user);
        } 
        catch(err) {
            if(err === 'ValidationError') {
                return res.badRequest({err});
            }
            return res.serverError(err);
        }
    },

    login: async (req, res) => {

    }

};

