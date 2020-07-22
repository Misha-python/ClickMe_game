var windowHeight = document.documentElement.clientHeight,
    windowWidth = document.documentElement.clientWidth,

    buttonObj = document.getElementById ('button'),
    buttonCss = getComputedStyle (buttonObj)
    curButtonPos = [convertToNumber (buttonCss.left) - convertToNumber (buttonCss.height) / 2, 
                    convertToNumber (buttonCss.top) -  convertToNumber (buttonCss.width) / 2],
    htmlTagObj = document.getElementById ('html')

    prevButtonPos = curButtonPos
    prevCursorPos = [0, 0],
    curCursorPos = [0, 0],

    prevTime = new Date(),
    curTime = new Date(),

    deltaX = 0,
    deltaY = 0

// console.log (curButtonPos);
// console.log ('left', buttonObj.style.left, 'top', buttonObj.style.top )

console.log(getComputedStyle (buttonObj));
console.log(getComputedStyle (buttonObj).top, getComputedStyle (buttonObj).left);

function convertToNumber (string) {
    return Number (string.slice (0, -2)) 
}

// function checkButtonPos (buttonCss, windowSize) {
    // return convertToNumber (buttonCss.top) > 0 && convertToNumber (buttonCss.left) > 0 && 
        //    convertToNumber (buttonCss.right) > 0 && convertToNumber () 
// }

function moveButton (button, x, y) {
    prevButtonPos = curButtonPos
    curButtonPos [0] += x
    curButtonPos [1] += y

    button.style.left = curButtonPos [0] + 'px'
    button.style.top = curButtonPos [1] + 'px'
    
}

function pifagor (a, b) {
    return (a ** 2 + b ** 2) ** 0.5;
}   

function calcDeltaXY (prevCursorPos, curCursorPos) {
    deltaX = prevCursorPos [0] - curCursorPos [0];
    deltaY = prevCursorPos [1] - curCursorPos [1];
}

function calcDest (cursorPos, buttonPos) {
    return pifagor (cursorPos [0] - buttonPos [0], cursorPos [1] - buttonPos [1])
}  

function calcApproachSpeed (curDest, prevDest, time) {
    return (prevDest - curDest) / time
}

function eventHundler (event) {
    prevTime = curTime
    prevCursorPos = curCursorPos

    curTime = new Date ()
    curCursorPos = [event.clientX, event.clientY]
    calcDeltaXY (prevCursorPos, curCursorPos)
}

function check() {
    var curDest = calcDest (curCursorPos, curButtonPos),
        prevDest = calcDest (prevCursorPos, prevButtonPos),

        time = curTime - prevTime,

        approachSpeed = calcApproachSpeed (curDest, prevDest, time);

    console.log (deltaX, deltaY);
    moveButton (buttonObj, -deltaX, -deltaY)
    // console.log(curButtonPos);

    if ((new Date () - curTime) > 150) {
        // prevTime = curTime
        prevCursorPos = curCursorPos

        deltaX = 0
        deltaY = 0
    }
}

setInterval(() => {
    check ()
}, 100);

htmlTagObj.onmousemove = eventHundler