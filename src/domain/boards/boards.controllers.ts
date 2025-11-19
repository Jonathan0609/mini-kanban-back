import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
} from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { ZodValidationPipe } from "@/_commons/pipes/zod-validation-pipe";
import { BoardsServices } from "./boards.services";
import {
	BoardColumnCreateRequest,
	BoardCreateRequest,
	boardColumnCreateRequestSchema,
	boardCreateRequestSchema,
} from "./dto/requests";
import { BoardCreateResponse, BoardResponse } from "./dto/responses";
import { BoardListResponse } from "./dto/responses/board-list-response";

@Controller("/boards")
export class BoardsControllers {
	constructor(private boardsService: BoardsServices) {}

	@Post()
	@HttpCode(201)
	@ApiResponse({ type: BoardCreateResponse })
	@ApiBody({ type: BoardCreateRequest })
	@UsePipes(new ZodValidationPipe(boardCreateRequestSchema))
	async create(@Body() body: BoardCreateRequest): Promise<BoardCreateResponse> {
		const result = await this.boardsService.handleBoardCreate(body);

		return { id: result.id };
	}

	@Get()
	@HttpCode(200)
	@ApiResponse({ type: BoardListResponse, isArray: true })
	async list(): Promise<BoardListResponse[]> {
		return await this.boardsService.handleBoardList();
	}

	@Get(":id")
	@HttpCode(200)
	@ApiResponse({ type: BoardResponse })
	async get(@Param("id") id: string): Promise<BoardResponse> {
		return await this.boardsService.handleBoard(Number(id));
	}

	@Post(":id/columns")
	@HttpCode(200)
	@ApiResponse({ status: 200 })
	@ApiBody({ type: BoardColumnCreateRequest })
	async createColumn(
		@Param("id") id: string,

		@Body(new ZodValidationPipe(boardColumnCreateRequestSchema))
		body: BoardColumnCreateRequest,
	) {
		await this.boardsService.handleBoardColumnCreate(Number(id), body);
	}
}
