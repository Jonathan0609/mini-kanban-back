import { ApiProperty } from "@nestjs/swagger";

export class ColumnTaskCreateRequest {
	@ApiProperty()
	title: string;

	@ApiProperty({ nullable: true })
	description?: string;
}
