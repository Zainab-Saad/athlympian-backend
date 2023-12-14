import bcrypt from 'bcrypt';

import { db } from '../utils/db.util.js';

export const createAthlete = async (email, password, firstName, lastName) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userType: 'athlete'
    }
  });
  return await db.athlete.create({
    data: {
      id: user.id
    },
    include: {
      user: true
    }
  });
};

export const getAthleteById = async (id) => {
  return await db.athlete.findUnique({
    where: {
      id
    },
    include: {
      user: true
    }
  });
};
