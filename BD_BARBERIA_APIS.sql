--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2025-03-23 20:05:59

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

--
-- TOC entry 2 (class 3079 OID 52593)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 227 (class 1259 OID 53160)
-- Name: citas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.citas (
    idcita integer NOT NULL,
    idcliente integer NOT NULL,
    idservicio integer NOT NULL,
    fechaagendada timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone
);


ALTER TABLE public.citas OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 53159)
-- Name: citas_idcita_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.citas_idcita_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.citas_idcita_seq OWNER TO postgres;

--
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 226
-- Name: citas_idcita_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.citas_idcita_seq OWNED BY public.citas.idcita;


--
-- TOC entry 219 (class 1259 OID 53082)
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    idcliente integer NOT NULL,
    idusuario integer NOT NULL,
    nombre character varying(40) NOT NULL,
    appaterno character varying(40) NOT NULL,
    apmaterno character varying(40),
    telefono bigint NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 53081)
-- Name: clientes_idcliente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clientes_idcliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clientes_idcliente_seq OWNER TO postgres;

--
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 218
-- Name: clientes_idcliente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clientes_idcliente_seq OWNED BY public.clientes.idcliente;


--
-- TOC entry 231 (class 1259 OID 53348)
-- Name: detalleventas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalleventas (
    iddetalleventa integer NOT NULL,
    idproducto integer NOT NULL,
    cantidad integer NOT NULL
);


ALTER TABLE public.detalleventas OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 53347)
-- Name: detalleventas_iddetalleventa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalleventas_iddetalleventa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalleventas_iddetalleventa_seq OWNER TO postgres;

--
-- TOC entry 4980 (class 0 OID 0)
-- Dependencies: 230
-- Name: detalleventas_iddetalleventa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalleventas_iddetalleventa_seq OWNED BY public.detalleventas.iddetalleventa;


--
-- TOC entry 221 (class 1259 OID 53098)
-- Name: empleados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empleados (
    idempleado integer NOT NULL,
    idusuario integer NOT NULL,
    nombre character varying(40) NOT NULL,
    appaterno character varying(40) NOT NULL,
    apmaterno character varying(40),
    telefono bigint NOT NULL,
    nss character varying(11) NOT NULL,
    rfc character varying(13) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone
);


ALTER TABLE public.empleados OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 53097)
-- Name: empleados_idempleado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empleados_idempleado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empleados_idempleado_seq OWNER TO postgres;

--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 220
-- Name: empleados_idempleado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empleados_idempleado_seq OWNED BY public.empleados.idempleado;


--
-- TOC entry 223 (class 1259 OID 53118)
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    idproducto integer NOT NULL,
    nombre character varying(50) NOT NULL,
    precio double precision NOT NULL,
    descripcion text NOT NULL,
    stock integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 53117)
-- Name: productos_idproducto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_idproducto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productos_idproducto_seq OWNER TO postgres;

--
-- TOC entry 4982 (class 0 OID 0)
-- Dependencies: 222
-- Name: productos_idproducto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_idproducto_seq OWNED BY public.productos.idproducto;


--
-- TOC entry 225 (class 1259 OID 53129)
-- Name: servicios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servicios (
    idservicio integer NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion text NOT NULL,
    precio numeric NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone
);


ALTER TABLE public.servicios OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 53128)
-- Name: servicios_idservicio_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.servicios_idservicio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.servicios_idservicio_seq OWNER TO postgres;

--
-- TOC entry 4983 (class 0 OID 0)
-- Dependencies: 224
-- Name: servicios_idservicio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.servicios_idservicio_seq OWNED BY public.servicios.idservicio;


--
-- TOC entry 217 (class 1259 OID 53071)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    idusuario integer NOT NULL,
    correo character varying(60) NOT NULL,
    contrasenia character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 53070)
-- Name: usuarios_idusuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_idusuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_idusuario_seq OWNER TO postgres;

--
-- TOC entry 4984 (class 0 OID 0)
-- Dependencies: 216
-- Name: usuarios_idusuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_idusuario_seq OWNED BY public.usuarios.idusuario;


--
-- TOC entry 229 (class 1259 OID 53333)
-- Name: ventas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ventas (
    idventa integer NOT NULL,
    idcliente integer NOT NULL,
    fechaventa timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    total numeric NOT NULL
);


ALTER TABLE public.ventas OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 53332)
-- Name: ventas_idventa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ventas_idventa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ventas_idventa_seq OWNER TO postgres;

--
-- TOC entry 4985 (class 0 OID 0)
-- Dependencies: 228
-- Name: ventas_idventa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ventas_idventa_seq OWNED BY public.ventas.idventa;


--
-- TOC entry 4775 (class 2604 OID 53163)
-- Name: citas idcita; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citas ALTER COLUMN idcita SET DEFAULT nextval('public.citas_idcita_seq'::regclass);


--
-- TOC entry 4763 (class 2604 OID 53085)
-- Name: clientes idcliente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes ALTER COLUMN idcliente SET DEFAULT nextval('public.clientes_idcliente_seq'::regclass);


--
-- TOC entry 4780 (class 2604 OID 53351)
-- Name: detalleventas iddetalleventa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalleventas ALTER COLUMN iddetalleventa SET DEFAULT nextval('public.detalleventas_iddetalleventa_seq'::regclass);


--
-- TOC entry 4766 (class 2604 OID 53101)
-- Name: empleados idempleado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados ALTER COLUMN idempleado SET DEFAULT nextval('public.empleados_idempleado_seq'::regclass);


--
-- TOC entry 4769 (class 2604 OID 53121)
-- Name: productos idproducto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN idproducto SET DEFAULT nextval('public.productos_idproducto_seq'::regclass);


