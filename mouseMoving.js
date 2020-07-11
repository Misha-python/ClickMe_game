var windowHeight = document.documentElement.clientHeight,
    windowWidth = document.documentElement.clientWidth,

    buttonObj = document.getElementById ('button'),
    curButtonPos = [Number (getComputedStyle (buttonObj).height.slice (0, -2)), 
                    Number (getComputedStyle (buttonObj).width.slice (0, -2))],
    prevButtonPos = curButtonPos
    prevCursorPos = [0, 0],
    curCursorPos = [0, 0],

    prevTime = new Date(),
    curTime = new Date()

function eventHundler (event) {
    prevTime = curTime
    prevCursorPos = curCursorPos

    curTime = new Date ()
    curCursorPos = [event.clientX, event.clientY]
}

function pifagor (first, second) {
    return (first ** 2 + second ** 2) ** 0.5    
}   

function calcDest (cursorPos, buttonPos) {
    return pifagor (cursorPos [0] - buttonPos [0], cursorPos [1] - buttonPos [1])
}  

function calcApproachSpeed (prevCursorPos, curCursorPos, 
                            prevButtonPos, curButtonPos, time) {
    return (calcDest (prevCursorPos, prevButtonPos) - calcDest (curCursorPos, curButtonPos)) / time
}

function proverka() {
    buttonObj.innerHTML = calcApproachSpeed (prevCursorPos, curCursorPos, prevButtonPos, curButtonPos, curTime - prevTime));
    
}

setInterval(() => {
    proverka ()
}, 100);
