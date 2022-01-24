//#include <Firebase.h>
//#include <FirebaseArduino.h>
//#include <FirebaseCloudMessaging.h>
//#include <FirebaseError.h>
//#include <FirebaseHttpClient.h>
//#include <FirebaseObject.h>
//#include <SerialTransceiver.h>
//#include <Thing.h>

#include "ESP8266.h"


#define SSID        "Fibertel WiFi385 2.4GHz"
#define PASSWORD    "0043310465"

ESP8266 wifi(Serial1);

#define FIREBASE_HOST "arkangel-3c1ae.firebaseio.com"
#define FIREBASE_AUTH "yyLuveEfIRMB4dpVEeTUeM9w85hr1Bgv5OVXnpr1"

#define LED 13

//arkangel-3c1ae //database



void setup(void)
{
  pinMode(LED,OUTPUT);

  digitalWrite(LED,0);
  
  Serial.begin(115200);   
  Serial1.begin(115200);

  Serial.print("setup begin\r\n");

  Serial.print("FW Version: ");
  Serial.println(wifi.getVersion().c_str());
   
   
   if (wifi.setOprToStation()) {
       Serial.print("to station ok\r\n");
   } else {
       Serial.print("to station err\r\n");
   }

   if (wifi.joinAP(SSID, PASSWORD)) {
       Serial.print("Join AP success\r\n");
       Serial.print("IP: ");       
       Serial.println(wifi.getLocalIP().c_str());
   } else {
       Serial.print("Join AP failure\r\n");
   }
   
   Serial.print("setup end\r\n");
   
   Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  Firebase.setInt("LEDStatus",0);
}

void loop(void)
{
  if(Firebase.getInt("LEDStatus"))
  
  {
  
  digitalWrite(LED,HIGH);
  
  }
  
  else
  
  {
  
  digitalWrite(LED,LOW);
  
  }
  
  if (Firebase.failed()) // Check for errors {
  
  Serial.print("setting /number failed:");
  
  Serial.println(Firebase.error());
  
  return;
  
  }
  
  delay(1000);
}
