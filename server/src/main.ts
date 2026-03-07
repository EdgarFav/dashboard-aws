import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    // origin: 'http://localhost:5173', // El puerto de tu cliente Vite
    origin: 'https://dashboard-aws-eight.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Dashboard API')
    .setDescription('Documentación de los endpoints principales del Dashboard')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`Running API in MODE: ${process.env.NODE_ENV} on PORT:${PORT}`);
    // console.log(
    //   `Swagger documentation available at: http://localhost:${PORT}/api/docs`,
    // );
    console.log(
      `Swagger documentation available at: https://dashboard-aws-production.up.railway.app/api/docs`,
    );
  });
}
void bootstrap().catch((err) => {
  console.error('Error starting server:', err);
});
