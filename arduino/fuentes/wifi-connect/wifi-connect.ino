#include "ESP8266.h"

//#define SSID        "Fibertel WiFi385 2.4GHz"
//#define PASSWORD    "0043310465"

#define SSID        "FoxFi13"
#define PASSWORD    "pancho1234"

ESP8266 wifi(Serial1);

//#define HOST_NAME   "https://arkangel-3c1ae.firebaseio.com"
#define HOST_NAME   "chatito.diegobertolini.com"
#define HOST_PORT   (80)

void setup(void)
{
Serial.begin(115200);   
Serial1.begin(115200);
   Serial.print("setup begin\r\n");

//   Serial.print("FW Version: ");
//   Serial.println(wifi.getVersion().c_str());
   
   
//   if (wifi.setOprToStation()) {
//       Serial.print("to station ok\r\n");
//   } else {
//       Serial.print("to station err\r\n");
//   }

   if (wifi.joinAP(SSID, PASSWORD)) {
       Serial.print("Join AP success\r\n");
       Serial.print("IP: ");       
       Serial.println(wifi.getLocalIP().c_str());
   } else {
       Serial.print("Join AP failure\r\n");
   }

   if (wifi.disableMUX()) {
        Serial.print("single ok\r\n");
    } else {
        Serial.print("single err\r\n");
    }
    
   Serial.print("setup end\r\n");
}

void loop(void)
{
  uint8_t buffer[1024] = {0};

    if (wifi.createTCP(HOST_NAME, HOST_PORT)) {
        Serial.print("create tcp ok\r\n");
    } else {
        Serial.print("create tcp err\r\n");
    }
//
//// PRIMERO ENVIA UN CHAT
//  //if(isset($_GET["paramNickname"]) 
//  //    && isset($_GET["paramMensaje"])
//  //    && isset($_GET["paramSis"])
//  //&& $_GET["paramSis"]=="dab")
//    char *hello1 = "GET /API/chatClienteServidor_mensaje_envia_get.php?paramNickname=arduino&paramMensaje=mensajedearduino&paramSis=dab HTTP/1.1\r\nHost: chatito.diegobertolini.com\r\nConnection: close\r\n\r\n";
//
//    wifi.send((const uint8_t*)hello1, strlen(hello1));
//
//
//    uint32_t len1 = wifi.recv(buffer, sizeof(buffer), 10000);
//    if (len1 > 0) {
//        Serial.print("Received:[");
//        for(uint32_t i = 0; i < len1; i++) {
//            Serial.print((char)buffer[i]);
//        }
//        Serial.print("]\r\n");
//    }
    
// LUEGO RECIBE TODOS INCLUYENDO EL ANTERIOR AGREGADO

    //char *hello = "GET /items.json HTTP/1.1\r\nHost: https://arkangel-3c1ae.firebaseio.com\r\nUser-Agent: Rigor API Tester\r\n\r\n";
    //char *hello = "POST /API/chatClienteServidor_mensaje_obtiene.php HTTP/1.1\r\nHost: chatito.diegobertolini.com\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: 12\r\nAccept-Language: en-us\r\nAccept-Encoding: gzip, deflate\r\nConnection: close\r\n\r\nparamSis=dab";
    char *hello2 = "GET /API/chatClienteServidor_mensaje_obtiene_get.php HTTP/1.1\r\nHost: chatito.diegobertolini.com\r\nConnection: close\r\n\r\n";

    wifi.send((const uint8_t*)hello2, strlen(hello2));


    uint32_t len2 = wifi.recv(buffer, sizeof(buffer), 10000);
    if (len2 > 0) {
        Serial.print("Received:[");
        for(uint32_t i = 0; i < len2; i++) {
            Serial.print((char)buffer[i]);
        }
        Serial.print("]\r\n");
    }

    if (wifi.releaseTCP()) {
        Serial.print("release tcp ok\r\n");
    } else {
        Serial.print("release tcp err\r\n");
    }
    
    while(1);
}
