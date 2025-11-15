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

	test("[GET] /boards", async () => {
		const response = await request(app.getHttpServer()).get("/boards");

		expect(response.statusCode).toBe(200);

		expect(response.body.length).toBe(1);

		expect(response.body[0]).toMatchObject({ id: 1, name: "teste" });
	});

	test("[GET] /boards/:id", async () => {
		const response = await request(app.getHttpServer()).get("/boards/1");

		expect(response.statusCode).toBe(200);

		expect(response.body).toMatchObject({ id: 1, name: "teste", columns: [] });
	});

	test("[POST] /boards/:id/columns", async () => {
		const name = "coluna teste";

		const response = await request(app.getHttpServer())
			.post("/boards/1/columns")
			.send({ name });

		expect(response.statusCode).toBe(200);

		const column = await prisma.column.findFirst({
			where: {
				boardId: 1,
				name,
			},
		});

		expect(column).toBeTruthy();
	});
});
