# poppins-check-cla

A [Mary Poppins](https://github.com/btford/mary-poppins) plugin for checking whether a user has signed a CLA or not.
Requires the [`pr-checklist`](https://github.com/btford/poppins-pr-checklist) plugin.

It does this "check" by seeing if the user submitting the PR has contributed before.

## Install

`npm install poppins-check-cla`


## Configure

To use this plugin, you need to load it in your config file with `couldYouPlease`:


```javascript
// config.js
module.exports = function (poppins) {

  poppins.config = { /*...*/ };

  // pr checklist config
  poppins.couldYouPlease('pr-checklist');
};
```

## License
MIT
