// Include all libraries
#include <DHT.h>
#include <Wire.h>
//#include <LiquidCrystal_I2C.h>
//#include "ESP8266.h"

// Define PIN where modules are connected
#define BluetoothModule Serial3
#define PinSensorTemperature 2
#define PinSensorMovement A3
#define PinSensorMovementBaranda A7
#define PinSensorPiezo A4
#define PinSensorPiezoBaranda A6
#define PinSensorProximity A5
#define PinSensorLight A0
#define PinSensorSound A1
#define PinSensorSmoke A2

// Wifi constants and API url
//#define SSID "FoxFi13"
//#define PASSWORD "pancho1234"
//#define HOST_NAME   "arkangel.diegobertolini.com"
//#define HOST_PORT   (80)

//LiquidCrystal_I2C lcd(0x3F,2,1,0,4,5,6,7,3,POSITIVE);
DHT dht(PinSensorTemperature, DHT11);

// Set all global variables
int intTemperature;
int intHumidity;
int intMovement;
int intMovementBaranda;
int intPiezo;
int intPiezoBaranda;
int intProximity;
int intLight;
int intSound;
int intSmoke;

//String Data = "";
int counterSendAPI = 0;

//ESP8266 wifi(Serial1);
//uint8_t buffer[1024] = {0};
//char sendDataChar[500];
//String sendDataString;
//uint32_t receivedData;
//uint32_t iW = 0;
//int flagWifiOK = 0;

// Setup function at the beginning
void setup() {
  
  //int sensorMovement = analogRead(PinSensorMovement);
  //int sensorPiezo = analogRead(PinSensorPiezo);
  //int sensorMovementBaranda = analogRead(PinSensorMovementBaranda);
  //int sensorPiezoBaranda = analogRead(PinSensorPiezoBaranda);
  
  // Starts serials
  Serial.begin(9600); 

  // Start modules connected to the Arduino boards
  BluetoothModule.begin(9600);
  dht.begin();

  // Set the PIN number 13 for outputs
  pinMode(13, OUTPUT);
  
}

// Loop function to repeat
void loop() {

  // Get temperature & humidity values from sensor
  intTemperature = dht.readTemperature();
  intHumidity = dht.readHumidity();

  String Data = "";

  // Get movement sensor data
  intMovement = analogRead(PinSensorMovement);
  intMovementBaranda = analogRead(PinSensorMovementBaranda);

  // Get piezo sensor data
  intPiezo = analogRead(PinSensorPiezo);
  intPiezoBaranda = analogRead(PinSensorPiezoBaranda);

  // Get proximity sensor data
  intProximity = analogRead(PinSensorProximity);

  // Get light sensor data
  intLight = analogRead(PinSensorLight);

  // Get sound sensor data
  intSound = analogRead(PinSensorSound);

  // Get smoke sensor data
  intSmoke = analogRead(PinSensorSmoke);

    //char text[00];
    String text;
    
    text.concat("TEMP=");
    text.concat(intTemperature);
    text.concat("|");
    
    text.concat("HUME=");
    text.concat(intHumidity);
    text.concat("|");
    
    text.concat("MOVE=");
    text.concat(intMovement);
    text.concat("|");
    
    text.concat("PIEZ=");
    text.concat(intPiezo);
    text.concat("|");
    
    text.concat("PROX=");
    text.concat(intProximity);
    text.concat("|");
    
    text.concat("LIGH=");
    text.concat(intLight);
    text.concat("|");
    
    text.concat("SOUN=");
    text.concat(intSound);
    text.concat("|");
    
    text.concat("SMOK=");
    text.concat(intSmoke);
    text.concat("|");
     
    text.concat("PIEB=");
    text.concat(intPiezoBaranda);
    text.concat("|");
    
    text.concat("MOVB=");
    text.concat(intMovementBaranda);

  //sprintf(text,"TEMP=%d|HUME=%d|MOVE=%d|PIEZ=%d|PROX=%d|LIGH=%d|SOUN=%d|SMOK=%d|PIEB=%d|MOVB=%d|",intLight,intSound,intSmoke,intPiezoBaranda,intMovementBaranda);
  Serial.println(text);
  
  BluetoothModule.print(text);
  // Clear Bluetooth buffer
  BluetoothModule.flush();

  
  // While buffer that comes from bluetooth is not empty
  while(BluetoothModule.available())
  {
    char symbol = BluetoothModule.read();
    Data.concat(symbol);
    BluetoothModule.write(symbol);
    
    // character "|" is used to determine last symbol from input
    if (symbol == '|')
    {
      Serial.print(Data); // Data is the entire text from input

      // What should to be done with the input?
      if(Data.equals("13_HIGH|"))
      {
        digitalWrite(13, HIGH);
      }
      
      if(Data.equals("13_LOW|"))
      {
        digitalWrite(13, LOW);
      }
      
      Data =""; // Needed to clear the buffer/message
      //delay(5);
    }
  }
  
  delay(20);
}
