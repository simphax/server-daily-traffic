/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  view: function(req, res, next) {
    var date = new Date(); 
    res.view('homepage',{

    });
  }
};

