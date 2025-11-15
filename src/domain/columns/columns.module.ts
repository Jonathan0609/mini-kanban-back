import { Module } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { ColumnsControllers } from "./columns.controllers";
import { ColumnsServices } from "./columns.services";

@Module({
	controllers: [ColumnsControllers],
	providers: [PrismaService, ColumnsServices],
})
export class ColumnsModule {}
