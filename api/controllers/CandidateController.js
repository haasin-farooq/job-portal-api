/**
 * CandidateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
    async find(req, res) {
        const candidates = await Candidate.find();

        if(!candidates) {
            return res.serverError();
        }

        return res.ok(candidates);
    }

};

