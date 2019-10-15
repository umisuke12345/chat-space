$(function(){
  function buildHTML(message) {
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class="message">
                  <div class="upper-info">
                    <div class="upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="upper-info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-massage">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                      ${imagehtml}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({  
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType:  false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#message_content').val('');
      $( ".form__submit").prop( "disabled", false );
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form'
      $('.hidden').val('');
    })
    .fail(function(){
      alert('エラー');
    })
  })
});