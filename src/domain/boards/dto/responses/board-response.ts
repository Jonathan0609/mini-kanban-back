import { ApiProperty } from "@nestjs/swagger";

class Task {
	@ApiProperty()
	id: number;

	@ApiProperty()
	title: string;

	@ApiProperty({ nullable: true })
	description: string | null;
}

class Column {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty({ type: Task, isArray: true })
	tasks?: Task[];
}

export class BoardResponse {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty({ type: Column, isArray: true })
	columns?: Column[];
}
