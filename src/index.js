var road = 'S..|...|..';
var time = 10;
//create main function to run the app
function main() {
    console.log(maxDistance('>***>'));
}
main();
function maxDistance(movements) {
    // Code here
    var moveResult = 0;
    var moveStar = 0;
    for (var i = 0; i < movements.length; i++) {
        if (movements[i] === '>') {
            moveResult += 1;
        }
        else if (movements[i] === '<') {
            moveResult -= 1;
        }
        else if (movements[i] === '*') {
            moveStar += 1;
        }
    }
    return Math.abs(moveResult) + moveStar;
}
// const movements = '>>*<'
// const result = maxDistance(movements)
// console.log(result) // -> 2
