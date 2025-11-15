import { ApiProperty } from "@nestjs/swagger";
import z from "zod/v4";

export const boardColumnCreateRequestSchema = z.object({
	name: z
		.string({ error: "Nome não pode ser nulo" })
		.nonempty("Nome não pode ser vazio"),
});

export class BoardColumnCreateRequest {
	@ApiProperty()
	name: string;
}
