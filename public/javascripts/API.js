/**
  * Module to contain all the web API to interact with the server
**/

var api = {
  login : function(params){
    $.ajax({
      url : "http://" + window.location.host + "/api/v1/login",
      contentType: 'application/json',
      type : 'POST',
      data : JSON.stringify(params.data), //lvadmin/lvadmin
      success : params.success || function(){
        console.error('No callback given for login function');
      },
      error : function(xhr, status, err) {
        console.error(this.props.loginURL, status, err.toString());
      }.bind(this)
    });
  },
  fetchLectures : function(params){
    $.ajax({
      url : "http://" + window.location.host + "/api/lectures",
      contentType : "application/json",
      type : "POST",
      headers: { "Authorization": params.jwt },
      success : function(data){
        params.success(
          data
        );
      }.bind(this) || function(){
        console.error('No callback given for fetching Lecture data');
      },
      error : function(xhr, status, err) {
        console.error(this.props.loginURL, status, err.toString());
      }.bind(this)
    });
    /**setTimeout(function(){
      //Why setTimeout? because we must finish the
      //callstack from the previous AppDispatcher.dispatch.
      //this call WOULD BE asynchronous with a call to the
      //server, so this is a temporary subsitute to that.

    }, 50);**/
  },
  fetchMedia : function(params){
    setTimeout(function(){
      //Why setTimeout? because we must finish the
      //callstack from the previous AppDispatcher.dispatch.
      //this call WOULD BE asynchronous with a call to the
      //server, so this is a temporary subsitute to that.
      var fake_media = [
        { type : 'video',
          data : {
            id : '000000001',
            url : 'http://instantcena.com/media/quiet.mp4'
          }
        },
        { type : 'images',
          data : {
            id: '000000002',
            timestamps : [0,1,5,8,13]
          }
        },
        { type : 'images',
          data : {
            id: '000000003',
            timestamps : [0,4,9,15,19]
          }
        },
        { type : 'images',
          data : {
            id: '000000004',
            timestamps : [0,2,5,15,18]
          }
        }
      ];

      params.success(fake_media);
    }, 50);
  }
};

module.exports = api;
