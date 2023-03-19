// Imports
import * as functions from './functions.js';

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

const Paragraphs = [
    {text: `I learned I was passionate about coding when my Excel project turned into a 
    VBA project that kept growing beyond my original ideas that I had set for it.
    
    /n/n I had no prior training at all when I tried to fix a script that was supposed
    to take all the cells of a certain color and add them together. None of 
    the tutorials I found helped me much, I guess they gave me a faded dirt path I could 
    follow but that was about it. I was jumping into to something that was much bigger than 
    I could have imagined at the time and there were so many questions that I needed answered
    that I didn't know needed asking. Obviously I wasn't able to fix the script as I 
    thought I could so easily do, and without realizing it, I stepped onto a road that will never end.`, id: 'how'},
    {text: ``, id: 'where'}
]


const addText = (paragraph) => {
    const p = document.createElement('p');
    p.innerHTML = paragraph.text;
    p.id = paragraph.id;
    p.style.margin = '0';
    p.style.fontSize = '24px';
    textContainer.appendChild(p)
}

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