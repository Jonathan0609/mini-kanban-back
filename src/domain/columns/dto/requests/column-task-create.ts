import { ApiProperty } from "@nestjs/swagger";
import z from "zod/v4";

export const columnTaskCreateRequestSchema = z.object({
	title: z
		.string({ error: "Titulo não pode ser nulo" })
		.nonempty("Titulo não pode ser vazio"),
	description: z.string().optional(),
});

export class ColumnTaskCreateRequest {
	@ApiProperty()
	title: string;

	@ApiProperty({ nullable: true })
	description?: string;
}
