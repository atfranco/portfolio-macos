//Linkedin
let iconLinkedin = document.querySelector('.linkedin');

    let animationLinkedin = bodymovin.loadAnimation({
            container: iconLinkedin,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: "linkedin.json",

    });

    var directionLinkedin = 1;
      iconLinkedin.addEventListener('mouseenter', (e) => {
      animationLinkedin.setDirection(directionLinkedin);
      animationLinkedin.play();
    });

      iconLinkedin.addEventListener('mouseleave', (e) => {
      animationLinkedin.setDirection(-directionLinkedin);
      animationLinkedin.play();
    });

//Linkedin1
let iconLinkedin1 = document.querySelector('.linkedin1');

    let animationLinkedin1 = bodymovin.loadAnimation({
            container: iconLinkedin1,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: "linkedin.json",
    });

    var directionLinkedin1 = 1;
      iconLinkedin1.addEventListener('mouseenter', (e) => {
      animationLinkedin1.setDirection(directionLinkedin1);
      animationLinkedin1.play();
    });

      iconLinkedin1.addEventListener('mouseleave', (e) => {
      animationLinkedin1.setDirection(-directionLinkedin1);
      animationLinkedin1.play();
    });


//Github
let iconGithub = document.querySelector('.github');

    let animationGithub = bodymovin.loadAnimation({
            container: iconGithub,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: "github.json",

    });

    var directionGithub = 1;
      iconGithub.addEventListener('mouseenter', (e) => {
      animationGithub.setDirection(directionGithub);
      animationGithub.play();
    });

      iconGithub.addEventListener('mouseleave', (e) => {
      animationGithub.setDirection(-directionGithub);
      animationGithub.play();
    });

//Github1
let iconGithub1 = document.querySelector('.github1');

    let animationGithub1 = bodymovin.loadAnimation({
            container: iconGithub1,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: "github.json",

    });

    var directionGithub1 = 1;
      iconGithub1.addEventListener('mouseenter', (e) => {
      animationGithub1.setDirection(directionGithub1);
      animationGithub1.play();
    });

      iconGithub1.addEventListener('mouseleave', (e) => {
      animationGithub1.setDirection(-directionGithub1);
      animationGithub1.play();
    });


//Instagram
let iconInsta = document.querySelector('.insta');

    let animationInsta = bodymovin.loadAnimation({
            container: iconInsta,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: "instagram.json",
    });

    var directionInsta = 1;
      iconInsta.addEventListener('mouseenter', (e) => {
      animationInsta.setDirection(directionInsta);
      animationInsta.play();
    });

      iconInsta.addEventListener('mouseleave', (e) => {
      animationInsta.setDirection(-directionInsta);
      animationInsta.play();
    });

//Instagram1
let iconInsta1 = document.querySelector('.insta1');

let animationInsta1 = bodymovin.loadAnimation({
        container: iconInsta1,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: "instagram.json",

});

var directionInsta1 = 1;
  iconInsta1.addEventListener('mouseenter', (e) => {
  animationInsta1.setDirection(directionInsta1);
  animationInsta1.play();
});

  iconInsta1.addEventListener('mouseleave', (e) => {
  animationInsta1.setDirection(-directionInsta1);
  animationInsta1.play();
});

