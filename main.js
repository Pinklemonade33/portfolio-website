//Functions
const expandSideProjects = () => {
    const menu = sideProjects.clone()
    const pClass = getProjectDisplayClass()
    if ($(window).outerWidth() <= 700) {
        $('#main-project-outer').remove()
        $(menu).css('width', '100%')
        $(menu).css('max-width', '100%')
        $(menu).css('min-width', '100%')
        selectSideProject(pClass)
        currentDC = pClass
        mpShow = false
    } else {
        $('#main-project-outer').css('margin-right', '30px')
        currentDC = null
        mpShow = true
    }
    
    $('#projects').append(menu)
    enableFlowType();
    sideProjectsClickEvent();
    spShow = true
}

const expandContactText = (element) => {
 
    let id;
    if ($(element.tagName.toLocaleLowerCase() === 'span')) {
        id = $(element).parent().attr('id')
    } else {
        id = $(element).attr('id')
    }
    if (id === 'info-heading') {
        if (iShow === true) {
            $('#info-text').remove();
            $('#info .divider-bottom').remove()
            iShow = false;
            $('#info-text').css('min-height', '0')
            $('#info-heading').css('opacity', '.5')
            $('#info .divider-top').css('opacity', '.5')
            $('#info').css('min-height', '0')
            $('about-me').css('max-height', '50%')
        } else {
            infoText.insertAfter('#info .divider-top')
            $('<div></div>')
            .addClass('divider-bottom')
            .addClass('divider')
            .insertAfter($('#info-text'))
            iShow = true;
            $('#info-text').css('min-height', '10%')
            $('#info').css('min-height', 'calc(50% - 40px')
            $('#info-heading').css('opacity', '1')
            $('#info .divider-top').css('opacity', '1')
            
            if (aShow) {
                $('#about-me').css('max-height', '100%')
            } else {
                $('about-me').css('max-height', '50%')
            }
        }
    } else if (id === 'about-heading') {
        if (aShow === true) {
            $('#about-text').remove();
            $('#about-me .divider-bottom').remove()
            aShow = false;
            $('#about-me').css('min-height', '0')
            $('#about-heading').css('opacity', '.5')
            $('#about-me .divider-top').css('opacity', '.5')
            $('#about-me').css('max-height', '10px')
        } else {
            $('#about-me')
            .append(aboutText)
            .append($('<div></div>')
                .addClass('divider-bottom')
                .addClass('divider')
            );   
            aShow = true;
            $('#about-me').css('min-height', '10%')
            $('#about-heading').css('opacity', '1')
            $('#about-me .divider-top').css('opacity', '1')
            
            if (iShow) {
                $('#about-me').css('max-height', '50%')
            } else {
                $('#about-me').css('max-height', '100%')
            }
            
        }
    }
}

const getDisplayType = () => {
    return $('.inner-display').attr('class').split(" ")[0]
}

const collapseSideProjects = () => {
    $('#side-projects-container').remove()
    $('#main-project-outer').css('margin-right', '0')
    spShow = false
    currentDC = null
}

const sideProjectsHandler = () => {
    if ($(window).outerWidth() <= 700) {
        collapseSideProjects();
    } 
}

const selectSideProject = (target) => {
    if (spShow) {
        const project = getClone(target, projects);
        const readme = getClone($(project), readmeDisplays);

        const pClass = getProjectDisplayClass();

        const currentSP = $('.side-project-container').toArray()
            .find(e => getProjectDisplayClass(e) === pClass);


        $(currentSP).css('background-color', '#30292fff');
        $(currentSP).addClass('hvr-fade');

        // Change color of selected side project
        $(target).closest('.side-project-container')
        .css('background-color', '#02111bff')
        .removeClass('hvr-fade');

        if (!mpShow) {
            $('#projects').prepend(mainProjectOuter);
            mainProjectEvents();
        }

        setMainProject(project);
        setProjectDisplay(readme);

        if (!mpShow) {
            collapseSideProjects();
        }

    }
}

// Switch between projects on click
const sideProjectsClickEvent = () => {
    $('.side-project-container').on('click', function (event) {
        selectSideProject(event.target)
    })
}

const getClone = (element, clone) => {
    const pClass = getProjectDisplayClass(element)
    return clone.toArray().find(e => {
        if ($(e).attr('class').split(" ")[1] === pClass) {
            return e
        }
    })
}

const resetConsole = (string) => {
    const pClass = getProjectDisplayClass()
    if (pClass === 'myventory-p0') {
        delete trees[pClass]
        $('.object-tree-view').jstree(true).settings.core.data = [];
        $('.object-tree-view').jstree(true).refresh(true);
    } else if (pClass === 'no-more-reports-p1') {
        $('.df-display').children().first().remove();
        if ($('.e-0').length > 0) {
            $('.e-0').toArray().forEach(e => e.remove())
           }
    }
    displayConsoleCode(string)
    const code = $('<span></span>').text('Console reset')
    $('.console .code-box').append(code)
}

