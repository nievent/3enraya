This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

PASOS PARA LANZAR EL PROYECTO.
1. Tener instalado node.
2. Lo acabare subiendo a mi repo de github, asi que habra que hacer un git clone https://github.com/nievent/3enraya.
x. cd ./3enraya.
x. npm install.
x. Este proyecto requiere una conexion a MongoDB Atlas para almacenar los resultados de las partidas, por lo que hay que crear un archivo en la raíz llamado .env.local con un contenido como:
MONGODB_URI=mongodb+srv://<usuario>:<contraseña_codificada>@<cluster>.mongodb.net/3enraya?retryWrites=true&w=majority&appName=<nombreCluster>
    En caso de querer utilizar mi propia bd, he creado un user y pwd para este caso. El archivo contendría lo siguiente:
    MONGODB_URI=mongodb+srv://Nieven:%23FjAgYE%23876f!Ae@cluster0.keymxr7.mongodb.net/3enraya?retryWrites=true&w=majority&appName=Cluster0
x. npm run dev
x. a http://localhost:3000.

TECNOLOGIA UTILIZADA.
Voy a realizar el proyecto del 3 en raya con next, react y typescript.

¿POR QUÉ?
Porque aunque he dicho en la entrevista que no he utilizado next y que sé más Javascript que Typescript me gustan los retos y quiero que esta entrevista técnica me sirva, si no para conseguir un gran puesto de trabajo, para aprender a utilizar algo nuevo.

