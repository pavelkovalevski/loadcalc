//init
const plate = document.querySelector(".plate")
const beam = document.querySelector(".beam")

const plateWidthDim = document.querySelector("#plate-width")
const plateThicknessDim = document.querySelector("#plate-thickness")
const beamWidthDim = document.querySelector("#beam-width")
const beamHeightDim = document.querySelector("#beam-height")
const loadValueOutput = document.querySelector("#loadValue")

const createSectionButton = document.querySelector("#create-section")
const calculateLoadButton = document.querySelector("#calculate-load")

//create section
function setValue(el, value) {
    el.innerText = value
};

function getValues () {
    plateThickness = +document.querySelector("#plate_t").value
    loadWidth = +document.querySelector("#load_w").value
    beamHeight = +document.querySelector("#beam_h").value
    beamWidth = +document.querySelector("#beam_w").value

    return plateThickness, loadWidth, beamHeight, beamWidth
}

function createSection() {
    getValues()

    drawSection(plate, scale(loadWidth), scale(plateThickness))

    if(isBeam() == true) {
        drawSection(beam, scale(beamWidth), scale(beamHeight))
        setValue(beamWidthDim, beamWidth)
        setValue(beamHeightDim, beamHeight)
        beam.style.display = 'block'
    } else {
        beam.style.display = 'none'
    }

    setValue(plateThicknessDim, plateThickness)
    setValue(plateWidthDim, loadWidth)
};

createSectionButton.addEventListener('click', () => {
    createSection()
});

function calculateFactorX() {
    let f = 0

    loadWidth > beamWidth ? f = loadWidth / 300 : f = beamWidth / 300

    console.log(loadWidth, beamWidth, f)

    return f
}

function calculateFactorY() {
    f = (plateThickness + beamHeight) / 100

    return f
}

function scale(value) {
    let factorX = calculateFactorX()
    let factorY = calculateFactorY()
    let result = 0

    factorX > factorY ? result = value / factorX : result = value / factorY

    console.log(factorX, factorY)

    return result
}

function drawSection(el, width, height) {
    el.style.width = width + 'px'
    el.style.height = height + 'px'
}

//calculate load
function calculateLoad() {
    getValues()

    if(isBeam() == true) {
        load = (plateThickness/1000*2500*9.81/1000*1.2+3.5)*loadWidth/1000 + (beamHeight/1000*2500*9.81/1000*1.2)*beamWidth/1000
    } else {
        load = (plateThickness/1000*2500*9.81/1000*1.2+3.5)*loadWidth/1000
    }

    return load = Number(load.toFixed(2))
}

function getLoad() {
    calculateLoad()
    setValue(loadValueOutput, load)
}

calculateLoadButton.addEventListener('click', () => {
    createSection()
    getLoad()
});

//beam check

function isBeam() {
    /* beamHeight && beamWidth ? a = true : a = false
    return a */

    if(beamHeight && beamWidth) {
        return true
    } else {
        return false
    }
}