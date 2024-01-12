import { apiUsersMock } from "../../../../mocks/apiUsersMock";
import {
  ervinMock,
  leanneMock,
  usersMock,
} from "../../../user/mocks/usersMock";
import UsersApiClient from "../UsersApiClient";
import axios from "axios";

describe("Given a UsersApiClient's getUsers method", () => {
  describe("When it is called", () => {
    test(`It should return a list of users with ${usersMock[0].name} and ${usersMock[1].name}`, async () => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const expectedUsers = [{ ...leanneMock, external_id: "1" }, ervinMock];
      axios.get = jest.fn().mockResolvedValue({ data: apiUsersMock });

      const userApiClient = new UsersApiClient();

      const users = await userApiClient.getUsers();

      expect(users).toStrictEqual(expectedUsers);
    });
  });
});
