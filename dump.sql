--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" character varying(100) NOT NULL,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    "encryptedPassword" text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: visits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.visits (
    id integer NOT NULL,
    "urlId" integer,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: visits_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.visits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: visits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.visits_id_seq OWNED BY public.visits.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: visits id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits ALTER COLUMN id SET DEFAULT nextval('public.visits_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 4, '298d952e-7d96-4f58-b66d-01893f4f3c00', '2022-10-13 16:48:37.72506');
INSERT INTO public.sessions VALUES (2, 5, 'dea5ea7d-4a41-48fb-a049-a69bd8f6242c', '2022-10-14 16:44:07.334798');
INSERT INTO public.sessions VALUES (3, 5, 'fcba100b-beaa-4142-ad27-c3e7712cfeae', '2022-10-14 17:44:14.004936');
INSERT INTO public.sessions VALUES (4, 3, '325cb7dd-d73a-40bf-b8c9-ee0f418cfa6b', '2022-10-14 20:06:52.892264');
INSERT INTO public.sessions VALUES (5, 13, '81ff162b-962b-4898-bc0e-91a9b0cb8034', '2022-10-14 20:18:38.555397');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (12, 'https://google.com', 'S3tone6RNPmxsjSIxKOuj', 4, '2022-10-14 17:43:30.811411');
INSERT INTO public.urls VALUES (13, 'https://google1.com', 'wZbgkrewznLW7h2vzl2K_', 4, '2022-10-14 17:43:33.753993');
INSERT INTO public.urls VALUES (14, 'https://google2.com', 'QygGkYG5TCP2KWVM6_cm7', 4, '2022-10-14 17:43:35.842022');
INSERT INTO public.urls VALUES (15, 'https://google3.com', 'MR4RR3k-QLR4DZuxUTzT8', 4, '2022-10-14 17:43:38.226875');
INSERT INTO public.urls VALUES (16, 'https://yahoo.com', '_-iNeklj67yDk6e4HJlIG', 5, '2022-10-14 17:44:41.731038');
INSERT INTO public.urls VALUES (17, 'https://yahoo1.com', 'Mw4rQ-YxvlbW1kJjLxJiu', 5, '2022-10-14 17:44:44.992354');
INSERT INTO public.urls VALUES (18, 'https://yahoo2.com', 't4iEQ4ryNkVwouMQNS-_D', 5, '2022-10-14 17:44:47.654129');
INSERT INTO public.urls VALUES (19, 'https://yahoo3.com', '3XT1ZUEE-cSeyoqUofp0y', 5, '2022-10-14 17:44:50.928295');
INSERT INTO public.urls VALUES (20, 'https://google8.com', 'EsFoJvwgqM4IQ5kZ6gVij', 4, '2022-10-14 19:38:19.697898');
INSERT INTO public.urls VALUES (21, 'https://google10.com', 'JwYhHkZArfGm0XoQwhgHq', 4, '2022-10-14 19:38:37.091249');
INSERT INTO public.urls VALUES (22, 'https://yahoo25.com', 'B5v-nD1Ds3qVzLVr4ORtl', 5, '2022-10-14 19:39:36.03911');
INSERT INTO public.urls VALUES (23, 'https://lolzinho.com', 'UrlFDFWkLvvyIk81J7N6G', 3, '2022-10-14 20:07:29.532855');
INSERT INTO public.urls VALUES (24, 'https://onlyatest.io', 'SJz4Sk-G30rqw6jGCqFUn', 13, '2022-10-14 20:19:17.938828');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (3, 'Carlos', 'Carlos@driven.com.br', '$2b$10$0bLBAZ.jBf/x5cEesaN51Oi.aZfqmCw0RyEEhnf/VimslSwlM9Xii', '2022-10-13 15:29:32.745756');
INSERT INTO public.users VALUES (4, 'Mateus', 'Mateus@driven.com.br', '$2b$10$3AU4.QkCYeh38yfCgNcQN.G56fqKMy58jRVkHsArOl0YHWcaIhwUu', '2022-10-13 15:31:38.597887');
INSERT INTO public.users VALUES (5, 'João', 'joão@driven.com.br', '$2b$10$9SEGEkH9ME2A1AoZXseiluTeWP0nZCYWBCesRZi5a2lnhye5.0HtW', '2022-10-13 15:33:35.611641');
INSERT INTO public.users VALUES (6, 'João', 'joao@driven.com.br', '$2b$10$cEMHZ4Egja8uCCpIppAOfe6DZm5HXmB6Inhz0irbyLwBYTqXYS0gy', '2022-10-14 20:13:53.737524');
INSERT INTO public.users VALUES (7, 'João', 'jao@driven.com.br', '$2b$10$zDYwSGM9ARoMefFTQlqOQeyZAurgc3.lCHonz2AGheX2xf27Eg8.K', '2022-10-14 20:14:02.036395');
INSERT INTO public.users VALUES (8, 'João', 'xico@driven.com.br', '$2b$10$Dup/FOq/CHhw1/GocQTc4uIAIvsw89mIcvGZN9COpO2nfGfHawgDG', '2022-10-14 20:14:06.977456');
INSERT INTO public.users VALUES (9, 'João', 'epaminondas@driven.com.br', '$2b$10$/bHI.GxpWEyLGkit5tzMi.lw7hDPPnFTHwtgM26diRRZlee88wC8C', '2022-10-14 20:14:11.537281');
INSERT INTO public.users VALUES (10, 'a', 'da@driven.com.br', '$2b$10$Y8LgCRaiXZwbjNUsVsKLburl.EaVxRpsJSHD4At4OGZ9VV4zfBcRa', '2022-10-14 20:14:43.063097');
INSERT INTO public.users VALUES (11, 'b', 'sad@driven.com.br', '$2b$10$pAP8Af6bpOy683tcDguFvO6h7vLqWCqy4B9gpjHfdcCk5AGmCF6oC', '2022-10-14 20:14:47.557262');
INSERT INTO public.users VALUES (12, 'c', 'fasfa@driven.com.br', '$2b$10$q3MxpDlKn8jkBUJd.L8XCO2ovH7OE7XryUTZFBDhq0uNZroXt.4AS', '2022-10-14 20:14:51.099012');
INSERT INTO public.users VALUES (13, 'd', 'asfasdsa@driven.com.br', '$2b$10$PhvKs9hdqjiGmUZ/qEpMQufWQK9zC1T06mkTFCg6ue/fmxoAI.12a', '2022-10-14 20:15:07.349452');


--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.visits VALUES (50, 12, 4, '2022-10-14 17:43:30.812852');
INSERT INTO public.visits VALUES (51, 13, 4, '2022-10-14 17:43:33.754902');
INSERT INTO public.visits VALUES (52, 14, 4, '2022-10-14 17:43:35.842908');
INSERT INTO public.visits VALUES (53, 15, 4, '2022-10-14 17:43:38.227892');
INSERT INTO public.visits VALUES (54, 16, 5, '2022-10-14 17:44:41.732348');
INSERT INTO public.visits VALUES (55, 17, 5, '2022-10-14 17:44:44.993315');
INSERT INTO public.visits VALUES (56, 18, 5, '2022-10-14 17:44:47.654979');
INSERT INTO public.visits VALUES (57, 19, 5, '2022-10-14 17:44:50.929132');
INSERT INTO public.visits VALUES (58, 17, 5, '2022-10-14 17:45:44.972058');
INSERT INTO public.visits VALUES (59, 20, 4, '2022-10-14 19:38:19.699605');
INSERT INTO public.visits VALUES (60, 21, 4, '2022-10-14 19:38:37.09276');
INSERT INTO public.visits VALUES (61, 22, 5, '2022-10-14 19:39:36.040394');
INSERT INTO public.visits VALUES (62, 22, 5, '2022-10-14 19:40:56.090633');
INSERT INTO public.visits VALUES (63, 20, 4, '2022-10-14 19:41:36.541954');
INSERT INTO public.visits VALUES (64, 23, 3, '2022-10-14 20:07:29.534283');
INSERT INTO public.visits VALUES (65, 23, 3, '2022-10-14 20:08:09.902963');
INSERT INTO public.visits VALUES (66, 20, 4, '2022-10-14 20:08:38.496838');
INSERT INTO public.visits VALUES (67, 20, 4, '2022-10-14 20:08:49.793586');
INSERT INTO public.visits VALUES (68, 24, 13, '2022-10-14 20:19:17.940516');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 5, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 24, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: visits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.visits_id_seq', 68, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: visits visits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: visits visits_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES public.urls(id);


--
-- Name: visits visits_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

