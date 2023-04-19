function Not(v) {
    return parseInt(v) === 1 ? 0 : 1;
}

function Or(v1, v2) {
    if (parseInt(v1) || parseInt(v2)) return 1;
    else return 0;
}

function And(v1, v2) {
    if (parseInt(v1) && parseInt(v2)) return 1;
    else return 0;
}

function XOr(v1, v2) {
    if (Or(And(Not(v1), v2), And(v1, Not(v2)))) return 1;
    else return 0;
}

function halfAdder(n1, n2) {
    return [XOr(n1, n2), And(n1, n2)];
}

function fullAdder(n1, n2, c) {
    var sum = XOr(n1, n2);
    return [XOr(sum, c), Or(And(sum, c), And(n1, n2))];
}

function twoBitAdder(n1, n2) {
    var [sum1, c1] = halfAdder(n1[1], n2[1]);
    var [sum2, c2] = fullAdder(n1[0], n2[0], c1);
    return [[sum2, sum1].join(""), c2];
}

function fourBitAdder(n1, n2) {
    var [sum1, c1] = halfAdder(n1[3], n2[3]);
    var [sum2, c2] = fullAdder(n1[2], n2[2], c1);
    var [sum3, c3] = fullAdder(n1[1], n2[1], c2);
    var [sum4, c4] = fullAdder(n1[0], n2[0], c3);
    return [[sum4, sum3, sum2, sum1].join(""), c4];
}

var num1 = 5;
var num2 = 9;
var type = "4bits";
var nums = {
    "2bits": {
        binnum1:
            num1.toString(2).length === 1
                ? "0" + num1.toString(2)
                : num1.toString(2),
        binnum2:
            num2.toString(2).length === 1
                ? "0" + num2.toString(2)
                : num2.toString(2)
    },
    "4bits": {
        binnum1:
            num1.toString(2).length === 3
                ? "0" + num1.toString(2)
                : num1.toString(2),
        binnum2:
            num2.toString(2).length === 3
                ? "0" + num2.toString(2)
                : num2.toString(2)
    }
};

var res = fourBitAdder(nums[type].binnum1, nums[type].binnum2);

console.log(
    nums[type].binnum1 +
        " + " +
        nums[type].binnum2 +
        " = " +
        res[0] +
        ", carry: " +
        res[1]
);
console.log(
    parseInt(nums[type].binnum1, 2) +
        " + " +
        parseInt(nums[type].binnum2, 2) +
        " = " +
        parseInt(res + (res[1] != 0 ? 16 : 0), 2)
);

/*console.log(
    "NOT:\n--------------------------",
    "\nNot(0): " + Not(0),
    "\nNot(1): " + Not("1"),
    "\n\nOR:\n--------------------------",
    "\nOr(0, 0): " + Or("0", "0"),
    "\nOr(0, 1): " + Or(0, 1),
    "\nOr(1, 0): " + Or("1", 0),
    "\nOr(1, 1): " + Or("1", 1),
    "\n\nAND\n--------------------------",
    "\nAnd(0, 0): " + And(0, 0),
    "\nAnd(0, 1): " + And(0, 1),
    "\nAnd(1, 0): " + And("1", 0),
    "\nAnd(1, 1): " + And("1", 1),
    "\n\nXOR\n--------------------------",
    "\nXOr(0, 0): " + XOr(0, 0),
    "\nXOr(0, 1): " + XOr(0, 1),
    "\nXOr(1, 0): " + XOr("1", 0),
    "\nXOr(1, 1): " + XOr("1", 1)
);*/
