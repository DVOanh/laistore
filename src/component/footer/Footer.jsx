import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Cột 1 */}
        <div className="footer-col">
          <h3>Mobile Store</h3>
          <p>
            Chuyên bán điện thoại chính hãng, giá tốt.
            Giao hàng toàn quốc - Bảo hành uy tín.
          </p>
        </div>

        {/* Cột 2 */}
        <div className="footer-col">
          <h4>Hỗ trợ khách hàng</h4>
          <ul>
            <li>Hướng dẫn mua hàng</li>
            <li>Thanh toán</li>
            <li>Trả góp</li>
            <li>Tra cứu đơn hàng</li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div className="footer-col">
          <h4>Chính sách</h4>
          <ul>
            <li>Bảo hành</li>
            <li>Đổi trả</li>
            <li>Bảo mật thông tin</li>
            <li>Điều khoản dịch vụ</li>
          </ul>
        </div>

        {/* Cột 4 */}
        <div className="footer-col">
          <h4>Liên hệ</h4>
          <p>📍 TP.HCM, Việt Nam</p>
          <p>📞 0123 456 789</p>
          <p>✉️ support@mobilestore.vn</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Mobile Store. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
