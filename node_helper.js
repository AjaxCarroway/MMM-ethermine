var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
  start: function () {
    console.log('ethermine helper started...');
  },

  getData: function (url) {
      var self = this;

      request({ url: url, method: 'GET' }, function (error, response, body) {
          if (!error && (response.statusCode == 200 || response.statusCode == 429)) {
            var result = JSON.parse(body);
            self.sendSocketNotification('DATA_RESULT', result);
          }
      });

  },

  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'GET_DATA') {
      this.getData(payload);
    }
  }

});
