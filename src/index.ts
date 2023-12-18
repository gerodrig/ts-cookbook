const road = 'S..|...|..';
const time = 10;

//create main function to run the app
function main() {
  console.log(maxDistance('>***>'));
}


main();



function maxDistance(movements: string) {
  // Code here
  let moveResult = 0;
  let moveStar = 0;

  for(let i = 0; i < movements.length; i++) {
    if (movements[i] === '>') {
      moveResult += 1;
    } else if (movements[i] === '<') {
      moveResult -= 1;
    } else if (movements[i] === '*') {
      moveStar += 1;
    }
  }

  return Math.abs(moveResult) + moveStar;
}

