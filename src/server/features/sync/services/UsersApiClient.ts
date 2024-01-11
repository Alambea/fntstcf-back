import axios from "axios";
import { type ApiUser } from "../types";
import convertApiUserToUser from "../../../utils/convert.js";
import { type UserWithoutId } from "../../types";

class UsersApiClient implements UsersApiClient {
  constructor() {
    axios.defaults.baseURL = process.env.API_SYNC_URL;
  }

  async getUsers(): Promise<UserWithoutId[]> {
    const { data: apiUsers } = await axios.get<ApiUser[]>("/users");

    const users = convertApiUserToUser(apiUsers);

    return users;
  }
}

export default UsersApiClient;
