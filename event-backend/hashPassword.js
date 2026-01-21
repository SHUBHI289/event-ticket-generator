import bcrypt from "bcryptjs";

const run = async () => {
  const plainPassword = "mypassword123"; // the password you want for login
  const hashed = await bcrypt.hash(plainPassword, 10);
  console.log("Hashed password:", hashed);
};

run();
