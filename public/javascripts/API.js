/**
  * Module to contain all the web API to interact with the server
**/

var api = {
  login : function(params){
    $.ajax({
      url : "http://present.cs.umass.edu:9000/api/auth",
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
    setTimeout(function(){
      //Why setTimeout? because we must finish the
      //callstack from the previous AppDispatcher.dispatch.
      //this call WOULD BE asynchronous with a call to the
      //server, so this is a temporary subsitute to that.
      params.success([
        {display : false, classname : "COMPSCI 497",
        date : "10/14/15"},
        {display : false, classname : "COMPSCI 326",
        date : "10/13/15"},
        {display : false, classname : "COMPSCI 497",
        date : "10/11/15"}
      ]);
    }, 50);
  }
};

module.exports = api;
