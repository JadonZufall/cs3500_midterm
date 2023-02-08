var timeline = document.createElement("div");
document.body.appendChild(timeline);
timeline.className = "timeline";

class Point 
{
    constructor(year) 
    {this.year = year;}
    get year() 
    {return this.year;}
}

const points = [
    Point(2019), 
    Point(2020)
];

const xMargin = 50;

const numberOfPoints = points.length;

function countNumberBefore(target) {
    let result = 0;
    for (let p in points) {
        if (p.year < target.year) {
            result += 1;
        }
        else if (p.year === target.year) {
            console.error("Two years in timeline points contain the same value!");
        }
    }
    return result;
}


function calculatePointXOffset(target) {
    let portion = (window.innerWidth - (xMargin * 2)) / numberOfPoints;
    let numBefore = countNumberBefore(target);
    let offset = xMargin + numBefore * portion;
    return offset;
}


function onReady() {

}

onReady();
