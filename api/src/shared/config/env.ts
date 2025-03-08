import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator';

class Env {
  @IsNotEmpty()
  @IsString()
  @NotEquals(
    'postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public',
  )
  dbURL: string;

  @IsNotEmpty()
  @IsString()
  @NotEquals('your_jwt_secret')
  jwtSecret: string;
}

export const env: Env = plainToInstance(Env, {
  dbURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
