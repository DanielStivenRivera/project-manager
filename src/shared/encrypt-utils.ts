import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string, salt?: number): Promise<string> {
  return await bcrypt.hash(password, salt ?? (await bcrypt.genSalt()));
}
