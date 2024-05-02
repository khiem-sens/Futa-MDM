const moneyConvert = (str) => {
    str = String(str);
    let arrtemp = [];
    let i = 0;
    str.split('').reverse().forEach(c => {
        i++;
        arrtemp.push(c);
        if (i % 3 === 0) {
            arrtemp.push('.')
        }
    });
    if (arrtemp[0] === '.') {
        arrtemp.reverse().pop();
        arrtemp.reverse();
    }
    if (arrtemp[arrtemp.length - 1] === '.'){
        arrtemp.pop();
    }

    return arrtemp.reverse().join('');
}

module.exports = {
    moneyConvert
};
