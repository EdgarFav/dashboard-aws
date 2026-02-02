# Comandos Básicos de Docker

Guía de referencia rápida para gestionar Docker en este proyecto.

## 1. Levantar Servicios

### Con terminal libre (detached mode)
```bash
docker-compose up -d
```
Levanta todos los servicios en background sin bloquear la terminal.

### Con terminal ocupada (ver logs en tiempo real)
```bash
docker-compose up
```
Levanta los servicios y muestra los logs directamente.

---

## 2. Ver Logs

### Logs de todos los servicios
```bash
docker-compose logs
```

### Logs de un servicio específico
```bash
docker-compose logs server
docker-compose logs client
```

### Ver logs en tiempo real (follow)
```bash
docker-compose logs -f
docker-compose logs -f server
```

### Ver últimas N líneas
```bash
docker-compose logs --tail=100 server
```

---

## 3. Detener Servicios

### Detener todos los servicios
```bash
docker-compose stop
```

### Detener y eliminar contenedores
```bash
docker-compose down
```

---

## 4. Resetear Completamente (Borrar Todo)

**Cuando tienes errores y necesitas empezar de cero:**

### Opción 1: Eliminar contenedores, volúmenes y redes
```bash
docker-compose down -v
```
Elimina:
- Contenedores
- Volúmenes (datos)
- Redes

Luego levanta nuevamente:
```bash
docker-compose up -d
```

### Opción 2: Eliminación más agresiva (si hay conflictos de red)
```bash
docker-compose down -v --remove-orphans
```

### Opción 3: Limpiar todo a nivel del sistema
```bash
# Eliminar contenedores no usados
docker container prune

# Eliminar volúmenes no usados
docker volume prune

# Eliminar redes no usadas
docker network prune

# Limpiar todo (contenedores, volúmenes, imágenes no usadas)
docker system prune -a
```

---

## 5. Instalar Dependencias Localmente y Actualizar Contenedores

### Instalación Local + Actualización de Contenedores

#### Para el servidor (Node.js/NestJS)
```bash
# 1. Instalar localmente
cd server
npm install

# 2. Volver a la raíz
cd ..

# 3. Reconstruir la imagen del contenedor
docker-compose build server

# 4. Levantar con la imagen actualizada
docker-compose up -d
```

#### Para el cliente (Vite/React)
```bash
# 1. Instalar localmente
cd client
npm install

# 2. Volver a la raíz
cd ..

# 3. Reconstruir la imagen del contenedor
docker-compose build client

# 4. Levantar con la imagen actualizada
docker-compose up -d
```

#### Ambos servicios (atajo)
```bash
# Instalar dependencias
cd server && npm install && cd ../client && npm install && cd ..

# Reconstruir e iniciar
docker-compose up -d --build
```

---

## 6. Ejecutar Comandos Dentro del Contenedor

### Ejecutar comando en un contenedor en ejecución
```bash
docker-compose exec server npm run start:dev
docker-compose exec client npm run dev
```

### Acceder a la terminal del contenedor
```bash
docker-compose exec server bash
docker-compose exec client bash
```

---

## 7. Ver Estado de Servicios

### Ver contenedores activos
```bash
docker-compose ps
```

### Ver todos los contenedores (incluyendo stopped)
```bash
docker-compose ps -a
```

---

## 8. Reconstruir Imágenes

### Reconstruir todas las imágenes
```bash
docker-compose build
```

### Reconstruir sin usar caché (fuerza descarga de dependencias)
```bash
docker-compose build --no-cache
```

### Reconstruir un servicio específico
```bash
docker-compose build server --no-cache
```

---

## 9. Flujo de Trabajo Común

### Desarrollo normal
```bash
# Levantar servicios en background
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f
```

### Después de cambiar dependencias
```bash
# Opción rápida
docker-compose up -d --build

# O paso a paso
docker-compose down
npm install  # en server y/o client según cambios
docker-compose up -d
```

### Resetear por error
```bash
# Opción completa
docker-compose down -v
docker-compose up -d

# Opción más agresiva si hay conflictos
docker-compose down -v --remove-orphans
docker-compose up -d --build
```

---

## 10. Solución de Problemas

| Problema | Solución |
|----------|----------|
| Puerto ya en uso | `docker-compose down -v && docker-compose up -d` |
| Contenedor no inicia | Ver logs: `docker-compose logs server` |
| Cambios no se reflejan | Reconstruir: `docker-compose up -d --build` |
| Error de volúmenes | `docker-compose down -v` |
| Error de redes | `docker-compose down -v --remove-orphans` |

---

## Notas Importantes

- **`-d`** = detached (background)
- **`-v`** = elimina volúmenes (CUIDADO: borra datos)
- **`-f`** = follow (ver en tiempo real)
- **`--build`** = reconstruye imágenes antes de iniciar
- **`--no-cache`** = fuerza descarga sin usar caché
