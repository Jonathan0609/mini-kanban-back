import { ApiProperty } from "@nestjs/swagger";

export class BoardCreateResponse {
	@ApiProperty()
	id: number;
}
