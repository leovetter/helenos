CREATE TABLE public.image (
    id bigint NOT NULL,
    creation_date timestamp with time zone NOT NULL,
    name character varying(255) NOT NULL,
    path character varying(255) NOT NULL,
    size integer NOT NULL,
    update_date timestamp with time zone NOT NULL,
    library_id bigint NOT NULL
);


ALTER TABLE public.image OWNER TO helenos;


CREATE TABLE public.library (
    id bigint NOT NULL,
    creation_date timestamp with time zone NOT NULL,
    size integer NOT NULL,
    title character varying(255) NOT NULL,
    update_date timestamp with time zone NOT NULL,
    owned_user_id bigint NOT NULL
);


ALTER TABLE public.library OWNER TO helenos;

CREATE TABLE public.media (
    dtype character varying(31) NOT NULL,
    id bigint NOT NULL,
    creation_date timestamp with time zone NOT NULL,
    name character varying(255) NOT NULL,
    path character varying(255) NOT NULL,
    size integer NOT NULL,
    update_date timestamp with time zone NOT NULL,
    library_id bigint NOT NULL
);


ALTER TABLE public.media OWNER TO helenos;


CREATE TABLE public.media_user (
    id bigint NOT NULL,
    active boolean NOT NULL,
    email character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    permissions character varying(255),
    picture character varying(255),
    roles character varying(255)
);


ALTER TABLE public.media_user OWNER TO helenos;

CREATE TABLE public.password_reset_token (
    id bigint NOT NULL,
    expiry_date timestamp without time zone,
    token character varying(255),
    user_id bigint NOT NULL
);


ALTER TABLE public.password_reset_token OWNER TO helenos;

CREATE TABLE public.user_shared_libraries (
    user_id bigint NOT NULL,
    shared_library_id bigint NOT NULL
);


ALTER TABLE public.user_shared_libraries OWNER TO helenos;

CREATE TABLE public.verification_token (
    id bigint NOT NULL,
    expiry_date timestamp without time zone,
    token character varying(255) NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.verification_token OWNER TO helenos;

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.library
    ADD CONSTRAINT library_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.media_user
    ADD CONSTRAINT media_user_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.password_reset_token
    ADD CONSTRAINT password_reset_token_pkey PRIMARY KEY (id);
	
ALTER TABLE ONLY public.media_user
    ADD CONSTRAINT uk_pfki8mu6sefesty9h30d4n3yv UNIQUE (email);

ALTER TABLE ONLY public.user_shared_libraries
    ADD CONSTRAINT user_shared_libraries_pkey PRIMARY KEY (user_id, shared_library_id);

ALTER TABLE ONLY public.verification_token
    ADD CONSTRAINT verification_token_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_shared_libraries
    ADD CONSTRAINT fka4acuolwcdnfmaenlw97ygwrd FOREIGN KEY (shared_library_id) REFERENCES public.library(id);

ALTER TABLE ONLY public.media
    ADD CONSTRAINT fka8uonmmt4da1wcv4r1gkocss6 FOREIGN KEY (library_id) REFERENCES public.library(id);

ALTER TABLE ONLY public.user_shared_libraries
    ADD CONSTRAINT fkjyno0gf5gvoggmeijj01e0803 FOREIGN KEY (user_id) REFERENCES public.media_user(id);

ALTER TABLE ONLY public.library
    ADD CONSTRAINT fktan223yq3ro5hkg99kvkqyj3m FOREIGN KEY (owned_user_id) REFERENCES public.media_user(id) ON DELETE CASCADE;

REVOKE ALL ON DATABASE helenos FROM helenos;
GRANT CREATE,CONNECT ON DATABASE helenos TO helenos;
GRANT TEMPORARY ON DATABASE helenos TO helenos WITH GRANT OPTION;

create sequence hibernate_sequence;
