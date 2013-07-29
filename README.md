# grunt-photobox [![Build Status](https://travis-ci.org/stefanjudis/grunt-photobox.png?branch=master)](https://travis-ci.org/stefanjudis/grunt-photobox) [![NPM version](https://badge.fury.io/js/grunt-photobox.png)](http://badge.fury.io/js/grunt-photobox) [![Dependency Status](https://gemnasium.com/stefanjudis/grunt-photobox.png)](https://gemnasium.com/stefanjudis/grunt-photobox)

![image](https://raw.github.com/stefanjudis/grunt-photobox/master/tasks/assets/img/photoBox.png)

> Plugin to prevent your project of broken layout via screenshot photo sessions of your site.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-photobox --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-photobox');
```

## The "photobox" task

### Overview
In your project's Gruntfile, add a section named `photobox` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  photobox: {
  	task : {
      options: {
      	// Task-specific options go here.
      }
    }
  },
})
```

Photobox helps you to not deploy any broken layout to production. It takes screenshots of you current site. 

**Additionally you got the feature, to keep the last photosession and to overlay old and new screenshots, to see even better if something is broken or not. BE ALWAYS SURE, THAT YOU HAVEN'T BROKEN LAYOUT THE EASY WAY.**



### Options

#### options.indexPath
Type: `String`
Default value: `photobox/`

A string value that is used to set the path to the generated images and **index.html**.

Per default the ```photobox``` will be generated and inside of that folder is the index.html to check for broken layout.

#### options.screenSizes
Type: `Array`
Default value: `[ '800x600' ]`

An array containing strings, that represent the wished dimensions of the pictures.

E.g. **'800x600'** -> width: 800px; height: 600px;

#### options.urls
Type: `Array`
Default value: `[ 'http://4waisenkinder.de' ]`

An array containing strings, that represent the wished urls for the photosession.

### Usage Examples

#### Default Options
In this example, the default options are used to do just show what is possible. Run ```grunt photobox``` without any custom options and you will get a new file at ```photobox/index.html```. 

It will consist of on screenshot for the default url ( http://4waisenkinder.de ) and the default size ( 800x600 ).

```js
grunt.initConfig({
  photobox: {
    options: {}
  }
})
```

#### Custom Options
Now let's customize everything for your needs. 

```js
grunt.initConfig({
  photobox: {
    options: {
      sizes: [ '600x900', '1000x900', '1200x900' ],
      urls:  [ 'http://yoursite.com', 'http://yoursite.com/blog', 'http://yoursite.com/catalog' ]
    }
  }
})
```

This will generate you 9 screenshots - each url in each size.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.2.0 - removed global phantomjs dependency

0.1.4 - notice for phantom to be installed

0.1.3 - minor fixes

0.1.2 - fixed Photobox-image on NPM, it really has to be there. ;)

0.1.1 - renamed everything from PhotoBox to Photobox, because NPM didn't like it

0.1.0 - Initial release.
