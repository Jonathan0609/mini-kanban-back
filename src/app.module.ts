import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./core/config/env";
import { BoardsController } from "./domain/boards/boards.controller";
import { BoardsService } from "./domain/boards/boards.service";
import { ColumnsController } from "./domain/columns/columns.controller";
import { ColumnsService } from "./domain/columns/columns.service";
import { TasksController } from "./domain/tasks/tasks.controller";
import { TasksService } from "./domain/tasks/tasks.service";
import { PrismaService } from "./infra/database/prisma/prisma.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
	],
	controllers: [BoardsController, ColumnsController, TasksController],
	providers: [PrismaService, BoardsService, ColumnsService, TasksService],
})
export class AppModule {}
