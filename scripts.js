// Projects
const projects = [
    {name: 'MyVentory'},
    {name: 'No More Reports'},
    {name: 'Worksheet Builder'}
];

let currentMainProject;


const addProject = () => {
    
}

const createProjectElement = (project, main) => {
    const newProject = document.createElement('div');
    const span = document.createElement('span');
    span.innerHTML = project.name;
    if (main) {
        newProject.style.height = '100%';
        newProject.style.backgroundColor = '#FCFCFC';
        newProject.style.color = 'black'
        newProject.style.fontSize = '130px';
        newProject.style.display = 'flex';
        newProject.style.justifyContent = 'center';
        newProject.style.alignItems = 'center';
    }  else {
        newProject.style.maxHeight = '200px';
        newProject.style.padding = '0 10px';
        newProject.style.margin = '20px 10px';
        newProject.style.backgroundColor = '#FCFCFC';
        newProject.style.color = 'black'
        newProject.style.fontSize = '32px';
        newProject.style.height = '100%';
        newProject.style.display = 'flex';
        newProject.style.justifyContent = 'center';
        newProject.style.alignItems = 'center';
    }
    newProject.appendChild(span);
    return newProject;

}

// Initializes when page loads
const addProjects = () => {
    // Create and append main project
    const mainProjectContainer = document.getElementById('main-project-container');
    const mainProject = createProjectElement(projects[0], true)
    mainProjectContainer.appendChild(mainProject)

    // Create and append side projects
    const sideProjects = document.getElementById('side-projects', false);
    let newProject;
    for (let i = 1; i < projects.length; i++) {
        newProject = createProjectElement(projects[i])
        sideProjects.appendChild(newProject);
    }
}

const switchMainProject = () => {

}

addProjects();