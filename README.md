## usersテーブル

|Column|Type|Options|
|------|----|-------|
|mail|string|null: false|
|name|string|null: false|
### Association
- has_meny :messages
- has_many :groups_users
- has_many :groups,  through:  :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|integer|null: false, foreign_key: true|

### Association
- has_many  :users,  through:  :groups_users
- has_many :groups_users
- has_many :messages

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string| |
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
