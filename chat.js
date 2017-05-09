$(document).ready(Function ()
{
  let socket = io();
  let $window = $(window);

  let $login_page = $('.user_login');
  let $id_input = $('.name_input');

  let $chat = $('.chatroom');
  let $msg_list = $('.msg_list');
  let $chat_input = $('.msg_input');

  let user_id;
  let online = false;
  let typing = false;
  let last_input;

  let $cur_input = $id_input.focus();

  function Set_id () {
    let input = $id_input.val().trim());
    user_id = Sanitize(input);

    if (user_id) {
      $login_page.fadeOut();
      $chat.show();
      login_page.off('click');
      cur_input = $chat_input.focus();

      socket.emit('new_user', user_id);
  }

  function SendMessage() {
    let msg = Sanitize($chat_input.val());

    if (msg && online) {
      $chat_input.val('');
      PostMessage({
        id: user_id,
        msg: msg
      });

      socket.emit('new_message', msg);


  function log (msg) {
    let $element = $('<li>').addClass('log').text(msg);
    AddMessage($element);
  }
    socket.on('user_dc', function(dc_msg) {

  function Sanitize (input) {
    return $('<div/>').text(input).text();
  }

  function Add

}
});
/*
        $('form').submit(function(){
            socket.emit('chat_msg', $('#m').val());
            $('#m').val('');
            return false;
          });

          socket.on('chat_msg', function(msg) {
              $('#messages').append($('<li>').text(msg));
          });
*/
