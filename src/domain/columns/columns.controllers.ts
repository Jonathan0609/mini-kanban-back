import { Body, Controller, HttpCode, Param, Post } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { ColumnsServices } from "./columns.services";
import { ColumnTaskCreateRequest } from "./dto/requests/column-task-create";

@Controller("/columns")
export class ColumnsControllers {
	constructor(private columnsService: ColumnsServices) {}

	@Post(":id/tasks")
	@HttpCode(200)
	@ApiResponse({ status: 200 })
	@ApiBody({ type: ColumnTaskCreateRequest })
	async createColumn(
		@Param("id") id: string,
		@Body() body: ColumnTaskCreateRequest,
	) {
		await this.columnsService.handleColumnTaskCreate(Number(id), body);
	}
}
