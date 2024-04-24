/* ============================= typing animation ============================= */
const typed = new Typed(".typing", {
  strings: ["", "Web Deverloper", "Web Designer", "Back-end Developer", "Graphic Designer"],
  typeSpeed: 100,
  BackSpeed: 60,
  loop: true
})
/* ============================= Aside ============================= */
const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll("section"),
  totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function() {
    removeBackSection()
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        addBackSection(j)
      }
      navList[j].querySelector("a").classList.remove("active")
    }
    this.classList.add("active")
    showSection(this)
    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  })
}
function removeBackSection() {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("back-section")
  }
}
function addBackSection(num) {
  allSection[num].classList.add("back-section")
}
function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active")
  }
  const target = element.getAttribute("href").split("#")[1]
  document.querySelector("#" + target).classList.add("active")
}
function updateNav(element) {
  for (let i = 0; i < totalNavList; i++) {
    navList[i].querySelector("a").classList.remove("active");
    const target = element.getAttribute("href").split("#")[1];
    if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
      navList[i].querySelector("a").classList.add("active");
    }
  }
}
document.querySelector(".hire-me").addEventListener("click", function() {
  const sectionIndex = this.getAttribute("data-section-index")
  showSection(this);
  updateNav(this);
  removeBackSection();
  addBackSection(sectionIndex);
})
const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
  asideSectionTogglerBtn()
})
function asideSectionTogglerBtn() {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.toggle("open")
  }
}
/*var _0x57c5=["\x2E\x74\x79\x70\x69\x6E\x67","","\x57\x65\x62\x20\x44\x65\x76\x65\x72\x6C\x6F\x70\x65\x72","\x57\x65\x62\x20\x44\x65\x73\x69\x67\x6E\x65\x72","\x42\x61\x63\x6B\x2D\x65\x6E\x64\x20\x44\x65\x76\x65\x6C\x6F\x70\x65\x72","\x47\x72\x61\x70\x68\x69\x63\x20\x44\x65\x73\x69\x67\x6E\x65\x72","\u0111\xE2\x79\x20\x6C\xE0\x20\x73\x63\x72\x20\x63\u1EE7\x61\x20\x62\x61\x73\x69\x6C\x20\x6D\x6F\x64\x20\x6C\u1EA1\x69\x20","\x2E\x6E\x61\x76","\x71\x75\x65\x72\x79\x53\x65\x6C\x65\x63\x74\x6F\x72","\x6C\x69","\x71\x75\x65\x72\x79\x53\x65\x6C\x65\x63\x74\x6F\x72\x41\x6C\x6C","\x6C\x65\x6E\x67\x74\x68","\x73\x65\x63\x74\x69\x6F\x6E","\x61","\x63\x6C\x69\x63\x6B","\x61\x63\x74\x69\x76\x65","\x63\x6F\x6E\x74\x61\x69\x6E\x73","\x63\x6C\x61\x73\x73\x4C\x69\x73\x74","\x72\x65\x6D\x6F\x76\x65","\x61\x64\x64","\x69\x6E\x6E\x65\x72\x57\x69\x64\x74\x68","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x62\x61\x63\x6B\x2D\x73\x65\x63\x74\x69\x6F\x6E","\x23","\x73\x70\x6C\x69\x74","\x68\x72\x65\x66","\x67\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x64\x61\x74\x61\x2D\x73\x65\x63\x74\x69\x6F\x6E\x2D\x69\x6E\x64\x65\x78","\x2E\x68\x69\x72\x65\x2D\x6D\x65","\x2E\x6E\x61\x76\x2D\x74\x6F\x67\x67\x6C\x65\x72","\x2E\x61\x73\x69\x64\x65","\x6F\x70\x65\x6E","\x74\x6F\x67\x67\x6C\x65"];const typed= new Typed(_0x57c5[0],{strings:[_0x57c5[1],_0x57c5[2],_0x57c5[3],_0x57c5[4],_0x57c5[5]],typeSpeed:100,BackSpeed:60,loop:true});alert(_0x57c5[6]);const nav=document[_0x57c5[8]](_0x57c5[7]),navList=nav[_0x57c5[10]](_0x57c5[9]),totalNavList=navList[_0x57c5[11]],allSection=document[_0x57c5[10]](_0x57c5[12]),totalSection=allSection[_0x57c5[11]];for(let i=0;i< totalNavList;i++){const a=navList[i][_0x57c5[8]](_0x57c5[13]);a[_0x57c5[21]](_0x57c5[14],function(){removeBackSection();for(let _0xfde7x9=0;_0xfde7x9< totalNavList;_0xfde7x9++){if(navList[_0xfde7x9][_0x57c5[8]](_0x57c5[13])[_0x57c5[17]][_0x57c5[16]](_0x57c5[15])){addBackSection(_0xfde7x9)};navList[_0xfde7x9][_0x57c5[8]](_0x57c5[13])[_0x57c5[17]][_0x57c5[18]](_0x57c5[15])};this[_0x57c5[17]][_0x57c5[19]](_0x57c5[15]);showSection(this);if(window[_0x57c5[20]]< 1200){asideSectionTogglerBtn()}})};function removeBackSection(){for(let i=0;i< totalSection;i++){allSection[i][_0x57c5[17]][_0x57c5[18]](_0x57c5[22])}}function addBackSection(_0xfde7xc){allSection[_0xfde7xc][_0x57c5[17]][_0x57c5[19]](_0x57c5[22])}function showSection(_0xfde7xe){for(let i=0;i< totalSection;i++){allSection[i][_0x57c5[17]][_0x57c5[18]](_0x57c5[15])};const _0xfde7xf=_0xfde7xe[_0x57c5[26]](_0x57c5[25])[_0x57c5[24]](_0x57c5[23])[1];document[_0x57c5[8]](_0x57c5[23]+ _0xfde7xf)[_0x57c5[17]][_0x57c5[19]](_0x57c5[15])}function updateNav(_0xfde7xe){for(let i=0;i< totalNavList;i++){navList[i][_0x57c5[8]](_0x57c5[13])[_0x57c5[17]][_0x57c5[18]](_0x57c5[15]);const _0xfde7xf=_0xfde7xe[_0x57c5[26]](_0x57c5[25])[_0x57c5[24]](_0x57c5[23])[1];if(_0xfde7xf=== navList[i][_0x57c5[8]](_0x57c5[13])[_0x57c5[26]](_0x57c5[25])[_0x57c5[24]](_0x57c5[23])[1]){navList[i][_0x57c5[8]](_0x57c5[13])[_0x57c5[17]][_0x57c5[19]](_0x57c5[15])}}}document[_0x57c5[8]](_0x57c5[28])[_0x57c5[21]](_0x57c5[14],function(){const _0xfde7x11=this[_0x57c5[26]](_0x57c5[27]);showSection(this);updateNav(this);removeBackSection();addBackSection(_0xfde7x11)});const navTogglerBtn=document[_0x57c5[8]](_0x57c5[29]),aside=document[_0x57c5[8]](_0x57c5[30]);navTogglerBtn[_0x57c5[21]](_0x57c5[14],()=>{asideSectionTogglerBtn()});function asideSectionTogglerBtn(){aside[_0x57c5[17]][_0x57c5[32]](_0x57c5[31]);navTogglerBtn[_0x57c5[17]][_0x57c5[32]](_0x57c5[31]);for(let i=0;i< totalSection;i++){allSection[i][_0x57c5[17]][_0x57c5[32]](_0x57c5[31])}} */