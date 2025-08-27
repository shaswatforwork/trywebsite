-- Seed some starter products
INSERT INTO "Product" ("id","sku","title","description","price","images","category","stock","createdAt","updatedAt") VALUES
  (gen_random_uuid(),'ARDUINO-UNO-R3','Arduino UNO R3 (SMD)','Original UNO R3 board suitable for beginners and makers.', 79900, '["https://via.placeholder.com/800x600?text=Arduino+UNO+R3"]','Boards', 50, now(), now()),
  (gen_random_uuid(),'ESP32-WROOM','ESP32 WROOM DevKit','Dual‑core MCU with Wi‑Fi & Bluetooth — perfect for IoT.', 54900, '["https://via.placeholder.com/800x600?text=ESP32+WROOM"]','Boards', 40, now(), now()),
  (gen_random_uuid(),'DHT11-SENSOR','DHT11 Temperature & Humidity Sensor','Simple digital temp/humidity sensor for DIY.', 12900, '["https://via.placeholder.com/800x600?text=DHT11"]','Sensors', 200, now(), now());
