import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "@/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";

describe("Tests board (E2E)", () => {
	let app: INestApplication;
	let prisma: PrismaService;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();

		prisma = moduleRef.get(PrismaService);

		await app.init();
	});

	test("[POST] /boards", async () => {
		const name = "teste";

		const response = await request(app.getHttpServer())
			.post("/boards")
			.send({ name });

		expect(response.statusCode).toBe(201);

		const board = await prisma.board.findFirst({ where: { name } });

		expect(board).toBeTruthy();
	});
});
