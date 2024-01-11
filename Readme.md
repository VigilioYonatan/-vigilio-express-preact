# VIGILIO/EXPRESS

<img src="./public/images/logo.png" width="150">
<br>
by Yonatan Vigilio Lavado
<br><br>

# Getting Started

1. Instalar paquetes npm

```bash
pnpm install
```

2. Iniciar contenedor

```bash
docker compose up -d
```

Abrir vite

```bash
# shell del contenedor donde corre node express 
pnpm dev

# ó desde tu terminal de visual studio code
docker exec -it hashdecontenedor sh 
pnpm dev
```

Detener contenedor y iniciar contenedor

```bash
docker container stop hashdecontenedor
docker container start hashdecontenedor
```

Ver logs de contenedor

```bash
docker container logs hashdecontenedor -f
# -f ver en tiempo real
```

3. Detener contenedor

```bash
docker compose down
```

4. Si modificaste package.json (instalar o desintalar dependencia ) Detener contenedor y instalar dependencia. Volver a construir contenedor y iniciar contenedor

```BASH
# volver a contruir construir contenedor y iniciar
docker compose up -d --build
```

# Opcional en el terminal

Ver filesystem de tus contenedor

```bash
# server
docker exec -it hashdecontenedor sh
```


# Producción
1. Verificar y modificar .env a producción
2. Insertar tu api de postman y dia en tu aplicación
```bash
docker compose down
docker compose -f docker-compose.production.yml up -d --build
```
3. Verás que se iniciará en modo de producciopn en el contenedor