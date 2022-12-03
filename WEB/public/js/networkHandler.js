$(() => {
    let counter = 0;
    const btn = $("#refreshButton")[0];

    socket.on("onDeviceLoad", () => {
        counter++;

        if(!btn.classList.contains("refreshButtonActive")){
            btn.classList.add("refreshButtonActive");
            btn.style.display = "Inline-Block";
        }
        else
            btn.value = "Refresh x" + counter;
    });

    $(".sysInfo_Alias").each((i, x) => {
        x.addEventListener("click", (e) => {
            alert(x.innerHTML);
            window.location = "/network/" + x.innerHTML.toString(); 
        });
    });
}); 