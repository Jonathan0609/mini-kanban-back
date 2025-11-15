import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./core/config/env";
import { BoardsModule } from "./domain/boards/boards.module";
import { ColumnsModule } from "./domain/columns/columns.module";
import { TasksModule } from "./domain/tasks/tasks.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		BoardsModule,
		ColumnsModule,
		TasksModule,
	],
})
export class AppModule {}
