# grunt-photobox

[![Build Status](https://travis-ci.org/stefanjudis/grunt-photobox.png?branch=master)](https://travis-ci.org/stefanjudis/grunt-photobox) [![NPM version](https://badge.fury.io/js/grunt-photobox.png)](http://badge.fury.io/js/grunt-photobox) [![Dependency Status](https://gemnasium.com/stefanjudis/grunt-photobox.png)](https://gemnasium.com/stefanjudis/grunt-photobox) [![Code Climate](https://codeclimate.com/github/stefanjudis/grunt-photobox.png)](https://codeclimate.com/github/stefanjudis/grunt-photobox) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

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

#### ImageMagick and Canvas representation (generated diff):

![image](https://raw.github.com/stefanjudis/grunt-photobox/master/tasks/assets/img/imageMagick.png)

### Options


#### options.indexPath

Type: `String`

Default value: `photobox/`

A string value that is used to set the path to the generated images and **index.html**.

Per default a ```photobox``` folder will be generated and inside of that folder an index.html is located to check for broken layout.


#### options.screenSizes

Type: `Array`

Default value: `[ '800' ]`

**[NOTE: Values like '800x600' are deprecated since version 0.5.0.]**

An array containing strings, that represents the wished width in pixels of the taken pictures. The height will be calculated automatically depending on the given site.

E.g. **'800'** -> width: 800px;


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

Default value: `cssOverlay`

A string value that is used to set the template to display your screenshots.
Possible values:

- `canvas`  -> uses Canvas to show differences in screenshots.
- `magic`   -> uses ImageMagick to show the difference of old and new screenshots.

If you want to use ImageMagick by setting `options.template` to `magic` **make sure ImageMagick and included commands are installed on your system:**
Check the following commands in your environment:

```
$ which covert
/opt/local/bin/convert
```
```
$ which composite
/opt/local/bin/composite
```


#### options.useImageMagick

Type: `Boolean`

Default value: `false`

**[NOTE: This option is not supported anymore since version 0.6.0. If you want to use ImageMagick set it via `options.template`.]**


#### options.highlightColor

*- only `canvas` mode -*

Type: `String`

Default value: `#ff0000`

**[NOTE: This option is not supported for ImageMagick anymore since version 0.5.0.]**

If you switched on the usage of Canvas you have got the possibility to set the highlight color for the generated diff images to make it fit for your project.


### Usage Examples

#### Default Options

In this example, the default options are used to do just show what is possible. Run ```grunt photobox``` without any custom options and you will get a new file at ```photobox/index.html```.

It will consist of a screenshot for the default url ( http://google.com ) in the default width 800px.

```js
grunt.initConfig( {
  photobox: {
    task: {
      options: {}
    }
  }
});
```

#### Custom Options

Now let's customize everything for your needs.

```js
grunt.initConfig( {
  photobox: {
    task: {
      options: {
        screenSizes : [ '600', '1000', '1200' ],
        urls        : [ 'http://yoursite.com', 'http://yoursite.com/blog', 'http://yoursite.com/catalog' ]
      }
    }
  }
} );
```
This will generate you 9 screenshots - each url in each size.


#### Canvas usage

```js
grunt.initConfig( {
  photobox : {
    waisenkinder : {
      options : {
        indexPath      : 'photobox/',
        highlightColor : '#0000ff',
        screenSizes    : [ '960', '350', '1200' ],
        template       : 'canvas',
        urls           : [ 'http://4waisenkinder.de' ]
      }
    }
  }
} );
```


#### ImageMagick usage

```js
grunt.initConfig( {
  photobox : {
    waisenkinder : {
      options : {
        indexPath      : 'photobox/',
        screenSizes    : [ '960', '350', '1200' ],
        template       : 'magic',
        urls           : [ 'http://4waisenkinder.de' ]
      }
    }
  }
} );
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

Please check release history at [Github](https://github.com/stefanjudis/grunt-photobox/releases). :)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/stefanjudis/grunt-photobox/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

