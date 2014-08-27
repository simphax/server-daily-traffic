/**
* TrafficRecord.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
  schema: false,

  attributes: {
    periodStart: {
      type: 'json'
    },
    periodEnd: {
      type: 'json'
    }
  },
  
  //callback(err,total traffic in bytes)
  getTotalTrafficBetween: function(fromDate, toDate, callback) {
    TrafficRecord.find({ 
      periodStart: {
        date: { '>=': fromDate }
      },
      periodEnd: 
      {
        date: { '<': toDate }
      },
      sort: 'periodStart.date ASC'
    },function(err,data){
      if(err) return callback(err);
      if(data.length<=0) return callback({message: "No records registered for this period"});
		  
      var totalTraffic = 0;
      
      data.forEach(function(record){
        totalTraffic += (record.periodEnd.dataIn - record.periodStart.dataIn) + (record.periodEnd.dataOut - record.periodStart.dataOut);
      });
      
      callback(null,{
          totalTraffic: totalTraffic,
          from: data[0].periodStart.date,
          to: data[data.length-1].periodEnd.date
      });
    });
  }
};

