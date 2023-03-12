// Stores the website name for use in the navbar.
const websiteName = "Taylor Swift"

/* 
    If you have questions please @JadonZufall in the team.

    This is a constant javascript object that is parsed on load of the webpage in order to add
    links in the navbar to each subpage.

    The reason for doing this instead of just in html is because I didn't want to copy it on each
    page and have to change it everywhere.

    Each page has a verbose, link, and, catagory property.  
    * Verbose - is the name of the link (how it will be represented on the page)
    
    * Link - is the path to the html file from the root directory (generally pages/file.html)
    
    * Catagory - is the drop down menu it will be sorted into, if catagory is None then it will
    *    not be put into a drop down catagory and will come before the drop down catagories.
*/
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
    "early_life": {
        "verbose": "Early Life",
        "link": "pages/early_life.html",
        "catagory": "Timeline"
    },
    "career_beginnings": {
        "verbose": "Career Beginnings",
        "link": "pages/career_beginnings.html",
        "catagory": "Timeline"
    },
    "hardship": {
        "verbose": "Hardships",
        "link": "pages/hardships.html",
        "catagory": "Timeline"
    },
    "genreswitch": {
        "verbose": "Genre Switch",
        "link": "pages/genreswitch.html",
        "catagory": "Timeline"
    },
    "present_day": {
        "verbose": "Present Day",
        "link": "pages/present_day.html",
        "catagory": "Timeline"
    },
    "awards": {
        "verbose": "Awards",
        "link": "pages/awards.html",
        "catagory": "Music"
    },
    "listen": {
        "verbose": "Listen",
        "link": "pages/listen.html",
        "catagory": "Music"
    },
    "music": {
        "verbose": "Music",
        "link": "pages/music.html",
        "catagory": "Music"
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
    "publications": {
        "verbose": "Publications",
        "link": "pages/publications.html",
        "catagory": "Music"
    },
    "merch": {
        "verbose": "Merch",
        "link": "pages/merch.html",
        "catagory": "Other"
    },
    "sources": {
        "verbose": "Sources",
        "link": "pages/sources.html",
        "catagory": "Info"
    },
    "taylorsversion": {
        "verbose": "Taylors Version",
        "link": "pages/taylorsversion.html",
        "catagory": "Albums"
    },
    "1989": {
        "verbose": "1989",
        "link": "pages/1989.html",
        "catagory": "Albums"
    },
    "activism": {
        "verbose": "Activism",
        "link": "pages/activism.html",
        "catagory": "Other"
    },
    "acting": {
        "verbose": "Acting",
        "link": "pages/acting.html",
        "catagory": "Other"
    },
    "tourdates": {
        "verbose": "Tour Dates",
        "link": "pages/tourdates.html",
        "catagory": "Other"
    },
    "philanthropy": {
        "verbose": "Philanthropy",
        "link": "pages/philanthropy.html",
        "catagory": "Other"
    },
    "trivia": {
        "verbose": "Trivia",
        "link": "pages/trivia.html",
        "catagory": "Other"
    },
}


function formatLink(fileName, dirLevel) {
    /* 
        Function that returns the filename formatted in a way so that the root dir is pathed to
        and then it finds the file from there.

        fileName is the name of the file with .html on the end and any path from root included.

        dirLevel is the levels of directories that the file is nested in.
    */
    
    // Go up a directory for each level in dirLevel.
    for (let i = 0; i < dirLevel; i++) {
        fileName = "../" + fileName;
    }

    // Return the formatted string
    return fileName;
}


function createNavbar(currentPage, dirLevel) {
    /* 
        This function creates the navbar from the elements in the websitePage object.
    */
    // Create all the base elements of the navbar and set their attributes.
    let nav = document.createElement("nav");
    nav.className = "navbar navbar-fixed-top navbar-inverse";

    let container = document.createElement("div");
    container.className = "container-fluid";
    nav.appendChild(container);

    let header = document.createElement("navbar-header");
    header.className = "navbar-header";
    container.appendChild(header);

    // Append the branding to the navbar.
    let brand = document.createElement("a");
    brand.className = "navbar-brand";
    brand.innerText = websiteName;
    brand.href = formatLink(websitePages["index"]["link"], dirLevel);
    header.appendChild(brand);

    let navMain = document.createElement("ul");
    navMain.className = "nav navbar-nav"
    container.appendChild(navMain);

    // Create and add all the links outside of a catagory..
    for (let [key, val] of Object.entries(websitePages)) {
        if (val["catagory"] == "None") {
            let li = document.createElement("li");
            li.className = "other";
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

    // Create all the links inside of a catagory.
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

    // Add all the links inside of a catagory.
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

    // Insert the navbar into the document before the firstElementChild.
    document.body.insertBefore(nav, document.body.firstElementChild);
}


function onLoad() {
    /* 
        Function called on page load, it adds the navbar.
    */
    let location = window.location.href;
    let split = location.split("/");
    let documentName = split[split.length - 1];
    let dirLevel = 0;
    if (split[split.length - 2] === "pages") {
        dirLevel += 1;
    }
    let currentPage = documentName.replace(".html", "");
    createNavbar(currentPage, dirLevel);
}

// Calls the onLoad function when this file is imported.
onLoad();
