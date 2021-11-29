const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
let squares = []
let score = 0

//28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

// create board
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        // create a square
        const square = document.createElement('div')
        // put suqare in grid
        grid.appendChild(square)
        // put square in squares array
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
        
    }
}

createBoard()

// starting position of pacman
let pacmanCurrentIndex = 494

squares[pacmanCurrentIndex].classList.add('pacman-right')

function control(e) {
    if (squares[pacmanCurrentIndex].classList.contains('pacman-right')) {
        squares[pacmanCurrentIndex].classList.remove('pacman-right')
    } else if (squares[pacmanCurrentIndex].classList.contains('pacman-up')) {
        squares[pacmanCurrentIndex].classList.remove('pacman-up')
    } else if (squares[pacmanCurrentIndex].classList.contains('pacman-down')) {
        squares[pacmanCurrentIndex].classList.remove('pacman-down');
    } else if (squares[pacmanCurrentIndex].classList.contains('pacman-left')) {
        squares[pacmanCurrentIndex].classList.remove('pacman-left');
    }
    switch(e.keyCode) {
        case 40: 
            if (!squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair'))
                pacmanCurrentIndex += width
                squares[pacmanCurrentIndex].classList.add('pacman-down')
        break
        case 38:
            if (!squares[pacmanCurrentIndex - width].classList.contains('wall'))
                pacmanCurrentIndex -= width
                squares[pacmanCurrentIndex].classList.add('pacman-up')
        break
        case 37:
            if (!squares[pacmanCurrentIndex -1].classList.contains('wall'))
                pacmanCurrentIndex -=1
                squares[pacmanCurrentIndex].classList.add('pacman-left')
                if (pacmanCurrentIndex === 364) {
                    pacmanCurrentIndex = 391
                }
        break
        case 39:
            if (!squares[pacmanCurrentIndex +1].classList.contains('wall'))
                pacmanCurrentIndex +=1
                squares[pacmanCurrentIndex].classList.add('pacman-right')
                if (pacmanCurrentIndex === 391) {
                    pacmanCurrentIndex = 364
                }
        break
    }
    pacDotEaten()
    powerPelletEaten()
    checkForGameOver()
}
document.addEventListener('keydown', control)

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        score += 10
        scoreDisplay.textContent = score
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }
}

function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        //removing class of power-pellet from square
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        //add a score of 100
        score += 100
        scoreDisplay.textContent = score
        //change each of the four ghosts to isScared
        ghosts.forEach(ghost => ghost.isScared = true)
        //use setTimeout to unscare ghosts after 10 seconds 
        setTimeout(unScareGhosts, 10000)
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

//draw my ghosts onto my grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

//move the ghosts
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    ghost.timerId = setInterval(function() {
        //all our code
        //if the next square does NOT contain a wall and does not contain a ghost
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
                //remove any ghost
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        // //add direction to current Index
        ghost.currentIndex += direction
        // //add ghost class
        squares[ghost.currentIndex].classList.add(ghost.className)  
        squares[ghost.currentIndex].classList.add('ghost')  
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        //if the ghost is currently scared and pacman is on it
        if (ghost.isScared &&
            (squares[ghost.currentIndex].classList.contains('pacman-right') ||
            squares[ghost.currentIndex].classList.contains('pacman-left') ||
            squares[ghost.currentIndex].classList.contains('pacman-up') ||
            squares[ghost.currentIndex].classList.contains('pacman-down'))
        )   {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            score += 200
            scoreDisplay.textContent = score
            ghost.currentIndex = ghost.startIndex
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver()
        checkForWin()
    }, ghost.speed )
    
}

function checkForGameOver() {
    //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost
    if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
    ) {
    // then stop ghosts, turn off controls and display "game over"
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keydown', control)
        document.getElementById('game-over').style.display = 'block'
        document.getElementById('restart').style.display = 'block'
    }
}

//check for win
function checkForWin() {
    // check if there are no pac-dots or power pellets left, if true, then replenish them
    if (grid.querySelectorAll('.pac-dot').length === 0 && document.querySelectorAll('.power-pellet').length === 0) {
        for (let i = 0; i < layout.length; i++) {
            if (layout[i] === 0) {
                squares[i].classList.add('pac-dot')
            } else if (layout[i] === 3) {
                squares[i].classList.add('power-pellet')
            }
        }
    // Once a score of 10,000 is reached, the game is won and can be restarted.
    } else if (score >= 10000) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keydown', control)
        document.getElementById('you-win').style.display = 'block'
        document.getElementById('restart').style.display = 'block'
    }
}