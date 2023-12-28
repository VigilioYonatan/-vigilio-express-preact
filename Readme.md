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

4. Si modificaste package.json Detener contenedor y Volver a construir contenedor y iniciar contenedor

```
docker compose up -d --build
```
