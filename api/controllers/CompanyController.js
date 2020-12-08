/**
 * CompanyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    async create(req, res) {
        // Get the name from the req params
        // Create a new record in the company model
        // Use create method from Company model
        // return the newly created Company with 200 status
        
        var params = req.allParams();

        if(!params.name) {
            return res.badRequest({err: 'name is a required field'});
        }

        var result = await Company.create({
            name: params.name, 
            city: params.city, 
            address: params.address
        }).fetch();

        if(!result) {
            return res.serverError();
        }

        return res.ok(result);
    },
    async find(req, res) {
        var companies = await Company.find();

        if(!companies) {
            return res.serverError();
        }

        return res.ok(companies);
    },
    findOne(req, res) {
        
    },
    update(req, res) {

    },
    delete(req, res) {

    }

};