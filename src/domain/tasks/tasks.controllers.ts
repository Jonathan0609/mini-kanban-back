import {
	Body,
	Controller,
	Delete,
	HttpCode,
	Param,
	Patch,
	Put,
} from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { TaskMoveRequest } from "./dto/requests/task-move-request";
import { TaskUpdateRequest } from "./dto/requests/task-update-request";
import { TasksServices } from "./tasks.services";

@Controller("/tasks")
export class TasksControllers {
	constructor(private tasksService: TasksServices) {}

	@Put(":id")
	@HttpCode(200)
	@ApiResponse({ status: 200 })
	@ApiBody({ type: TaskUpdateRequest })
	async update(@Param("id") id: string, @Body() body: TaskUpdateRequest) {
		await this.tasksService.handleTaskUpdate(Number(id), body);
	}

	@Delete(":id")
	@HttpCode(200)
	@ApiResponse({ status: 200 })
	async delete(@Param("id") id: string) {
		await this.tasksService.handleTaskDelete(Number(id));
	}

	@Patch(":id/move")
	@HttpCode(200)
	@ApiResponse({ status: 200 })
	async move(@Param("id") id: string, @Body() body: TaskMoveRequest) {
		await this.tasksService.handleTaskMove(Number(id), body);
	}
}
