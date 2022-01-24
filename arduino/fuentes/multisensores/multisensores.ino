#include <DHT.h>

  DHT dht(2,DHT11);

void setup() {
  // put your setup code here, to run once:
  //pinMode(A3, OUTPUT);
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  // put your main code here, to run repeatedly:  

  int temp;
  int hum;
  temp = dht.readTemperature();
  hum = dht.readHumidity();

  int mov = analogRead(A3);
  int piezo = analogRead(A4);
  int proxi = analogRead(A5);

  char text[40];
  sprintf(text, "%d,%d,%d,%d,%d", mov,piezo,temp,hum,proxi);

  Serial.println(text);
  delay (10);
}