const displayConsoleError = (data, string) => {
    const code = $('<span></span>');
    code.css('color', '#8b0000');
    code.text(data['code']);
    const newLine = $('<div></div>')
    newLine.append($('<span></span>').text('>>>  ').css('color', 'green'))
    newLine.append($('<span></span>').text(string))
    $('.console .code-box').append(newLine)
    $('.console .code-box').append($('<span></span>').text(data['error']))
}

const displayConsoleCode = (string) => {
    const newLine = $('<div></div>')
    newLine.append($('<span></span>').text('>>>  ').css('color', 'green'))
    newLine.append($('<span></span>').text(string))
    $('.console .code-box').append(newLine)
}

const displayExpressionResult = (data) => {
    if (typeof data['val'] != 'boolean') {
        if ('value' in data['val']) {
            const newLine = ($('<span></span>').text(data['val']['value']))
            $('.console .code-box').append(newLine)
        } else if ('df' in data['val']) {
            $('.df-display').children().first().remove();
            $('.df-display').append(data['val']['df'])
            refreshSimpleBar($('.df-display')[0])
        }
    } 
}

const updateTree = (data) => {
    const treeData = createTreeData(JSON.parse(data['vars']))
    $('.object-tree-view').jstree(true).settings.core.data = treeData;
    $('.object-tree-view').jstree(true).refresh(true);
    const simpleBar = new SimpleBar($('.right-side')[0], {autoHide: false});
    simpleBar.recalculate()
}

const displayAttributes = (data) => {
    const ref1Data = createRef1Data(data['var'], data['class'])

   if ($('.e-0').length > 0) {
    $('.e-0').toArray().forEach(e => e.remove())
   }
   
    ref1Data.forEach(e => $('.ref-1 .references').append(e));
    refreshSimpleBar($('.ref-1')[0]);
    setExampleEvents();
}

const getProjectDisplayClass = (element=null) => {
   if (element != null) {
        return $(element).attr('class').split(" ")[1]
    } else {
        if (currentDC === null) {
            return $('.project-display').attr('class').split(" ")[1]
        } else {
            return currentDC
        }
    }
}

const refreshSimpleBar = (element) => {
    const simpleBar = new SimpleBar(element)
    simpleBar.recalculate()
}

const setExampleEvents = () => {
    $('.example').on('click', function (event) {
        $('.command-prompt').val($(event.target).text())
    })

    $('.example').on('dblclick', function () {
        sendConsoleInput()
    })
}

const createRef1Data = (consoleVar, className) => {
    if (className === 'MaterialForcast') {
        return [
            $(`<span class="example e-0">${consoleVar}.df_main</span>`),
            $(`<span class="example e-0">${consoleVar}.df_replen</span>`),
            $(`<span class="example e-0">${consoleVar}.df_pending</span>`),
            $(`<span class="example e-0">ro_mat_r = ${consoleVar}.mat_r</span>`),
            $(`<span class="example e-0">ro_inv_r = ${consoleVar}.inv_r</span>`),
            $(`<span class="example e-0">ro_pending_po = ${consoleVar}.pending_po</span>`)
        ]
    } else if (className === 'MaterialStatus') {
        return [
            $(`<span class="example e-0">${consoleVar}.df</span>`),
            $(`<span class="example e-0">${consoleVar}.dfo_type</span>`),
            $(`<span class="example e-0">${consoleVar}.dfo</span>`),
            $(`<span class="example e-0">${consoleVar}.get_material_quantities()</span>`),
        ]
    } else if (className === 'POShipping') {
        return [
            $(`<span class="example e-0">${consoleVar}.df</span>`),
            $(`<span class="example e-0">ro_po_pending = ${consoleVar}.po_pending</span>`),
            $(`<span class="example e-0">ro_po_received = ${consoleVar}.po_received</span>`),
            $(`<span class="example e-0">ro_ship_report = ${consoleVar}.ship_report</span>`),
        ]
    } else if (className === 'DIVTransactionsRS') {
        return [
            $(`<span class="example e-0">${consoleVar}.df</span>`),
            $(`<span class="example e-0">${consoleVar}.dfo</span>`),
            $(`<span class="example e-0">${consoleVar}.dfo_type</span>`),
            $(`<span class="example e-0">${consoleVar}.loc_id</span>`),
            $(`<span class="example e-0">${consoleVar}.get_from_div()</span>`),
            $(`<span class="example e-0">${consoleVar}.get_to_div()</span>`),
        ]
    } else if (className === 'LOCTransactionsRS') {
        return [
            $(`<span class="example e-0">${consoleVar}.df</span>`),
            $(`<span class="example e-0">${consoleVar}.dfo</span>`),
            $(`<span class="example e-0">${consoleVar}.dfo_type</span>`),
        ]
    } else if (className === 'INVLocationsRS') {
        return [
            $(`<span class="example e-0">${consoleVar}.df</span>`),
            $(`<span class="example e-0">${consoleVar}.dfo</span>`),
            $(`<span class="example e-0">${consoleVar}.dfo_type</span>`),
            $(`<span class="example e-0">${consoleVar}.get_aging_dtob()</span>`),
        ]
    } else if (className === 'Shipments') {
        return [
            $(`<span class="example e-0">${consoleVar}.df</span>`),
            $(`<span class="example e-0">${consoleVar}.dfo</span>`),
            $(`<span class="example e-0">${consoleVar}.dfo_type</span>`),
            $(`<span class="example e-0">${consoleVar}.shipments_to_dict()</span>`),
        ]
    } else if (className === 'PendingPOLine') {
        return [
            $(`<span class="example e-0">${consoleVar}.df</span>`),
            $(`<span class="example e-0">${consoleVar}.dfo</span>`),
            $(`<span class="example e-0">${consoleVar}.dfo_type</span>`),
        ]
    } else if (className === 'ReceivedPOLine') {
        return [
            $(`<span class="example e-0">${consoleVar}.df</span>`),
            $(`<span class="example e-0">${consoleVar}.dfo</span>`),
            $(`<span class="example e-0">${consoleVar}.dfo_type</span>`),
        ]
    } 
}

