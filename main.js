//Functions

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

const addText = (paragraph) => {
    const p = document.createElement('p');
    p.innerHTML = paragraph.text;
    p.id = paragraph.id;
    p.style.margin = '0';
    p.style.fontSize = '24px';
    textContainer.appendChild(p)
}

// Globals
const textContainer = document.getElementById('text-container'); 
const hardSwitch = document.getElementById('hard-switch');
const softSwitch = document.getElementById('soft-switch');
const hardSkillsContainer = document.getElementById('hard-skills-outer');
const softSkillsContainer = document.getElementById('soft-skills-outer');
const softSkillsInner = document.getElementById('soft-skills');
const hardSkillsInner = document.getElementById('hard-skills');
const hardSkills = Array.from(hardSkillsInner.children);
const softSkills = Array.from(softSkillsInner.children);
const allSkills = Array.from(hardSkills.concat(softSkills));
const skillText = Array.from(document.getElementsByClassName('text'));
const expContainer = document.getElementById('experience-container');
const headingContainer = document.getElementById('heading-container');

let activeButton = null;
let previousSkill = null;

// Object containing the button element for every skill class
// skill class example: skills-js
/* object example: {
    skills-js: element
    skills-python: element
}
*/
const divSkillClasses = allSkills.reduce(
    (acc, element) => {
        let skillClass = getSkillClass(element)

        if (element.tagName.toLowerCase() === 'button') {
            acc[skillClass] = element;
        }
        return acc; 
    }, {}
);

/* Fades in intro text
 {
    $(function() {
        $("#intro span").each(function(i) {
            $(this).hide();
        });
    });
    $(function() {
        $("#intro span").each(function(i) {
            $(this).delay(i * 500).fadeIn(1500);
        });
    });
};
*/


hardSwitch.addEventListener('click', switchSkills)
softSwitch.addEventListener('click', switchSkills)
softSwitch.addEventListener('mouseover', changeOpacityHigh);
softSwitch.addEventListener('mouseout', changeOpacityLow);
hardSwitch.addEventListener('mouseover', changeOpacityHigh);
allSkills.forEach(element => {
    element.addEventListener('click', clickButton)
    element.addEventListener('mouseover', hoverButtonIn)
    element.addEventListener('mouseout', hoverButtonOut)
})
softSwitch.style.opacity = '0.1';
setHeight();
window.addEventListener('resize', setHeight)
skillText.forEach(element => element.remove())

const textContainerScroll = new SimpleBar(textContainer);