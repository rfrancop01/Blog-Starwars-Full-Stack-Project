# Blog de Star Wars - Proyecto Full Stack

Este proyecto es un blog dedicado a la mítica saga "Star Wars". Permite a los usuarios visualizar personajes, naves y planetas, añadirlos a una lista de favoritos, así como registrarse e iniciar sesión en la plataforma.

## Características

- **Visualización de Contenidos**: Explora información detallada sobre personajes, naves y planetas del universo Star Wars.
- **Gestión de Favoritos**: Añade elementos a tu lista de favoritos para acceder a ellos fácilmente.
- **Autenticación de Usuarios**: Regístrate e inicia sesión para personalizar tu experiencia en el blog.

## Tecnologías Utilizadas

- **Frontend**: React.js
- **Backend**: Python con Flask
- **Base de Datos**: SQLAlchemy
- **Estilización**: Bootstrap
- **Autenticación**: Flask-JWT-Extended

## Instalación

1. **Clona este repositorio** en tu máquina local:

   ```bash
   git clone https://github.com/rfrancop01/Blog-Starwars-Full-Stack-Project.git
   ```

2. **Navega al directorio del proyecto**:

   ```bash
   cd Blog-Starwars-Full-Stack-Project
   ```

3. **Configura el entorno virtual** (opcional pero recomendado):

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

4. **Instala las dependencias del backend**:

   ```bash
   pip install -r requirements.txt
   ```

5. **Configura las variables de entorno**. Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

   ```env
   FLASK_APP=src/app.py
   FLASK_ENV=development
   SECRET_KEY=tu_clave_secreta
   ```

6. **Inicializa la base de datos**:

   ```bash
   flask db upgrade
   ```

7. **Inicia el servidor backend**:

   ```bash
   flask run
   ```

8. **Instala las dependencias del frontend**:

   ```bash
   npm install
   ```

9. **Inicia el servidor frontend**:

   ```bash
   npm start
   ```

## Uso

- **Explora el Blog**: Navega por las diferentes secciones para descubrir información sobre personajes, naves y planetas.
- **Añade Favoritos**: Haz clic en el botón de favorito para guardar tus elementos preferidos.
- **Regístrate/Inicia Sesión**: Accede a funcionalidades adicionales registrándote e iniciando sesión en la plataforma.

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto:

1. **Haz un fork** del repositorio.
2. **Crea una nueva rama** para tu característica o mejora:

   ```bash
   git checkout -b nombre-de-tu-rama
   ```

3. **Realiza tus cambios** y confirma los commits:

   ```bash
   git commit -m "Descripción de los cambios"
   ```

4. **Empuja tus cambios** a tu fork:

   ```bash
   git push origin nombre-de-tu-rama
   ```

5. **Abre un Pull Request** en este repositorio describiendo tus modificaciones.



## Créditos

Desarrollado por Ricardo Franco Pérez.

Inspirado en el universo de [Star Wars](https://www.starwars.com/).

---

*Este proyecto fue desarrollado como parte del curso de Full Stack Developer en [4Geeks Academy](https://4geeksacademy.com).*