const setConsoleEvents = () => {
    // Enter event for command prompt
    $('.command-prompt').on('keydown', function (event) {
        if (event.key == 'Enter') {
            sendConsoleInput()
        }
    })

    setExampleEvents();
    reloadTree();
}

const saveTreeData = (data) => {
    trees[getProjectDisplayClass()] = data
}

// Creates jsTree
const createTree = () => {
$('.object-tree-view').jstree({
    'core': {
        'themes': {
            'icons':false
        }
    }
})
}

const reloadTree = () => {
    createTree();
    const pClass = getProjectDisplayClass()
    if (typeof trees[pClass] != 'undefined') {
        $('.object-tree-view').jstree(true).settings.core.data = trees[pClass];
        $('.object-tree-view').jstree(true).refresh(true);
    }
}

// Creates Data for object-tree-view
const createTreeData = (obj) => {
    const result = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
            // recursively create nodes for nested objects
            result.push({
            'text': key,
            'children': createTreeData(value),
            });
        } else {
            // create a leaf node for non-object values
            result.push({
            'text': `${key}: ${value}`,
            });
        }}
    }
    saveTreeData(result)
    return result;
}


// Resets on change main-project change
// Sends through string to identify current main-project
// Sends strings to python app to execute commands
const callPythonApp = (string) => {
    const id = $('.project-display')[0].id
    const pClass = getProjectDisplayClass()
    
    fetch('http://127.0.0.1:5000/my_endpoint', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify([string, id]),
})
.then(response => response.json())
.then(data => {
        try {
            if (data === 'endpoint reset') {
                resetConsole(string)
            } else if ('error' in data) {
                displayConsoleError(data, string)
            } else if (pClass === 'no-more-reports-p1') {
                displayConsoleCode(string)
                if (data['var'] != false) {
                    displayAttributes(data)
                }
                displayExpressionResult(data)
  
            } else if (pClass === 'myventory-p0'){
                displayConsoleCode(string)
                if (data['var'] === false && data['val']['value'] != 'None') {
                    displayExpressionResult(data)
                }
                updateTree(data)
            }
        } catch (error) {console.log(error)} 
});
}

const sendConsoleInput = () => {
    if ($('.command-prompt').val() != '') {
        callPythonApp($('.command-prompt').val())
        $('.command-prompt').val('')
        const element = document.querySelector('.console-inner');
        const simpleBar = new SimpleBar(element)
        simpleBar.recalculate();
    }
}

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
    // adds skills description
    showElements.forEach(element => {
        console.log(element)
        if (element.tagName.toLocaleLowerCase() === 'div') {
            expContainer.appendChild(element)
        } else {
            headingContainer.appendChild(element)
        }

    $('#skills-divider').css('opacity', 1)
    $('#heading-divider').css('opacity', 1)
    });

    const container = divSkillClasses[showClass];
    container.style.background = 'hsla(309, 8%, 12%, 1)';
    activeButton = container;
    previousSkill = divSkillClasses[showClass];
    enableFlowType();
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


