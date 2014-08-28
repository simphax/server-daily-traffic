var exec = require('child_process').exec;

module.exports = {

  registerCurrentValue: function(repeater) {
    var previousRecord = null;
    var newRecord = null;

    async.series([
        function(callback){

          //For now, periods are one-day
          var fromDate = new Date();
          fromDate.setHours(0); //Local time
          fromDate.setMinutes(0);
          fromDate.setSeconds(0);
          fromDate.setMilliseconds(0);
          
          var toDate = new Date(fromDate);
          toDate.setDate(toDate.getDate()+1);//Next day 00:00 in local time
          
          //console.log("Finding records between "+fromDate+" and "+toDate);
          TrafficRecord.find({ periodStart_date: { '>=': fromDate, '<': toDate }, sort: 'periodStart_date DESC' }, function(err,data) {
            if(err) return callback(err);
            
            if(data.length > 0) {
              //we have at least one record the current period, select the last record
              //console.log(data);
              previousRecord = data[0];
              
              newRecord = {
                periodStart_dataIn: previousRecord.periodStart_dataIn,
                periodStart_dataOut: previousRecord.periodStart_dataOut,
                periodStart_date: new Date(previousRecord.periodStart_date),
                periodEnd_dataIn: 0,//Will be filled in later
                periodEnd_dataOut: 0,//Will be filled in later
                periodEnd_date: new Date() //now
              };
              return callback();
            } else {
              //No earlier occurences, create a new period
              var now = new Date();

              previousRecord = {
                periodStart_dataIn: 0,
                periodStart_dataOut: 0,
                periodStart_date: now,
                periodEnd_dataIn: 0,
                periodEnd_dataOut: 0,
                periodEnd_date: now
                };
              newRecord = new Object(previousRecord);

              console.log("Could not find any records between "+fromDate+" and "+toDate);
              return callback(null,'newPeriod');
            }
            
          });
        },
        function(callback){
          exec("snmpget -v2c -c "+sails.config.snmp.community+" "+sails.config.snmp.gateway+" 1.3.6.1.2.1.31.1.1.1.6."+sails.config.snmp.interfaceIndex, function(error, stdout, stderr){
            if(error || stderr) {
              return callback(error);
            }

            //console.log(stdout);

            newRecord.periodEnd_dataIn = parseInt(stdout.split(':').pop());

            if(previousRecord.periodEnd_dataIn > newRecord.periodEnd_dataIn) {
              //Previous dataIn is larger than the new value. This probably means that the server or network has been reset.
              //Insert a new period instead
              console.log("Previous dataIn is larger than the new value. This probably means that the server or network has been reset.");
              return callback(null,'newPeriod');
            } else {
              return callback();
            }

          });
        },
        function(callback){
          exec("snmpget -v2c -c "+sails.config.snmp.community+" "+sails.config.snmp.gateway+" 1.3.6.1.2.1.31.1.1.1.10."+sails.config.snmp.interfaceIndex, function(error, stdout, stderr){
            if(error || stderr) {
              return callback(error);
            }

            //console.log(stdout);

            newRecord.periodEnd_dataOut = parseInt(stdout.split(':').pop());
            
            if(previousRecord.periodEnd_dataOut > newRecord.periodEnd_dataOut) {
              //Previous dataOut is larger than the new value. This usually means that the server or network has been reset.
              //Insert a new period instead
              console.log("Previous dataOut is larger than the new value. This probably means that the server or network has been reset.");
              return callback(null,'newPeriod');
            } else {
              return callback();
            }

          });
        }
      ],
      //callback
      function(err, results) {
        if(err){
          return console.log("Could not get data with snmp: "+err);
        }
        if(results.indexOf('newPeriod') != -1){
          newRecord.periodStart_dataIn = newRecord.periodEnd_dataIn;
          newRecord.periodStart_dataOut = newRecord.periodEnd_dataOut;
          newRecord.periodStart_date = new Date(newRecord.periodEnd_date);
          
          /////Workaround for sails disk database
          //newRecord.periodEnd_date = newRecord.periodEnd_date.toJSON();
          //newRecord.periodStart_date = newRecord.periodStart_date.toJSON();
          /////
          TrafficRecord.create(newRecord).exec(function createCB(err,created){
            if(err) return console.log("Could not save record: "+err);
            console.log("Created new record with id "+created.id+" starting at "+created.periodStart_date);
            //console.log(created);
            
            return repeater();
          });
        }
        else {
          /////Workaround for sails disk database
          //newRecord.periodEnd_date = newRecord.periodEnd_date.toJSON();
          //newRecord.periodStart_date = newRecord.periodStart_date.toJSON();
          /////
          TrafficRecord.update({id: previousRecord.id},newRecord).exec(function updateCB(err,updated){
            if(err) return console.log("Could not save record: "+err);
            console.log("Updated record "+updated[0].id+" with data from "+updated[0].periodStart_date+" and "+updated[0].periodEnd_date);
            //console.log(updated);
            
            return repeater();
          });
        }
      }
    );

    
  }

}