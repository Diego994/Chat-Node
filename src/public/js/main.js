$(function(){
    const socket = io();

    //obtaining DOM elements from interface
    const $messageForm =  $('#message-form');
    const $messageBox =  $('#message');
    const $chat =  $('#chat');

    //Obtaining DOM elements from the nicknameForm
    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');

    const $users = $('#usernames');


    $nickForm.submit( e => {
        e.preventDefault();
        socket.emit('new user', $nickname.val(), data =>{
            if(data){
                $('#nickWrap').hide();
                $('#contentWrap').show();
            } else {
                $nickError.html('<div class="alert alert-danger">That name already exist.</div>');
            }
            $nickname.val('');
        });
    })

    //events
    $messageForm.submit( e => {
        e.preventDefault();
        socket.emit('send message',$messageBox.val(), data => {
            $chat.append('<p class="error">' + data + '</p>')
        });
        $messageBox.val(''); //getting the text from the textform
    });

    //listening server message
    socket.on('new message', function (data) {
        $chat.append('<b>'+ data.nick + ': </b>' + data.msg + '<br/>');
    });

    socket.on('usernames', data => {
        let html = '';
        for(let i=0; i < data.length; i++){
            html += '<p> <i class="fas fa-user"></i>  '+ data[i]+'</p>'
        }
        $users.html(html);
    });

    socket.on('private', data => {
        displayMessage(data);
    })

    socket.on('load old msgs', msgs=> {
        for (let i=0; i<msgs.length; i++){
            displayMessage(msgs[i]);
        }
    })

    function displayMessage ( data) {
        $chat.append('<p class="private"><b>'+ data.nick +': </b> '+data.msg+' </p>');
    }
})