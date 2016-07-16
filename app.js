angular.module('videoUpload', []);

function MainCtrl($scope,$timeout) {
    
};


angular.module('videoUpload').directive('customCarousel', function($timeout,$http,$location) {

    return {
        restrict : 'A',
        transclude : true,
        scope: '',
        link: function(scope, element, attrs) {
            scope.progress = 0;
            scope.errormsg = '';
            scope.text_status = 'Select Mp4 format Video to upload';
            $('#fileupload').fileupload({
                type: 'POST',
                loadVideoFileTypes: /^video\/.*$/,
                add: function (e, data) {
                    var uploadFile = data.files[0];
                    if ((/\.(mp4)$/i).test(uploadFile.name)) {
                        data.submit().error(function (jqXHR, textStatus, errorThrown) {
                          console.log(JSON.parse(jqXHR.responseText).error);
                          scope.errormsg = JSON.parse(jqXHR.responseText).error;
                          scope.$apply();
                        });
                        
                    }
                    else {
                        scope.text_status = 'You must Upload video with mp4 format';
                        scope.$apply();
                    }
                    
                },
                done: function (e, data) {
                    scope.videoId = 'http://fast.wistia.net/embed/iframe/'+data.result.hashed_id;
                    scope.text_status = data.files[0].name;
                    scope.$apply();
                        
                },
                progressall: function (e, data) {
                    scope.progress = parseInt(data.loaded / data.total * 100, 10);
                    scope.text_status = 'Uploading...';
                   // $('<p/>').text(file.name).appendTo(document.body);
                    scope.$apply();
                }
            });
        },
        templateUrl: 'videoUpload_directive.html'
    };
});