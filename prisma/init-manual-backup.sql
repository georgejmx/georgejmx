--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

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
-- Name: artists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.artists (
    id integer NOT NULL,
    name character(30) NOT NULL
);


ALTER TABLE public.artists OWNER TO postgres;

--
-- Name: artists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.artists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.artists_id_seq OWNER TO postgres;

--
-- Name: artists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.artists_id_seq OWNED BY public.artists.id;


--
-- Name: fascinations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fascinations (
    id integer NOT NULL,
    name character(30) NOT NULL,
    intensity integer NOT NULL,
    color integer NOT NULL,
    tstamp integer NOT NULL
);


ALTER TABLE public.fascinations OWNER TO postgres;

--
-- Name: fascinations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fascinations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fascinations_id_seq OWNER TO postgres;

--
-- Name: fascinations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fascinations_id_seq OWNED BY public.fascinations.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    name character(30) NOT NULL,
    imagename character(30) NOT NULL,
    url character(200) NOT NULL,
    urlname character(30) NOT NULL,
    description text
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_id_seq OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: stories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stories (
    id integer NOT NULL,
    name character(40) NOT NULL,
    keyword character(40) NOT NULL,
    tstamp integer NOT NULL,
    paragraphs text[] NOT NULL,
    theme integer
);


ALTER TABLE public.stories OWNER TO postgres;

--
-- Name: stories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stories_id_seq OWNER TO postgres;

--
-- Name: stories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stories_id_seq OWNED BY public.stories.id;


--
-- Name: artists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artists ALTER COLUMN id SET DEFAULT nextval('public.artists_id_seq'::regclass);


--
-- Name: fascinations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fascinations ALTER COLUMN id SET DEFAULT nextval('public.fascinations_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: stories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories ALTER COLUMN id SET DEFAULT nextval('public.stories_id_seq'::regclass);


--
-- Data for Name: artists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.artists (id, name) FROM stdin;
1	tove lo                       
2	the front bottoms             
3	duran duran                   
\.


--
-- Data for Name: fascinations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fascinations (id, name, intensity, color, tstamp) FROM stdin;
1	reactjs                       	8	2	1654700403
2	san antonio bay               	2	0	1654700400
3	virginia woolfe               	7	1	1654700402
4	creative writing              	7	1	1662641641
5	berlin techno                 	9	0	1654700402
6	ukulele                       	6	2	1659963241
7	hiking                        	7	1	1668804789
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, name, imagename, url, urlname, description) FROM stdin;
1	WhisperBlog                   	whisperblog.png               	https://github.com/georgejmx/whisper-blog                                                                                                                                                               	github link                   	My take on what social media should be like                                                                                                                                                          try me                          Console app for determining which drug is best for the given patient with lung cancer
2	WindowCleanNorthEast          	wcne.png                      	https://github.com/georgejmx/windowcleanne                                                                                                                                                              	github link                   	Client website made during lockdown
3	FlowPass                      	flowpass.png                  	https://github.com/georgejmx/FlowPass                                                                                                                                                                   	fork me                       	Custom Android password manager for personal use
4	MedicineFinder                	mf.png                        	https://github.com/georgejmx/MedicineFinder                                                                                                                                                             	try me                        	Console app for determining which drug is best for patients with lung cancer
\.


