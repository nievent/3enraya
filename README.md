# 3 en Raya – Prueba Técnica Fullstack

Este es un proyecto desarrollado con [Next.js](https://nextjs.org/), React y TypeScript como parte del case study para Shakers
El proyecto consiste en un juego de 3 en raya donde se evalúa mi capacidad como developer full stack.

---

## Tecnologías utilizadas ¿Por qué Next + TypeScript?

Porque aunque he dicho en la entrevista que no he utilizado next y que sé más Javascript que Typescript me gustan los retos y quiero que esta entrevista técnica me sirva, si no para conseguir un gran puesto de trabajo, para aprender a utilizar algo nuevo. 

Y ahora que he terminado el proyecto debo decir que he hecho un gran descubrimiento. Me ha encantado next, el router es muy comodo y facilita mucho las cosas.

---

## Tecnologías utilizadas

-  [Next.js 15](https://nextjs.org/) 
-  [React 19](https://react.dev/)
-  TypeScript
-  MongoDB Atlas 
-  Redux Toolkit 
-  CSS Modules 
-  Jest 

---

## ¿Qué puedes hacer?

- Introducir tu nombre antes de jugar.
- Enfrentarte a una IA que **piensa antes de moverse**.
- Ver un ranking actualizado en vivo con los resultados.
- Disfrutar de una interfaz visual tipo arcade.

---

## Cómo lanzar el proyecto

### 1. Requisitos

- Tener [Node.js](https://nodejs.org) instalado.
- Tener una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (o usar mis credenciales de prueba).
- Clonar este repositorio.

### 2. Pasos

```bash
git clone https://github.com/nievent/3enraya
cd 3enraya
npm install
```

### 3. Configuración de entorno

Crea un archivo `.env.local` en la raíz del proyecto y añade tu URI de conexión de MongoDB:

```
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/3enraya?retryWrites=true&w=majority&appName=<nombreCluster>
```

✅ También puedes usar mis credenciales de ejemplo:

```
MONGODB_URI=mongodb+srv://Nieven:%23FjAgYE%23876f!Ae@cluster0.keymxr7.mongodb.net/3enraya?retryWrites=true&w=majority&appName=Cluster0
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Testeo

```bash
npm test
```

Los tests están en `tests/ai.test.ts`

---

## ¿Y para producción?

Puedes hacer un `build` con:

```bash
npm run build
npm start
```
