var sm = sm || {};

sm.DateUtils = {
  
    //year = 2014
    getYearStart: function(year) {
      var dateObj = new Date();
      if(typeof year === "number") dateObj.setUTCFullYear(year);
      dateObj.setUTCMonth(0);
      dateObj.setUTCDate(1);
      this.dateToDay(dateObj);
      return dateObj;
    },

    getYearEnd: function(year) {
      var dateObj = new Date();
      if(typeof year === "number") {
        dateObj.setUTCFullYear(year+1);
      } else {
        dateObj.setUTCFullYear(dateObj.getUTCFullYear()+1);
      }
      dateObj.setUTCMonth(0);
      dateObj.setUTCDate(0);
      this.dateToDay(dateObj);
      return dateObj;
    },

    //0 = jan, 1 = feb, etc
    getMonthStart: function(month,year) {
      var dateObj = new Date();
      dateObj.setUTCDate(1);
      if(typeof month === "number") dateObj.setUTCMonth(month);
      if(typeof year === "number") dateObj.setUTCFullYear(year);
      this.dateToDay(dateObj);
      return dateObj;
    },

    //0 = jan, 1 = feb, etc
    getMonthEnd: function(month,year) {
      var dateObj = new Date();
      dateObj.setUTCDate(1); //In case the date is 31 we prevent the month to shift
      if(typeof month === "number") {
        dateObj.setUTCMonth(month+1);
      } else {
        dateObj.setUTCMonth(dateObj.getUTCMonth()+1);
      }
      if(typeof year === "number") dateObj.setUTCFullYear(year);
      dateObj.setUTCDate(0);//Will set the day to the day before 1st (means last day of last month)
      this.dateToDay(dateObj);
      return dateObj;
    },

    getToday: function() {
      var dateObj = new Date();
      this.dateToDay(dateObj);
      return dateObj;
    },

    getDayList: function(from,to) {

      var from = new Date(from);
      var to = new Date(to);

      var list = [];

      while(from.getTime() <= to.getTime()) {
        list.push(new Date(from));
        from.setUTCDate(from.getUTCDate()+1);
      }

      return list;
    },

    formatDayString: function(dateObj) {
      var date = dateObj.getUTCDate();
      var month = dateObj.getUTCMonth()+1;
      var year = dateObj.getUTCFullYear();
      return year + "-" + ('0' + month).slice(-2) + "-" + ('0' + date).slice(-2);
    },

    dateToDay: function(date) {
      date.setUTCHours(0);
      date.setUTCMinutes(0);
      date.setUTCSeconds(0);
      date.setUTCMilliseconds(0);
    }
  };

//Export as a node.js module if possible
if(typeof module === 'object') {
  module.exports = sm.DateUtils;
}