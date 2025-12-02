import React, { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";

export default function MathAdventureGame() {
  const gameContainer = useRef(null);
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState("");
  const [gameActive, setGameActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!gameActive) return;

    // Game variables
    let player;
    let numbers = [];
    let currentEquation = "";
    let targetResult = 0;
    let collectedNumbers = [];
    let gameScore = 0;
    let gameTime = 60;

    // Create the PIXI app
    const app = new PIXI.Application({
      width: 800,
      height: 500,
      backgroundColor: 0x87ceeb,
      antialias: true,
    });

    gameContainer.current.appendChild(app.view);

    // Generate a math problem
    const generateMathProblem = () => {
      const operations = ['+', '-', '*'];
      const operation = operations[Math.floor(Math.random() * operations.length)];
      let num1, num2;
      
      switch(operation) {
        case '+':
          num1 = Math.floor(Math.random() * 10) + 1;
          num2 = Math.floor(Math.random() * 10) + 1;
          targetResult = num1 + num2;
          break;
        case '-':
          num1 = Math.floor(Math.random() * 15) + 5;
          num2 = Math.floor(Math.random() * num1) + 1;
          targetResult = num1 - num2;
          break;
        case '*':
          num1 = Math.floor(Math.random() * 6) + 1;
          num2 = Math.floor(Math.random() * 6) + 1;
          targetResult = num1 * num2;
          break;
      }
      
      currentEquation = `${num1} ${operation} ${num2} = ?`;
      setCurrentProblem(currentEquation);
      return targetResult;
    };

    // Create player character
    const createPlayer = () => {
      const playerGraphics = new PIXI.Graphics();
      playerGraphics.beginFill(0x4A90E2);
      playerGraphics.drawCircle(0, 0, 20);
      playerGraphics.endFill();
      
      // Add eyes
      playerGraphics.beginFill(0xFFFFFF);
      playerGraphics.drawCircle(-8, -5, 4);
      playerGraphics.drawCircle(8, -5, 4);
      playerGraphics.endFill();
      
      playerGraphics.beginFill(0x000000);
      playerGraphics.drawCircle(-8, -5, 2);
      playerGraphics.drawCircle(8, -5, 2);
      playerGraphics.endFill();

      player = new PIXI.Container();
      player.addChild(playerGraphics);
      player.x = app.screen.width / 2;
      player.y = app.screen.height / 2;
      app.stage.addChild(player);
    };

    // Create number collectibles
    const createNumbers = (target) => {
      // Clear existing numbers
      numbers.forEach(num => app.stage.removeChild(num));
      numbers = [];
      collectedNumbers = [];

      // Create number options including the correct answer and distractors
      const numberOptions = [target];
      while (numberOptions.length < 4) {
        const randomNum = Math.floor(Math.random() * 20) + 1;
        if (!numberOptions.includes(randomNum)) {
          numberOptions.push(randomNum);
        }
      }

      // Shuffle the numbers
      numberOptions.sort(() => Math.random() - 0.5);

      // Create number sprites
      numberOptions.forEach((num, index) => {
        const numberContainer = new PIXI.Container();
        
        // Background circle
        const bg = new PIXI.Graphics();
        bg.beginFill(0xF39C12);
        bg.drawCircle(0, 0, 25);
        bg.endFill();
        numberContainer.addChild(bg);
        
        // Number text
        const numberText = new PIXI.Text(num.toString(), {
          fontFamily: 'Arial',
          fontSize: 18,
          fill: 0xFFFFFF,
          fontWeight: 'bold'
        });
        numberText.anchor.set(0.5);
        numberContainer.addChild(numberText);
        
        // Position numbers around the screen
        const angle = (index / numberOptions.length) * Math.PI * 2;
        numberContainer.x = app.screen.width / 2 + Math.cos(angle) * 200;
        numberContainer.y = app.screen.height / 2 + Math.sin(angle) * 150;
        
        numberContainer.numberValue = num;
        numberContainer.interactive = true;
        numberContainer.buttonMode = true;
        
        app.stage.addChild(numberContainer);
        numbers.push(numberContainer);
      });
    };

    // Create game boundaries and obstacles
    const createEnvironment = () => {
      // Ground
      const ground = new PIXI.Graphics();
      ground.beginFill(0x7CFC00);
      ground.drawRect(0, app.screen.height - 50, app.screen.width, 50);
      ground.endFill();
      app.stage.addChild(ground);

      // Trees
      for (let i = 0; i < 3; i++) {
        const tree = new PIXI.Graphics();
        tree.beginFill(0x8B4513);
        tree.drawRect(i * 250 + 100, app.screen.height - 120, 20, 70);
        tree.endFill();
        
        tree.beginFill(0x228B22);
        tree.drawCircle(i * 250 + 110, app.screen.height - 150, 40);
        tree.endFill();
        
        app.stage.addChild(tree);
      }
    };

    // Check collision between player and numbers
    const checkCollisions = () => {
      numbers.forEach((number, index) => {
        const dx = player.x - number.x;
        const dy = player.y - number.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 45 && !collectedNumbers.includes(number.numberValue)) {
          collectedNumbers.push(number.numberValue);
          
          // Visual feedback
          number.alpha = 0.5;
          
          // Check if correct number collected
          if (number.numberValue === targetResult) {
            gameScore += 10;
            setScore(gameScore);
            
            // Success effect
            const successText = new PIXI.Text('Correct! +10', {
              fontFamily: 'Arial',
              fontSize: 24,
              fill: 0x00FF00,
              fontWeight: 'bold'
            });
            successText.anchor.set(0.5);
            successText.x = app.screen.width / 2;
            successText.y = 50;
            app.stage.addChild(successText);
            
            setTimeout(() => {
              app.stage.removeChild(successText);
              // Generate new problem
              const newTarget = generateMathProblem();
              createNumbers(newTarget);
            }, 1000);
          } else {
            // Wrong number effect
            const wrongText = new PIXI.Text('Wrong! Try again', {
              fontFamily: 'Arial',
              fontSize: 24,
              fill: 0xFF0000,
              fontWeight: 'bold'
            });
            wrongText.anchor.set(0.5);
            wrongText.x = app.screen.width / 2;
            wrongText.y = 50;
            app.stage.addChild(wrongText);
            
            setTimeout(() => {
              app.stage.removeChild(wrongText);
            }, 1000);
          }
        }
      });
    };

    // Initialize game
    const initGame = () => {
      createEnvironment();
      createPlayer();
      const target = generateMathProblem();
      createNumbers(target);
      
      // Keyboard controls
      const keys = {};
      window.addEventListener("keydown", (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
          keys[e.key] = true;
        }
      });
      window.addEventListener("keyup", (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
          keys[e.key] = false;
        }
      });

      // Game loop
      app.ticker.add(() => {
        // Player movement
        const speed = 4;
        if (keys["ArrowUp"] || keys["w"]) player.y -= speed;
        if (keys["ArrowDown"] || keys["s"]) player.y += speed;
        if (keys["ArrowLeft"] || keys["a"]) player.x -= speed;
        if (keys["ArrowRight"] || keys["d"]) player.x += speed;

        // Boundary checking
        player.x = Math.max(30, Math.min(app.screen.width - 30, player.x));
        player.y = Math.max(30, Math.min(app.screen.height - 80, player.y));

        checkCollisions();
      });

      // Timer
      const timer = setInterval(() => {
        gameTime--;
        setTimeLeft(gameTime);
        
        if (gameTime <= 0) {
          clearInterval(timer);
          setGameActive(false);
          // Show game over screen
          const gameOverText = new PIXI.Text(`Game Over!\nFinal Score: ${gameScore}`, {
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 0xFF0000,
            fontWeight: 'bold',
            align: 'center'
          });
          gameOverText.anchor.set(0.5);
          gameOverText.x = app.screen.width / 2;
          gameOverText.y = app.screen.height / 2;
          app.stage.addChild(gameOverText);
        }
      }, 1000);

      // Cleanup
      return () => {
        clearInterval(timer);
        app.destroy(true, true);
        window.removeEventListener("keydown", () => {});
        window.removeEventListener("keyup", () => {});
      };
    };

    initGame();

    return () => {
      app.destroy(true, true);
    };
  }, [gameActive]);

  const restartGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameActive(true);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Math Adventure</h2>
        <div className="flex justify-center space-x-8 text-lg font-semibold">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Score: <span className="text-yellow-300">{score}</span>
          </div>
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Time: <span className="text-yellow-300">{timeLeft}s</span>
          </div>
        </div>
      </div>

      <div className="mb-4 bg-white p-4 rounded-lg shadow-md">
        <p className="text-xl font-bold text-center text-gray-700">
          Solve: {currentProblem}
        </p>
        <p className="text-sm text-gray-600 text-center mt-2">
          Collect the correct answer by moving your character over it!
        </p>
      </div>

      <div 
        ref={gameContainer}
        className="w-full max-w-4xl border-4 border-blue-500 rounded-lg overflow-hidden"
      />

      {!gameActive && (
        <div className="mt-4 text-center">
          <button
            onClick={restartGame}
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md"
          >
            Play Again
          </button>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Use Arrow Keys or WASD to move • Collect the correct answer to score points</p>
        <p className="mt-1">Educational Value: Basic arithmetic practice, problem-solving, and hand-eye coordination</p>
      </div>
    </div>
  );
}