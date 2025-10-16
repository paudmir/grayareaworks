console.log("Hello World!");
console.log("Just adding this to make sure it works.");


let numClicks = 0; 
function updateClickCount() {   
    numClicks = numClicks + 1;  
    console.log(numClicks); 
}

document.body.addEventListener("click",logClickLocation);
function logClickLocation(e){
    console.log(e.clientX+" "+e.clientY);
}