var request = require('request');

var contributors = [];

// initially populate the list, then poll every six hours
// we need to do this because for now, checks must be sync
getContributors();
setInterval(getContributors, 1000 * 60 * 60 * 6);

module.exports = function (poppins) {
  var plugins = poppins.plugins;

  if (!plugins.prChecklist) {
    throw new Error('poppins-check-cla requires poppins-pr-checklist to be loaded first');
  }

  plugins.checkCla = {
    message:
      "Contributor [signed CLA]" +
          "(https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#signing-the-cla)" +
          " now or in the past\n" +
      "  - If you've already signed, leave a comment here with your real name. Thanks!",

    condition: function (pr) {
      return contributors.indexOf(pr.user.login) > -1;
    }
  };

  plugins.prChecklist.checks.push(plugins.checkCla);
};

function getContributors () {
  request({
    url: 'https://api.github.com/repos/angular/angular.js/contributors',
    json: true
  }, function (error, response, body) {
    if (!error && body) {
      contributors = body.map(function (user) {
        return user.login;
      });
    }
  });
}
