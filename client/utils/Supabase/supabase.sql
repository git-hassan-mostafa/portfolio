create table public.skills (
    id serial primary key,
    title varchar(255),
    image varchar(255),
    percentage integer
);

create table public.projects (
    id serial primary key,
    title varchar(255),
    link varchar(255),
    description text,
    image varchar(255),
    skills text
);