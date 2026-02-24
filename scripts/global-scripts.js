//  VIDEO MUSIC PLAYER PLAY PAUSE CONTROLS
//--------------------------------------------------------//
const player = document.getElementById('audioPlayer');
const buttons = document.querySelectorAll('.player-button');
let currentActiveButton = null;

if (player) {
    document.addEventListener('play', function(e) {
        const allMedia = document.querySelectorAll('video, audio');
        allMedia.forEach(media => {
            if (media !== e.target) {
                media.pause();
            }
        });
        if (e.target.tagName === 'VIDEO' && currentActiveButton) {
            currentActiveButton.classList.remove('isPLAYING');
        }
    }, true); 

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const audioPath = btn.getAttribute('data-src');
            if (currentActiveButton === btn) {
                if (player.paused) {
                    player.play();
                    btn.classList.add('isPLAYING');
                } else {
                    player.pause();
                    btn.classList.remove('isPLAYING');
                }
            } else {
                if (currentActiveButton) {
                    currentActiveButton.classList.remove('isPLAYING');
                }
                player.src = audioPath;
                player.currentTime = 0;
                player.play();
                currentActiveButton = btn;
                btn.classList.add('isPLAYING');
            }
        });
    });

    player.addEventListener('ended', () => {
        if (currentActiveButton) {
            currentActiveButton.classList.remove('isPLAYING');
            currentActiveButton = null; 
        }
    });
}


//  VIEWPORT HEIGHT VARIABLE
//--------------------------------------------------------//
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);


//  ADD CURRENT DATE TO COPYRIGHT
//--------------------------------------------------------//
const currentYear = document.getElementById("currentYear");
if (currentYear) {
  currentYear.innerText = new Date().getFullYear();
}


//  MENU CONTROLS
//--------------------------------------------------------//
const menuIcon = document.querySelector("#menuIcon");
const b = document.body;
const nav = document.querySelector(".global-navigation");
const staffBar = document.getElementById("staffBar");

if (menuIcon && nav && staffBar) { // Added checks here for safety too
  menuIcon.onclick = function() {
    if (b.classList.contains("menuOPEN")) {
      b.classList.remove("menuOPEN");
      nav.classList.remove("menuOPEN");
      menuIcon.classList.remove("isACTIVE");
      staffBar.classList.remove("isRESIZING");
    } else {
      b.classList.add("menuOPEN");
      nav.classList.add("menuOPEN");
      menuIcon.classList.add("isACTIVE");
      staffBar.classList.remove("isRESIZING");
    }
  };
}


//  ADD CLASS ON WINDOW RESIZE FOR NAV HEIGHT ANIMATIONS
//--------------------------------------------------------//
function heightResize() {
    // Check if staffBar exists before trying to access its classList
    if (staffBar) {
        if (staffBar.classList.contains("isRESIZING")) {
            staffBar.classList.remove("isRESIZING");
        } else {
            staffBar.classList.add("isRESIZING");
        }
    }
}
window.addEventListener("resize", heightResize);

["", "webkit", "moz", "ms"].forEach(
    prefix => document.addEventListener(prefix+"fullscreenchange", heightResize, false)
);


//  HEADER BAR
//--------------------------------------------------------//
const pt = document.querySelector(".scrollMARKER");
if (pt) {
    window.addEventListener("scroll", function() {
        const y = window.scrollY;
        const ptOffset = pt.offsetTop;
        const ptHeight = pt.getBoundingClientRect().height;
        const headerBar = document.querySelector(".global-header");

        if (headerBar) {
            if (y > (ptOffset + ptHeight)) {
                headerBar.classList.add("isACTIVE");
            } else {
                headerBar.classList.remove("isACTIVE");
            }
        }
    }, { passive: true }
    );
}