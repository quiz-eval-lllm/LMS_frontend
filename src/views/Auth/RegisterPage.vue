<template>
  <div class="wrapper">
    <div class="card-create-webinar">
      <form @submit.prevent="submitForm">
        <div class="section-title">
          <div class="form-title">
            <header>Daftar</header>
          </div>
        </div>
        <div class="section-signin">
          <div class="signin">
            <span
              >Sudah punya akun?
              <router-link to="/login">Login</router-link></span
            >
          </div>
        </div>
        <div class="section-input-field">
          <div class="input-container">
            <div class="input-field required">
              <label for="nama">Nama Lengkap (Gelar Opsional)</label>
              <input
                type="text"
                class="input"
                id="nama"
                v-model="formData.nama"
                placeholder="Nama Lengkap"
                required
              />
            </div>
            <div class="input-field date required">
              <label for="date">Tanggal Lahir</label>
              <input
                type="date"
                class="input"
                v-model="formData.tanggalLahir"
                id="date"
                required
              />
            </div>
          </div>
          <div class="input-container">
            <div class="input-field required">
              <label for="email">Email</label>
              <input
                type="email"
                class="input"
                id="email"
                v-model="formData.email"
                placeholder="Email"
                required
              />
            </div>
            <div class="input-field">
              <label for="noTelepon">Nomor Telepon/Whatsapp</label>
              <input
                type="tel"
                class="input"
                id="noTelepon"
                v-model="formData.nomorTelefon"
                placeholder="Nomor Telepon/Whatsapp"
              />
            </div>
          </div>
          <div class="input-container">
            <div class="input-field password required">
              <label for="password">Password</label>
              <div class="toggle-password">
                <input
                  type="password"
                  class="input"
                  id="password"
                  v-model="password"
                  placeholder="Password"
                  required
                  autocomplete="off"
                />
                <div
                  class="ikon-password hide-password show"
                  @click="togglePasswordVisibility()"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
                      fill="#F67280"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.35173 5.59572C7.92325 4.30899 9.85905 3.25 12 3.25C14.141 3.25 16.0768 4.30899 17.6483 5.59572C19.2284 6.88946 20.5204 8.47865 21.3886 9.68801L21.4602 9.78759C21.9829 10.5138 22.4131 11.1117 22.4131 12C22.4131 12.8883 21.9829 13.4862 21.4602 14.2124L21.3886 14.312C20.5204 15.5214 19.2284 17.1105 17.6483 18.4043C16.0768 19.691 14.141 20.75 12 20.75C9.85905 20.75 7.92325 19.691 6.35173 18.4043C4.77164 17.1105 3.47962 15.5214 2.61142 14.312L2.53981 14.2124C2.01715 13.4862 1.58691 12.8883 1.58691 12C1.58691 11.1117 2.01715 10.5138 2.53981 9.78759L2.61142 9.68801C3.47962 8.47865 4.77164 6.88946 6.35173 5.59572ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z"
                      fill="#F67280"
                    />
                  </svg>
                </div>
                <div
                  class="ikon-password show-password hide"
                  @click="togglePasswordVisibility()"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.4685 4.58568C22.792 4.32692 22.8444 3.85495 22.5857 3.53151C22.3269 3.20806 21.855 3.15562 21.5315 3.41438L18.2062 6.07464C18.0246 5.91151 17.8385 5.75148 17.6483 5.59574C16.0768 4.30902 14.141 3.25003 12 3.25003C9.85908 3.25003 7.92328 4.30902 6.35176 5.59574C4.77166 6.88949 3.47965 8.47868 2.61144 9.68804L2.53984 9.78762C2.01718 10.5139 1.58694 11.1117 1.58694 12C1.58694 12.8884 2.01718 13.4862 2.53984 14.2124L2.61144 14.312C3.1561 15.0707 3.86754 15.9788 4.71227 16.8698L1.53151 19.4144C1.20806 19.6731 1.15562 20.1451 1.41438 20.4685C1.67313 20.792 2.1451 20.8444 2.46855 20.5857L22.4685 4.58568ZM8.66178 13.7102L9.87453 12.74C9.79386 12.5082 9.75003 12.2592 9.75003 12C9.75003 10.7574 10.7574 9.75003 12 9.75003C12.4362 9.75003 12.8434 9.87415 13.1882 10.089L14.4007 9.11904C13.7503 8.57647 12.9133 8.25003 12 8.25003C9.92896 8.25003 8.25003 9.92896 8.25003 12C8.25003 12.6161 8.39857 13.1974 8.66178 13.7102Z"
                      fill="#F67280"
                    />
                    <path
                      d="M20.6952 8.76484L15.6673 12.7872C15.3056 14.4803 13.8011 15.75 12 15.75L11.9639 15.7499L7.54805 19.2825C8.86737 20.1396 10.3746 20.75 12 20.75C14.141 20.75 16.0768 19.691 17.6483 18.4043C19.2284 17.1106 20.5204 15.5214 21.3886 14.312L21.4602 14.2124C21.9829 13.4862 22.4131 12.8884 22.4131 12C22.4131 11.1117 21.9829 10.5139 21.4602 9.78762L21.3886 9.68804C21.1811 9.39894 20.9493 9.08813 20.6952 8.76484Z"
                      fill="#F67280"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="input-field">
              <label for="institusi">Institusi</label>
              <input
                type="text"
                class="input"
                id="institusi"
                v-model="formData.institusi"
                placeholder="Institusi"
              />
            </div>
          </div>
          <div class="input-container">
            <div class="input-field password required">
              <label for="confirm-password">Konfirmasi Password</label>
              <div class="toggle-password" id="confirm-password-div">
                <input
                  type="password"
                  class="input"
                  id="confirm-password"
                  v-model="konfirmasiPassword"
                  placeholder="Konfirmasi Password"
                  required
                  autocomplete="off"
                />
                <div
                  class="ikon-password hide-confirm-password show"
                  @click="toggleConfirmPasswordVisibility()"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
                      fill="#F67280"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.35173 5.59572C7.92325 4.30899 9.85905 3.25 12 3.25C14.141 3.25 16.0768 4.30899 17.6483 5.59572C19.2284 6.88946 20.5204 8.47865 21.3886 9.68801L21.4602 9.78759C21.9829 10.5138 22.4131 11.1117 22.4131 12C22.4131 12.8883 21.9829 13.4862 21.4602 14.2124L21.3886 14.312C20.5204 15.5214 19.2284 17.1105 17.6483 18.4043C16.0768 19.691 14.141 20.75 12 20.75C9.85905 20.75 7.92325 19.691 6.35173 18.4043C4.77164 17.1105 3.47962 15.5214 2.61142 14.312L2.53981 14.2124C2.01715 13.4862 1.58691 12.8883 1.58691 12C1.58691 11.1117 2.01715 10.5138 2.53981 9.78759L2.61142 9.68801C3.47962 8.47865 4.77164 6.88946 6.35173 5.59572ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z"
                      fill="#F67280"
                    />
                  </svg>
                </div>
                <div
                  class="ikon-password show-confirm-password hide"
                  @click="toggleConfirmPasswordVisibility()"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.4685 4.58568C22.792 4.32692 22.8444 3.85495 22.5857 3.53151C22.3269 3.20806 21.855 3.15562 21.5315 3.41438L18.2062 6.07464C18.0246 5.91151 17.8385 5.75148 17.6483 5.59574C16.0768 4.30902 14.141 3.25003 12 3.25003C9.85908 3.25003 7.92328 4.30902 6.35176 5.59574C4.77166 6.88949 3.47965 8.47868 2.61144 9.68804L2.53984 9.78762C2.01718 10.5139 1.58694 11.1117 1.58694 12C1.58694 12.8884 2.01718 13.4862 2.53984 14.2124L2.61144 14.312C3.1561 15.0707 3.86754 15.9788 4.71227 16.8698L1.53151 19.4144C1.20806 19.6731 1.15562 20.1451 1.41438 20.4685C1.67313 20.792 2.1451 20.8444 2.46855 20.5857L22.4685 4.58568ZM8.66178 13.7102L9.87453 12.74C9.79386 12.5082 9.75003 12.2592 9.75003 12C9.75003 10.7574 10.7574 9.75003 12 9.75003C12.4362 9.75003 12.8434 9.87415 13.1882 10.089L14.4007 9.11904C13.7503 8.57647 12.9133 8.25003 12 8.25003C9.92896 8.25003 8.25003 9.92896 8.25003 12C8.25003 12.6161 8.39857 13.1974 8.66178 13.7102Z"
                      fill="#F67280"
                    />
                    <path
                      d="M20.6952 8.76484L15.6673 12.7872C15.3056 14.4803 13.8011 15.75 12 15.75L11.9639 15.7499L7.54805 19.2825C8.86737 20.1396 10.3746 20.75 12 20.75C14.141 20.75 16.0768 19.691 17.6483 18.4043C19.2284 17.1106 20.5204 15.5214 21.3886 14.312L21.4602 14.2124C21.9829 13.4862 22.4131 12.8884 22.4131 12C22.4131 11.1117 21.9829 10.5139 21.4602 9.78762L21.3886 9.68804C21.1811 9.39894 20.9493 9.08813 20.6952 8.76484Z"
                      fill="#F67280"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="input-field required">
              <label for="pekerjaan">Pekerjaan</label>
              <select
                id="pekerjaan"
                class="dropdown"
                v-model="formData.pekerjaan"
                required
              >
                <option value="" disabled selected>Pekerjaan</option>
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Dokter Umum">Dokter Umum</option>
                <option value="PPDS">PPDS</option>
                <option value="Dokter Spesialis">Dokter Spesialis</option>
                <option value="Dokter Konsultan">Dokter Konsultan</option>
                <option value="Perawat">Perawat</option>
                <option value="Bidan">Bidan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>
        </div>
        <div class="section-confirm">
          <!-- <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="formCheck"
            required
          />
          <label for="formCheck" class="form-check-label">
            <small
              >I agree to the
              <router-link to="/terms-and-conditions"
                >Terms & Conditions</router-link
              >
              of the platform MEDIS.</small
            >
          </label>
        </div> -->
          <div class="signup-button">
            <div
              v-show="badRequest"
              class="bad-request"
              :class="{ show: badRequest }"
            >
              Email sudah pernah didaftarkan!
            </div>
            <div
              v-show="passwordNotMatch"
              class="bad-request"
              :class="{ show: passwordNotMatch }"
            >
              Konfirmasi password tidak sesuai!
            </div>
            <button type="submit" id="button-signup" class="btn-primary">
              Daftar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      formData: {
        nama: "",
        tanggalLahir: "",
        email: "",
        nomorTelefon: "",
        password: "",
        institusi: "",
        konfirmasiPassword: "",
        pekerjaan: "",
        photoUrl:
          "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg",
        role: "DOKTER",
      },
      password: "",
      konfirmasiPassword: "",
      badRequest: false,
      passwordNotMatch: false,
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    async checkLoginStatus() {
      // Check if token exists in localStorage
      const token = localStorage.getItem("token");
      if (token) {
        // Redirect to login page if token doesn't exist
        this.$router.push("/");
        return;
      }
      // Fetch course data or perform other actions if user is logged in
      // await this.fetchCourseData();
    },
    async submitForm() {
      this.badRequest = false;
      this.passwordNotMatch = false;
      if(this.password !== this.konfirmasiPassword){
        this.passwordNotMatch = true;
        return
      }
      
      try {
        // Register the user
        const formData = new FormData();
        formData.append("user_name", this.formData.email);
        formData.append("newpassword", this.password);
        formData.append("newpassword_repeat", this.konfirmasiPassword);
        formData.append("user_email", this.formData.email);
        formData.append("user_firstname", this.formData.nama);
        formData.append("user_lastname", this.formData.nama);
        formData.append("user_birthdate", this.formData.tanggalLahir);
        formData.append("user_birthplace", "Jakarta");

        // Submit to the new URL
        await this.$axios.post(
          "http://34.19.51.107/tcexam/public/code/api_user_registration.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );  
        const key = "9d12b871f4a8533e5d3a6d9e95d71b20";
        this.formData.password = CryptoJS.AES.encrypt(
          this.password,
          key
        ).toString();
        const registerResponse = await this.$axios.post(
          "/api/v1/register",
          this.formData
        );

        // If registration is successful, proceed with login
        if (registerResponse.status === 200) {
          const loginResponse = await this.$axios.post(
            "/api/v1/login",
            this.formData
          );

          // If login is successful, retrieve token and redirect
          if (loginResponse.status === 200) {
            const token = loginResponse.data.data.token;
            localStorage.setItem("token", token);
            // Redirect to home page
            this.$router.push("/");
          } else {
            // Handle login error
            console.error("Login failed");
          }
        } else {
          // Handle registration error
          console.error("Registration failed");
        }
      } catch (error) {
        this.badRequest = true;
      }
    },
    togglePasswordVisibility() {
      var passwordInput = document.getElementById("password");
      var hideIcon = document.querySelector(".ikon-password.hide-password");
      var showIcon = document.querySelector(".ikon-password.show-password");

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        hideIcon.classList.replace("show", "hide");
        showIcon.classList.replace("hide", "show");
      } else {
        passwordInput.type = "password";
        hideIcon.classList.replace("hide", "show");
        showIcon.classList.replace("show", "hide");
      }
    },
    toggleConfirmPasswordVisibility() {
      // Toggle confirm password visibility logic
      var passwordInput = document.getElementById("confirm-password");
      var hideIcon = document.querySelector(
        ".ikon-password.hide-confirm-password"
      );
      var showIcon = document.querySelector(
        ".ikon-password.show-confirm-password"
      );

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        hideIcon.classList.replace("show", "hide");
        showIcon.classList.replace("hide", "show");
      } else {
        passwordInput.type = "password";
        hideIcon.classList.replace("hide", "show");
        showIcon.classList.replace("show", "hide");
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");

* {
  font-family: "Roboto", sans-serif;
}
.wrapper {
  position: fixed; /* Ensure the element covers the entire viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(../../../public/img/BG.png);
  background-size: cover;
  background-position: center;
}
.card-create-webinar {
  background: #ffffff;
  border: none;
  box-shadow: -8px 40px 40px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  position: absolute;
  width: 900px;
  height: 670px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 25px;
}
.section-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.form-title header {
  font-style: normal;
  font-weight: 600;
  font-size: 49px;
  line-height: 56px;
  margin-bottom: 20px;
  margin-top: 42px;
  margin-left: 50px;
}
.section-signin {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 24px;
}
span {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-left: 50px;
}
span a {
  text-decoration: none;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  margin-left: 24px;
  color: #f67280;
}
span a:hover {
  text-decoration: underline;
  color: #f67280;
}
.input-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  row-gap: 88px;
}
.input-field {
  display: flex;
  flex-direction: column;
  position: relative;
}
.input {
  height: 45px;
  width: 360px;
  border-radius: 10px;
  border: 1px solid #6d6875;
  margin-bottom: 24px;
  color: #000;
}
.input-container .input-field label {
  position: relative;
  font-weight: 600;
  margin-bottom: 8px;
  left: 3px;
  pointer-events: none;
}
.input-container .input-field.required label::after {
  content: "*";
  color: red;
  margin-left: 2px;
}
.input-field .input:focus,
.input-field .input:valid {
  font-size: 16px;
  color: #000;
  text-indent: 12px;
}
.input-field .input::placeholder {
  font-size: 16px;
  color: #6d6875;
  text-indent: 12px;
}
.input-field.date input[type="date"]::-webkit-calendar-picker-indicator {
  padding-right: 12px;
  filter: invert(52%) sepia(47%) saturate(1238%) hue-rotate(315deg)
    brightness(111%) contrast(93%);
}
.input-field.date input[type="date"] {
  color: #6d6875;
  text-indent: 6px;
}
.input-field.date input[type="date"].input:focus,
.input-field.date input[type="date"].input:valid {
  color: #000;
  text-indent: 6px;
}
.input-field.password .toggle-password {
  position: relative;
}

.input-field.password .input {
  padding-right: 40px;
  width: 320px;
}

.input-field.password .ikon-password {
  position: absolute;
  top: 30%;
  right: 10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  margin-right: 10px;
}

.show {
  display: block;
}
.hide {
  display: none;
}

.dropdown {
  height: 45px;
  width: 360px;
  border-radius: 10px;
  border: 1px solid #6d6875;
  margin-bottom: 24px;
  color: #000;
  text-indent: 12px;
}
.section-confirm {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  row-gap: 80px;
}
.form-check {
  font-size: 16px;
  font-weight: 500;
  color: #000;
  width: 40%;
}
.form-check label::after {
  content: "*";
  color: red;
  margin-left: 2px;
}
small {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
small a {
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  color: #f67280;
}
small a:hover {
  text-decoration: underline;
  color: #f67280;
}
.btn-primary {
  height: 45px;
  width: 360px;
  background: #f67280;
  border: 1px solid #f67280;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
.btn-primary:hover {
  background: #e75458;
  color: #fff;
  font-weight: 600;
}

.bad-request {
  color: red; 
  font-size: 14px;
  padding: 10px;
  text-align: center;
}

.bad-request.show {
  animation: shake 0.5s ease-in-out;
}

@media only screen and (max-width: 768px) {
  .card-create-webinar {
    max-width: 420px;
    top: 20px;
    width: auto;
    height: auto;
  }
  .form-title header {
    margin-left: 30px;
  }
  span {
    margin-left: 30px;
  }
  .section-input-field {
    height: 100%;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 3px;
  }
  .input {
    margin-bottom: 0;
  }
  .section-confirm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 20px;
  }
  .form-check {
    width: 88%;
  }
  .signup-button {
    margin-bottom: 24px;
  }
}
</style>
