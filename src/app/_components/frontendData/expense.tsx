import { expenses } from '@/app/_components/frontendData/dummyData';

function findExpenseGroupId(currPageExpenseId: any) {
    let groupId = ""
    for (let expense of expenses) {
        if (!expense) return
        if (expense.expenseId === currPageExpenseId) {
            groupId = expense.groupId
            break
        }
    }

    return groupId
}

export { findExpenseGroupId }