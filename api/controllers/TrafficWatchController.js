/**
 * TrafficWatchController
 *
 * @description :: Server-side logic for managing trafficwatches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	api_traffic: function(req, res, next) {

      var fromDate = new Date();
      fromDate.setHours(0); //Local time
      fromDate.setMinutes(0);
      fromDate.setSeconds(0);
      fromDate.setMilliseconds(0);
      
      var toDate = new Date();
      toDate.setHours(0); //Local time
      toDate.setMinutes(0);
      toDate.setSeconds(0);
      toDate.setMilliseconds(0);
      toDate.setDate(toDate.getDate()+1);

      if(req.param('year')) {
        fromDate.setFullYear(+req.param('year'));
        toDate.setFullYear(+req.param('year'));
      }

      if(req.param('month')) {
        fromDate.setMonth((+req.param('month'))-1);
        toDate.setMonth((+req.param('month'))-1);
      }

      if(req.param('day')) {
        fromDate.setDate(+req.param('day'));
        toDate.setDate(+req.param('day')+1);
      }


      TrafficRecord.getTotalTrafficBetween(fromDate,toDate,function(err,traffic){
        if(err) return res.serverError(err);
        
        return res.json(traffic);
      });

	}
	
};

