import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export default function SwaggerConfig(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('EverBuy')
    .setDescription('Everbuy api')
    .addBearerAuth(SwaggerBearerConfig())
    .setVersion('v1')
    .build();
  const SwaggerDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, SwaggerDocument);
}
function SwaggerBearerConfig(): SecuritySchemeObject {
  return {
    type: 'http',
    scheme: 'Bearer',
    bearerFormat: 'JWT',
    in: 'header',
  };
}
