import { ApiProperty } from "@nestjs/swagger";

export class TaskUpdateRequest {
	@ApiProperty()
	title: string;

	@ApiProperty()
	description: string;
}
