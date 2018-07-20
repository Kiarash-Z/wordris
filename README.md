
# Fanavard 96 Contest, UI Development, Final Question

## Project Information - Technology

**Libraries:**

* preact-cli v2.1.0
* preact v8.2.9
* mobx v5.0.3
* jest v21.2.1
* full details in package.json file

**Installation Guide:**

1- You need to install Node and NPM. make sure to install NPM by Node setup: 
[Node download](www.nodejs.org)
2- Open your terminal as administrator in project's root directory and enter the command below to install project dependencies It's recommended to use a VPN for installing modules

    npm install
   

3- Make sure that your localhost's port 8080 is not used by any other app and then run the command below to run project **Production version** on your localhost **https**://localhost:8080 protocol:
**Important Note: If you're using Windows don't use Windows' powershell or command prompt to run this command instead  use a bash terminal such as git bash which can be installed from [git](https://git-scm.com/downloads) make sure to check git bash installation**
Also for testing on the mobile and use "ADD TO HOME SCREEN" feature and offline usage I have deployed this on Heroku [here](https://kia-stickynotes.herokuapp.com)

    npm run serve
    
and to run **Development Version** run this command: 

    npm start
    
4- open your browser and navigate to localhost:8080.

5-(optional) You can run tests anytime by the command below
**Important Note: If you're using Windows make sure that folder full directory doesn't contain any parens such as C://folder(1)/... otherwise acording to this bug on Jest itself [github issue](https://github.com/facebook/jest/issues/2381) it won't find .test.js files**

    npm test

**Project info:**

 * For Better UX we made this project a Progressive Web App(PWA).
 *  This app wasn't large enough so we decided to use **Preact** instead of React Because **It's much lighter(3kb) and has the same API** as React.
 * We used a compact version of CSS 7-1 pattern to organize CSS files
 * Scores are saved in localStorage and they are avaliable after browser relunch