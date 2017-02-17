'use strict';

angular.module('digitalaudit').factory('digitalauditServices', function($http) {
  var getPages = '/api/digitalaudit/getPages',
      getFields = '/api/digitalaudit/getFields',
      getLabels = '/api/digitalaudit/getLabels',
      getSelectOptions = '/api/digitalaudit/getSelectOptions',
      getFormData = 'api/digitalaudit/getFormData',
      updateFormData = 'api/digitalaudit/updateFormData',
      submitFormData = 'api/digitalaudit/submitFormData',
      dataFactory = {};

  dataFactory.getPages = function() {
    return $http.get(getPages);
  }

  dataFactory.getFields = function(pageId) {
    var pageIdParam = {
      params: {
        pageId: pageId
      }
    }
    return $http.get(getFields, pageIdParam);
  }

  dataFactory.getLabels = function() {
    return $http.get(getLabels);
  }
  
  dataFactory.getSelectOptions = function(fieldId) {
    var fieldIdParam = {
      params: {
        fieldId: fieldId
      }
    }
    return $http.get(getSelectOptions, fieldIdParam);
  }

  dataFactory.getFormData = function(formId) {
    var formIdParam = {
      params: {
        formId: formId
      }
    }
    return $http.get(getFormData, formIdParam);
  }

  dataFactory.updateFormData = function(formData) {
    var formDataParam = {
      formData: formData
    }
    return $http.post(updateFormData, formDataParam);
  }

  dataFactory.submitFormData = function(formData) {
    var formDataParam = {
      formData: formData
    }
    return $http.post(submitFormData, formDataParam);
  }

  return dataFactory;
});
