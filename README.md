TADA! - Test Angular Driven Application 
====

Handy utils for Angular unit testing

1. [What](#what)
2. [Why](#why)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API](#api)
6. [Demo](#demo)


## What

TADA is a set of smart spies that will make your unit tests more readable.

It was born after writing the same patterns again and again and after writing hundreds of bad looking / unreadble tests.

For more info checkout our [slides](https://slides.com/nadav/how-not-to-test-your-angular-application#/) and talk we gave at [AngularJS IL](http://www.meetup.com/AngularJS-IL/events/220091391/) (Video coming soon)

## Why

1. Your tests will look better and will be more readable.
2. No more writing the same mocks over and over again.
3. No more writing complicated async mocks using $q and adding ugly $disget() calls in the middle of your tests.
4. Use our enhanced spies with the apis such as:```js
spy.whenCalledWithArgs(myArgs).returns(customResponse);
```

## Installation

Download latest release from [here](https://github.com/ofirdagan/tada/releases) or use bower (recommended)

```sh
bower install tada --save-dev
```

## Usage

- Load tada.js in your favourite test runner (i.e karma): 

```js
    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/tada/dist/concat/scripts/tada.js',
    ]
```

- Create your app test kit file (recommended place is under specs/lib)

```js

'use strict';

angular.module('myAppTestKit', ['tada'])
  .service('myServiceMock', function (tadaUtils) {
    this.asyncServiceMethod = tadaUtils.createAsyncFunc('async service method');
    this.syncedMethod = tadaUtils.createFunc('service synced method');
  })
  .service('thirdPartyServiceMock', function (tadaUtils) {
    this.doSomething = tadaUtils.createFunc('do something');
  });

```

- Load the test kit module in your test and pick which dependencies you whould like to mock.

```js
    module('myAppTestKit', function (tadaUtilsProvider) {
      tadaUtilsProvider.mock('thirdPartyService');
    });
```

## API
Cooming soon


## Demo

You can checkout TADA showcase [here](https://github.com/nadav-dav/tada-example)
