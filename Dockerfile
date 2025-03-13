# Usa una imagen base de Node.js
FROM node:20

# Instala las herramientas necesarias para la compilación de bcrypt
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    python3-pip \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package.json package-lock.json ./

# Instala las dependencias de Node.js (esto también instalará bcrypt)
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expon el puerto que usará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
