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

      TrafficRecord.getTotalTrafficBetween(fromDate,toDate,function(err,traffic){
        if(err) return res.serverError(err);
        
        return res.json({
          totalTraffic: traffic.totalTraffic,
          since: traffic.from,
        });
      });

	}
	
};

