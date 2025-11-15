import { ApiProperty } from "@nestjs/swagger";
import z from "zod/v4";

export const boardCreateRequestSchema = z.object({
	name: z
		.string({ error: "Nome não pode ser nulo" })
		.nonempty("Nome não pode ser vazio"),
});

export class BoardCreateRequest {
	@ApiProperty()
	name: string;
}
