import { type ApiUser } from "../features/sync/types";
import { type UserWithoutId } from "../features/types";

const convertApiUserToUser = (apiUsers: ApiUser[]) => {
  const apiUsersDeepCopy = structuredClone(apiUsers);

  const users = apiUsersDeepCopy.map<UserWithoutId>(
    ({ name, address, email, id, username }) => ({
      externalId: id.toString(),
      name,
      username,
      email,
      address: `${address.city} ${address.street}, ${address.suite}, ${address.zipcode}`,
    }),
  );

  return users;
};

export default convertApiUserToUser;
