import { Module } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { TasksControllers } from "./tasks.controllers";
import { TasksServices } from "./tasks.services";

@Module({
	controllers: [TasksControllers],
	providers: [PrismaService, TasksServices],
})
export class TasksModule {}
