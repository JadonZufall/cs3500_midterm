const websiteName = "Website Name"
const websitePages = {
    "index": {
        "verbose": "Home",
        "link": "index.html"
    },
    "timeline": {
        "verbose": "Timeline",
        "link": "pages/timeline.html"
    },
    "early_life": {
        "verbose": "Early Life",
        "link": "pages/early_life.html"
    },
    "personal_life_and_death": {
        "verbose": "Personal Life and Death",
        "link": "pages/personal_life_and_death.html"
    },
    "publications": {
        "verbose": "Publications",
        "link": "pages/publications.html"
    },
    "awards": {
        "verbose": "Awards",
        "link": "pages/awards.html"
    },
    "sources": {
        "verbose": "Sources",
        "link": "pages/sources.html"
    }
}


function formatLink(fileName, dirLevel) {
    for (let i = 0; i < dirLevel; i++) {
        fileName = "../" + fileName;
    }
    return fileName;
}


function createNavbar(currentPage, dirLevel) {
    console.log("Creating nav bar..");
    let nav = document.createElement("nav");
    nav.className = "navbar navbar-inverse";

    let container = document.createElement("div");
    container.className = "container-fluid";
    nav.appendChild(container);

    let header = document.createElement("navbar-header");
    header.className = "navbar-header";
    container.appendChild(header);

    let brand = document.createElement("a");
    brand.className = "navbar-brand";
    brand.innerText = websiteName;
    brand.href = formatLink(websitePages["index"]["link"], dirLevel);
    header.appendChild(brand);

    let navMain = document.createElement("ul");
    navMain.className = "nav navbar-nav"
    container.appendChild(navMain);

    for (let [key, val] of Object.entries(websitePages)) {
        let li = document.createElement("li");
        if (key === currentPage) {
            li.className = "active";
        }
        navMain.appendChild(li);

        let a = document.createElement("a");
        a.href = formatLink(val["link"], dirLevel);
        a.innerText = val["verbose"];
        li.appendChild(a);
    }

    console.log("Loaded navagation bar");
    console.log(nav);

    document.body.insertBefore(nav, document.body.firstElementChild);
}


function onLoad() {
    let location = window.location.href;
    let split = location.split("/");
    let documentName = split[split.length - 1];
    let dirLevel = 0;
    if (split[split.length - 2] === "pages") {
        dirLevel += 1;
    }
    let currentPage = documentName.replace(".html", "");
    console.log(currentPage);
    console.log(dirLevel);
    createNavbar(currentPage, dirLevel);
}

onLoad();