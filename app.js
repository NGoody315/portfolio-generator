const inquirer = require('inquirer')
const iquirer = require('inquirer')
// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name,github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!')
// });

const promptUser = () => {
  return inquirer.prompt([
    { //Name Input *REQUIRED*
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    { //GitHub Username Input *REQUIRED*
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required):',
      validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please provide your GitHub Username!');
            return false;
        }
    }
    },
    {//About Me
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:'
    }

  ])
};

const promptProject = portfolioData => {

  console.log(`
  ===================
  Add a New Project
  ===================
  `);

  //IF there's no 'projects' array property, create one
  if(!portfolioData.projects) {
    portfolioData.projects = [];
  }
    return inquirer.prompt([
      {//Name of Project *REQUIRED*
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        validate: nameInput => {
          if (nameInput) {
              return true;
          } else {
              console.log('Please provide a name for your project.');
              return false;
          }
      }
      },
      {//Project Description *REQUIRED*
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: nameInput => {
          if (nameInput) {
              return true;
          } else {
              console.log('Please provide a description for your project.');
              return false;
          }
      }
      },
      {//Languages Used
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {//GitHub Link *REQUIRED*
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: nameInput => {
          if (nameInput) {
              return true;
          } else {
              console.log('Please provide the GitHub link to your project.');
              return false;
          }
      }
      },
      {//Feature Project Y/N
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {//Add Project Y/N
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    })
};

promptUser()
.then(promptProject)
.then(portfolioData => {
  console.log(portfolioData)
});