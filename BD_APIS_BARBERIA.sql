CREATE TABLE USUARIOS (
    IdUsuario SERIAL,
    Correo VARCHAR(60) UNIQUE NOT NULL,
    Contrasenia VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    PRIMARY KEY (IdUsuario)
);


SELECT *FROM USUARIOS;


CREATE EXTENSION pgcrypto;


SELECT * FROM USUARIOS WHERE IdUsuario = 1;


INSERT INTO USUARIOS(Correo, Contrasenia)  
VALUES('AldoBañuelos123@gmail.com', PGP_SYM_ENCRYPT('password', 'AES_KEY'));  


INSERT INTO USUARIOS(Correo, Contrasenia)  
VALUES('ElPepe@gmail.com', PGP_SYM_ENCRYPT('password123', 'AES_KEY'));  


INSERT INTO USUARIOS(Correo, Contrasenia)  
VALUES('Eduardo123@gmail.com', PGP_SYM_ENCRYPT('password', 'AES_KEY'));


SELECT *FROM USUARIOS;


/*---------------------------------------------------------------------------------------------------------------------*/


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


INSERT INTO CLIENTES(IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono)  
VALUES (1, 'Aldo', 'Bañuelos', 'Sanchez', 2713214562);  


INSERT INTO CLIENTES(IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono)  
VALUES (2, 'Pepe', 'Monraga', 'Torres', 2713574562);  


INSERT INTO CLIENTES(IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono)  
VALUES (3, 'Eduardo', 'Morales', 'Lopez', 2713214565);


SELECT *FROM CLIENTES;


/*---------------------------------------------------------------------------------------------------------------------*/


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


INSERT INTO EMPLEADOS(IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono, NSS, RFC)  
VALUES (1, 'Juan', 'Perez', 'Gomez', 2713214562, '12345678912', '1234567890123');  


INSERT INTO EMPLEADOS(IdUsuario, Nombre, ApPaterno, ApMaterno, Telefono, NSS, RFC)  
VALUES (2, 'Maria', 'Lopez', NULL, 2713574563, '98765432101', '9876543210123');  


INSERT INTO EMPLEADOS(IdUsuario, Nombre, ApPaterno, Telefono, NSS, RFC)  
VALUES (3, 'Carlos', 'Ramirez', 2713214564, '56789012345', '5678901234567');


SELECT *FROM EMPLEADOS;


/*---------------------------------------------------------------------------------------------------------------------*/


CREATE TABLE PRODUCTOS (/*Ceras para cabello*/
    IdProducto SERIAL,
    Nombre VARCHAR(50) NOT NULL,
    Precio DOUBLE PRECISION NOT NULL,
    Descripcion TEXT,
    STOCK INTEGER NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    PRIMARY KEY (IdProducto)
);


INSERT INTO PRODUCTOS(Nombre,Precio,Descripcion,STOCK)
VALUES('CERA STRONG "ARAGON"',100,'10oz',50);


INSERT INTO PRODUCTOS(Nombre,Precio,Descripcion,STOCK)
VALUES('CERA STRONG "ARAGON"',150,'15oz',50);


INSERT INTO PRODUCTOS(Nombre,Precio,Descripcion,STOCK)
VALUES('CERA ORIGINAL"GRANADA"',100,'10oz',50);


INSERT INTO PRODUCTOS(Nombre,Precio,Descripcion,STOCK)
VALUES('CERA ORIGINAL"GRANADA"',150,'15oz',50);


SELECT *FROM PRODUCTOS;


/*---------------------------------------------------------------------------------------------------------------------*/


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