--
-- TOC entry 4772 (class 2604 OID 53132)
-- Name: servicios idservicio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios ALTER COLUMN idservicio SET DEFAULT nextval('public.servicios_idservicio_seq'::regclass);


--
-- TOC entry 4760 (class 2604 OID 53074)
-- Name: usuarios idusuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN idusuario SET DEFAULT nextval('public.usuarios_idusuario_seq'::regclass);


--
-- TOC entry 4778 (class 2604 OID 53336)
-- Name: ventas idventa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas ALTER COLUMN idventa SET DEFAULT nextval('public.ventas_idventa_seq'::regclass);


--
-- TOC entry 4967 (class 0 OID 53160)
-- Dependencies: 227
-- Data for Name: citas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.citas (idcita, idcliente, idservicio, fechaagendada, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- TOC entry 4959 (class 0 OID 53082)
-- Dependencies: 219
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clientes (idcliente, idusuario, nombre, appaterno, apmaterno, telefono, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- TOC entry 4971 (class 0 OID 53348)
-- Dependencies: 231
-- Data for Name: detalleventas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalleventas (iddetalleventa, idproducto, cantidad) FROM stdin;
\.


--
-- TOC entry 4961 (class 0 OID 53098)
-- Dependencies: 221
-- Data for Name: empleados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empleados (idempleado, idusuario, nombre, appaterno, apmaterno, telefono, nss, rfc, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- TOC entry 4963 (class 0 OID 53118)
-- Dependencies: 223
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (idproducto, nombre, precio, descripcion, stock, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- TOC entry 4965 (class 0 OID 53129)
-- Dependencies: 225
-- Data for Name: servicios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.servicios (idservicio, nombre, descripcion, precio, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- TOC entry 4957 (class 0 OID 53071)
-- Dependencies: 217
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (idusuario, correo, contrasenia, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- TOC entry 4969 (class 0 OID 53333)
-- Dependencies: 229
-- Data for Name: ventas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas (idventa, idcliente, fechaventa, total) FROM stdin;
\.


--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 226
-- Name: citas_idcita_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.citas_idcita_seq', 1, false);


--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 218
-- Name: clientes_idcliente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_idcliente_seq', 1, false);


--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 230
-- Name: detalleventas_iddetalleventa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalleventas_iddetalleventa_seq', 1, false);


--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 220
-- Name: empleados_idempleado_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empleados_idempleado_seq', 1, false);


--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 222
-- Name: productos_idproducto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_idproducto_seq', 1, false);


--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 224
-- Name: servicios_idservicio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.servicios_idservicio_seq', 1, false);


--
-- TOC entry 4992 (class 0 OID 0)
-- Dependencies: 216
-- Name: usuarios_idusuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_idusuario_seq', 1, false);


--
-- TOC entry 4993 (class 0 OID 0)
-- Dependencies: 228
-- Name: ventas_idventa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_idventa_seq', 1, false);


--
-- TOC entry 4802 (class 2606 OID 53167)
-- Name: citas citas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_pkey PRIMARY KEY (idcita);


--
-- TOC entry 4786 (class 2606 OID 53089)
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (idcliente);


--
-- TOC entry 4788 (class 2606 OID 53091)
-- Name: clientes clientes_telefono_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_telefono_key UNIQUE (telefono);


--
-- TOC entry 4806 (class 2606 OID 53353)
-- Name: detalleventas detalleventas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalleventas
    ADD CONSTRAINT detalleventas_pkey PRIMARY KEY (iddetalleventa);


--
-- TOC entry 4790 (class 2606 OID 53109)
-- Name: empleados empleados_nss_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_nss_key UNIQUE (nss);


--
-- TOC entry 4792 (class 2606 OID 53105)
-- Name: empleados empleados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_pkey PRIMARY KEY (idempleado);


--
-- TOC entry 4794 (class 2606 OID 53111)
-- Name: empleados empleados_rfc_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_rfc_key UNIQUE (rfc);


--
-- TOC entry 4796 (class 2606 OID 53107)
-- Name: empleados empleados_telefono_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_telefono_key UNIQUE (telefono);


--
-- TOC entry 4798 (class 2606 OID 53127)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (idproducto);


--
-- TOC entry 4800 (class 2606 OID 53138)
-- Name: servicios servicios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_pkey PRIMARY KEY (idservicio);


--
-- TOC entry 4782 (class 2606 OID 53080)
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- TOC entry 4784 (class 2606 OID 53078)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (idusuario);


--
-- TOC entry 4804 (class 2606 OID 53341)
-- Name: ventas ventas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_pkey PRIMARY KEY (idventa);


--
-- TOC entry 4809 (class 2606 OID 53168)
-- Name: citas citas_idcliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_idcliente_fkey FOREIGN KEY (idcliente) REFERENCES public.clientes(idcliente);


--
-- TOC entry 4810 (class 2606 OID 53173)
-- Name: citas citas_idservicio_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_idservicio_fkey FOREIGN KEY (idservicio) REFERENCES public.servicios(idservicio);


--
-- TOC entry 4807 (class 2606 OID 53092)
-- Name: clientes clientes_idusuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES public.usuarios(idusuario);


--
-- TOC entry 4812 (class 2606 OID 53354)
-- Name: detalleventas detalleventas_idproducto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalleventas
    ADD CONSTRAINT detalleventas_idproducto_fkey FOREIGN KEY (idproducto) REFERENCES public.productos(idproducto) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4808 (class 2606 OID 53112)
-- Name: empleados empleados_idusuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES public.usuarios(idusuario);


--
-- TOC entry 4811 (class 2606 OID 53342)
-- Name: ventas ventas_idcliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_idcliente_fkey FOREIGN KEY (idcliente) REFERENCES public.clientes(idcliente) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2025-03-23 20:06:00

--
-- PostgreSQL database dump complete
--

