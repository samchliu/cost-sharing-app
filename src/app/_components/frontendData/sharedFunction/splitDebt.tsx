import { filterExpense } from '@/app/_components/frontendData/sharedFunction/totalDebts';
import { expenses } from '@/app/_components/frontendData/dummyData';

function splitExpense(groupId: any) {
  let { totalDebts } = filterExpense(expenses);

  //split debt initial
  let newTotalDebts: any = { ...totalDebts };
  let splitDebt: any = {};
  let bigCreditor: any = Object.keys(newTotalDebts)[0]; //最大債務主
  let bigDebtor: any = Object.keys(newTotalDebts)[0]; //最大債務人

  //count current debt amount
  const reducer = (acc: any, cur: any) => {
    return acc + Math.abs(cur);
  };

  //While there are still debt amount, it keep chasing the debt
  while ((Object.values(newTotalDebts).reduce(reducer, 0) as any) > 0) {
    for (const p of Object.keys(newTotalDebts)) {
      if (newTotalDebts[p] > newTotalDebts[bigCreditor]) {
        bigCreditor = p;
      } else if (newTotalDebts[p] < newTotalDebts[bigDebtor]) {
        bigDebtor = p;
      }
    }
    // console.log('')
    // console.log('--- bigCreditor ---')
    // console.log(bigCreditor)
    // console.log('--- bigCreditor end --- ')
    // console.log('')
    // console.log('--- bigDebtor ---')
    // console.log(bigDebtor)
    // console.log('--- bigDebtor end --- ')
    // console.log('')
    //Current maximum debt amount
    const debtAmount = Math.min(newTotalDebts[bigCreditor], -newTotalDebts[bigDebtor]);

    if (Object.keys(splitDebt).includes(bigCreditor)) {
      splitDebt[bigCreditor][bigDebtor] = debtAmount;
    } else {
      splitDebt[bigCreditor] = {};
      splitDebt[bigCreditor][bigDebtor] = debtAmount;
    }

    if (Object.keys(splitDebt).includes(bigDebtor)) {
      splitDebt[bigDebtor][bigCreditor] = -debtAmount;
    } else {
      splitDebt[bigDebtor] = {};
      splitDebt[bigDebtor][bigCreditor] = -debtAmount;
    }

    newTotalDebts[bigCreditor] -= debtAmount;
    newTotalDebts[bigDebtor] += debtAmount;
  }

  return splitDebt;
}

export { splitExpense };