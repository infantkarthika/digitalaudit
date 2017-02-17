'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('user', ['core']);
ApplicationConfiguration.registerModule('signup', ['core']);
ApplicationConfiguration.registerModule('signin', ['core']);
ApplicationConfiguration.registerModule('forgotpwd', ['core']);
ApplicationConfiguration.registerModule('account', ['core']);