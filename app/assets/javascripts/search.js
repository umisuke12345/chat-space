$(function () {

  var user_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${user.name}
                  </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加
                  </div>
                </div>`;
    user_list.append(html);
  }

  function appendNotUser(user) {
    var html = `<div class="chat-group-user">
                  <p class="chat-group-user__name">
                    ${user}
                  </p>
                </div>`;
    user_list.append(html);
  }

  function appendMembers(user_name, user_id) {
    var html = `<div class="chat-group-user clearfix">
                  <input type ="hidden", value ="${user_id}", name ="group[user_ids][]", id ="group_user_ids_${user_id}">
                  <p class="chat-group-user__name">
                    ${user_name}
                  </p>
                  <p class="chat-group-user__btn chat-group-user__btn--remove">
                    削除
                  </p>
                </div>`;
    member_list.append(html);
  };
  
  
  $("#user-search-field").on('keyup', function(){
    var input = $("#user-search-field").val();

    $.ajax({
        type: 'GET',
        url:  '/users',
        data: { name: input},
        dataType: 'json'
      })

    .done(function(users){
      $('#user-search-result').empty();
        if (users.length !== 0){
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNotUser('一致するユーザーが見つかりません');
        }
      })
      .fail(function() {
          alert('ユーザー検索に失敗しました');
        });
      });
    $(document).on("click",'.chat-group-user__btn--add', function (e) {
      e.preventDefault();
        var name = $(this).attr("data-user-name");
        var user_id = $(this).attr("data-user-id");
        $(this).parent().remove();
        appendMembers(name, user_id);
    });
    $(document).on("click", '.chat-group-user__btn--remove', function () {
        $(this).parent().remove();
    });
  });

