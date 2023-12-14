import {
  createAthlete,
  getAthleteById
} from '../../services/athlete.service.js';
import { createMedico, getMedicoById } from '../../services/medico.service.js';
import { authErrors } from '../../errors/auth.error.js';
import { sendVerificationEmail } from '../../utils/email.util.js';

export const getRoleBasedUserData = async (userType, id) => {
  let roleBasedUserData, clonedUserObject;
  switch (userType) {
    case 'athlete':
      roleBasedUserData = await getAthleteById(id);
      clonedUserObject = Object.assign({}, roleBasedUserData);
      delete clonedUserObject.password;
      return roleBasedUserData;
    case 'medico':
      roleBasedUserData = await getMedicoById(id);
      clonedUserObject = Object.assign({}, roleBasedUserData);
      delete clonedUserObject.password;
      return roleBasedUserData;
    default:
      throw new Error(authErrors.INVALID_USER_TYPE);
  }
};

export const createRoleBasedUser = async (
  email,
  password,
  firstName,
  lastName,
  userType
) => {
  switch (userType.toLowerCase()) {
    case 'athlete':
      await createAthlete(email, password, firstName, lastName);
      sendVerificationEmail(email);
      return;
    case 'medico':
      await createMedico(email, password, firstName, lastName);
      sendVerificationEmail(email);
      break;
    default:
      throw new Error(authErrors.INVALID_USER_TYPE);
  }
};
