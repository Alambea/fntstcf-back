import { type UserWithoutId, type UserStructure } from "../../types";

export const leanneMock: Omit<UserWithoutId, "externalId"> = {
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: "Gwenborough Kulas Light, Apt. 556, 92998-3874",
};

export const ervinMock: UserWithoutId = {
  name: "Ervin Howell",
  username: "Antonette",
  email: "Shanna@melissa.tv",
  externalId: "2",
  address: "Wisokyburgh Victor Plains, Suite 879, 90566-7771",
};

export const usersMock: UserStructure[] = [
  {
    ...leanneMock,
    externalId: "1",
    _id: "659730dc918836cd309acda2",
  },
  {
    ...ervinMock,
    _id: "6597311f918836cd309acda5",
  },
];
