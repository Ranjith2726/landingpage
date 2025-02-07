HTML

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stopwatch</title>
    <link rel="stylesheet" href="sw.css">
</head>
<body>
    <div class="stopwatch">
        <div class="display">00:00:00</div>
        <div class="controls">
            <button id="startPause">Start</button>
            <button id="reset">Reset</button>
            <button id="lap">Lap</button>
        </div>
        <div class="laps"></div>
    </div>
    <script src="sw.js"></script>
</body>
</html>

CSS

body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  margin: 0;
}

.stopwatch {
  text-align: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.display {
  font-size: 3em;
  margin-bottom: 20px;
}

.controls button {
  font-size: 1em;
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#startPause {
  background-color: #28a745;
  color: white;
}

#reset {
  background-color: #dc3545;
  color: white;
}

#lap {
  background-color: #007bff;
  color: white;
}

.laps {
  margin-top: 20px;
  text-align: left;
}

.laps div {
  padding: 5px;
  border-bottom: 1px solid #ddd;
}

JS

let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.querySelector('.display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.querySelector('.laps');

function formatTime(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    let minutes = Math.floor((milliseconds % 3600000) / 60000);
    let seconds = Math.floor((milliseconds % 60000) / 1000);
    let ms = Math.floor((milliseconds % 1000) / 10);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startPause() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseButton.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startPauseButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    startPauseButton.textContent = 'Start';
    isRunning = false;
    lapsContainer.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = document.createElement('div');
        lapTime.textContent = formatTime(elapsedTime);
        lapsContainer.appendChild(lapTime);
    }
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
