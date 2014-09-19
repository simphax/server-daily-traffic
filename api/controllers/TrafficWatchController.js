/**
 * TrafficWatchController
 *
 * @description :: Server-side logic for managing trafficwatches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var DateUtils = require('../../assets/common/DateUtils');

module.exports = {

	//Total traffic for a day
	api_traffic_day: function(req, res, next) {

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

	},
	
	//Should return a list of all days since param "since"
	api_traffic_days: function(req, res, next) {

      var fromDate = new Date(req.param('from'));
      
      
      var toDate = new Date(req.param('to'));
      
      
      var dayList = DateUtils.getDayList(fromDate, toDate);

      var trafficResults = [];
      
      async.eachSeries(dayList, function(day, cb) {
        day.setHours(0); //Local time
        day.setMinutes(0);
        day.setSeconds(0);
        day.setMilliseconds(0);
        
        var dayEnd = new Date(day);
        dayEnd.setDate(day.getDate()+1);
        
        TrafficRecord.getTotalTrafficBetween(day, dayEnd, function(err,traffic){
          if(!err && traffic) {
            trafficResults.push(traffic);
          }
          return cb();
        });
        
      }, function(err){
        console.log(trafficResults);
        console.log(err);
        if( err ) return res.serverError("Something went wrong: ",err);
        return res.json(trafficResults);
      });

      

	}
	
};

