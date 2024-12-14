<template>
  <footer class="home-footer">
    <div class="footer-description">
      <div class="footer-logo">
        <img src="/img/logo-light.png" alt="Logo" width="152px" height="40px" />
      </div>
      <div class="footer-paragraph">
        Sebuah learning management system yang ditujukan untuk membantu
        mahasiswa/i kedokteran dalam pembelajaran medical science.
      </div>
      <div class="footer-copyright">© 2024 | MEDIS. All rights reserved</div>
    </div>
    <div class="footer-contact-us">
      <h4 class="footer-contact-us-title">Contact Us</h4>
      <div class="footer-contact-us-wrapper">
        <div class="footer-contact-us-icon">
          <img class="email-img" src="/img/email-icon-light.png" alt="" width="40px" height="40px"/>
        </div>
        <div class="footer-contact-us-text">office@fk.ui.ac.idm</div>
      </div>
      <div class="footer-contact-us-wrapper">
        <div class="footer-contact-us-icon">
          <img class="phone-img" src="/img/phone-icon-light.png" alt="" width="40px" height="40px"/>
        </div>
        <div class="footer-contact-us-text">(021) 31930373, 31930371, 3912477</div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "MainFooter",
};
</script>

<style scoped>
.home-footer {
  display: flex;
  flex-direction: row;
  height: 280px;
  background-color: #1d3557;
}

.footer-description,
.footer-contact-us {
  width: 50%;
  display: flex;
  flex-direction: column;
  color: white;
  align-items: flex-start;
  padding-left: 121px;
}

.footer-logo {
  padding-top: 35px;
}

.footer-paragraph {
  padding-top: 40px;
  width: 347px;
}

.footer-copyright {
  padding-top: 24px;
}

.footer-contact-us-title {
  padding-top: 10px;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
}

.footer-contact-us-wrapper {
  padding-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}
</style>
