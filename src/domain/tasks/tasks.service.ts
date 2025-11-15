import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { TaskMoveRequest } from "./dto/requests/task-move-request";
import { TaskUpdateRequest } from "./dto/requests/task-update-request";

@Injectable()
export class TasksService {
	constructor(private prisma: PrismaService) {}

	async handleTaskUpdate(id: number, body: TaskUpdateRequest) {
		await this.prisma.task.update({
			where: {
				id,
			},
			data: { title: body.title, description: body.description },
		});
	}

	async handleTaskDelete(id: number) {
		await this.prisma.task.delete({
			where: {
				id,
			},
		});
	}

	async handleTaskMove(id: number, body: TaskMoveRequest) {
		const column = await this.prisma.column.findUnique({
			where: { id: body.newColumnId },
		});

		if (!column) throw new BadRequestException("Coluna não encontrada");

		await this.prisma.task.update({
			where: { id },
			data: { columnId: body.newColumnId },
		});
	}
}
