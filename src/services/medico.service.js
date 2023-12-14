import bcrypt from 'bcrypt';

import { db } from '../utils/db.util.js';

export const createMedico = async (email, password, firstName, lastName) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userType: 'medico'
    }
  });
  return await db.medico.create({
    data: {
      id: user.id
    },
    include: {
      user: true
    }
  });
};

export const getMedicoById = async (id) => {
  return await db.medico.findUnique({
    where: {
      id
    },
    include: {
      user: true
    }
  });
};
