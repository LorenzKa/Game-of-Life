window.onload = () => {
   const boardSize = 800;
   const pixelSize = 4;
   const startingPercentage = 5;
   const gameSize = boardSize / pixelSize
   let game = new Array(gameSize).fill(false).map(() => new Array(gameSize).fill(false));
   const canvas = <HTMLCanvasElement>document.getElementById('canvas');
   canvas.width = canvas.height = boardSize;
   const ctx = canvas.getContext('2d');
   ctx.fillStyle = 'rgba(0, 0, 0, 1)';
   fillArray()
   window.requestAnimationFrame(draw);
   function draw() {
      ctx.clearRect(0, 0, boardSize, boardSize);
      for (let x = 0; x < gameSize; x++) {
         for (let y = 0; y < gameSize; y++) {
            if (game[x][y]) {
               ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
            }
         }

      }
   }
   function fillArray() {
      const totalSize = gameSize * gameSize
      for (let i = 0; i < totalSize / 100 * startingPercentage; i++) {
         const x = Math.floor(Math.random() * gameSize)
         const y = Math.floor(Math.random() * gameSize)
         game[x][y] = true
      }
      gameOn()
   }
   async function gameOn() {
      while (true) {
         for (let x = 0; x < gameSize; x++) {
            for (let y = 0; y < gameSize; y++) {
               const cell = game[x][y]
               checkRules(checkNeighbours(x, y), x, y, cell)
            }
         }
         console.log("finished checking")
         window.requestAnimationFrame(draw);
         console.log("finished drawing")
         await delay(100);
      }
   }
   function checkRules(aliveNeighbours: number, x: number, y: number, alive: boolean) {
      let tempGame = game;
      if (alive && aliveNeighbours < 2) {
         tempGame[x][y] = false
      }
      if (alive && aliveNeighbours > 3) {
         tempGame[x][y] = false
      }
      if (alive == false && aliveNeighbours == 3) {
         tempGame[x][y] = true
      }
      game = tempGame;
   }
   function checkNeighbours(x: number, y: number) {
      let aliveNeighbours = 0
      if (x > 0) {
         if (game[x - 1][y] == true) {
            aliveNeighbours++
         }
      }
      if (x > 0 && y > 0) {
         if (game[x - 1][y - 1] == true) {
            aliveNeighbours++
         }
      }
      if (x > 0 && y < gameSize-1) {
         if (game[x - 1][y + 1] == true) {
            aliveNeighbours++
         }
      }
      if (y > 0) {
         if (game[x][y - 1] == true) {
            aliveNeighbours++
         }
      }
      if (x < gameSize-1 && y > 0) {
         if (game[x + 1][y - 1] == true) {
            aliveNeighbours++
         }
      }
      if (x < gameSize-1) {
         if (game[x + 1][y] == true) {
            aliveNeighbours++
         }
      }
      if (x < gameSize-1 && y < gameSize-1) {
         if (game[x + 1][y + 1] == true) {
            aliveNeighbours++
         }
      }
      if (y < gameSize-1) {
         if (game[x][y + 1] == true) {
            aliveNeighbours++
         }
      }
      return aliveNeighbours
   }
   function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }
};
