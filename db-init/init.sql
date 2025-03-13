CREATE TABLE USUARIOS(
    IdUsuario SERIAL,
    Correo VARCHAR(60) UNIQUE NOT NULL,
    Contrasenia VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    PRIMARY KEY (IdUsuario)   
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO USUARIOS (Correo, Contrasenia)
VALUES 
    ('juan123@utcv.edu.mx', PGP_SYM_ENCRYPT('password', 'AES_KEY')),
    ('jose123@utcv.edu.mx', PGP_SYM_ENCRYPT('password123', 'AES_KEY')),
    ('pedro123@utcv.edu.mx', PGP_SYM_ENCRYPT('password', 'AES_KEY'));
	INSERT INTO USUARIOS (Correo, Contrasenia)
VALUES ('zahid123@utcv.edu.mx', PGP_SYM_ENCRYPT('password', 'AES_KEY'));
	
SELECT * FROM USUARIOS;

CREATE TABLE CLIENTES (
    IdCliente SERIAL PRIMARY KEY,
    IdUsuario INT NOT NULL,
	Nombre VARCHAR(40) NOT NULL,
    ApPaterno VARCHAR(40) NOT NULL,
    ApMaterno VARCHAR(40),
	Telefono BIGINT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (IdUsuario) REFERENCES USUARIOS(IdUsuario)
);

-- Insertar registros en la tabla CLIENTES
INSERT INTO CLIENTES (IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono)
VALUES
(1, 'Juan', 'Pérez', 'Gómez', 1234567890),
(2, 'Ana', 'López', 'Martínez', 9876543210),
(3, 'Carlos', 'García', 'Hernández', 5551234567);


CREATE TABLE EMPLEADOS (	
    IdEmpleado SERIAL,
    IdUsuario INT NOT NULL,
	Nombre VARCHAR(40) NOT NULL,
    ApPaterno VARCHAR(40) NOT NULL,
    ApMaterno VARCHAR(40),
	Telefono BIGINT UNIQUE NOT NULL,
    NSS VARCHAR(11)UNIQUE NOT NULL,
    RFC VARCHAR(13)UNIQUE NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    PRIMARY KEY (IdEmpleado),
    FOREIGN KEY (IdUsuario) REFERENCES USUARIOS(IdUsuario)
);

--Insert usuario a clientes
DO $$
DECLARE
    usuario_id INT;
BEGIN
    INSERT INTO USUARIOS (Correo, Contrasenia)
    VALUES ('correo@ejemplo.com', 'contrasenia_encriptada')
    RETURNING IdUsuario INTO usuario_id;

    INSERT INTO CLIENTES (IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono)
    VALUES (usuario_id, 'Juan', 'Pérez', 'López', 1234567890);
END $$;

-- Insert usuarios a empleados
DO $$
DECLARE
    usuario_id INT;
BEGIN
    INSERT INTO USUARIOS (Correo, Contrasenia)
    VALUES ('correrrd@ejemplo.com', 'contrasenia_encriptada')
    RETURNING IdUsuario INTO usuario_id;

    INSERT INTO EMPLEADOS (IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono, NSS, RFC)
    VALUES (usuario_id, 'Juan', 'Pérez', 'López', 1234767990, '12349378201', '1234525891234');
END $$;

select *from usuarios;
select *from clientes;
select *from empleados;

-- Tabla de Productos
CREATE TABLE PRODUCTOS (
    IdProducto SERIAL,
    Nombre VARCHAR(50) NOT NULL,
    Precio DOUBLE PRECISION NOT NULL,
    Descripcion TEXT NOT NULL,
    STOCK INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL,
    PRIMARY KEY (IdProducto)
);

-- Insert productos
INSERT INTO PRODUCTOS (Nombre, Precio, Descripcion, STOCK)
VALUES
    ('CERA STRONG "ARAGON"', 100, '10oz', 50),
    ('CERA STRONG "ARAGON"', 150, '15oz', 50),
    ('CERA ORIGINAL "GRANADA"', 100, '10oz', 50),
    ('CERA ORIGINAL "GRANADA"', 150, '15oz', 50);

-- Tabla de Servicios
CREATE TABLE SERVICIOS (
    IdServicio SERIAL,
    Nombre VARCHAR(50) NOT NULL,
    Descripcion TEXT NOT NULL,
    Precio DECIMAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL,
    PRIMARY KEY (IdServicio)
);

-- Inserción de datos en la tabla SERVICIOS
INSERT INTO SERVICIOS (Nombre, Descripcion, Precio)
VALUES
    ('Low Fade', 'Degradado bajo', 150),
    ('Mid Fade', 'Degrado medio', 150),
    ('High Fade', 'Degradado alto', 150),
    ('Personalizado', 'Asesoria en tienda', 200),
    ('Perfilado de barba', 'Estilizacion de barba', 200);

-- Tabla de Ventas
CREATE TABLE VENTAS (
    IdVenta SERIAL,
    IdCliente INT NOT NULL,
    FechaVenta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Total DECIMAL NOT NULL,
    PRIMARY KEY (IdVenta),
    FOREIGN KEY (IdCliente) REFERENCES CLIENTES (IdCliente) ON UPDATE CASCADE ON DELETE RESTRICT
);

INSERT INTO VENTAS (IdCliente, Total)
VALUES (1, 250.75); 

select *from ventas;

CREATE TABLE DetalleVentas (
    IdDetalleVenta SERIAL,
    IdProducto INT NOT NULL,
    Cantidad INTEGER NOT NULL,
    PRIMARY KEY (IdDetalleVenta),
    FOREIGN KEY (IdProducto) REFERENCES PRODUCTOS (IdProducto) ON UPDATE CASCADE ON DELETE RESTRICT
);

Select *from detalleventas;

-- Tabla de Citas
CREATE TABLE CITAS (
    IdCita SERIAL,
    IdCliente INTEGER NOT NULL,
    IdServicio INTEGER NOT NULL,
    FechaAgendada TIMESTAMP NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    PRIMARY KEY (IdCita),
    FOREIGN KEY (IdCliente) REFERENCES CLIENTES(IdCliente),
    FOREIGN KEY (IdServicio) REFERENCES SERVICIOS(IdServicio)
);

-- Inserción de datos en la tabla CITAS
INSERT INTO CITAS (IdCliente, IdServicio, FechaAgendada)
VALUES (1, 3, '2023-08-04'),
       (1, 2, '2023-08-02');

SELECT * FROM CLIENTES WHERE IdCliente = 1;

INSERT INTO CLIENTES (IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono)
VALUES (1, 'Juan', 'Pérez', 'López', 1289360890);

SELECT *FROM CLIENTES;
SELECT *FROM USUARIOS;
