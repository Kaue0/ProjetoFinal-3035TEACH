create table posts(

  id serial not null,
  created_at timestamp,
  updated_at timestamp,
  title varchar(50),
  description varchar(200),
  photo_link varchar(500),
  video_link varchar(500),
  privated boolean,
  deleted boolean not null default false,
  user_id bigint,
  likes integer default 0 not null,

  primary key(id),
  foreign key(user_id) references users(id)

);