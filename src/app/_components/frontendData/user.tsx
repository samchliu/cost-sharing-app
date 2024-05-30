import { usersInfo } from '@/app/_components/frontendData/dummyData';

let loginUserId = 'u3';

const user = (id: any) =>
  usersInfo.filter((user) => {
    return user.userId === id;
  })[0];

export { loginUserId, user };