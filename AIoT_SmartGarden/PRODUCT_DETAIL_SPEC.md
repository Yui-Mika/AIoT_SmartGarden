📑 ECO-TECH: Product Detail "Deep Scan" Specification
1. Core Vision: "The Technical Dossier"
Trang chi tiết sản phẩm không phải là một trang bán hàng thông thường. Nó là một Bản báo cáo phân tích kỹ thuật (Technical Dossier). Người dùng đóng vai trò là kỹ sư đang khám phá cấu trúc bên trong của một Module AIoT.

2. Layout Structure (Split View)
Container: max-width: 1440px, display: flex, lơ lửng trên nền <GalaxyBackground />.

Left Column (The Hologram Core): - Chiếm 55% chiều rộng.

Chứa ảnh sản phẩm/Model 3D ở tâm điểm.

Các đường kẻ HUD (Callouts) chỉ vào linh kiện: [ MCU: ESP32-S3 ], [ SENSOR: SHT4x ].

Right Column (The Data Matrix):

Chiếm 45% chiều rộng.

Chứa Title, Price, và bảng thông số kỹ thuật (Spec Grid).

Phần mô tả được trình bày dưới dạng System Logs.

3. Animation Script (GSAP Timeline)
Phase 1: Deep Scan Reveal (Entry)
Trigger: Ngay khi Page Mount.

Action:

Một đường quét ngang (Scanning Line) màu Cyan rực rỡ chạy từ top: 0 xuống bottom: 100%.

Hiệu ứng Reveal: Khi đường quét đi qua, các phần tử UI (Title, Price, Buttons) xuất hiện bằng opacity: 0 -> 1 và filter: blur(10px) -> blur(0px).

Phase 2: Materialization (Product Center)
Action:

Ảnh sản phẩm hiện lên bằng kịch bản Wireframe-to-Glass.

Đầu tiên hiện khung dây (Wireframe) mờ ảo -> Sau đó "đổ bóng" và "đắp kính" để hiện ảnh thực tế.

Các đường chỉ dẫn (Callout Lines) vẽ ra bằng drawSVG hoặc scaleX: 0 -> 1.

Phase 3: Data Pop-in (Information Load)
Action:

Các con số thông số (VD: 99.9% Accuracy, 24ms Latency) chạy từ 0 đến giá trị thật.

Phần mô tả "System Logs" xuất hiện bằng hiệu ứng Typewriter (đánh máy kỹ thuật).

Phase 4: Interaction (Hover HUD)
Callout Pins: Khi hover vào các điểm trên sản phẩm, hiện bảng mô tả kính nhỏ nhô lên (translateZ).

Button Glow: Nút "Thêm vào giỏ hàng" có hiệu ứng mạch đập (Pulse) và Glitch nhẹ khi hover.

4. Technical Guidelines
Theme: Glassmorphism (backdrop-filter: blur(25px)), border Cyan opacity: 0.1.

Typography: Header dùng letter-spacing: 0.2em, Metadata dùng font Monospace (Space Mono).

Performance: Đảm bảo force3D: true cho các chuyển động scale lớn để giữ mức 60 FPS.

Background: Tuyệt đối không có nền đen đặc; Galaxy Plexus phải xuyên thấu 100%.