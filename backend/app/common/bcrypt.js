import bcrypt from "bcryptjs";

export const hash = async (text) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(text, salt);
  return hash;
};

