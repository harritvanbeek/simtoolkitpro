let Protocol        = "http"; //http protocal; you can change it to https if you using ssl; 
let schemaURI       = "127.0.0.1"; //your local ip as default; 
let schemaPORT      = "51011"; //portnuber as default;
let refreshTime     = 200 // 200 milliseconds = 3 seconds 30000
let noConnection    = "Sim is not connected!";

let ShowError       =   true; //displays the noConnection as error
let departure       =   true; //displays the departure
let arrivle         =   true; //displays the arrivle
let gspeed          =   true; //displays the ground speed
let airspeed        =   true; //displays Indicated airspeed
let trueairspeed    =   true; //displays True airspeed
let verticalspeed   =   true; //displays Vertical speed
let altiude         =   true; //displays altiude
let eteTime         =   true; //displays ete Time
let network         =   true; //displays network
let registration    =   true; //displays registration
let atc             =   true; //displays atc
let phase           =   true; //displays phase

/* DO NOT CHANGE THIS!! */
let SimToolKitProURI = Protocol+"://"+schemaURI+":"+schemaPORT+"/simdata";
let ProgressBar      = Protocol+"://"+schemaURI+":"+schemaPORT+"/overlay";


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
                        $('#departure').html(data[1].value); // dep;                                
                    }
                    
                    if(arrivle){
                        $(".arrivle").show();
                        $("#arrivle").show();
                        $('#arrivle').html(data[2].value);   // arr;                               
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
                        $(".ete").show();
                        $("#ete").show();
                        $('#ete').html(data[8].value);      // ete;                               
                    }    
                    
                    if(network){
                        $(".network").show();
                        $("#network").show();
                        $('#network').html(data[9].value);      // network;                               
                    }
                    
                    if(registration){
                        $(".reg").show();
                        $("#reg").show();
                        $('#reg').html(data[10].value);     // registration;                               
                    }

                    if(atc){
                        $(".atc").show();
                        $("#atc").show();
                        $('#atc').html(data[11].value);     // atc;                               
                    }

                    if(phase){
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


function progressBar(URI){
    $('.flightData').prepend(`<iframe class="iframe" src="${URI}" scrolling="no"></iframe>`);
}

flightDate(SimToolKitProURI);
progressBar(ProgressBar);

setInterval(function(){
    flightDate(SimToolKitProURI);
  }, refreshTime); 