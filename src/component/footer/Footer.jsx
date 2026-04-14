import './footer.css';

function Footer() {
  return (
    <footer className="footer">

  {/* ================= TẦNG 1: GRID CHÍNH ================= */}
  <div className="footer-container">

    <div className='footer-item'>
      <div className="footer-col">
        <h3>Mobile Store</h3>
        <p>Chuyên bán điện thoại chính hãng, giá tốt.</p>
        <p>📞 0123 456 789</p>
        <p>✉️ support@mobilestore.vn</p>
      </div>
  
      <div className="footer-col">
        <h4>HỖ TRỢ KHÁCH HÀNG</h4>
        <ul>
          <li>Trung tâm trợ giúp</li>
          <li>Hướng dẫn mua hàng</li>
          <li>Thanh toán</li>
          <li>Trả góp</li>
          <li>Tra cứu đơn hàng</li>
          <li>Vận chuyển</li>
        </ul>
      </div>
  
      <div className="footer-col">
        <h4>CHÍNH SÁCH</h4>
        <ul>
          <li>Bảo hành</li>
          <li>Đổi trả</li>
          <li>Bảo mật</li>
          <li>Điều khoản</li>
          <li>Chính sách vận chuyển</li>
        </ul>
      </div>
  
      <div className="footer-col">
        <h4>DANH MỤC</h4>
        <ul>
          <li>Điện thoại</li>
          <li>Laptop</li>
          <li>Tablet</li>
          <li>Phụ kiện</li>
          <li>Đồng hồ</li>
        </ul>
      </div>
  
      <div className="footer-col">
        <h4>THEO DÕI</h4>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Youtube</li>
          <li>TikTok</li>
        </ul>
      </div>
  
      <div className="footer-col">
        <h4>THANH TOÁN</h4>
        <ul>
          <li>Visa</li>
          <li>MasterCard</li>
          <li>Momo</li>
          <li>ZaloPay</li>
          <li>COD</li>
        </ul>
      </div>
    </div>

  </div>

  {/* ================= TẦNG 2: DANH MỤC DÀI ================= */}
  <div className="footer-mega">

    <div className="footer-mega-col">
      <h4>ĐIỆN THOẠI NỔI BẬT</h4>
      <p>iPhone 15 | iPhone 14 | Samsung S24 | Xiaomi 13 | Oppo Reno | Vivo V29</p>
    </div>

    <div className="footer-mega-col">
      <h4>LAPTOP</h4>
      <p>Macbook | Asus | Dell | HP | Lenovo | Acer Gaming</p>
    </div>

    <div className="footer-mega-col">
      <h4>PHỤ KIỆN</h4>
      <p>Tai nghe | Sạc | Cáp | Pin dự phòng | Ốp lưng | Chuột</p>
    </div>

    <div className="footer-mega-col">
      <h4>DỊCH VỤ</h4>
      <p>Sửa chữa | Bảo hành | Thu cũ đổi mới | Trả góp 0%</p>
    </div>

  </div>

  {/* ================= TẦNG 3: INFO + LEGAL ================= */}
  <div className="footer-extra">
    <p>
      Địa chỉ: 123 ABC, Hà Nội | MST: 0123456789 |
      Hotline: 0123 456 789
    </p>

    <p>
      Chính sách: Bảo mật | Điều khoản | Quy định sử dụng | Chính sách vận chuyển
    </p>

    <p>
      Quốc gia & khu vực: Việt Nam | Singapore | Thái Lan | Indonesia | Malaysia
    </p>
  </div>

  {/* ================= TẦNG 4: COPYRIGHT ================= */}
  <div className="footer-bottom">
    © 2026 Mobile Store - All rights reserved
  </div>

</footer>
  );
}

export default Footer;