INSERT INTO SERVICIOS(Nombre,Descripcion,Precio, created_at, updated_at)
VALUES('Low Fade','Degradado bajo',150, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO SERVICIOS(Nombre,Descripcion,Precio)
VALUES('Mid Fade','Degrado medio',150);


INSERT INTO SERVICIOS(Nombre,Descripcion,Precio)
VALUES('High Fade','Degradado alto',150);


INSERT INTO SERVICIOS(Nombre,Descripcion,Precio)
VALUES('Personalizado','Asesoria en tienda',200);


INSERT INTO SERVICIOS(Nombre,Descripcion,Precio)
VALUES('Perfilado de barba','Estilizacion de barba',200);


SELECT *FROM SERVICIOS;


/*---------------------------------------------------------------------------------------------------------------------*/


CREATE TABLE VENTAS (
    IdVenta SERIAL,
    IdCliente INT NOT NULL,
    FechaVenta TIMESTAMP NOT NULL,
    Total DECIMAL NOT NULL,
    PRIMARY KEY (IdVenta),
    FOREIGN KEY(IdCliente) REFERENCES CLIENTES(IdCliente) ON UPDATE CASCADE ON DELETE RESTRICT,
);


CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  total DECIMAL(10, 2) NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE sale_details (
  id SERIAL PRIMARY KEY,
  sale_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE
);


INSERT INTO sales (total) VALUES (1500.75);

INSERT INTO sales (total) VALUES (299.99);

INSERT INTO sales (total) VALUES (5000.50);

INSERT INTO sales (total) VALUES (120.00);

INSERT INTO sales (total) VALUES (899.25);


SELECT *FROM sales;


INSERT INTO VENTAS(IdCliente,IdEmpleado,FechaVenta,Total)
VALUES(1,1,'2023-07-02',150);


CREATE TABLE DetalleVentas( /*Ticket para el cliente*/
    IdDetalleVenta SERIAL,
    IdProducto INT NOT NULL,
    Cantidad INTEGER NOT NULL,
    PRIMARY KEY (IdDetalleVenta),
    FOREIGN KEY (IdVenta) REFERENCES VENTAS(IdVenta) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (IdProducto) REFERENCES PRODUCTOS(IdProducto) ON UPDATE CASCADE ON DELETE RESTRICT
);


/*---------------------------------------------------------------------------------------------------------------------*/


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


INSERT INTO CITAS(IdCliente,IdServicio,FechaAgendada)
VALUES(1,3,'2023-08-04');


INSERT INTO CITAS(IdCliente,IdServicio,FechaAgendada)
VALUES(1,2,'2023-08-02');


SELECT *FROM CITAS;


/*---------------------------------------------------------------------------------------------------------------------*/


/*Productos*/
CREATE OR REPLACE FUNCTION proteger_productos() RETURNS TRIGGER AS $Cuerpo$
DECLARE
BEGIN


RETURN NULL;
END;
$Cuerpo$ LANGUAGE plpgsql;


CREATE TRIGGER proteger_productos BEFORE DELETE 
ON PRODUCTOS
FOR EACH ROW EXECUTE PROCEDURE proteger_productos();


/*---------------------------------------------------------------------------------------------------------------------*/


/*Servicios*/
CREATE OR REPLACE FUNCTION proteger_servicios() RETURNS TRIGGER AS $Cuerpo$
DECLARE
BEGIN

RETURN NULL;
END;
$Cuerpo$ LANGUAGE plpgsql;

CREATE TRIGGER proteger_servicios BEFORE DELETE 
ON SERVICIOS
FOR EACH ROW EXECUTE PROCEDURE proteger_servicios();


/*---------------------------------------------------------------------------------------------------------------------*/


/*Usuarios*/
CREATE OR REPLACE FUNCTION proteger_usuarios() RETURNS TRIGGER AS $Cuerpo$
DECLARE
BEGIN

RETURN NULL;
END;
$Cuerpo$ LANGUAGE plpgsql;

CREATE TRIGGER proteger_usuarios BEFORE DELETE 
ON USUARIOS
FOR EACH ROW EXECUTE PROCEDURE proteger_usuarios();


/*---------------------------------------------------------------------------------------------------------------------*/


/*Clientes*/
CREATE OR REPLACE FUNCTION proteger_clientes() RETURNS TRIGGER AS $Cuerpo$
DECLARE
BEGIN

RETURN NULL;
END;
$Cuerpo$ LANGUAGE plpgsql;

CREATE TRIGGER proteger_clientes BEFORE DELETE 
ON CLIENTES
FOR EACH ROW EXECUTE PROCEDURE proteger_clientes();


/*---------------------------------------------------------------------------------------------------------------------*/


/*Empleados*/
CREATE OR REPLACE FUNCTION proteger_empleados() RETURNS TRIGGER AS $Cuerpo$
DECLARE
BEGIN

RETURN NULL;
END;
$Cuerpo$ LANGUAGE plpgsql;

CREATE TRIGGER proteger_empleados BEFORE DELETE 
ON EMPLEADOS
FOR EACH ROW EXECUTE PROCEDURE proteger_empleados();


/*---------------------------------------------------------------------------------------------------------------------*/


/*Indices*/
CREATE INDEX idx_UsuariosInfo ON USUARIOS(IdUsuario);


CREATE INDEX InfoProductos ON PRODUCTOS(IdProducto,Nombre,Precio,Descripcion,STOCK);
SELECT *FROM InfoProductos;


CREATE INDEX InfoServicio ON SERVICIOS(IdServicio,Nombre,Descripcion,Precio);
SELECT *FROM InfoServicio;


CREATE INDEX InfoCita ON CITAS(IdCita,IdCliente,IdServicio,FechaAgendada);
SELECT *FROM InfoCita;


CREATE INDEX InfoCliente ON CLIENTES(IdCliente,IdUsuario);
SELECT *FROM InfoCliente;


CREATE INDEX InfoEmpleado ON EMPLEADOS(IdEmpleado,IdUsuario);
SELECT *FROM InfoEmpleado;


/*Vistas*/

/*Usuarios que sean Empleados*/

/*Usuarios que sean Clientes*/

/*Ventas realizadas en el mes de julio*/
CREATE VIEW VentasJulio
SELECT IdVenta,IdCliente,IdEmpleado,Total
FROM VENTAS
WHERE FechaVenta BETWEEN '2023-07-01' AND '2023-08-30'


/*---------------------------------------------------------------------------------------------------------------------*/


/*citas programadas para el mes de agosto*/
CREATE VIEW CitasAgostro
SELECT IdCita,IdCliente,IdServicio
FROM CITAS
WHERE FechaAgendada BETWEEN '2023-08-01' AND '2023-08-31' 


WHERE IdDepartamento BETWEEN 1 AND 6;


/*---------------------------------------------------------------------------------------------------------------------*/


/*Productos que su precio sea de 150 pesos*/
CREATE VIEW PrecioProductos AS 
SELECT Nombre,STOCK
FROM PRODUCTOS
WHERE Precio =150;


/*---------------------------------------------------------------------------------------------------------------------*/


/*Bitacora*/
CREATE TABLE log_Usuarios(
	id			SERIAL,
	table_name  TEXT NOT NULL,
	table_id 	TEXT NOT NULL,
	description TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT NOW (),
	PRIMARY KEY (Id)
);


CREATE OR REPLACE FUNCTION Ingreso_Usuarios() RETURNS trigger AS $BODY$ DECLARE
vDescription TEXT;
vId INT;
vReturn RECORD;
BEGIN
vDescription := TG_TABLE_NAME || '';
IF (TG_OP = 'INSERT') THEN
vId:= NEW.id;
vDescription:=vDescription || 'added. Id: '|| vId;
vReturn := NEW;
ELSIF (TG_OP = 'UPDATE') THEN
vId:= NEW.id;
vDescription:=vDescription || 'updated. Id: '|| vId;
vReturn := NEW;
ELSIF (TG_OP = 'DELETE') THEN
vId:= OLD.id;
vDescription:=vDescription || 'deleted. Id: '|| vId;
VReturn:= OLD;
END IF;
RAISE NOTICE 'TRIGER called on % Log: %', TG_TABLE_NAME, vDescription;
INSERT INTO log_Usuarios(table_name, table_id, description, created_at)
VALUES
(TG_TABLE_NAME, vId, vDescription, NOW());
RETURN vReturn;
END $BODY$ LANGUAGE plpgsql;


/*---------------------------------------------------------------------------------------------------------------------*/


CREATE TRIGGER Trigger_Usuarios
AFTER INSERT OR UPDATE OR DELETE
ON USUARIOS
FOR EACH ROW
EXECUTE PROCEDURE Ingreso_Usuarios();


/*---------------------------------------------------------------------------------------------------------------------*/


CREATE TABLE cambios(
	timestamp_ TIMESTAMP WITH TIME ZONE default NOW(),
	nombre_disparador text,
	tipo_disparador text,
	nivel_disparador text,
	comando text
);
	
	
CREATE OR REPLACE FUNCTION grabar_operaciones() RETURNS TRIGGER AS $grabar_operaciones$
DECLARE 
BEGIN
    INSERT INTO cambios(
        nombre_disparador,
        tipo_disparador,
        nivel_disparador,
        comando
    ) VALUES (
        TG_NAME,
        TG_WHEN,
        TG_LEVEL,
        TG_OP
    );
    
    RETURN NULL;
END;
$grabar_operaciones$ LANGUAGE plpgsql;


CREATE TRIGGER grabar_operaciones
AFTER INSERT OR UPDATE OR DELETE ON PRODUCTOS
FOR EACH STATEMENT
EXECUTE PROCEDURE grabar_operaciones();


/*---------------------------------------------------------------------------------------------------------------------*/