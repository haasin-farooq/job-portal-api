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
        var companies = await Company.find()
        .populate('jobs');

        if(!companies) {
            return res.serverError();
        }

        return res.ok(companies);
    },

    async findOne(req, res) {
        var id = req.param('id');

        var company = await Company.findOne({id})
        .populate('jobs');

        if(!company) {
            return res.serverError();
        }

        return res.ok(company);
    },
    
    async update(req, res) {
        var params = req.allParams();

        var attributes = {};

        if(params.name) {
            attributes.name = params.name;

            var updatedCompany = await Company.update({id: params.id})
            .set({
                name: attributes.name
            }).fetch();
        }
        if(params.city) {
            attributes.city = params.city;

            var updatedCompany = await Company.update({id: params.id})
            .set({
                city: attributes.city
            }).fetch();
        }
        if(params.address) {
            attributes.address = params.address;

            var updatedCompany = await Company.update({id: params.id})
            .set({
                address: attributes.address
            }).fetch();
        }

        if (!updatedCompany) {
            return res.serverError();
        }

        return res.ok(updatedCompany);
    },
    
    async delete(req, res) {
        var id = req.param('id');

        var deletedCompany = await Company.destroy({id}).fetch();

        if(!deletedCompany) {
            return res.serverError();
        }

        return res.ok(deletedCompany);
    }

};