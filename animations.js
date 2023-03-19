const test = () => {
    const target = document.getElementById('Work-Ethic').parentElement;

    const targetRect = target.getBoundingClientRect();
    const targetWidth = target.getBoundingClientRect().width;
    const targetHeight = target.getBoundingClientRect().height;

    const destination = document.getElementById('heading-container')
    const destRect = destination.getBoundingClientRect();
    const destinationWidth = destination.getBoundingClientRect().width;
    const destinationHeight = destination.getBoundingClientRect().height;
    const styles = window.getComputedStyle(destination);
    const destinationPadding = parseInt(styles.getPropertyValue('padding'));

    const distance = Math.sqrt(Math.pow(destRect.x - targetRect.x, 2) + Math.pow(destRect.y - targetRect.y, 2));
    const directionX = ((destRect.x + destinationPadding) - targetRect.x) / distance;
    const directionY = ((destRect.y + destinationPadding) - targetRect.y) / distance;

    target.style.width = targetWidth + "px";
    target.style.height = targetHeight + "px";
    target.style.position = 'absolute';
    
    tl = anime.timeline({
        duration: 500,
        easing: 'easeOutExpo'
    })

    tl
    .add
    ({
        targets: target,
        translateX: '+=' + directionX * distance,
        translateY: '+=' + directionY * distance,
        width: destinationWidth,
        height: destinationHeight,
        
        /*
        update: function(moveDiagonal) {
            const currentTargetRect = target.getBoundingClientRect();
            const currentDestRect = destination.getBoundingClientRect();
            if (currentTargetRect.top < currentDestRect.bottom) {
                destination.appendChild(target);
            }
        }
        */
    })
}


/*
const shrinkText = () => {
    const divElements = Array.from(document.getElementById('soft-skills').children);
    const spanElements = divElements.map(element => {
        return element.children[0]
    })
    const style = window.getComputedStyle(spanElements[0])
    const currentFontSize = parseInt(style.fontSize, 10)
    spanElements.forEach(element => element.style.fontSize = currentFontSize -1 + 'px')
}
*/


/*
const checkElementPosition = () => {
    const elements = Array.from(document.getElementById('soft-skills').children);
    const targetElement = elements.find(element => 
        element.getBoundingClientRect().right > window.innerWidth && 
        element.getBoundingClientRect().left < window.innerWidth)
    
    if (typeof targetElement != 'undefined') {
        const destinationElement = elements.reduce((accumulator, element) => {
            if (
                element.getBoundingClientRect().right 
                - 
                targetElement.getBoundingClientRect().left
                <
                accumulator.getBoundingClientRect().right
                -
                targetElement.getBoundingClientRect().left
            ) {
                return element
            } else {
                return accumulator
            }
        })
        pushUnder(targetElement, destinationElement);
    }
    
}

const changeBackground = (element, color) => {
    
    anime({
        targets: element,
        backgroundColor: ['#30292fff', '' '#3F4045'],
        duration: 1000,
        easing: 'linear'
    })
}

*/

/*
window.addEventListener('resize', shrinkText);
*/