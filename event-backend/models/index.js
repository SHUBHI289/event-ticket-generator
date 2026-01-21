import { createStudentTable } from "./student.js";
import { createEventTable } from "./event.js";
import { createRegistrationTable } from "./registration.js";

export const initTables = async () => {
  await createStudentTable();
  await createEventTable();
  await createRegistrationTable();
};
