import { Module } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { BoardsControllers } from "./boards.controllers";
import { BoardsServices } from "./boards.services";

@Module({
	controllers: [BoardsControllers],
	providers: [PrismaService, BoardsServices],
})
export class BoardsModule {}
