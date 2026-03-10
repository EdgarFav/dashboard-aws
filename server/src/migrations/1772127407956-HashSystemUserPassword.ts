import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class HashSystemUserPassword1772127407956 implements MigrationInterface {
  name = 'HashSystemUserPassword1772127407956';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Hashear la contraseña del usuario del sistema
    const hashedPassword = await bcrypt.hash('default', 10);

    await queryRunner.query(
      `UPDATE "users" SET password = $1 WHERE email = 'system@admin.com'`,
      [hashedPassword],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No hacemos nada al revertir - no es seguro saber cuál era la original
  }
}