--
-- Data for Name: stories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stories (id, name, keyword, tstamp, paragraphs, theme) FROM stdin;
1	Ultimate Decentralisation               	crypto                                  	1653418067	{"The masses think of cryptocurrency as a grubby get rich quick scheme, similar to online gambling or buy to let mortgages. However to quote Charles Hoskinson; `crypto is the easiest way to change the world`. The successively centralised global financial system has organically grown to become almost a galaxy of unequal opportunity with the sun being a melting pot of retail and corprate banks, investment funds and a feudal landowning elite. This has even caused problems for central banks due to the resulting lack of transparency. Once a societal system becomes sufficiently centralised, only a rapid change of the entire structure from the group can cause change. In the case of modern finance, this means the underlying technology that stores financial data needs to be re-examined. This global economic rebuilding led by internet money can hence only happen if the storage system of the new web 3 becomes decentralised. This means validator nodes, contract data and dApps must be free of this legacy financial system.","The dominance of cloud providers is intrinsically linked to centralisation of the internet, which facilitates easier censorship, financial monopolisation of servers, data privacy concerns: the list goes on. Decentralisation of digital society can only happen if big cloud players are either made redundant, or embrace change. So why this situation in the first place? HTTP is an amazing invention that is great for ease of use for developers, scalability and somewhat openness. It also facilitated the rise of big cloud. URLs are a mapping between client resources e.g. HTML file and the web server that serves the file. This largely 1-1 mapping lends to reliance on big cloud, as there is a central source of web server compute ability. IPFS, an alternate protocol, breaks this link by using Uniform Resource Hashes instead, meaning a greater pool of servers can cache the same resource, where each IPFS node (the equivalent to a HTTP web server) is part of a decentralised network. Each IPFS node caches all URHs they wish to host, and also caches other URHs that are served on the node. As requesting a resource is not tied to a particular server, any node that has an outage, is censored or is even too far away to serve a resource quick enough, is not a point of failure. Decentralisation from the ground up in this way would remove the problematic monopolisation of not only the internet but global financial wealth."}	0
2	Endlessness                             	berlin                                  	1662410402	{"The techno beat reverberates around my head like a decaying neutron star, the dance moves express raw freedom, a feeling continually buried deep inside me by rainy gusts of English winter and a finance-driven social structure. Poetically an alternating rhythm emerges between the clinging of a digital bell and the clanging of an interdimensional tambourine, bringing forth a flurry of waving arms baked in the glow of red light. Colliding into another techno degen shifts focus to the scent of a collective filtered from the overworld by a policy of no aftershave, no high-fashion culture, disintegrated swarms of cookie-cut consumer products in the flesh and above all freedom. One, two, BANG, DROP and a platonic embrace holding them towards my essence joins the unanimous wave of punching to the electro-funk dials, rendering the omnipresent computerised instruments in an enveloping fractal ensemble of inhabitants joined together in spirit and fervour. This unified soul of a post-industrial clan synced together in music, self-expression and authentic ambition has become an irreversible part of my existence. An existence with the purpose of embracing one thing, our true selves.","Flashing back to the isolated and reinvented remains of a wall torn down by such primordial passion, I see the illumination of the artwork frantically drawn over the concrete rendered ideological divide. A divide which will never be torn down but only highlighted by the metaphorical light of stoic wisdom, `Schauen…Glück, Berührung…Unglück`. A manufactured layer of kaleidoscopic platonic analysis, an analysis of everything we seek to escape from, illustrates the fleeting embrace of hedonism that will be seized as night temporarily hides this monument to a now decaying Zeitgeist. A hedonism that will forever breed restlessness and content rapt in synergy, an eternal synergy that I will never extinguish and carry forward as a flag-bearer for the reality of endless youth.","Hedonism that began with the sculpting of Europe from endless beauty and calmness to a tribal battleground of forever conflicting egos. The scampering of a wild deer across the endlessly layered forest of Grunewald once morphed into a sense of relaxation as the reflective surface of the Grunewaldsee switched the deers focus from the sly movements of rabid wolves, to the tranquillity of a lake locked away from campfires. Man-made energy that appeared as predatory flickers; a sign of the growing civilization replacing the once pervasive forests. An instantaneous pierce of an arrow transformed this natural balance into a frame of exploding flesh combined with the jeering of a hunting party, the Germanic jeering that became a residual part of the eternal air that will remain through the coming wave of industrialisation and modernity.","Ascending to a Fernseher built to focus and absorb all the voluptuous passion of centuries elapsed, my panoramic vision perceives all my now inbuilt freedom and hedonism together in a perfect frame of beauty. An appetite for smokestack raving and the inbuilt cultural ego-drive inherited from rediscovered tribal ancestors heralds a final descent into holy debauchery. The essence of another utopian clan of prolific, post-industrial, pleasure-driven paradise will later cross the North Sea having transformed the synergy I seek to no longer be a flag-bearer for endless youth, but the definition of endless youth I have irreversibly embraced."}	1
3	Renewal                                 	dreaming                                	1668804789	{"I awoke again to the surroundings of an extinguished campfire inside an ancient stone curved room, a room designed for either the keeping of prisoners or the storage of hunted corpses and the rabid consumption of their remains. Surroundings that are almost a manifestation of what has become of my waking routine, that present themselves to me through the night-time in a stark depiction of my persistent state of being.","What was in actuality a rogue-like horror trip at the time seemed like an inescapable confinement, where my focus was initially on finding an exit to the dome. After 5 minutes of carefully walking away from the fire as far as I could see to gradually being enveloped in pure darkness, then retreating back to the fire before exploring in another direction, I finally caught glimpse of some other light. This was a narrow, faintly lit corridor accompanied by the squeaking of rats. I approached the corridor, which I could now see to begin underneath a carved plaque reading “AUF DIE SUCHE NACH LICHT”.","The corridor led to a chamber, to what seemed like an ancient prison cell buried deep inside the labyrinth. The rumblings of activity perceivable from this room led me to an almost dutiful speeding of my reluctant ramble, past the etched stone bricks and cobwebs towards the dim light ahead. Creeping in the shadows, having morphed into one of the under dwellers, I caught a glimpse of what miscreants lie ahead.","First, there was what could be described as a being that had long ago cast away the compassion and openness characteristic of their kind in favour of an almost rabid focus towards drawing the life energy of anything that descended into this pit into service to their own psyche. A psyche that could be felt from the distant shadows. Draped from head to toe in gold embroidered robes, their physical form engaged only with others out of a predatory need for comfort. Comfort that had one purpose, to feed a deep psychological psyche of unwavering self service.","Next there was a similarly self-absorbed creature. Instead of a whirlpool of drained egos, there was the stamping of self-righteousness. Without any audible sound, the constant whispering of “I know better” rattled around the chamber. This was a goblin, one with steps that led to ripples of dust and a face so scrunched up and scornful that even a glance could trigger a centuries-buried feeling of annoyance and eternal angst at anything or anyone new.","Towards the back of the room, I found my first fellow human. But what a bizarre sight! Hunched in the corner, clutching at a chain of keys whilst sat painting what must be chess pieces, this person would anxiously write down the movements of the other two beings and then look up. Seemingly content with their position of assuredly owning the keys, but using them for nothing more than maintaining their perceived self importance, dreams evaded this poor creature in favour of another problematic relationship with ego. An anxious guardianship of ego which could be completely satisfied by an eternal place in this underworld.","Like a lightning strike into my spine, a vertical flash of heavenly energy directed into my lifeblood, the crashing realisation that I need to leave this place filled my consciousness. I bolted towards the hollow enclave that guarded a glimmer of natural light. A locked door, so I need the keys. I know where they are. The locking of eyes with the chamber-guard was all it took for their decisive posture to crumble, the touching of hands was enough for his grasp of the keys to weaken and for my exit from this place to be within literal touching distance. But obviously the god-embroiled demon was blocking the door, and the goblin assumed a hauntingly self-satisfied stare that was almost goading me to escape. My growing optimism was crashed, so paradoxically I embraced the “I know better attitude”, elbowed the demon to unlock the door and ascended the stairs.","And where did the staircase lead? Back to the extinguished campfire. Had the keys I secured from the chamber-guard last time worked? Yes, however I ended up back in here. My previous temptation of, dent the fragile demonic psyche, jeer at the goblin, belittle the prison guard and run up the stairs was swiftly extinguished when I realised that this is a reaction suggested and typical of this philosophical prison. I would never leave this place but instead become the fourth meaningful creature, the sombre clown. A reactionary being that trawls the chamber in an almost manic state of both rejection of the self-serving ethos that embodied the place but also with such little self awareness that earthliness eluded them. Should I once again succumb to my own evil instincts of torment, and a previous feeling of, ‘I’m better than this place’? In actuality, the sombre clown’s hysterical laughs of pity and laser-like focus on a warped self justice mentality of, “no, I know better” simply made him a familiar being of the chamber. No. To leave this place means leaving all of the feelings developed here behind.","So instead, I simply absorbed the torment. Allowed my ego to become partially drained by the demon, erupted into a chant of “you know better” with the goblin and dropped to my knees and begged the chamber-guard to let me out. I learned that overcoming self importance requires a dose of humility, an easy way to escape this natural instinct. After taking the keys, I accept a final handshake from the chamber guard and am even escorted upwards. Upwards until I see a glimpse of the bulging branches of an oak tree shadowed by the pale blue background of a morning sunrise. As a final gesture, I reach out my hand to the chamber-guard and exclaim “Let’s ascend together”.","Now I wake up to a 7:20am alarm clock."}	1
\.


--
-- Name: artists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.artists_id_seq', 3, true);


--
-- Name: fascinations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fascinations_id_seq', 7, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 4, true);


--
-- Name: stories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stories_id_seq', 3, true);


--
-- Name: artists artists_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_name_key UNIQUE (name);


--
-- Name: artists artists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);


--
-- Name: fascinations fascinations_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fascinations
    ADD CONSTRAINT fascinations_name_key UNIQUE (name);


--
-- Name: fascinations fascinations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fascinations
    ADD CONSTRAINT fascinations_pkey PRIMARY KEY (id);


--
-- Name: projects projects_imagename_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_imagename_key UNIQUE (imagename);


--
-- Name: projects projects_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_name_key UNIQUE (name);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: stories stories_keyword_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_keyword_key UNIQUE (keyword);


--
-- Name: stories stories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_name_key UNIQUE (name);


--
-- Name: stories stories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

