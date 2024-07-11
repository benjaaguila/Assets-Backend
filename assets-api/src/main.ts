import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const config = new DocumentBuilder()
    .setTitle('Assets API')
    .setDescription('API for assets management')
    .setVersion('1.0')
    .addTag('assets')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);


  await app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  }
  );
}
bootstrap();
