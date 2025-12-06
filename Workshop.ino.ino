#include <WiFi.h>
#include <HTTPClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// --- CONFIGURAÇÕES WI-FI ---
const char* ssid = "Stelf"; //Nome da rede 
const char* password = "senha1234"; //Senha da rede

// --- ENDEREÇO DO SERVIDOR NODE.JS ---
const char* serverBase = "http://10.187.1.29:3000/sensor/dados/"; //mudar para o IPv4 da máquina

// --- SENSOR DE UMIDADE DO SOLO ---
#define PINO_SOLO 34
uint16_t MIN_UMIDO = 1270;
uint16_t MAX_SECO = 4095;

// --- SENSOR DE TEMPERATURA (DS18B20) ---
#define ONE_WIRE_BUS 4
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// --- LED ONBOARD ---
#define LED 2

void piscarLed(int vezes, int tempo) {
  for (int i = 0; i < vezes; i++) {
    digitalWrite(LED, HIGH);
    delay(tempo);
    digitalWrite(LED, LOW);
    delay(tempo);
  }
}

void setup() {
  Serial.begin(115200);

  // --- CONFIGURA LED ---
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);

  // --- INICIA WI-FI ---
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Conectando ao WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n✅ WiFi conectado!");
  Serial.print("IP do ESP32: ");
  Serial.println(WiFi.localIP());

  // 💡 Pisca 3x rápido quando conecta ao Wi-Fi
  piscarLed(3, 150);

  String mac = WiFi.macAddress();
  mac.replace(":", "");
  Serial.print("📡 MAC Address: ");
  Serial.println(mac);

  // --- CONFIGURA SENSOR DE UMIDADE ---
  analogReadResolution(12);
  analogSetPinAttenuation(PINO_SOLO, ADC_11db);

  // --- INICIALIZA SENSOR DS18B20 ---
  sensors.begin();
}

void loop() {
  // --- LEITURA DE UMIDADE ---
  uint16_t leitura = analogRead(PINO_SOLO);

  // cálculo original
  float umidade = 100.0f * (MAX_SECO - leitura) / (MAX_SECO - MIN_UMIDO);

  // força dentro do range
  umidade = constrain(umidade, 0.1f, 100.0f);  // nunca será 0

  // --- LEITURA DE TEMPERATURA ---
  sensors.requestTemperatures();
  float temperatura = sensors.getTempCByIndex(0);
  if (temperatura == DEVICE_DISCONNECTED_C) {
    temperatura = -1000;
  }

  Serial.println("---------------");
  Serial.print("Umidade do solo: ");
  Serial.print(umidade, 1);
  Serial.println(" %");
  Serial.print("Temperatura: ");
  Serial.print(temperatura, 1);
  Serial.println(" °C");

  // --- ENVIO PARA O SERVIDOR ---
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String mac = WiFi.macAddress();
    mac.replace(":", "");  // REMOVE OS ":" ANTES DE MONTAR A URL
    String url = String(serverBase) + mac;

    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    String jsonData = String("{\"temperatura\": ") + String(temperatura, 1) + String(", \"umidade\": ") + String(umidade, 1) + String("}");

    Serial.println("🔹 Enviando para: " + url);
    Serial.println("🔹 JSON: " + jsonData);

    int httpResponseCode = http.POST(jsonData);
    Serial.printf("📡 Código de resposta: %d\n", httpResponseCode);

    if (httpResponseCode > 0) {
      String resposta = http.getString();
      Serial.println("💬 Resposta: " + resposta);
      piscarLed(2, 200);
    } else {
      Serial.printf("❌ Erro ao enviar: %d\n", httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("⚠️ WiFi desconectado, tentando reconectar...");
    WiFi.begin(ssid, password);
  }

  delay(10000);  // envia a cada 10 segundos
}
