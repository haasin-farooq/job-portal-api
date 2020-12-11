/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const Joi = require('joi'); 
const JWTService = require('../services/JWTService');
const UtilService = require('../services/UtilService');

module.exports = {

    signup: async (req, res) => {
        try {
            const schema = Joi.object().keys({
                email: Joi.string().required().email(),
                password: Joi.string().required()
            });
    
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
        try {
            const schema = Joi.object().keys({
                email: Joi.string().required().email(),
                password: Joi.string().required()
            });

            const { email, password } = await schema.validateAsync(req.allParams());

            const user = await User.findOne({email});

            if(!user) {
                return res.notFound({err: 'user does not exist'});
            }

            const matchedPassword = await UtilService.comparePassword(password, user.password);

            if(!matchedPassword) {
                return res.badRequest({err: 'unauthorized'});
            }

            const token = JWTService.issuer({user: user.id}, '1 day');

            return res.ok(token);
        } 
        catch(err) {
            if(err === 'ValidationError') {
                return res.badRequest({err});
            }
            return res.serverError(err);
        }
    }

};

