
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

    condition: function (data) {
      return poppins.getContributors().then(function (contributors) {
        return contributors.some(function (user) {
          return user.login === data.pull_request.user.login;
        });
      });
    }
  };

  plugins.prChecklist.checks.push(plugins.checkCla);
};
