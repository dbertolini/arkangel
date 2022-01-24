#include <DHT.h>

int SENSOR = 2;
int temp, humedad;

DHT dht(SENSOR, DHT11);

void setup() {
  Serial.begin(9600);
  dht.begin(); // Sensorea
}

void loop() {
  temp = dht.readTemperature();
  humedad = dht.readHumidity();

  Serial.print("Temperatura: ");
  Serial.print(temp);
  Serial.print("˚C\n");
  
  Serial.print("Humedad: ");
  Serial.print(humedad);
  Serial.print("%\n\n");

  delay(2000);
}
