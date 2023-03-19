// Gets class associated with skill elements
// skill class example: skills-js
const getSkillClass = (element) => {
    return Array.from(element.classList).find(
        cls => cls.slice(0, 5) === 'skill'
    )
}

// Get elements of specified class, reduce to specified tags
const getClassTags = (cls, tags) => {
    return Array.from(document.getElementsByClassName(cls)).reduce(
        (acc, element) => {
            if (tags.some(tag => tag === element.tagName.toLocaleLowerCase())) {
                acc.push(element);
            }
            return acc;
        }, []
    );
}

// Gets skill elements containing text class
// Element class example: skills-js text
const getSkillText = (cls) => {
    return skillText.reduce((acc, element) => {
        if (Array.from(element.classList).some(t => t === cls)) {
            acc.push(element)
        }
        return acc
    }, [])
}

// Click event for skill buttons
const clickButton = (event) => {
    if (previousSkill != null) {
        const hideClass = getSkillClass(previousSkill)
        const hideElements = getSkillText(hideClass)
        hideElements.forEach(element => element.remove());
        previousSkill.style.background = '#3f4045ff'
    }

    const showClass = getSkillClass(event.target)
    const showElements = getSkillText(showClass)
    showElements.forEach(element => {
        if (element.tagName.toLocaleLowerCase() === 'div') {
            expContainer.appendChild(element)
        } else {
            headingContainer.appendChild(element)
        }
    });

    const container = divSkillClasses[showClass];
    container.style.background = 'hsla(309, 8%, 12%, 1)';
    activeButton = container;
    previousSkill = divSkillClasses[showClass];
}



// Change opacity events for skill switch
const changeOpacityLow = (event) => {
    event.target.style.opacity = '0.1';
}
const changeOpacityHigh = (event) => {
    event.target.style.opacity = '1';
}

// Toggles hover for skill switch
const switchHover = (element) => {
    if (element === hardSwitch) {
        softSwitch.addEventListener('mouseout', changeOpacityLow);
        hardSwitch.removeEventListener('mouseout', changeOpacityLow);
    } else {
        hardSwitch.addEventListener('mouseout', changeOpacityLow);
        softSwitch.removeEventListener('mouseout', changeOpacityLow);
    }
}

// Switches the skill switch bar
const switchSkills = (event) => {
    if (event.target === softSwitch) {
        hardSwitch.style.opacity = '0.1';
        softSwitch.style.opacity = '1';
        softSkillsContainer.style.opacity = '1';
        hardSkillsContainer.style.opacity = '0'
        softSkillsContainer.style.zIndex = '1'
        hardSkillsContainer.style.zIndex = '0'
        switchHover(event.target)
    } else {
        hardSwitch.style.opacity = '1';
        softSwitch.style.opacity = '0.1';
        softSkillsContainer.style.opacity = '0';
        hardSkillsContainer.style.opacity = '1'
        softSkillsContainer.style.zIndex = '0'
        hardSkillsContainer.style.zIndex = '1'
        switchHover(event.target)
    }
}

// Hover events for skill buttons
const hoverButtonIn = (event) => {
    const skillClass = getSkillClass(event.target)
    const container = divSkillClasses[skillClass]
    
    if (container != activeButton) {
        container.style.background = '#30292fff'
    } else {
        container.style.background = 'hsla(309, 8%, 11%, 1)';
    }
}
const hoverButtonOut = (event) => {
    const skillClass = getSkillClass(event.target)
    const container = divSkillClasses[skillClass]

    if (container != activeButton) {
        container.style.background = '#3f4045ff'
    } else {
        container.style.background = 'hsla(309, 8%, 11%, 1)';
    }
}

const setHeight = () => {
    softSkillsInner.style.height = getComputedStyle(softSkillsContainer).height
    hardSkillsInner.style.height = getComputedStyle(hardSkillsContainer).height
}

export * from 'functions.js';