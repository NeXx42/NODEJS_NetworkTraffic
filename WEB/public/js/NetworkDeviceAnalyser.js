$(() => {
    $("a#Network_Device_Info_IP").text(local_ip);

    if(local_alias != "")
        $("#Network_Device_Info_Alias").val(local_alias);

    UpdatePorts()
    setInterval(UpdatePorts, 1 * 1000)
});

let lastPorts = []


function UpdatePorts(){

    const parent = $("ol.Network_Device_Ports");
    let data = [];
    
    for(let i = 0; i < Math.floor(Math.random() * 25); i++){
        data.push(`${Math.floor(Math.random() * 9999) + 1}`);
    }
    
    let displayPorts = []
    
    lastPorts.forEach((x) => {
        if(data.includes(x))
            displayPorts.push({ "text":x, "type":0 }); // existing
        else
            displayPorts.push({ "text":x, "type":2 }); // old
    });
    
    
    data.forEach((x) => {
        if(!lastPorts.includes(x))
            displayPorts.push({ "text":x, "type":1 }); // new
    });

    lastPorts = data;

    parent.empty();

    displayPorts.forEach((x) => {
        const newText = `${x["text"]} - ${x["type"] == 2 ? "closed" : "open" }`
        parent.append(`<li class="Network_Device_Port port_type_${x["type"]}"><a>${newText}</a></li>`)
    });
        
}