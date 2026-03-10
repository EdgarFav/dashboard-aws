import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUploadedByToSales1772127407955 implements MigrationInterface {
  name = 'AddUploadedByToSales1772127407955';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Verificar si existe un usuario con ID 1, si no crear uno
    const userExists = await queryRunner.query(
      `SELECT id FROM "users" WHERE id = 1`,
    );

    if (userExists.length === 0) {
      // Crear un usuario por defecto para asignar las ventas existentes
      await queryRunner.query(
        `INSERT INTO "users" (email, password, role, "createdAt") VALUES('system@admin.com', 'default', 'admin', NOW()) ON CONFLICT(email) DO NOTHING`,
      );
    }

    // 2. Agregar la columna sin constraint primero
    await queryRunner.query(
      `ALTER TABLE "sales" ADD "uploadedById" integer DEFAULT 1`,
    );

    // 3. Actualizar todos los registros existentes que no tengan uploadedById
    await queryRunner.query(
      `UPDATE "sales" SET "uploadedById" = 1 WHERE "uploadedById" IS NULL`,
    );

    // 4. Hacer la columna NOT NULL
    await queryRunner.query(
      `ALTER TABLE "sales" ALTER COLUMN "uploadedById" SET NOT NULL`,
    );

    // 5. Agregar el constraint FK
    await queryRunner.query(
      `ALTER TABLE "sales" ADD CONSTRAINT "FK_uploadedById" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales" DROP CONSTRAINT "FK_uploadedById"`,
    );
    await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "uploadedById"`);
  }
}
