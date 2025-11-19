import { Body, Controller, HttpCode, Param, Post } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { ZodValidationPipe } from "@/_commons/pipes/zod-validation-pipe";
import { ColumnsServices } from "./columns.services";
import {
	ColumnTaskCreateRequest,
	columnTaskCreateRequestSchema,
} from "./dto/requests";

@Controller("/columns")
export class ColumnsControllers {
	constructor(private columnsService: ColumnsServices) {}

	@Post(":id/tasks")
	@HttpCode(201)
	@ApiResponse({ status: 201 })
	@ApiBody({ type: ColumnTaskCreateRequest })
	async createColumn(
		@Param("id") id: string,
		@Body(new ZodValidationPipe(columnTaskCreateRequestSchema))
		body: ColumnTaskCreateRequest,
	) {
		await this.columnsService.handleColumnTaskCreate(Number(id), body);
	}
}
