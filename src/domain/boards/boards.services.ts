import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { BoardCreateRequest } from "./dto/requests";
import { BoardColumnCreateRequest } from "./dto/requests/board-column-create-request";
import { BoardResponse } from "./dto/responses";

@Injectable()
export class BoardsServices {
	constructor(private prisma: PrismaService) {}

	async handleBoardCreate(body: BoardCreateRequest) {
		const board = await this.prisma.board.findUnique({
			where: { name: body.name },
		});

		if (board) throw new BadRequestException("Quadro já criado");

		return await this.prisma.board.create({ data: { name: body.name } });
	}

	async handleBoardList() {
		return await this.prisma.board.findMany();
	}

	async handleBoard(id: number): Promise<BoardResponse> {
		const board = await this.prisma.board.findUnique({
			where: { id },
			include: {
				columns: {
					omit: { boardId: true },
					include: { tasks: { omit: { columnId: true } } },
				},
			},
		});

		if (!board) throw new NotFoundException("Quadro já criado");

		return board;
	}

	async handleBoardColumnCreate(id: number, body: BoardColumnCreateRequest) {
		await this.prisma.column.create({
			data: { name: body.name, boardId: id },
		});
	}
}
