const websiteName = "Taylor Swift"
const websitePages = {
    "index": {
        "verbose": "Home",
        "link": "index.html",
        "catagory": "None"
    },
    "about": {
        "verbose": "About",
        "link": "pages/about.html",
        "catagory": "Info"
    },
    "catalog": {
        "verbose": "Catalog",
        "link": "pages/catalog.html",
        "catagory": "Info"
    },
    "references": {
        "verbose": "References",
        "link": "pages/references.html",
        "catagory": "Info"
    },
    "early_life": {
        "verbose": "Early Life",
        "link": "pages/early_life.html",
        "catagory": "Timeline"
    },
    "publications": {
        "verbose": "Publications",
        "link": "pages/publications.html",
        "catagory": "Music"
    },
    "merch": {
        "verbose": "Merch",
        "link": "pages/merch.html",
        "catagory": "Merch"
    },
    "music": {
        "verbose": "Music",
        "link": "pages/music.html",
        "catagory": "Music"
    },
    "listen": {
        "verbose": "Listen",
        "link": "pages/listen.html",
        "catagory": "Music"
    },
    "awards": {
        "verbose": "Awards",
        "link": "pages/awards.html",
        "catagory": "None"
    },
    "sources": {
        "verbose": "Sources",
        "link": "pages/sources.html",
        "catagory": "Info"
    },
}


function formatLink(fileName, dirLevel) {
    for (let i = 0; i < dirLevel; i++) {
        fileName = "../" + fileName;
    }
    return fileName;
}


function createNavbar(currentPage, dirLevel) {
    /* 
    This is probably the biggest waste of time I have ever spent writting something... 
    It is an absolute mess, so @Jadon if you need to make any changes.
    */
    console.log("Creating nav bar..");
    let nav = document.createElement("nav");
    nav.className = "navbar navbar-fixed-top navbar-inverse";

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
        if (val["catagory"] == "None") {
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
    }

    let catagories = new Array;
    let catLookup = {};
    for (let [key, val] of Object.entries(websitePages)) {
        if (!catagories.includes(val["catagory"]) && val["catagory"] != "None") {
            catagories.push(val["catagory"])
            let btnMain = document.createElement("li");
            btnMain.className = "dropdown";
            let btnA = document.createElement("a");
            btnA.href="#";
            btnA.class = "dropdown-toggle";
            btnA.setAttribute("data-toggle", "dropdown");
            btnA.role = "button";
            btnA.setAttribute("aria-haspopup", "True");
            btnA.setAttribute("aria-expanded", "False");
            btnA.innerHTML = val["catagory"] + ' <span class="caret"></span>'
            btnMain.appendChild(btnA);
            let btnGroup = document.createElement("ul");
            btnGroup.className = "dropdown-menu";
            btnGroup.id = val["catagory"];
            btnMain.appendChild(btnGroup);
            navMain.appendChild(btnMain);
            catLookup[val["catagory"]] = btnGroup;
        }
    }

    for (let [key, val] of Object.entries(websitePages)) {
        if (val["catagory"] != "None") {
            let btnGroup = catLookup[val["catagory"]];
            let li = document.createElement("li");
            if (key === currentPage) {
                btnGroup.parentElement.classList.add("active");
            }
            btnGroup.appendChild(li);
            let a = document.createElement("a");
            a.href = formatLink(val["link"], dirLevel);
            a.innerText = val["verbose"];
            li.appendChild(a);
        }
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
