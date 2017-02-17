'use strict';

angular.module('digitalaudit').controller('digitalauditController', ['$rootScope', '$scope', '$state', '$window', '$location', 'digitalauditServices',
  function ($rootScope, $scope, $state, $window, $location, digitalauditServices) {

    $scope.formId = $state.params.formId;
    $scope.pageId = $state.params.pageId;
    $scope.pageDetails = {};
    $scope.fieldDetails = {};
    $scope.selectOptions = {};
    $scope.formData = {};
    $scope.progressBar = 0;
    $scope.dispPrevious = 0;
    $scope.isDisabledNext = true;

    // Check if the form is valid for the user, otherwise redirect to dashboard
    if($rootScope.allowedFormIds == undefined) {
      if($window.localStorage.getItem("GO_allowedFormIds") === null) {
        $location.path("/dashboard");
      }
      $rootScope.allowedFormIds = $window.localStorage.getItem("GO_allowedFormIds");
    }
    
    if($rootScope.allowedFormIds.indexOf($scope.formId*1) < 0) {
      $location.path("/dashboard");
    }

    // Get pages
    $scope.getPages = function() {
      digitalauditServices.getPages().then(function(response) {

        $scope.pageDetails = response.data;
        $scope.pageIconWidth = 100/$scope.pageDetails.length;

        $scope.pageCollection = $scope.pageDetails.map(function(val,index) {
          return val.page_id;
        });

        $scope.pageId = $state.params.pageId || $scope.pageCollection[0];
        $scope.getFields($scope.pageId);
        $scope.progressBar = ($scope.getPosition($scope.pageId) * $scope.pageIconWidth) + $scope.pageIconWidth/2;
        $scope.dispPrev = $scope.getPosition($scope.pageId);
        $scope.dispNext = $scope.getPosition($scope.pageId) < ($scope.pageDetails.length-1);
        $scope.dispSubmit = !$scope.dispNext;
        
        if($scope.dispPrev) {
          $scope.prevLink = '/digitalaudit/' + $scope.formId + '/' + $scope.pageCollection[$scope.getPosition($scope.pageId)-1];
        }

        if($scope.dispNext) {
          $scope.nextLink = '/digitalaudit/' + $scope.formId + '/' + $scope.pageCollection[$scope.getPosition($scope.pageId)+1];
        }

      }, function (error) {
        $scope.error = error.message;
      });
    };

    // Get fields inside the page (labels)
    $scope.getFields = function(pageId) {
      digitalauditServices.getFields(pageId).then(function (response) {

        $scope.fieldDetails = response.data;

        // Get field id for select elements
        var selectFieldsList = $scope.fieldDetails.filter(function(val, index){
          if(val.field_type.toLowerCase() == "select")
            return val;
        });

        if(selectFieldsList.length) {
          selectFieldsList.forEach(function(val, index){
            $scope.getSelectOptions(val.field_mapping_id);
          });
        } else {
          $scope.getFormData($scope.formId);
        }

      }, function (error) {
        $scope.error = error.message;
      });
    };

    // Get options for select element
    $scope.getSelectOptions = function(fieldId) {      
      digitalauditServices.getSelectOptions(fieldId).then(function (response) {

        var selectOptionsArr = response.data;

        selectOptionsArr.forEach(function(val, index) {
          if($scope.selectOptions[val.field_mapping_id] == undefined) {
            $scope.selectOptions[val.field_mapping_id] = [];
          }
          $scope.selectOptions[val.field_mapping_id].push(val.select_value);
        });

        $scope.getFormData($scope.formId);

      }, function (error) {
        $scope.error = error.message;
      });
    };

    // Get data filled by user
    $scope.getFormData = function(formId) {
      digitalauditServices.getFormData(formId).then(function (response) {

        $scope.formData = response.data;
        var last_page_completed = response.data.last_page_completed || $scope.pageCollection[0];

        if($scope.getPosition($scope.pageId)<0) {
          $location.path('/digitalaudit/'+formId+'/'+last_page_completed);
        }

      }, function (error) {
        $scope.error = error.message;
      });
    }

    // Update form data to temporary database
    $scope.pageSubmit = function(isValid) {
      $scope.isDisabledNext = true;
      $scope.formData.last_page_completed = $scope.pageId;
      var isLastPage = false;
      if($scope.getPosition($scope.pageId) == ($scope.pageCollection.length-1)) {
        $scope.formData.form_status = true;
        isLastPage = true;
      }
      if(isValid) {
        digitalauditServices.updateFormData($scope.formData).then(function (response) {
          if(response.data) {
            if(isLastPage) {
              $scope.pushToSF();
            } else {
              $location.path($scope.nextLink);              
            }
          }
        }, function (error) {
          $scope.error = error.message;
        });
      } else {
        alert("Please fix some errors in the form!");
        $scope.isDisabledNext = true;
      }
    }

    // Push data to Salesforce
    $scope.pushToSF = function() {
      $scope.isDisabledNext = true;
      delete $scope.formData.digitalaudit_form_submission_id;
      delete $scope.formData.last_page_completed;
      delete $scope.formData.user_id;
      delete $scope.formData.form_status;
      delete $scope.formData.active;

      digitalauditServices.submitFormData($scope.formData).then(function (response) {
        if(response.data) {
          alert("Thanks for submission!");
          $location.path("/dashboard");
        }
      }, function (error) {
        $scope.error = error.message;
      });
    }

    // Get the current position of the page
    $scope.getPosition = function(value) {
      return $scope.pageCollection.indexOf(value*1);
    }

    // Change the progree icon to activated
    $scope.submitAction = function() {
      $scope.progressBar = 100;
      var iconId = $scope.pageDetails.length-1;
      angular.element(document.querySelector('#page-' + iconId)).removeClass('active');
      angular.element(document.querySelector('#page-' + iconId)).addClass('activated');
      angular.element(document.querySelector('#pageicon-' + iconId)).removeClass('fa-ellipsis-h');
      angular.element(document.querySelector('#pageicon-' + iconId)).addClass('fa-check');
    }

    // Set or remove error classes
    $scope.errorClass = function (control, method) {
      if ($scope.digitalauditForm[control]!=undefined && $scope.digitalauditForm[control].$invalid && !$scope.digitalauditForm[control].$pristine) {
        $scope.isDisabledNext = true;
        return (method == "class" ? 'has-error' : true);
      } else {
        $scope.isDisabledNext = false;
      }
    }
  }
  ]);