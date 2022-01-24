#define BluetoothModule Serial3

String Data = "";

void setup()
{
  Serial.begin(9600);
  BluetoothModule.begin(9600);
  
  pinMode(13, OUTPUT); 
}

void loop()
{
  BluetoothModule.write("TEMP=23|");
  BluetoothModule.write("HUME=90|");
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
      
      delay(20);
    }
    
  }
  delay(8000);
}