// Adds the children of the parent minus provided exclusions
// Then subtracts added value from its own height
const getRemainingHeight = (parent, ex=null) => {
    const elements = $(parent).children().toArray()
    let tHeight;

    if (ex != null) {
        tHeight = elements.reduce((acc, e) => {
            if (ex.every(item => e != item)) {
                acc += $(e).outerHeight(true)
            }
            return acc
        }, 0)
    } else {
        tHeight = elements.reduce((acc, e) => {
            acc += $(e).outerHeight(true)
            return acc
        }, 0)
    }

    const remainingHeight = $(parent).height() - tHeight;
    return remainingHeight
}

const FitElement = (element) => {
    const parent = $(element).parent()
    const remainingHeight = getRemainingHeight($(parent), [$(element)])
    if (remainingHeight >= 0) {
        $(element).height(remainingHeight)
    } else {
        const reducedHeight = (
            $(element).height()
            - Math.abs(remainingHeight)
        )
        $(element).height(reducedHeight)
    }
}

const displayAsColumn = () => {
    const newRow = $('.right-side').clone();

    newRow
    .css('width', '100%')
    .css('height', '40%');

    $('.right-side').remove();
    $('.vertical-divider').remove();

    if (getProjectDisplayClass() === 'myventory-p0') {
        $('.console')
        .append($('<div></div>').addClass('horizontal-divider hor-1'))
        .append(newRow)
        .css('width', '100%');
    } else if (getProjectDisplayClass() === 'no-more-reports-p1') {
        const dfClone = $('.df-display').clone()

        $('.df-display').remove()

        $('.console')
        .prepend(newRow)
        .append($('<div></div>').addClass('horizontal-divider hor-1'))
        .append(dfClone)
        .css('width', '100%');
    }
    
  
    $('.console-inner').css('max-height', '15%')

    displaySingleColumn[getProjectDisplayClass()] = true;

    if (getProjectDisplayClass() === 'myventory-p0') {
        reloadTree();
    }
    
}

const displayAsNormal = () => {
    const newRow = $('.right-side').clone();
    newRow
    .css('width', '30%');

    $('.right-side').remove();
    $('.hor-1').remove()

    $('.console-display')
    .append($('<div></div>').addClass('vertical-divider'))
    .append(newRow)
    
    $('.console').css('width', '70%')
    $('.console-inner').css('max-height', '32%')

    displaySingleColumn[getProjectDisplayClass()] = false;
    reloadTree();
}

// Adjust elements on screen size change
const setHeight = () => {
    $(softSkillsInner).height($(softSkillsContainer).height());
    $(hardSkillsInner).height($(hardSkillsContainer).height());
    

    if (
        $(introSectionText).height()
        >
        $('#intro-p-1').height() + $('#intro-p-2').height()
        ) {
        $('#intro-text-end').css('opacity', 0)
    } else {
        $('#intro-text-end').css('opacity', 1)
    }
    if ($('about-heading').height() <= 30) {

    }
    if (
        $(window).width() 
        + $(window).height() 
        <= 2280
    ) {
        $('#skills-description').css('width', '100%')
    }

}

const addText = (paragraph) => {
    const p = document.createElement('p');
    p.innerHTML = paragraph.text;
    p.id = paragraph.id;
    p.style.margin = '0';
    p.style.fontSize = '24px';
    textContainer.appendChild(p)
}

const getSectionBottom = (section) => {
    return (
        getFooterRest($(section)).offset().top
        + getFooterRest($(section)).outerHeight()
        - $('#intro-header-rest').offset().top
    )
}

const getSectionTop = (section) => {
    return (
        getHeaderRest($(section)).offset().top
        - $('#intro-header-rest').offset().top
    )
}

const getSectionHeight = (section) => {
    return (
        getSectionBottom(section)
        - getSectionTop(section)
    )
}

const getViewPortHeight = () => {
    return $(window).outerHeight()
}

const getViewPortTop = () => {
    return $('body').scrollTop()
}

const getViewPortBottom = () => {
    return (
        getViewPortTop()
        + getViewPortHeight()
    )
}

const getSharedIntersectHeight = (section) => {
    const intersectionArea = (
        Math.max(
            0,
            Math.min(
                getSectionBottom(section),
                getViewPortBottom()
            )
            - Math.max(
                getSectionTop(section),
                getViewPortTop()
            )
        )
    );
    const h1 = (
        getSectionBottom(section)
        - getSectionTop(section)
    );
    const sharedHeight = (
        intersectionArea / h1
    ) * 100;
    return sharedHeight;
}

const getLargestSectionInViewPort = () => {
    const sections = $('.section').toArray()
    const section = sections.reduce((acc, e) => {
        if (
            getSharedIntersectHeight(e)
            > getSharedIntersectHeight(acc)
        ) {
            return e
        } else {
            return acc
        }
    })
    return $(section)
}

const getHeaderRest = (section) => {
    const id = section.attr('id')
    switch (id) {
        case('intro'):
            return $('#intro-header-rest');
        case('projects'):
            return $('#projects-header-rest');
        case('skills'):
            return $('#skills-header-rest');
        case('about'):
            return $('#about-header-rest');
    }
}

