import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";

const prisma = new PrismaClient();

function generateUniqueDatabaseUrl(schemaId: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error("Informe a url do banco no enviromnent .env");
	}

	const url = new URL(process.env.DATABASE_URL);

	url.searchParams.set("schema", schemaId);

	return url.toString();
}

const schemaId = randomUUID();

// Alterando database_url antes dos testes
//NOTE: Cada teste rodará em um ambiente isolado
beforeAll(async () => {
	const databaseUrl = generateUniqueDatabaseUrl(schemaId);

	process.env.DATABASE_URL = databaseUrl;

	//NOTE: Irá rodar a migration no banco, não gerar.
	execSync("yarn prisma migrate deploy");
});

afterAll(async () => {
	await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);

	prisma.$disconnect();
});
