import { ApiProperty } from "@nestjs/swagger";

export class TaskMoveRequest {
	@ApiProperty()
	newColumnId: number;
}
