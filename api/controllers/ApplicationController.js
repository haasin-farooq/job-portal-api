/**
 * ApplicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
    async create(req, res) {
        const { name, email, jobId } = req.allParams();

        if(!name) {
            return res.badRequest({err: 'name is a reuired field'});
        }
        if(!email) {
            return res.badRequest({err: 'email is a reuired field'});
        }
        if(!jobId) {
            return res.badRequest({err: 'jobId is a reuired field'});
        }

        const candidate = await Candidate.create({name, email}).fetch();

        if(!candidate) {
            return res.serverError();
        }

        const application = await Application.create({candidate: candidate.id, job: jobId}).fetch();

        if(!application) {
            return res.serverError();
        }

        return res.ok(application);
    },

    async find(req, res) {
        const applications = await Application.find();

        if(!applications) {
            return res.serverError();
        }

        return res.ok(applications);
    } 

};

