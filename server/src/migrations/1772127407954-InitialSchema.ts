import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1772127407954 implements MigrationInterface {
    name = 'InitialSchema1772127407954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sales" ("id" SERIAL NOT NULL, "productName" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "category" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "customerEmail" character varying, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastLogin" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "sales"`);
    }

}
