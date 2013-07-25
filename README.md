# grunt-photoBox

> Plugin to prevent projects of broken layout via screenshot photo sessions.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-photoBox --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-photoBox');
```

## The "photoBox" task

### Overview
In your project's Gruntfile, add a section named `photoBox` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  photoBox: {
    options: {
      // Task-specific options go here.
    }
  },
})
```

### Options

#### options.indexPath
Type: `String`
Default value: `photoBox/`

A string value that is used to set the path to the generated images and **index.html**.

Per default the ```photoBox``` will be generated and inside of that folder is the index.html to check for broken layout.

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
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  photoBox: {
    options: {}
  }
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  photoBox: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
