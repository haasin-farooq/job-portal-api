/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  
    // Company
    'POST /companies': 'CompanyController.create',
    'GET /companies': 'CompanyController.find',
    'GET /companies/:id': 'CompanyController.findOne',
    'PATCH /companies/:id': 'CompanyController.update',
    'DELETE /companies/:id': 'CompanyController.delete',

    // Job
    'POST /jobs': 'JobController.create',
    'GET /jobs': 'JobController.find',

    // Application
    'POST /applications': 'ApplicationController.create',
    'GET /applications': 'ApplicationController.find',

    // Candidate
    'GET /candidates': 'CandidateController.find',

    // User
    'POST /user/signup': 'UserController.signup',
    'POST /user/login': 'UserController.login'

};