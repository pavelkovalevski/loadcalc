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

function initializeValues () {
    plateThickness = document.querySelector("#plate_t").value
    loadWidth = document.querySelector("#load_w").value
    beamHeight = document.querySelector("#beam_h").value
    beamWidth = document.querySelector("#beam_w").value

    return plateThickness, loadWidth, beamHeight, beamWidth
}

function createSection() {
    initializeValues()

    drawSection(plate, loadWidth / calculateFactor(), plateThickness / calculateFactor())
    drawSection(beam, beamWidth / calculateFactor(), beamHeight / calculateFactor())

    setValue(plateThicknessDim, plateThickness)
    setValue(plateWidthDim, loadWidth)
    setValue(beamWidthDim, beamWidth)
    setValue(beamHeightDim, beamHeight)
};

createSectionButton.addEventListener('click', () => {
    createSection()
});

function calculateFactor() {
    initializeValues()

    f = loadWidth / 300

    return f
}

function drawSection(el, width, height) {
    el.style.width = width + 'px'
    el.style.height = height + 'px'
}

//calculate load
function calculateLoad() {
    initializeValues()

    if(beamWidth == 0 || beamHeight == 0) {
        load = (plateThickness/1000*2500*9.81/1000*1.2+3.5)*loadWidth/1000
    } else {
        load = (plateThickness/1000*2500*9.81/1000*1.2+3.5)*loadWidth/1000 + (beamHeight/1000*2500*9.81/1000*1.2)*beamWidth/1000
    }

    return load = Number(load.toFixed(2))
}

function getLoad() {
    calculateLoad()
    setValue(loadValueOutput, load)
}

calculateLoadButton.addEventListener('click', () => {
    getLoad()
});