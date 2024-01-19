create table diaries
(
    id         integer primary key autoincrement,
    content    text,
    created_at integer not null default CURRENT_TIMESTAMP,
    updated_at integer not null default CURRENT_TIMESTAMP
);

create table tags
(
    id   integer primary key autoincrement,
    name text unique
);

create table diary_tags
(
    diary_id integer,
    tag_id   integer,
    primary key (diary_id, tag_id),
    foreign key (diary_id) references diaries (id),
    foreign key (tag_id) references tags (id)
);

create index idx_diary_created_at on diaries (created_at);
create index idx_tag_name on tags (name);
