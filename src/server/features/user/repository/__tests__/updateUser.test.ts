import { leanneMock } from "../../mocks/usersMock";
import User from "../../model/User";
import UsersMongooseRepository from "../UsersMongooseRepository";

describe("Given a  UsersMongooseRepository's class updateUser method", () => {
  describe("When it is called with a user 'Leanne Graham' with an username ''", () => {
    test("Then it should return a updated user 'Leanne Graham'  with", async () => {
      const expectedUser = leanneMock;

      User.findOneAndUpdate = jest.fn().mockReturnValue(expectedUser);

      const usersRepository = new UsersMongooseRepository();

      const users = await usersRepository.updateUser(leanneMock);

      expect(users).toStrictEqual(expectedUser);
    });
  });
});
