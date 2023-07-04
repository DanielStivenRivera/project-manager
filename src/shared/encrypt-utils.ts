import * as bcrypt from 'bcrypt';

export async function hashPassword(
  password: string,
  salt?: number,
): Promise<string> {
  return await bcrypt.hash(password, salt ?? (await bcrypt.genSalt()));
}

export async function CompareHash(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
