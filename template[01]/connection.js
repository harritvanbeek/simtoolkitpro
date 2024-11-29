let Protocol        = "http"; //http protocal; you can change it to https if you using ssl; 
let schemaURI       = "127.0.0.1"; //your local ip as default; 
let schemaPORT      = "51011"; //portnuber as default;
let refreshTime     = 200 // 200 milliseconds = 3 seconds 30000
let noConnection    = "Sim is not connected!";

let ShowError       =   true; //displays the noConnection as error
let departure       =   true; //displays the departure
let arrivle         =   true; //displays the arrivle
let gspeed          =   true; //displays the ground speed
let airspeed        =   false; //displays Indicated airspeed
let trueairspeed    =   false; //displays True airspeed
let verticalspeed   =   false; //displays Vertical speed
let altiude         =   true; //displays altiude
let eteTime         =   true; //displays ete Time
let network         =   true; //displays network
let registration    =   true; //displays registration
let atc             =   false; //displays atc
let phase           =   true; //displays phase
let progressbar     =   true; //displays progressbar
let showmap         =   true; //displays map

/* DO NOT CHANGE THIS!! */
let SimToolKitProURI = Protocol+"://"+schemaURI+":"+schemaPORT+"/simdata";
let ProgressBarURI   = Protocol+"://"+schemaURI+":"+schemaPORT+"/overlay";
let mapURI           = Protocol+"://"+schemaURI+":"+schemaPORT+"/map";

function flightDate(URI){
    $.ajax({
        type: "GET" ,
        url: URI ,        
        dataType: "json" ,
        success: function(data) {
            if(data){
                //chek sim connection
                if(data[0].value !== "Not Connected"){
                    $(".errorConnect").hide();
                    
                    if(departure){
                        $(".departure").show();
                        $("#departure").show();
                        if(data[1].value){
                            $('#departure').html(data[1].value); // dep;                                
                        }else{
                            $('#departure').html("N/A"); // dep;                                
                        }
                    }
                    
                    if(arrivle){
                        $(".arrivle").show();
                        $("#arrivle").show();
                        if(data[2].value){
                            $('#arrivle').html(data[2].value);   // arr;                               
                        }else{
                            $('#arrivle').html("N/A");   // arr;
                        }
                    }

                    if(gspeed){
                        $(".gspeed").show();
                        $("#gspeed").show();
                        $('#gspeed').html(data[3].value);       // gspeed;                               
                    }

                    if(airspeed){
                        $(".ias").show();
                        $("#ias").show();
                        $('#ias').html(data[4].value);       // Indicated airspeed;                               
                    }

                    if(trueairspeed){
                        $(".tas").show();
                        $("#tas").show();
                        $('#tas').html(data[5].value);       // true airspeed;                               
                    }    
                    
                    if(verticalspeed){
                        $(".spd").show();
                        $("#spd").show();
                        $('#spd').html(data[6].value);       // verticalspeed;                               
                    }  
                    
                    if(altiude){
                        $(".altiude").show();
                        $("#altiude").show();
                        $('#altiude').html(data[7].value);  // altiude;                               
                    }
                    
                    if(eteTime){
                        $(".phaseTime").show();
                        $(".ete").show();
                        $("#ete").show();
                        if(data[8].value){
                            $('#ete').html(data[8].value);      // ete;                               
                        }else{
                            $('#ete').html('00:00:00');      // ete;                               
                        }
                    }    
                    
                    if(network){
                        $(".network").show();
                        $("#network").show();
                        $('#network').html(data[9].value);      // network;                               
                    }
                    
                    if(registration){
                        $(".callsign").show();
                        $("#reg").show();
                        if(data[10].value){
                            $('#reg').html(data[10].value);     // registration;                               
                        }else{
                            $('#reg').html("N/A");     // registration;                               
                        }
                    }

                    if(atc){
                        $(".atc").show();
                        $("#atc").show();
                        $('#atc').html(data[11].value);     // atc;                               
                    }

                    if(phase){
                        $(".phaseTime").show();
                        $(".phase").show();
                        $("#phase").show();
                        $('#phase').html(data[12].value);     // phase;
                    }
                    
                    console.log(data);
                }else{
                    //show nice error "Sim is not connected"
                    if(ShowError){
                        $(".errorConnect").show();
                        $("#noConnection").html(noConnection);
                    }
                    
                    console.log(noConnection);
                }                
            }
        }
    });
}


function map(URI){
    if(showmap){
        $('.map').show();
        $('.map').prepend(`<iframe class="iframe" src="${URI}" scrolling="no"></iframe>`);
    }else{
        $('.map').hide();
    }
}

function progressBar(URI){
    if(progressbar){
        $('.progressbar').show();
        $('.progressbar').prepend(`<iframe class="iframe" src="${URI}" scrolling="no"></iframe>`);
    }else{
        $('.progressbar').hide();
    }
}

flightDate(SimToolKitProURI);
progressBar(ProgressBarURI);
map(mapURI);

setInterval(function(){
    flightDate(SimToolKitProURI);
  }, refreshTime); 