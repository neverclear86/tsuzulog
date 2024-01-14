create table if not exists diaries (
    id integer primary key autoincrement,
    content text,
    created_at integer not null,
    updated_at integer not null,
);

create table if not exists tags (
    id integer primary key autoincrement,
    name text unique
);

create table if not exists diary_tags (
    diary_id integer primary key,
    tag_id integer primary key,
    foreign key (diary_id) references diaries(id),
    foreign key (tag_id) references tags(id)
);

create index idx_diary_created_at on diaries(created_at);
create index idx_diary_tags_diary_id on diary_tags(diary_id);
create index idx_diary_tags_tag_id on diary_tags(tag_id);
