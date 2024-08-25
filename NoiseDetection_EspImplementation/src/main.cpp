#include <Arduino.h>
#include "functions.h"
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>

#include "addons/TokenHelper.h"

#include "addons/RTDBHelper.h"

#define WIFI_SSID "WI-FI NAME"
#define WIFI_PASSWORD "WIFI PASS"

#define API_KEY "AIzaSyC5Ql__00x7m10GTAi-znW1QgK7BJGFWRw"

#define DATABASE_URL "https://noise-detector-cd802-default-rtdb.europe-west1.firebasedatabase.app/"

// Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

// Define Hardware objects
int digipin = 12, analogpin = 32;
int Bled = 21, Yled = 19, Rled = 18, trig = 16, echo = 17, warnCount = 0, soundThreshold = 1867;
double withinTabledist = 100;
String warnType, TableStatus;
int TableID;
unsigned long timepassed = 0;

void setup()
{
  TableID = 1;
  TableStatus = "Empty";
  warnType = "None";
  Serial.begin(460800);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key*/
  config.api_key = API_KEY;

  /* Assign the RTDB URL */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", ""))
  {
    Serial.println("ok");
  }
  else
  {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  pinMode(Bled, OUTPUT);
  pinMode(Yled, OUTPUT);
  pinMode(Rled, OUTPUT);
  pinMode(digipin, INPUT);
  pinMode(analogpin, INPUT);
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
}

void loop()
{
  long duration, distance;

  // Resetting all hardware components when the table is empty
  if (getDistance(trig, echo) > withinTabledist)
  {
    delay(3000);
    reset(Bled, Yled, Rled, warnCount);
    warnType = "None";
    TableStatus = "Empty";
  }

  // Start detecting noise whenever the distance is within the table range
  if (getDistance(trig, echo) < withinTabledist)
  {
    // if detected within table range waiting sometime and read distance again to make sure of table availability
    delay(5000);
  }

  // if detected again within table range now set to busy and start listening for noise:
  if (getDistance(trig, echo) < withinTabledist)
  {
    TableStatus = "Busy";

    // Start detecting noise whenever the distance is within the table range
    // Detecting 1st warning after 5 second of table being "Busy"
    if (analogRead(analogpin) > soundThreshold && millis() > (timepassed + 4000))
    {
      timepassed = millis();
      warnType = Warn(warnCount, Bled);
      warnCount = 1;
    }
  }
  // Start Detecting 2nd warning after 3 seconds of 1st
  if (analogRead(analogpin) > soundThreshold && millis() > (timepassed + 3000) && warnCount == 1)
  {
    timepassed = millis();
    warnType = Warn(warnCount, Yled);
    warnCount = 2;
  }
  // Start Detecting 3rd warning after another 3 seconds of 2nd
  if (analogRead(analogpin) > soundThreshold && millis() > (timepassed + 3000) && warnCount == 2)
  {
    warnType = Warn(warnCount, Rled);
    warnCount = -1;
    delay(700);
  }

  // Sending the data to the database:
  if (Firebase.ready())
  {
    if (Firebase.RTDB.setInt(&fbdo, "Tables/Table1/ID", TableID))
    {
      Serial.println("ID sent to the database");
    }
    else
    {
      Serial.println("Failed to send ID to the database");
    }

    if (Firebase.RTDB.setString(&fbdo, "Tables/Table1/Status", TableStatus))
    {
      Serial.println("Status sent to the database");
    }
    else
    {
      Serial.println("Failed to send Status to the database");
    }
    if (Firebase.RTDB.setString(&fbdo, "Tables/Table1/Warning", warnType))
    {
      Serial.println("Warning sent to the database");
    }
    else
    {
      Serial.println("Failed to send Warning to the database");
    }
  }
}