const getFooterRest = (section) => {
    const id = section.attr('id')
    switch (id) {
        case('intro'):
            return $('#intro-footer-rest');
        case('projects'):
            return $('#projects-footer-rest');
        case('skills'):
            return $('#skills-footer-rest');
        case('about'):
            return $('#about-footer-rest');
    }
}

const setScreenPosition = (top, speed=200) => {
    $('html, body').animate({scrollTop: top}, speed)
}

const followPageLink = (target) => {
    const section = $(linkRelatives[target.attr('id')])
    setScreenPosition(getSectionTop(section))
    currentSection = section
}

const expandColor = (target, speed=250) => {
    colorElementTop.animate({
        'height': target.outerHeight()/2,
        'top': target.offset().top,
    }, speed)
    colorElementBottom.animate({
        'height': target.outerHeight()/2,
    }, speed)
}

const checkViewPort = () => {
    const section = currentSection
    const viewportWidth = $(window).width();
    const viewportHeight = $(window).height();
    const top = getHeaderRest(section)[0].getBoundingClientRect().top;
    const bottom = getFooterRest(section)[0].getBoundingClientRect().bottom;
    const sectionHeight = bottom - top;
    const sectionWidth = section.outerWidth();
    if (
        sectionHeight > viewportHeight ||
        sectionWidth > viewportWidth
    ) {
        return true
    } else {
        return false
    }
}

const checkSectionViewPort = () => {
    const section = currentSection
    if (
        checkViewPort() 
    ) {
        $('body', 'html').css('overflow', 'auto')
        $('body')[0].addEventListener('scroll', checkCurrentSection)
    } else {
        $('body', 'html').css('overflow', 'hidden')
        $('body')[0].removeEventListener('scroll', checkCurrentSection)
        setScreenPosition(getSectionTop(section), 0)
    }
}

const checkCurrentSection = (event) => {
    if ($('body').css('overflow', 'auto')) {
        if (resizeTimeStamp != event.timeStamp) {
            const section = getLargestSectionInViewPort() 
            if (getSharedIntersectHeight(section) > 80) {
                currentSection = section
                const target = linkRelatives[section.attr('id')]
                setColor(target)
                expandColor(target, 0)
            }
        }
    } 
}

const setColor = (target) => {
    const centerY =  target.outerHeight()/2 + target.offset().top
    colorElementTop.css({
        'top': centerY + .1,
        'left': target.offset().left,
        'width': target.outerWidth(),
        'height': 0
    })
    colorElementBottom.css({
        'top': centerY - .1,
        'left': target.offset().left,
        'width': target.outerWidth(),
        'height': 0
    })
    target.parent().append(colorElementBottom);
    target.parent().append(colorElementTop);
}

const resetColor = () => {
    const id = currentSection.attr('id')
    const target = linkRelatives[id]
    setColor(target)
    expandColor(target, 0)
}

const getSmallestElement = (elements) => {
    return $(elements).toArray().reduce(
        (acc, e) => {
            if ($(e).outerWidth() < $(acc).outerWidth()) {
                return e
            } else {
                return acc
            }
        }
    )
}

const disableFlowType = (selector) => {
    $(selector).flowtype({
        fontRatio: 35,
        maxFont: 9999,
        minFont: 1,
        minimum: 1, 
        maximum: 9999
    })
}

const setFlowType = (key, val) => {
    $(key).flowtype({
        minFont: val[0],
        maxFont: val[1],
        fontRatio: val[2],
        minimum: val[3],
        maximum: val[4]
    })
}

const setFlowTypeHandler = (key, val, options) => {
    if (typeof val === 'string') {
        const mirrorFont = $(val).css('font-size')
        if (typeof options != 'undefined') {
            const adjust = options[0]
            const multiply = adjust[0]
            const minimum = adjust[1]
            const add = adjust[2]

            let adjustFont;
            adjustFont = parseInt(mirrorFont) * multiply
            if (adjustFont < minimum) {adjustFont = minimum}
            adjustFont += add

            $(key).css('font-size', adjustFont)
        } else {
            $(key).css('font-size', mirrorFont)
        }
    } else if (Array.isArray(val)) {
        if (typeof options != 'undefined') {
            if (match === 'smallest') {
                const match = options[0]
                const smallestElement = getSmallestElement(key)
                setFlowType(smallestElement, val)
                $(key).css('font-size', $(smallestElement).css('font-size'))
            }
        } else {
            setFlowType(key, val)
        }
    }
}

