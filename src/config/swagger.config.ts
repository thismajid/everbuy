import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { APP_PORT } from './global.config';

export default function SwaggerConfig(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('EverBuy')
    .setDescription('Everbuy api')
    .addBearerAuth(SwaggerBearerConfig())
    .setVersion('v1')
    .addServer(`http://localhost:${APP_PORT}`, 'Development server')
    .build();
  const SwaggerDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, SwaggerDocument, {
    swaggerOptions: {
      tagsSorter: 'alpha',
    },
    customSiteTitle: 'Everbuy API Documentation',
  });
}
function SwaggerBearerConfig(): SecuritySchemeObject {
  return {
    type: 'http',
    scheme: 'Bearer',
    bearerFormat: 'JWT',
    in: 'header',
  };
}
