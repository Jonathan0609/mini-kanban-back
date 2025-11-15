import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { ColumnTaskCreateRequest } from "./dto/requests/column-task-create";

@Injectable()
export class ColumnsServices {
	constructor(private prisma: PrismaService) {}

	async handleColumnTaskCreate(id: number, body: ColumnTaskCreateRequest) {
		await this.prisma.task.create({
			data: { title: body.title, description: body.description, columnId: id },
		});
	}
}
