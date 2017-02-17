'use strict';

/**
 * Module dependencies
 */
var digitalaudit = require('../controllers/digitalaudit.server.controller');

module.exports = function(app) {

  app.route('/api/digitalaudit/getPages').get(digitalaudit.getPages);
  app.route('/api/digitalaudit/getFields').get(digitalaudit.getFields);
  app.route('/api/digitalaudit/getLabels').get(digitalaudit.getLabels);
  app.route('/api/digitalaudit/getSelectOptions').get(digitalaudit.getSelectOptions);
  app.route('/api/digitalaudit/getFormData').get(digitalaudit.getFormData);
  app.route('/api/digitalaudit/updateFormData').post(digitalaudit.updateFormData);
  app.route('/api/digitalaudit/submitFormData').post(digitalaudit.submitFormData);
  
};