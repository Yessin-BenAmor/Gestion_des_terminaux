--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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
-- Name: Sponsor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Sponsor" (
    id_sponsor integer NOT NULL,
    sponsor character varying(255) NOT NULL
);


ALTER TABLE public."Sponsor" OWNER TO postgres;

--
-- Name: Sponsor_id_sponsor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Sponsor" ALTER COLUMN id_sponsor ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Sponsor_id_sponsor_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: TEAM; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TEAM" (
    id_team character varying(255) NOT NULL,
    "Name" character varying(255) NOT NULL
);


ALTER TABLE public."TEAM" OWNER TO postgres;

--
-- Name: TID; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TID" (
    id_tid integer NOT NULL,
    "TID" bigint NOT NULL,
    sponsor character varying(255) NOT NULL,
    "Terminal_type" character varying(255) NOT NULL,
    id integer,
    "GEM_Test" boolean DEFAULT false,
    "GEM_Auto" boolean DEFAULT false,
    "GEM_UT4DEV" boolean DEFAULT false,
    "DCC_Test" boolean DEFAULT false,
    "UPI_Test" boolean DEFAULT false,
    "DCC_Auto" boolean DEFAULT false,
    "UPI_Auto" boolean DEFAULT false,
    "DCC_UT4DEV" boolean DEFAULT false,
    "UPI_UT4DEV" boolean DEFAULT false
);


ALTER TABLE public."TID" OWNER TO postgres;

--
-- Name: TID_id_tid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."TID" ALTER COLUMN id_tid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."TID_id_tid_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Terminal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Terminal" (
    id_terminal integer NOT NULL,
    "terminalType" character varying(255) NOT NULL,
    "serialNumber" bigint NOT NULL,
    profile character varying(255) NOT NULL,
    "TID" bigint DEFAULT 0,
    "DB" character varying(255),
    comment character varying(255),
    "wifiMacAddress" character varying(255)
);


ALTER TABLE public."Terminal" OWNER TO postgres;

--
-- Name: TerminalTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TerminalTypes" (
    "id_terminalType" integer NOT NULL,
    "terminalType" character varying(255) NOT NULL
);


ALTER TABLE public."TerminalTypes" OWNER TO postgres;

--
-- Name: Terminal_Types_id_TerminalType_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."TerminalTypes" ALTER COLUMN "id_terminalType" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Terminal_Types_id_TerminalType_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Terminal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Terminal" ALTER COLUMN id_terminal ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Terminal_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Utilisateur" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    id_team character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public."Utilisateur" OWNER TO postgres;

--
-- Name: Utilisateur_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Utilisateur" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Utilisateur_id_seq"
    START WITH 2
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Sponsor Sponsor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sponsor"
    ADD CONSTRAINT "Sponsor_pkey" PRIMARY KEY (id_sponsor);


--
-- Name: TEAM TEAM_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TEAM"
    ADD CONSTRAINT "TEAM_pkey" PRIMARY KEY (id_team);


--
-- Name: TID TID_TID_TID1_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TID"
    ADD CONSTRAINT "TID_TID_TID1_key" UNIQUE NULLS NOT DISTINCT ("TID") INCLUDE ("TID");


--
-- Name: TID TID_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TID"
    ADD CONSTRAINT "TID_pkey" PRIMARY KEY (id_tid);


--
-- Name: TerminalTypes Terminal_Types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TerminalTypes"
    ADD CONSTRAINT "Terminal_Types_pkey" PRIMARY KEY ("id_terminalType");


--
-- Name: Terminal Terminal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Terminal"
    ADD CONSTRAINT "Terminal_pkey" PRIMARY KEY (id_terminal);


--
-- Name: Utilisateur id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateur"
    ADD CONSTRAINT id PRIMARY KEY (id);


--
-- Name: Terminal serialNumber; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Terminal"
    ADD CONSTRAINT "serialNumber" UNIQUE ("serialNumber") INCLUDE ("serialNumber");


--
-- Name: Sponsor sponsor; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sponsor"
    ADD CONSTRAINT sponsor UNIQUE (sponsor) INCLUDE (sponsor);


--
-- Name: TerminalTypes terminal_type; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TerminalTypes"
    ADD CONSTRAINT terminal_type UNIQUE ("terminalType") INCLUDE ("terminalType");


--
-- Name: TID id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TID"
    ADD CONSTRAINT id FOREIGN KEY (id) REFERENCES public."Utilisateur"(id);


--
-- Name: Utilisateur id_team; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateur"
    ADD CONSTRAINT id_team FOREIGN KEY (id_team) REFERENCES public."TEAM"(id_team) NOT VALID;


--
-- PostgreSQL database dump complete
--

