const calcHistory = [];

export const saveCalc = (number) => {
    if (calcHistory.length < 10) {
        calcHistory.push(number);
    } else {
        calcHistory.shift();
        calcHistory.push(number);
    }
}

export const getCalc = () => {
    return calcHistory;
}