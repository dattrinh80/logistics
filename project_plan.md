# 📦 Logistics Management – Kế hoạch triển khai

Dự án xây dựng hệ thống quản lý giao vận theo kiến trúc **Modular Monolith + Hexagonal (NestJS + TypeORM + Postgres)**.  
Các bước triển khai được chia nhỏ thành nhiều **Sprint** để đảm bảo phát triển tuần tự, có thể test và mở rộng dần.

---

## ✅ Checklist triển khai theo từng Sprint

### 🚀 Sprint 1: Skeleton & Carrier Toggle
- Khởi tạo repo monolith (NestJS).
- Thiết lập module cơ bản: `carrier`, `customer`.
- Thực hiện CRUD Carrier + **active/inactive**.
- Cấu hình ban đầu:
  - `docker-compose` cho Postgres + Adminer.
  - OpenTelemetry (tracing cơ bản).
  - Health checks (`/health`).
  - Config by env (`.env`).

### 💰 Sprint 2: Pricing v1
- Tạo module `pricing` với các chiến lược:
  - **MARKUP**, **MARGIN**, **FLAT**.
- Cơ chế precedence: `customer > carrier > default`.
- Unit tests cho PricingEngine.

### 📊 Sprint 3: Quoting
- Tạo module `quoting`:
  - Tích hợp `CarrierQuotePort`.
  - Adapter giả lập (mock carrier) + cache kết quả quote.
- API `POST /quotes` → nhận base price, apply pricing.

### 📦 Sprint 4: Shipment
- Xây dựng module `shipment`:
  - Entity Shipment + Status enum.
  - Booking + Cancel thông qua ports.
- Adapter DHL (sandbox nếu có) + mapping request/response.
- API:
  - `POST /shipments` → tạo vận đơn.
  - `DELETE /shipments/{id}` → huỷ vận đơn.
- Tích hợp Outbox + Event Stream nội bộ.

### 🔄 Sprint 5: Tracking
- Tạo webhook inbound `/webhooks/carriers/*` nhận tracking event.
- Map event → cập nhật trạng thái shipment + publish domain event.
- Notification cho khách hàng:
  - Email.
  - Webhook.
  - (option) SMS/Push.

### 🌍 Sprint 6: StarTrack & Pricing nâng cao
- Thêm `StarTrackAdapter` cho carrier mới.
- Pricing tiers nâng cao:
  - Theo trọng lượng.
  - Theo khu vực.
- Viết thêm test coverage cho PricingEngine.

---

## 🛠️ Tech Stack
- **Backend**: NestJS (TypeScript).
- **DB**: Postgres (TypeORM).
- **Message Broker**: RabbitMQ/Kafka (cho event async).
- **Observability**: OpenTelemetry.
- **Testing**: Jest.

---

## 📅 Lưu ý triển khai
- Mỗi Sprint kéo dài 1–2 tuần.
- Đảm bảo có Unit test/Integration test trước khi merge.
- Sprint 1–3: core MVP.
- Sprint 4–6: mở rộng tích hợp carrier, tracking, pricing nâng cao.
