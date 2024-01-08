import { type UserWithoutId, type UserStructure } from "../../types";

export const leanneMock: Omit<UserWithoutId, "externalId"> = {
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: "Kulas Light, Apt. 556, Gwenborough, 92998-3874",
};

const ervinMock: UserWithoutId = {
  name: "Ervin Howell",
  username: "Antonette",
  email: "Shanna@melissa.tv",
  externalId: "2",
  address: "Victor Plains, Suite 879, Wisokyburgh, 90566-7771",
};

export const usersMock: UserStructure[] = [
  {
    ...leanneMock,
    _id: "659730dc918836cd309acda2",
  },
  {
    ...ervinMock,
    _id: "6597311f918836cd309acda5",
  },
];
