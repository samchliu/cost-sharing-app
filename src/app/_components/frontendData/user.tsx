import { usersInfo } from '@/app/_components/frontendData/dummyData';

let loginUserId = 'u1';

const user = (id: any) =>
  usersInfo.filter((user) => {
    return user.userId === id;
  })[0];

export { loginUserId, user };