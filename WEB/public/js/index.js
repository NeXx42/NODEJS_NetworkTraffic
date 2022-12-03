const socket = io("http://localhost:8080/");

$(() => {
    socket.on("onLoad", onLoad);

    $(".Header-Bar-Element").each((index, value) => {
        value.classList.forEach(element => {
            if(element == "Header-Bar-Selected")
                SetHighlighted(index);
        });

        value.addEventListener("click", (e) => {ChangePage(index); createRipple(e);});


        value.addEventListener("click", function(e){  // For all links with the class "hash"
            e.preventDefault();  // Don't follow link
            History.pushState(null, '', this.href);  // Change the current URL (notice the capital "H" in "History")

            setTimeout(() => {window.location = window.location}, 500);
         });
    });
});


function SetHighlighted(index){
    
    $(".Header-Bar-Element").each((i, value) => {

        if(index == i){
            value.classList.add("Header-Bar-Selected");
        }
        else{
            value.classList.remove("Header-Bar-Selected");
        }
    });


    $(".Header-Bar-Highlighter").css("left", `${90 * index}px`);
}

function ChangePage(index){
    SetHighlighted(index);
}

function onLoad(data){

}



function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const offset = button.getBoundingClientRect();
   
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - offset.left - radius}px`;
    circle.style.top = `${event.clientY - offset.top - radius}px`;


    circle.classList.add("ripple");
  
    const ripple = button.getElementsByClassName("ripple")[0];
  
    if (ripple) {
      ripple.remove();
    }
  
    button.appendChild(circle);
}
  