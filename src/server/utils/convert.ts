import { type ApiUser } from "../features/sync/types";
import { type UserWithoutId } from "../features/types";

const convertApiUserToUser = (apiUsers: ApiUser[]): UserWithoutId[] => {
  const apiUsersDeepCopy = structuredClone(apiUsers);

  const users = apiUsersDeepCopy.map<UserWithoutId>(
    ({ name, address, email, id, username }) => ({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      external_id: id.toString(),
      name,
      username,
      email,
      address: `${address.city} ${address.street}, ${address.suite}, ${address.zipcode}`,
    }),
  );

  return users;
};

export default convertApiUserToUser;
