# Dashboard AWS

Una aplicación fullstack moderna de análisis de ventas y gestión de usuarios con autenticación JWT, diseñada para escalabilidad en la nube AWS.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-19-blue)
![NestJS](https://img.shields.io/badge/NestJS-11-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Decisiones Técnicas](#decisiones-técnicas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API REST](#api-rest)
- [Roadmap](#roadmap)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## 🎯 Descripción General

**Dashboard AWS** es una plataforma integral para el análisis y gestión de datos empresariales. Proporciona una interfaz intuitiva para visualizar métricas de ventas, gestionar usuarios y realizar análisis predictivos. La aplicación está diseñada con arquitectura containerizada para facilitar el despliegue en infraestructura AWS.

### Principales Funcionalidades:

- 🔐 Autenticación y autorización con JWT
- 📊 Dashboard interactivo con gráficos en tiempo real
- 👥 Gestión completa de usuarios (CRUD)
- 📈 Análisis de ventas con visualización de datos
- 🤖 Predicciones y pronósticos de ventas
- 📤 Carga y procesamiento de archivos CSV
- 🎨 Interfaz responsiva y moderna
- 📱 Soporte completo para diferentes dispositivos

---

## ⭐ Características

### Backend (NestJS)
- ✅ Arquitectura modular y escalable
- ✅ Autenticación JWT con roles y permisos
- ✅ ORM TypeORM para gestión de base de datos
- ✅ Validación de datos con class-validator
- ✅ Documentación interactiva con Swagger
- ✅ Soporte para migraciones automáticas
- ✅ Procesamiento de CSV para importación de datos
- ✅ Tests e2e con Jest

### Frontend (React + Vite)
- ✅ Interfaz moderna con Tailwind CSS
- ✅ Gráficos interactivos con Chart.js
- ✅ Rutas protegidas y contexto de autenticación
- ✅ Gestión de estado con Zustand
- ✅ Notificaciones con React Hot Toast
- ✅ Vite para build rápidos y HMR
- ✅ TypeScript para seguridad de tipos
- ✅ Iconos vectoriales con Lucide React

### Base de Datos
- ✅ MySQL 8.0 con TypeORM
- ✅ Migraciones automáticas
- ✅ Relaciones entre entidades
- ✅ Seeding automático de datos

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 19 | Framework UI |
| **Vite** | 7.2.2 | Build tool y dev server |
| **TypeScript** | 5.9 | Tipado estático |
| **Tailwind CSS** | 4.1 | Estilos utilitarios |
| **Chart.js** | 4.5.1 | Visualización de datos |
| **React Router** | 7.13 | Enrutamiento |
| **Axios** | 1.13.4 | Cliente HTTP |
| **Zustand** | 5.0.11 | Gestión de estado |

### Backend
| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **NestJS** | 11.0.1 | Framework backend |
| **TypeORM** | 0.3.28 | ORM para base de datos |
| **MySQL** | 8.0 | Base de datos relacional |
| **JWT** | 11.0.2 | Autenticación |
| **Passport** | 0.7.0 | Estrategias de autenticación |
| **Swagger** | 11.2.6 | Documentación API |
| **Class Validator** | 0.14.3 | Validación de DTOs |

### DevOps
| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **Docker** | - | Containerización |
| **Docker Compose** | - | Orquestación local |
| **ESLint** | 9.39 | Linting |
| **Prettier** | 3.6.2 | Formateo de código |

---

## 🔧 Decisiones Técnicas

### 1. **Arquitectura Fullstack Containerizada**
- **Decisión**: Utilizar Docker Compose para ambiente de desarrollo
- **Justificación**: Facilita reproducibilidad, evita problemas de "funciona en mi máquina" y prepara el proyecto para despliegue en AWS
- **Beneficio**: Transición suave a producción con AWS ECS/EC2

### 2. **NestJS como Framework Backend**
- **Decisión**: Usar NestJS en lugar de Express o Fastify
- **Justificación**: Arquitectura modular, decoradores, inyección de dependencias, escalabilidad
- **Beneficio**: Código mantenible y profesional, fácil de testear y extender

### 3. **TypeScript en Frontend y Backend**
- **Decisión**: Tipado fuerte en todo el stack
- **Justificación**: Reduce bugs, mejora DX, facilita refactoring
- **Beneficio**: Mayor confiabilidad del código y mejor experiencia de desarrollo

### 4. **Vite sobre Create React App**
- **Decisión**: Usar Vite como build tool
- **Justificación**: Builds más rápidos, HMR instantáneo, menor tamaño de bundle
- **Beneficio**: Mejor experiencia de desarrollo y mejor rendimiento en producción

### 5. **TypeORM para Acceso a Datos**
- **Decisión**: ORM en lugar de queries raw
- **Justificación**: Abstracción de base de datos, migraciones automáticas, type-safe queries
- **Beneficio**: Facilita cambios de BD, previene SQL injection, código más limpio

### 6. **JWT para Autenticación**
- **Decisión**: Stateless authentication con JWT
- **Justificación**: Escalable, no requiere persistent sessions, funciona bien con microservicios
- **Beneficio**: Compatible con arquitectura distribuida en AWS

### 7. **Tailwind CSS para Estilos**
- **Decisión**: Utility-first CSS framework
- **Justificación**: Desarrollo rápido, bundle pequeño, consistencia visual, theme management
- **Beneficio**: Interfaz moderna y responsive sin código CSS custom

### 8. **MySQL 8.0 como Base de Datos**
- **Decisión**: RDBMS en lugar de NoSQL
- **Justificación**: Datos relacionales, ACID compliance, referencias, escalabilidad horizontal
- **Beneficio**: Integridad de datos, fácil migración a AWS RDS

---

## 📂 Estructura del Proyecto

```
dashboard-aws/
├── client/                          # Aplicación React/Vite
│   ├── src/
│   │   ├── auth/                   # Autenticación
│   │   │   ├── components/         # LoginForm, ProtectedRoute
│   │   │   ├── context/            # AuthContext
│   │   │   ├── hooks/              # useLogin
│   │   │   └── services/           # auth-service
│   │   ├── dashboard/              # Módulo Principal
│   │   │   ├── components/         # Componentes UI
│   │   │   ├── sections/           # Secciones funcionales
│   │   │   ├── services/           # API services
│   │   │   └── hooks/              # Custom hooks
│   │   ├── config/                 # Configuración (axios-config)
│   │   ├── pages/                  # Rutas principales
│   │   ├── assets/                 # Recursos estáticos
│   │   ├── App.tsx                 # Componente raíz
│   │   └── main.tsx                # Entry point
│   ├── vite.config.ts              # Configuración Vite
│   ├── tsconfig.json               # Configuración TypeScript
│   ├── eslint.config.js            # Configuración ESLint
│   └── package.json                # Dependencias
│
├── server/                          # Backend NestJS
│   ├── src/
│   │   ├── auth/                   # Módulo autenticación
│   │   │   ├── auth.controller.ts  # Endpoints login/register
│   │   │   ├── auth.service.ts     # Lógica autenticación
│   │   │   ├── jwt.strategy.ts     # Estrategia JWT
│   │   │   ├── jwt-auth.guard.ts   # Guard protección
│   │   │   ├── roles.guard.ts      # Guard por roles
│   │   │   └── dto/                # Login, Register DTO
│   │   ├── users/                  # Módulo usuarios
│   │   │   ├── users.controller.ts # CRUD endpoints
│   │   │   ├── users.service.ts    # Lógica usuarios
│   │   │   ├── entities/           # User entity
│   │   │   └── dto/                # CreateUser, UpdateUser DTO
│   │   ├── sales/                  # Módulo ventas
│   │   │   ├── sales.controller.ts # Endpoints ventas
│   │   │   ├── sales.service.ts    # Lógica ventas
│   │   │   ├── seed.service.ts     # Seeding de datos
│   │   │   ├── entities/           # Sale entity
│   │   │   └── dto/                # CreateSale DTO
│   │   ├── db/                     # Configuración BD
│   │   │   └── data-source.ts      # TypeORM config
│   │   ├── migrations/             # Migraciones BD
│   │   ├── app.module.ts           # Módulo raíz
│   │   ├── app.controller.ts       # Controlador raíz
│   │   ├── app.service.ts          # Servicio raíz
│   │   └── main.ts                 # Entry point
│   ├── test/
│   │   └── app.e2e-spec.ts         # Tests E2E
│   ├── tsconfig.json               # Configuración TypeScript
│   ├── nest-cli.json               # Configuración NestCLI
│   └── package.json                # Dependencias
│
├── docker-compose.yml              # Orquestación servicios
├── DOCKER_COMMANDS.md              # Guía comandos Docker
├── import_example_40_rows.csv       # Datos ejemplo
├── Dockerfile.dev (client)          # Imagen desarrollo frontend
├── Dockerfile.dev (server)          # Imagen desarrollo backend
└── README.md                        # Este archivo
```

---

## 🔌 API REST

### Autenticación

#### Registrar Usuario Nuevo

```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123",
  "role": "USER"
}
```

**Respuesta:**
```json
{
  "id": "uuid",
  "email": "usuario@example.com",
  "role": "USER",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

### Usuarios

#### Obtener Todos los Usuarios

```http
GET /users
Authorization: Bearer <token>
```

#### Obtener Usuario por ID

```http
GET /users/:id
Authorization: Bearer <token>
```

#### Crear Usuario

```http
POST /users
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "nuevo@example.com",
  "password": "password123",
  "role": "USER"
}
```

**Roles disponibles**: `USER` | `ADMIN`

#### Eliminar Usuario

```http
DELETE /users/:id
Authorization: Bearer <token>
```

### Ventas

#### Obtener Todas las Ventas

```http
GET /sales
Authorization: Bearer <token>
```

#### Crear Venta

```http
POST /sales
Authorization: Bearer <token>
Content-Type: application/json

{
  "productName": "Laptop",
  "amount": 999.99,
  "saleDate": "2024-03-15",
  "userId": "uuid"
}
```

#### Importar Ventas desde CSV

```http
POST /sales/import
Authorization: Bearer <token>
Content-Type: multipart/form-data

[archivo CSV]
```

---

## 🧪 Testing

### Backend

```bash
cd server

# Tests unitarios
npm run test

# Tests con watch
npm run test:watch

# Coverage
npm run test:cov

# Tests E2E
npm run test:e2e

# Debug
npm run test:debug
```

### Frontend

```bash
cd client

# Ejecutar tests (si están configurados)
npm run test
```

---

## 📊 Análisis de Código

### Linting

```bash
# Backend
cd server && npm run lint

# Frontend
cd client && npm run lint
```

### Formateo de Código

```bash
# Backend
cd server && npm run format

# Frontend
cd client && npm run format

# Frontend - verificar
cd client && npm run format:check
```

---

## 🚢 Roadmap de Características

### Fase 1: Inicial ✅ (Actual)
- [x] Autenticación con JWT
- [x] CRUD de usuarios
- [x] Gestión de ventas
- [x] Dashboard con gráficos
- [x] Carga de CSV
- [x] Estructura base dockerizada

### Fase 2: Integración AWS 🔄 (En Progreso)
- [ ] **AWS EC2**: Despliegue de aplicación en instancias EC2
  - [ ] Configuración de seguridad groups
  - [ ] Auto-scaling groups
  - [ ] Load balancer
  - [ ] Docker deployment en EC2
  
- [ ] **AWS S3**: Almacenamiento de archivos
  - [ ] Subida de archivos CSV a S3
  - [ ] Procesamiento de archivos directamente desde S3
  - [ ] Generación de URLs presignadas para descarga
  - [ ] Backups automáticos a S3
  
- [x] **AWS RDS**: Base de datos relacional gestionada
  - [x] Migración de MySQL local a RDS
  - [x] Migraciones automáticas con TypeORM
  - [x] Replicación multi-AZ
  - [x] Automated backups

### Fase 3: Mejoras de Producción
- [ ] **Monitoring y Logging**
  - [ ] CloudWatch para logs
  - [ ] CloudWatch Alarms
  - [ ] Application Performance Monitoring (APM)
  
- [ ] **Seguridad**
  - [ ] AWS Secrets Manager para credenciales
  - [ ] VPC y subnet configuration
  - [ ] SSL/TLS certificates con ACM
  - [ ] WAF (Web Application Firewall)
  
- [ ] **CI/CD Pipeline**
  - [ ] AWS CodePipeline
  - [ ] AWS CodeBuild
  - [ ] GitHub Actions integración
  - [ ] Automated testing en pipeline

- [ ] **Escalabilidad**
  - [ ] ECS Task scheduling
  - [ ] Lambda functions para procesamiento
  - [ ] SQS queues para tareas asincrónicas
  - [ ] DynamoDB para caching

### Fase 4: Características Avanzadas
- [ ] WebSockets para actualizaciones en tiempo real
- [ ] Reportes avanzados con exportación
- [ ] Analytics y dashboards ejecutivos
- [ ] Integración con terceros (Stripe, SendGrid, etc)
- [ ] Mobile app (React Native)

---

## 🔒 Seguridad

### Implementado
- ✅ Hashing de contraseñas con bcrypt
- ✅ Autenticación JWT stateless
- ✅ Guards por roles y permisos
- ✅ Validación de DTOs en backend
- ✅ CORS configurado
- ✅ Rate limiting base

### Por Implementar (AWS)
- 🔄 AWS WAF para protección
- 🔄 Secrets Manager para variables sensibles
- 🔄 VPC para aislamiento de red
- 🔄 Encryption en tránsito (HTTPS)
- 🔄 Encryption en reposo (RDS encryption)

---

## 📸 Screenshots

_Próximamente se añadirán screenshots de la interfaz_

---

## 📞 Soporte

### Documentación

- [Documentación API](https://dashboard-aws-production.up.railway.app/api/docs) - Swagger UI
- [React Docs](https://react.dev)
- [NestJS Docs](https://docs.nestjs.com)
- [TypeORM Docs](https://typeorm.io)
- [Vite Docs](https://vitejs.dev)

### Reportar Problemas

Por favor abre un [issue en GitHub](../../issues) con:
- Descripción clara del problema
- Pasos para reproducir
- Stack trace completo
- Sistema operativo y versiones

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver archivo [LICENSE](LICENSE) para más detalles.

---

## ✍️ Autor

**Edgar Favela** - Software Developer

- GitHub: [@EdgarFav](https://github.com/EdgarFav)
- LinkedIn: [edgar-fav](https://www.linkedin.com/in/edgar-fav/)
- Email: edgarfda17@gmail.com

---

## 🙏 Agradecimientos

- [NestJS](https://nestjs.com) - Progressive Node.js framework
- [React](https://react.dev) - JavaScript library for UIs
- [Vite](https://vitejs.dev) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [TypeORM](https://typeorm.io) - ORM for TypeScript

---

## 📝 Changelog

### v0.0.1 (Inicial)
- Release inicial del proyecto
- Setup de autenticación JWT
- CRUD de usuarios
- Gestión de ventas
- Dashboard con gráficos básicos
- Dockerización del proyecto

---

**Última actualización**: Marzo 2026

**Estado**: En desarrollo 🚀

> 💡 **Nota**: Este proyecto está en desarrollo activo. Las características y roadmap pueden cambiar. Mantente atento a las actualizaciones.
