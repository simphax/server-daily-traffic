/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

/*********** SOME TESTING
var fromDate = new Date('2014-08-27');
          fromDate.setHours(0); //Local time
          fromDate.setMinutes(0);
          fromDate.setSeconds(0);
          fromDate.setMilliseconds(0);
          var toDate = new Date('2014-08-27');
          toDate.setHours(18); //Local time
          toDate.setMinutes(0);
          toDate.setSeconds(0);
          toDate.setMilliseconds(0);

  var newRecord = {
                periodStart_dataIn: 0,
                  periodStart_dataOut: 0,
                  periodStart_date: fromDate,
                  periodEnd_dataIn: 2000,
                  periodEnd_dataOut: 3000,
                  periodEnd_date: toDate
                };

  TrafficRecord.create(newRecord).exec(function createCB(err,created){
    if(err) return console.log("Could not save record: "+err);
    console.log("Created new record with id "+created.id+" starting at "+created.periodStart_date);
    //console.log(created);

    fromDate = new Date('2014-08-27');
          fromDate.setHours(19); //Local time
          fromDate.setMinutes(0);
          fromDate.setSeconds(0);
          fromDate.setMilliseconds(0);
    toDate = new Date('2014-08-27');
            toDate.setHours(22); //Local time
            toDate.setMinutes(0);
            toDate.setSeconds(0);
            toDate.setMilliseconds(0);
            
    newRecord = {
                periodStart_dataIn: 0,
                  periodStart_dataOut: 0,
                  periodStart_date: fromDate,
                  periodEnd_dataIn: 4000,
                  periodEnd_dataOut: 5000,
                  periodEnd_date: toDate
                };

    TrafficRecord.create(newRecord).exec(function createCB(err,created){
      if(err) return console.log("Could not save record: "+err);
      console.log("Created new record with id "+created.id+" starting at "+created.periodStart_date);
      //console.log(created);

      fromDate = new Date('2014-08-28');
          fromDate.setHours(0); //Local time
          fromDate.setMinutes(0);
          fromDate.setSeconds(0);
          fromDate.setMilliseconds(0);
    toDate = new Date('2014-08-28');
            toDate.setHours(0); //Local time
            toDate.setMinutes(20);
            toDate.setSeconds(0);
            toDate.setMilliseconds(0);
            
    newRecord = {
                periodStart_dataIn: 0,
                  periodStart_dataOut: 0,
                  periodStart_date: fromDate,
                  periodEnd_dataIn: 9000000000,
                  periodEnd_dataOut: 900000000,
                  periodEnd_date: toDate
                };

    TrafficRecord.create(newRecord).exec(function createCB(err,created){
      if(err) return console.log("Could not save record: "+err);
      console.log("Created new record with id "+created.id+" starting at "+created.periodStart_date);
      //console.log(created);

      function repeater() {
        setTimeout(function(){Snmp.registerCurrentValue(repeater);},sails.config.snmp.updateFrequency);
      }
      Snmp.registerCurrentValue(repeater);
    });
    });
  });
**************/
  
  function repeater() {
    setTimeout(function(){Snmp.registerCurrentValue(repeater);},sails.config.snmp.updateFrequency);
  }
  Snmp.registerCurrentValue(repeater);
  
  
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
