const startGameBtn = document.getElementById('start-game-btn');

const ROCK = '바위';
const PAPER = '보';
const SCISSORS = '가위';
const DEFAULT_USER_CHOICE = ROCK;

const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';
let gameIsRunning = false;
const getPlayerChoice = () => {
    const selection = prompt(`${ROCK}, ${PAPER}, ${SCISSORS}?`, "");
    if (selection !== SCISSORS &&
        selection !== ROCK &&
        selection !== PAPER) {
        alert(`유효하지 않은 선택입니다. ${DEFAULT_USER_CHOICE}를 선택합니다.`);
        return DEFAULT_USER_CHOICE;
    }
    return selection;
}

const getComputerChoice = () => {
    const randomVal = Math.random();
    if (randomVal < 0.34) {
        return ROCK;
    } else if (randomVal < 0.67) {
        return PAPER;
    } else {
        return SCISSORS;
    }
}

// 화살표 함수에서는 화살표 함수가 있고 1개의 표현식만 있다면 중괄호와 return 키워드 생략 가능
// 기본값을 가진 매개변수는 늘 매개변수 리스트의 가장 마지막 (마지막 인수는 생략할 수 있어서 기본 인수를 갖게 되는 것)
const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE) =>
     cChoice === pChoice
        ? RESULT_DRAW
        :   (cChoice === ROCK && pChoice === PAPER) ||
            (cChoice === PAPER && pChoice === SCISSORS) ||
            (cChoice === SCISSORS && pChoice === ROCK)
        ? RESULT_PLAYER_WINS
        : RESULT_COMPUTER_WINS
    // if (cChoice === pChoice) {
    //     return RESULT_DRAW;
    // } else if (
    //     (cChoice === ROCK && pChoice === PAPER) ||
    //     (cChoice === PAPER && pChoice === SCISSORS) ||
    //     (cChoice === SCISSORS && pChoice === ROCK)
    // ) {
    //     return RESULT_PLAYER_WINS;
    // } else {
    //     return RESULT_COMPUTER_WINS;
    // }

const start =  () => {
    if (gameIsRunning) {
        return;
    }
    console.log("Game started");
    gameIsRunning = true;
    const playerChoice = getPlayerChoice();
    console.log(playerChoice, 'playerChoice');
    const computerChoice = getComputerChoice();
    console.log(computerChoice, 'computerChoice')
    const winner = getWinner(computerChoice, playerChoice);
    let message = `당신은 ${playerChoice}, 컴퓨터는 ${computerChoice}를 내서, `
    if (winner === RESULT_DRAW) {
        message += `비겼습니다.`
    } else if (winner === RESULT_COMPUTER_WINS) {
        message += `당신이 이겼습니다.`
    } else {
        message += `당신은 졌습니다.`
    }
    console.log(winner, 'winner');
    alert(message);
    gameIsRunning = false;
}

startGameBtn.addEventListener("click", start);

let sumTotal = 0;
const sumUp = (resultHandler, ...numbers) => {
    console.log(numbers, 'numbers') // [1, 5, 20, -3, 9] (배열)

    const validateNums = (number) => {
        return isNaN(number) ? 0 : number;
    }
    for (const num of numbers) {
        sumTotal += validateNums(num)
    }
    resultHandler(sumTotal, 'ADDING RESULT::')
}

const showResult = (msgText, result) => {
    alert(msgText + ' ' + result)
}
const subtractUp = function(resultHandler, ...numbers) {
    let sum = 0;
    for (const num of numbers) {
        sum -= num
    }
    resultHandler(sum, 'SUBTRACTING RESULT::');
}


const combine = (resultHandler, operation, ...numbers) => {

    const validateNums = (number) => {
        return isNaN(number) ? 0 : number;
    }

    let combineTotal = 0;
    for (const num of numbers) {
        if (operation === 'ADD') {
            combineTotal += validateNums(num)
        } else {
            combineTotal -= validateNums(num)
        }
    }
    resultHandler(combineTotal)

}


subtractUp(showResult, 1, 2, 3, 4);
sumUp(showResult, 5, 20, -3, 9);

// Rest 연산자 관련해서 한 가지 중요한 것은 항상 리스트의 마지막 인수여야 한다는 것

combine(showResult.bind(this, 'add result::'), 'ADD', 1, 5, 'love', 19)