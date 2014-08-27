/**
* TrafficRecord.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
  schema: true,

  attributes: {
    periodStart_dataIn: 'int',
    periodStart_dataOut: 'int',
    periodStart_date: 'date',
    periodEnd_dataIn: 'int',
    periodEnd_dataOut: 'int',
    periodEnd_date: 'date',
  },
  
  //callback(err,total traffic in bytes)
  getTotalTrafficBetween: function(fromDate, toDate, callback) {
    //console.log("Querying "+fromDate+" and"+toDate);
    TrafficRecord.find({ 
      periodStart_date: { '>=': fromDate },
      periodEnd_date: { '<=': toDate },
      sort: 'periodStart_date ASC'
    },function(err,data){
      if(err) return callback(err);
      if(data.length<=0) return callback({message: "No records registered for this period"});
		  //console.log(data);
      var totalTraffic = 0;
      
      data.forEach(function(record){
        totalTraffic += (record.periodEnd_dataIn - record.periodStart_dataIn) + (record.periodEnd_dataOut - record.periodStart_dataOut);
      });
      
      callback(null,{
          totalTraffic: totalTraffic,
          from: data[0].periodStart_date,
          to: data[data.length-1].periodEnd_date
      });
    });
  }
};