const altFlowType = (flowType) => {
    if (flowType === 'header') {
        if (
            $(window).outerWidth() <= 700 &&
            $(window).outerHeight() <= 300
        ) {
            return [14, 14, 20, 1, 9999]
        } else if ($('header').width() >= 320) {
            return [18, 38, 35, 1, 9999]
        } else {
            return [10, 16, 20, 1, 9999]
        }
    }
}

// Set dynamic font sizes for different screen sizes
const enableFlowType = () => {
    let flowTypes;
    if (
        $(window).width() 
        + $(window).height() 
        <= 1400
    ) {
        // Phone
        flowTypes = {
            'header': [altFlowType('header')],
            '.heading':[[22, 48, 1, 1, 9999]],
            '#side-projects-container': [[22, 48, 5, 1, 9999]],
            '#info-heading': [[20, 40, 15, 1, 9999]],
            '#info-text': [[18, 32, 15, 1, 9999]],
            '.info-contact': [[12, 48, 20, 249, 9999]],
            '.soft-skills-text': ['#info-heading', [[.5, 12, 4]]],
            '.skills-heading': ['#info-heading'],
            '.intro-heading': ['#info-heading'],
            '.intro-text': ['#info-text'],
            '#about-text': ['#info-text'],
            '#about-heading': ['#info-heading'],
            '#experience-container': ['#info-text'],
            '#skill-switch': ['#info-heading'],
            '.additional-skills-text': ['.soft-skills-text'],
            '.side-project-container': [[14, 28, 1, 1, 9999]]
        } 
    } else if (
        $(window).width()
        + $(window).height()
        <= 2000
    ) {
        // Tablet
        flowTypes = {
            'header': [altFlowType('header')],
            '.heading':[[22, 48, 1, 1, 9999]],
            '#side-projects-container': [[22, 48, 5, 1, 9999]],
            '#info-heading': [[20, 40, 12, 1, 9999]],
            '#info-text': [[18, 32, 12, 1, 9999]],
            '.info-contact': [[12, 48, 20, 249, 9999]],
            '.soft-skills-text': ['#info-heading', [[.5, 12, 4]]],
            '.skills-heading': ['#info-heading'],
            '.intro-heading': ['#info-heading'],
            '.intro-text': ['#info-text'],
            '#about-text': ['#info-text'],
            '#about-heading': ['#info-heading'],
            '#experience-container': ['#info-text'],
            '#skill-switch': ['#info-heading'],
            '.additional-skills-text': ['.soft-skills-text'],
            '.side-project-container': [[14, 28, 1, 1, 9999]]
        } 
    } else {
        // PC
        flowTypes = {
            'header': [altFlowType('header')],
            '.heading': [[22, 48, 1, 1, 9999]],
            '#side-projects-container': [[22, 48, 5, 1, 9999]],
            '#info-heading': [[20, 42, 10, 1, 9999]],
            '#info-text': [[18, 32, 10, 1, 9999]],
            '.info-contact': [[12, 48, 20, 249, 9999]],
            '.soft-skills-text': ['#info-heading', [[.5, 12, 4]]],
            '.skills-heading': ['#info-heading'],
            '.intro-heading': ['#info-heading'],
            '.intro-text': ['#info-text'],
            '#about-text': ['#info-text'],
            '#about-heading': ['#info-heading'],
            '#experience-container': ['#info-text'],
            '#skill-switch': ['#info-heading'],
            '.additional-skills-text': ['.soft-skills-text'],
            '.side-project-container': [[14, 28, 1, 1, 9999]]
        }
    }
    
    for (var key in flowTypes) {
        setFlowTypeHandler(key, flowTypes[key][0], flowTypes[key][1])
    }
}

const contactClickEvent = () => {
    if ($(window).outerWidth() <= 1000) {
        $('.contact-heading').on('click', function(event) {
            expandContactText(event.target)
        })
    } else {
        $('.contact-heading').off('click', function(event) {
            expandContactText(event.target)
        })
    }
}

const windowResizeEventHandler = (event) => {
    resizeTimeStamp = event.timeStamp
    setHeight();
    checkSectionViewPort();
    fillSideProjectsContainer();
    resetColor();
    enableFlowType();
    sideProjectsHandler();
    expandContactText();
    contactClickEvent();
}

const pageLinkEventHandler = (event) => {
    const target = $(event.target)
    const id = target.attr('id')
    const animateObject = linkRelatives[id]
    if (target.offset().left != colorElementTop.offset().left) {
        setColor(target);
        expandColor(target);
        followPageLink(target);
        animateObject.toggleClass('animate__animated animate__fadeInLeft')
        if (previousSection != null) {
            previousSection.toggleClass('animate__animated animate__fadeInLeft');
        }
        previousSection = animateObject
    }
}

const keepEvenWidth = (elements) => {
    const largestElement = elements.toArray().reduce((acc, e) => {
        if ($(e).width() > $(acc).width()) {
            return e
        } else {
            return acc
        }
    })
    const largestWidth = $(largestElement).width()
    elements.toArray().forEach(e => $(e).width(150))
}

