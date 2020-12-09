/**
 * JobController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
  create: async function (req, res) {
    const { title, description, salary, position, companyId } = req.allParams();

    if(!title) {
      return res.badRequest({err: 'title is a required field'});
    }
    if(!salary) {
      return res.badRequest({err: 'salary is a required field'});
    }
    if(!companyId) {
      return res.badRequest({err: 'companyId is a required field'});
    }

    const jobDetail = await JobDetail.create({description, salary, position}).fetch();

    if(!jobDetail) {
      return res.serverError();
    }

    const job = await Job.create({title, jobDetail: jobDetail.id, company: companyId}).fetch();

    if(!job) {
      return res.serverError();
    }

    return res.ok(job);
  },

  find: async function (req, res) {
    const jobsWithDetails = await Job.find()
    .populate('jobDetail')
    .populate('company');

    if(!jobsWithDetails) {
      return res.serverError();
    }

    return res.ok(jobsWithDetails);
  }

};

