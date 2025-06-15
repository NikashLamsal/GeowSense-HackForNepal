#include <WiFi.h>
#include <Preferences.h>
#include "DHT.h"
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include <time.h>

//esp_32 wifi credentials
const char* AP_SSID = "ESP32";
const char* AP_PASS = "growsense";

// Firebase access credentials
#define API_KEY "AIzaSyCIv249TsVxNXuoZB9E_aPJwDK5l9ZjH6Y"
#define DATABASE_URL "https://growsense-51fc4-default-rtdb.asia-southeast1.firebasedatabase.app"

// Sensor and motor pins
#define DHTPIN 5
#define DHTTYPE DHT11
#define MOISTURE_PIN 34
#define IN1 14
#define IN2 12

DHT dht(DHTPIN, DHTTYPE);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
Preferences preferences;
WiFiServer server(80);
String storedSSID, storedPassword;

unsigned long previousMillis = 0;
const long interval = 2000;

//decoding ascii values
String urlDecode(String input) {
  String decoded = "";
  char c;
  for (int i = 0; i < input.length(); i++) {
    c = input[i];
    if (c == '+') decoded += ' ';
    else if (c == '%') {
      String hex = input.substring(i + 1, i + 3);
      decoded += (char) strtol(hex.c_str(), nullptr, 16);
      i += 2;
    } else decoded += c;
  }
  return decoded;
}

//wotor pump functions
void pumpOn() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
}

void pumpOff() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
}

//connecting esp to wifi
void connectToWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(storedSSID.c_str(), storedPassword.c_str());
  Serial.print("Connecting to WiFi");
  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
}

void startAccessPoint() {
  WiFi.softAP(AP_SSID, AP_PASS);
  server.begin();
  Serial.println("AP started. Connect to ESP32 and open IP: ");
  Serial.println(WiFi.softAPIP());
}

void handleClient() {
  WiFiClient client = server.available();
  if (client) {
    Serial.println("Client connected");
    String currentLine = "", postData = "";
    bool isPost = false;

    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        currentLine += c;
        if (currentLine.indexOf("POST /save") >= 0) isPost = true;
        if (currentLine.endsWith("\r\n\r\n")) {
          if (isPost) while (client.available()) postData += (char)client.read();
          break;
        }
      }
    }

    String response = "<!DOCTYPE html><html><body>";
    if (isPost && postData.length() > 0) {
      int ssidStart = postData.indexOf("ssid=");
      int passStart = postData.indexOf("pass=");
      if (ssidStart >= 0 && passStart >= 0) {
        String newSSID = urlDecode(postData.substring(ssidStart + 5, postData.indexOf('&')));
        String newPass = urlDecode(postData.substring(passStart + 5));
        preferences.putString("ssid", newSSID);
        preferences.putString("pass", newPass);
        response += "<h2>Saved. Restarting...</h2>";
        client.println("HTTP/1.1 200 OK");
        client.println("Content-Type: text/html");
        client.println("Connection: close\r\n");
        client.println(response);
        client.stop();
        delay(1000);
        ESP.restart();
        return;
      }
    }

    response += "<h2>WiFi Credentials</h2><form method='POST' action='/save'>";
    response += "SSID:<br><input type='text' name='ssid'><br>";
    response += "Password:<br><input type='password' name='pass'><br><br>";
    response += "<input type='submit' value='Save'></form></body></html>";
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/html");
    client.println("Connection: close\r\n");
    client.println(response);
    client.stop();
    Serial.println("Client disconnected");
  }
}

void readSensorsAndUpload() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int moisture = analogRead(MOISTURE_PIN);
  if (moisture == 0)
  {
    moisture = 300;
  }
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT!");
    return;
  }

  Serial.printf("Temp: %.2f°C, Humidity: %.2f%%, Moisture: %d\n", temperature, humidity, moisture);
  Firebase.RTDB.setFloat(&fbdo, "/sensor/temperature", temperature);
  Firebase.RTDB.setFloat(&fbdo, "/sensor/humidity", humidity);
  Firebase.RTDB.setInt(&fbdo, "/sensor/moisture", moisture);
}


void esp_onlinetime() {
  static unsigned long lastSent = 0;
  unsigned long now = millis();
  if (now - lastSent > 5000) {
    time_t nowTime = time(nullptr);
    if (nowTime > 1000000000) {
      Firebase.RTDB.setInt(&fbdo, "/status/lastSeen", nowTime);
    } else {
      Serial.println("NTP time not synced yet.");
    }
    lastSent = now;
  }
}

void handlePumpControl() {
  String mode = "MANUAL";
  if (Firebase.RTDB.getString(&fbdo, "/control/mode")) {
    mode = fbdo.stringData();
  }
  if (mode == "AUTO") {
    int moisture = analogRead(MOISTURE_PIN);
    if (moisture > 1000) {
      pumpOn();
      Firebase.RTDB.setString(&fbdo, "/control/pump", "ON");
    } else {
      pumpOff();
      Firebase.RTDB.setString(&fbdo, "/control/pump", "OFF");
    }
  } else if (mode == "MANUAL") {
    if (Firebase.RTDB.getString(&fbdo, "/control/pump")) {
      String pumpState = fbdo.stringData();
      if (pumpState == "ON") pumpOn();
      else pumpOff();
    }
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  preferences.begin("wifiCreds", false);
  storedSSID = preferences.getString("ssid", "");
  storedPassword = preferences.getString("pass", "");

  if (storedSSID == "" || storedPassword == "") {
    startAccessPoint();
    return;
  }

  connectToWiFi();
  if (WiFi.status() == WL_CONNECTED) {
    config.api_key = API_KEY;
    config.database_url = DATABASE_URL;
    if (Firebase.signUp(&config, &auth, "", "")) {
      Serial.println("Firebase auth success.");
    } else {
      Serial.printf("Firebase sign-in error: %s\n", config.signer.signupError.message.c_str());
    }
    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);
  } else {
    startAccessPoint();
    return;
  }

  configTime(0, 0, "pool.ntp.org", "time.nist.gov");
  while (time(nullptr) < 100000) delay(500);
}

void loop() {
  if (WiFi.getMode() == WIFI_AP) {
    handleClient();
    return;
  }

  if (WiFi.status() != WL_CONNECTED) return;

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    readSensorsAndUpload();
    handlePumpControl();
    esp_onlinetime();
  }
}
