import { ApiProperty } from "@nestjs/swagger";

export class BoardListResponse {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;
}
