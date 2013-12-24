# grunt-photobox

[![Build Status](https://travis-ci.org/stefanjudis/grunt-photobox.png?branch=master)](https://travis-ci.org/stefanjudis/grunt-photobox) [![NPM version](https://badge.fury.io/js/grunt-photobox.png)](http://badge.fury.io/js/grunt-photobox) [![Dependency Status](https://gemnasium.com/stefanjudis/grunt-photobox.png)](https://gemnasium.com/stefanjudis/grunt-photobox) [![Code Climate](https://codeclimate.com/github/stefanjudis/grunt-photobox.png)](https://codeclimate.com/github/stefanjudis/grunt-photobox)

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

#### Default representation (no diff generation but overlay option):

![image](https://raw.github.com/stefanjudis/grunt-photobox/master/tasks/assets/img/default.png)

#### ImageMagick and Canvas representation (generated diff):

![image](https://raw.github.com/stefanjudis/grunt-photobox/master/tasks/assets/img/imageMagick.png)

### Options

#### options.indexPath
Type: `String`

Default value: `photobox/`

A string value that is used to set the path to the generated images and **index.html**.

Per default a ```photobox``` folder will be generated and inside of that folder an index.html is located to check for broken layout.

#### options.screenSizes !changed since version 0.5.0
Type: `Array`

Default value: `[ '800' ]`

**NOTE: Values like '800x600' are deprecated since version 0.5.0.**

An array containing strings, that represents the wished width in pixels of the taken pictures. The height will be calculated automatically depending on the given site.

E.g. **'800'** -> width: 800px;

**NOTE: Values like '800x600' are deprecated since version 0.5.0.**

#### options.urls
Type: `Array`

Default value: `[ 'http://google.com' ]`

An array containing strings, that represents the wished urls for the photosession.

#### options.userName
Type: `String`

Default value: ``

A string representing the username in case of HTTP-Authentification.

#### options.password
Type: `String`

Default value: ``

A string representing the password in case of HTTP-Authentification.

#### options.template
Type: `String`

Default value: `canvas`

A string value that is used to set the template to display your screenshots.
Possible values:

- `default` -> uses CSS overlays to compare screenshots. Use this template, if ImageMagick is not installed on your system and Canvas is not an option for you.
- `canvas`  -> uses Canvas to show differences in screenshots.
- `magic`   -> uses ImageMagick to show the difference of old and new screenshots.

#### options.useImageMagick !deprecated since version 0.6.0
Type: `Boolean`

Default value: false

**NOTE: This option is not supported anymore since version 0.6.0. If you want to use ImageMagick set it via `options.template`.**

Switch on the usage of imageMagick to see the difference of old and new images even clearer.
**make sure imageMagick and included commands are installed on your system:**
Check the following commands in your environment:

```
$ which covert
/opt/local/bin/convert
```
```
$ which composite
/opt/local/bin/composite
```

**NOTE: This option is not supported anymore since version 0.6.0. If you want to use ImageMagick set it via `options.template`.**

#### options.highlightColor !deprecated only for ImageMagick Template since version 0.5.0
Type: `String`

Default value: `#ff0000`

**NOTE: This option is not supported for ImageMagick anymore since version 0.5.0.**

If you switched on the usage of Canvas you have got the possibility to set the highlight color for the generated diff images to make it fit for your project. 

Unfortunately I had to drop the color feature for ImageMagick, because the `compare` method does not fit the needs of Photobox and I had to switch to `composite`, which does not support any diff color. 

But setting this option for Canvas mode is fine. :)

**NOTE: This option is not supported for ImageMagick anymore since version 0.5.0.**

### Usage Examples

#### Default Options
In this example, the default options are used to do just show what is possible. Run ```grunt photobox``` without any custom options and you will get a new file at ```photobox/index.html```.

It will consist of a screenshot for the default url ( http://google.com ) in the default width 800px.

```js
grunt.initConfig({
  photobox: {
  	task: {
	  options: {}
	}
  }
})
```

#### Custom Options
Now let's customize everything for your needs.

```js
grunt.initConfig({
  photobox: {
    task: {
      options: {
        screenSizes : [ '600', '1000', '1200' ],
        urls        : [ 'http://yoursite.com', 'http://yoursite.com/blog', 'http://yoursite.com/catalog' ]
      }
    }
  }
})
```

This will generate you 9 screenshots - each url in each size.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

Please check release history at [Github](https://github.com/stefanjudis/grunt-photobox/releases). :)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/stefanjudis/grunt-photobox/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

