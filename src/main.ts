import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { Env } from "./core/config/env";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("Mini Kanban")
		.setDescription("Documentação oficial da API")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("docs", app, document);

	const configService = app.get<ConfigService<Env, true>>(ConfigService);

	const port = configService.get("PORT", { infer: true });

	await app.listen(port);
}

bootstrap();
