var app = angular.module('WikiViewer', ['ngAnimate']);
app.controller('MainCtrl', function($scope, $http) {
  var search = $('#search');
  var form = $('form');
  var input = $('input');
  var close = $('.commutator');
  var icon = $("#icon");
  
  $scope.results = [];

  close.on('click', function() {
    form.toggleClass('open');
    
    if (!form.hasClass('open') && $scope.searchTxt !== '' && typeof $scope.searchTxt !== 'undefined') {
	   search.toggleClass('upward')
      icon.toggleClass('hide');
      $scope.searchTxt = '';
    } 
    $scope.results = [];
    $scope.$apply();
  })

  input.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
    if (form.hasClass('open')) {
      input.focus();
    } else {
      return;
    }
  })

  $scope.search = function() {
    $scope.results = [];
    icon.addClass('hide');
    search.removeClass('upward');
    var title = input.val();
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var callBack = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';
    
    $http.jsonp(api + title + callBack)
    .success(function(data) {
      var results = data.query.pages;
      angular.forEach(results, function(currentValue)  {
        $scope.results.push({title: currentValue.title, body: currentValue.extract, page: page + currentValue.pageid})
      })
    });
  }
});