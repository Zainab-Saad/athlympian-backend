import { db } from '../utils/db.util.js';

export const getUserByEmail = async (email) => {
  return await db.user.findUnique({
    where: {
      email
    }
  });
};

export const getUserById = async (id) => {
  return await db.user.findUnique({
    where: {
      id
    }
  });
};

export const updateUserVerificationStatus = async (email) => {
  return await db.user.update({
    where: {
      email
    },
    data: {
      isEmailVerified: true
    }
  });
};