const keepEvenHeight = (elements) => {
    const smallestElement = elements.toArray().reduce((acc, e) => {
        if ($(e).height() < $(acc).height()) {
            return e
        } else {
            return acc
        }
    })
    elements.toArray().forEach(e => $(e).height($(smallestElement).height()))
}

const keepAspectRatio = (elements) => {
    elements.toArray().forEach(e => {
        const eRatio = $(e).width() / $(e).height()
        if (eRatio < .75) {
            $(e).height($(e).width())
        }
    })
}

const getAmountsToFill = (elements, direction) => {
    const parent = $(elements).first().parent()
    const unfilledHeight = parent.outerHeight()
    const unfilledWidth = parent.outerWidth()
    const heightWidth = {height: 0, width: 0}
    if (direction === 'row') {
        heightWidth.width = unfilledWidth / $(elements).length
        heightWidth.height = unfilledHeight 
    } else if (direction === 'column') {
        heightWidth.height = unfilledHeight / $(elements).length
        heightWidth.width = unfilledWidth
    }
    return heightWidth
}

const fillSideProjectsContainer = () => {
    const elements = $('.side-projects')
    const parent = $(elements).first().parent()
    const row = getAmountsToFill(elements, 'row')
    const column = getAmountsToFill(elements, 'column')
    let amounts;

    if (column.width / column.height > .75) {
        amounts = column
        parent.css('flex-direction', 'column')
    } else {
        amounts = row
        parent.css('flex-direction', 'row')
    }
    
    elements.toArray().forEach(e => {
        $(e).css('width', '100%')
        $(e).css('height', '100%')
        $(e).css('margin', '10px')
    })

}

const isTouchDevice = () => {
    return 'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 || 
    navigator.msMaxTouchPoints > 0;
}

 const changeProjectsLayout = () => {
    if ($(window).width() / $(window).height() < .5) {
        const mainProject = $('#main-project-container :first-child').first()
        $(mainProject).removeClass('main-project')
        $(mainProject).addClass('side-projects')
        $(mainProject).appendTo($('#side-projects-container'))
    } else if (
    $(window).width() / $(window).height() >= .5 &&
    $('#main-project-container :first-child').first().length === 0
    ) {
        const mainProject = $('#side-projects-container :first-child').first()
        $(mainProject).removeClass('side-projects')
        $(mainProject).addClass('main-project')
        $(mainProject).appendTo($('#main-project-container'))
    }
}

const loadMarkdown = (path) => {
    const converter = new showdown.Converter();
    converter.setFlavor('github');

    fetch(path)
        .then(response => response.text())
        .then(markdown => {
            const mdHtml = converter.makeHtml(markdown);
            const container = $('.readme-display');
            container.html(mdHtml);
            new SimpleBar(container[0])
        })
        .catch(error => console.error(error));   
}

const setGithubLink = () => {
    const current = $('.project-display')
    const pClass = getProjectDisplayClass(current)
    let link;
    switch (pClass) {
        case 'myventory-p0':
            link = 'https://github.com/Pinklemonade33/MyVentory';
            break;
        case 'no-more-reports-p1':
            link = 'https://github.com/Pinklemonade33/No-More-Reports';
            break;
        case 'worksheet-builder-p2':
            link = 'https://github.com/Pinklemonade33/Worksheet-Maker-App-Thing';
            break;
    }
    $('#main-project-github-button').attr('href', link)
}

const setMisc = () => {
    const current = $('.project-display')
    const pClass = getProjectDisplayClass(current)

    if (pClass === 'worksheet-builder-p2') {
        $('#main-project-demo-button').css('color', '#3f4045ff')
    } else {
        $('#main-project-demo-button').css('color', 'white')
    }
}

/* 
Selects a project from mainProjectContainers
and populates the main-project-container with it
*/
const setMainProject = (project) => {
    const current = $('.project-display')
    const parent = $('#main-project-container')

    current.remove()
    parent.append($(project))
    
    setMisc();
    setGithubLink();
    setConsoleEvents();
}

