// Globals
const textContainer = document.getElementById('text-container'); 
const hardSwitch = document.getElementById('hard-switch')
const softSwitch = document.getElementById('soft-switch')
const hardSkillsContainer = document.getElementById('hard-skills')
const softSkillsContainer = document.getElementById('soft-skills')
/*
const softSkillsClone = softSkillsContainer.cloneNode(true)
const hardSkillsClone = hardSkillsContainer.cloneNode(true)
const softSkills = softSkillsClone.children
const hardSkills = hardSkillsClone.children
console.log(softSkills)
*/

const Paragraphs = [
    {text: `I learned I was passionate about coding when my Excel project turned into a 
    VBA project that kept growing beyond my original ideas that I had set for it.
    
    /n/n I had no prior training at all when I tried to fix a script that was supposed
    to take all the cells of a certain color and add them together. None of 
    the tutorials I found helped me much, I guess they gave me a faded dirt path I could 
    follow but that was about it. I was jumping into to something that was much bigger than 
    I could have imagined at the time and there were so many questions that I needed answered
    that I didn't know needed asking. Obviously I wasn't able to fix the script as I 
    thought I could so easily do, and without realizing it, I stepped onto a road that will never end. 
    
    /n/n My first program in VBA was all crammed into a single sub-procedure (function that returns no value), with several
    hundred lines of code, It shouldn't surprise you that I had created some cryptic nightmare. When I had finally
    clawed my way out of debugging hell and managed to get my program to work, it made me feel like some kind 
    of master architect, I had built something complex and understood how it worked. 
    
    It was only shortly after that, with my newfound knowledge
    of the existence of arrays that I built an algorithm that found combinations in the same way that
    itertools.combinations() would from the Itertools Python package. Of course itertools.combinations() is
    a generator and I made my algorithm into an ordinary function that returned an array when I figured out that
    VBA functions could return values, as sub-procedures were functions that didn't return anything.
    I'm sure it was also nowhere near as efficient or as cleanly written, but it did work for what I needed it
    for and It didn't lag while doing it. It was the hardest thing I've ever done in my life. I honestly 
    cannot remember how long it took as I obsessed over it so much 
    I lost track of time. Every day I woke up It was on my
    mind until I went to sleep and dreamed about it. I can still remember the patterns I would iterate
    through in my head until I was sure that the pattern I had would give me the correct values. At the 
    time if I've head the words: "data-structures" and "algorithms" they would not have meant anything to
    me. I didn't have any knowledge of what I was doing or what it was referred to as, I just knew that I
    wouldn't be able to calculate what run lengths I should take from what spool If I couldn't compare all
    those combinations with each other. I also needed something to decide what the optimal combination was
    by many different factors that determined how long the work would take and how much wire was wasted. 
    I needed to set up a system that moved an array through multiple sub procedures and altered its contents,
    I needed trim the data to take the workload off the combination function, i needed to organize the data
    and display it. I eventually decided I wanted to automate the entire process and that led to even more work,
    which in the end I decided just wasn't practical and would make the whole application useless. And thats
    Where I left it and started to learn Python, chasing idea after idea, building a variety of different 
    applications that have taken me further and further along my path. I've learned so much
    since that day I completed the combinations algorithm, that day I became a programmer,
    and I know there will never be a day when I have so much more to learn.`, id: 'how'},
    {text: '', id: 'where'}
]

/*
const removeChildren = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

const addChildren = (parent, children) => {
    console.log(parent)
    console.log(children)
    for (let i = 0; i < children.length; i++) {
        parent.appendChild(children[i]);
    }
}
*/

const addText = (paragraph) => {
    const p = document.createElement('p');
    p.innerHTML = paragraph.text;
    p.id = paragraph.id;
    p.style.margin = '0';
    p.style.fontSize = '24px';
    textContainer.appendChild(p)
}

const changeOpacityLow = (event) => {
    event.target.style.opacity = '0.1';
}

const changeOpacityHigh = (event) => {
    event.target.style.opacity = '1';
}

const switchHover = (element) => {
    if (element === hardSwitch) {
        softSwitch.addEventListener('mouseout', changeOpacityLow);
        hardSwitch.removeEventListener('mouseout', changeOpacityLow);
    } else {
        hardSwitch.addEventListener('mouseout', changeOpacityLow);
        softSwitch.removeEventListener('mouseout', changeOpacityLow);
    }
}

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

hardSwitch.addEventListener('click', switchSkills)
softSwitch.addEventListener('click', switchSkills)
softSwitch.addEventListener('mouseover', changeOpacityHigh);
hardSwitch.addEventListener('mouseover', changeOpacityHigh);
softSwitch.style.opacity = '0.1';

const simpleBarInstance = new SimpleBar(textContainer);