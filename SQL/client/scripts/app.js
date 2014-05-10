app = {
    server: 'http://127.0.0.1:3000/classes/chatterbox',
    username: 'anonymous',
    lastMessageId: 0,

    init: function() {
      console.log('running chatterbox');
      // Get username
      app.username = window.location.search.substr(10);
      app.loadAllMessages();

      // cache some dom references
      app.$text = $('#message');

      $('#send').on('submit', app.handleSubmit);
    },

    loadAllMessages: function(){
      app.loadMsgs();
      setTimeout(app.loadAllMessages, 500);
    },

    handleSubmit: function(e){
      e.preventDefault();

      var message = {
        username: app.username,
        text: app.$text.val()
      };

      app.$text.val('');

      app.sendMsg(message);
    },

    renderMessage: function(message){
      var $user = $("<div>", {class: 'user'}).text(message.username);
      var $text = $("<div>", {class: 'text'}).text(message.text);
      var $message = $("<div>", {class: 'chat', 'data-id': message.objectId }).append($user, $text);
      return $message;
    },

    processNewMessage: function(message, objectId){
      message.objectId = objectId;
      app.processNewMessages([message]);
    },

    processNewMessages: function(messages){
      $('#chats').empty();
      // messages arrive newest first
      for( var i = messages.length; i > 0; i-- ){
        var message = messages[i-1];
        $('#chats').prepend(app.renderMessage(message));
      }
    },

    loadMsgs: function(){
      $.ajax({
        url: app.server,
        contentType: 'application/json',
        success: function(json){
          //console.log(json.results);
          app.processNewMessages(json.results);
        },
        complete: function(){
          app.stopSpinner();
        }
      });
    },

    sendMsg: function(message){
      $.ajax({
        type: 'POST',
        url: app.server,
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function(json){
          //console.log(json);
          app.processNewMessage(message, json.objectId);
        },
        complete: function(){
          app.stopSpinner();
        }
      });
    },

    startSpinner: function(){
      $('.spinner img').show();
      $('form input[type=submit]').attr('disabled', "true");
    },

    stopSpinner: function(){
      $('.spinner img').fadeOut('fast');
      $('form input[type=submit]').attr('disabled', null);
    }

};