/*
Selects a project display from mainProjectsDisplays 
and populates the selected project with it
*/
const setProjectDisplay = (pDisplay) => {
    const dClass = $(pDisplay).attr('class').split(" ")[0]
    const current = $('.inner-display')
    const parent = $('.project-display')

    current.remove()
    parent.append($(pDisplay))
    if (dClass === 'console-display') {
        $('#main-project-readme-button').css('border-bottom', 'none')
        $('#main-project-demo-button').css('border-bottom', '2px solid #02111bff')
        setConsoleEvents();
    } else if (dClass === 'readme-display') {
        $('#main-project-readme-button').css('border-bottom', '2px solid #02111bff')
        $('#main-project-demo-button').css('border-bottom', 'none')
        const pClass = getProjectDisplayClass(pDisplay)
        let path;
        switch (pClass) {
            case 'myventory-p0':
                path = 'markdown_files/MyVentoryREADME.md'
                break;
            case 'no-more-reports-p1':
                path = 'markdown_files/NoMoreReportsREADME.md'
                break;
            case 'worksheet-builder-p2':
                path = 'markdown_files/WorkSheetBuilderREADME.md'
                break;
            default:
                console.log('Path not set')
        }
        loadMarkdown(path) 
    }

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
const skillText = Array.from(document.getElementsByClassName('skills-text'));
const expContainer = document.getElementById('experience-container');
const headingContainer = document.getElementById('heading-container');
const skillsLink= document.getElementById('skills-link');
const introSection = document.getElementById('intro');
const introSectionText = document.getElementById('intro-text');
const introSectionChildren = Array.from(introSection.children);
const pageLinks = Array.from(document.getElementsByClassName('page-link'));
const colorElementTop = $('#color-element-top');
const colorElementBottom = $('#color-element-bottom');

let currentSection = $('#intro');    
let activeButton = null;
let previousSkill = null;
let previousSection = null;
let resizeTimeStamp = null;
let spShow = true;
let mpShow = true;
let currentDC = null;
let aShow = true;
let iShow = true

let displaySingleColumn = {
    'myventory-p0': false,
    'no-more-reports-p1': false,
    'worksheet-builder-p2': false
};

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


const linkRelatives = {
    'intro-link': $('#intro'),
    'projects-link': $('#projects'),
    'skills-link': $('#skills'),
    'contact-link': $('#about'),
    'intro': $('#intro-link'),
    'projects': $('#projects-link'),
    'skills': $('#skills-link'),
    'about': $('#contact-link')
}

// Clones
const projects = $('.project-display').clone()
const consoleDisplays = $('.console-display').clone()
const readmeDisplays = $('.readme-display').clone()
const sideProjects = $('#side-projects-container').clone()
const mainProjectOuter = $('#main-project-outer').clone()
const aboutText = $('#about-text').clone()
const infoText = $('#info-text').clone()
const trees = {}

hardSwitch.addEventListener('click', switchSkills);
softSwitch.addEventListener('click', switchSkills);
softSwitch.addEventListener('mouseover', changeOpacityHigh);
softSwitch.addEventListener('mouseout', changeOpacityLow);
hardSwitch.addEventListener('mouseover', changeOpacityHigh);
window.addEventListener('resize', windowResizeEventHandler);
skillsLink.addEventListener('click', setHeight);

const mainProjectEvents = () => {
    $(function() {
        sideProjectsClickEvent();
    
        // Switch display on click
        $('#main-project-readme-button').on('click', function (event) {
            const readme = getClone($('.project-display'), readmeDisplays)
            setProjectDisplay(readme)
        })
        $('#main-project-demo-button').on('click', function (event) {
            const demo = getClone($('.project-display'), consoleDisplays);
            setProjectDisplay(demo);

            if (getDisplayType() === 'console-display') {
                if ($(window).outerWidth() <= 700 && !displaySingleColumn[getProjectDisplayClass()]) {
                    displayAsColumn()
                } else if ($(window).outerWidth() > 700 && displaySingleColumn[getProjectDisplayClass()]) {
                    displayAsNormal()
                }
            }
                
            const pClass = getProjectDisplayClass()
            if (pClass === 'no-more-reports-p1') {
                const simpleBarElements = $('.ref-0')[0]
                const simpleBar = new SimpleBar(simpleBarElements)
                simpleBar.recalculate()
            }
        })
        $('#main-project-menu-button').on('click', function (event) {
            if (spShow) {
                collapseSideProjects();
            } else {
                expandSideProjects();
            }
        })
    })
}

pageLinks.forEach(element => {element.addEventListener('click', pageLinkEventHandler)})

allSkills.forEach(element => {
    element.addEventListener('click', clickButton)
    if (!isTouchDevice()) {
        element.addEventListener('mouseover', hoverButtonIn)
        element.addEventListener('mouseout', hoverButtonOut)
    }
});

$('html, body').css('opacity', 1)
skillText.forEach(element => element.remove());
softSwitch.style.opacity = '0.1';
setHeight();
enableFlowType();
setColor($('#intro-link'));
expandColor($('#intro-link'), 0);
keepEvenWidth($('.con-2'));
fillSideProjectsContainer();
callPythonApp('reset');
$('.project-display').remove();
$('.inner-display').remove();
setMainProject(projects[0]);
setProjectDisplay(readmeDisplays[0]);
sideProjectsHandler();
selectSideProject($('#sp-myventory'));
mainProjectEvents();
contactClickEvent();