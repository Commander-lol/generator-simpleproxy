'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var SimpleproxyGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super simple SimpleProxy proxy generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'portNum',
      message: 'What port will SimpleProxy be running on?',
      default: 8080,
      validate: function(n){
        return isNaN(n) ? "Port must be numeric" : true;
      }
    }];

    this.prompt(prompts, function (props) {
      this.portNum = props.portNum;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('config');

      this.src.copy('_package.json', 'package.json');
      this.src.copy('_proxy.js', 'proxy.js');
      this.src.copy('_misc-util.js', 'misc-util.js');
      this.src.copy('config/_routes.config.js', 'config/routes.config.js');
      this.template('config/_proxy.config.js', 'config/proxy.config.js', {port: this.portNum});
    },

    projectfiles: function () {

    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = SimpleproxyGenerator;
