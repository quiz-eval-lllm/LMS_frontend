<template>
  <div id="app">
    <div class="wrapper">
      <div class="container main">
        <div class="side-img-login">
          <form @submit.prevent="login">
            <div class="row">
              <div
                style="margin-bottom:10px; font-weight:bold; color:#555; border:1px solid #ccc; padding:10px; border-radius:15px 15px 0 0; background-color:#f9f9f9; text-align:center;"
              >
                IAM for Integrated Learning Evaluation System
              </div>
              <div class="col-md-6 left">
                <div class="input-box">
                  <header>Login</header>
                  <div class="input-field">
                    <label for="email">Username</label>
                    <input
                      v-model="formData.email"
                      type="text"
                      class="input"
                      id="email"
                      placeholder="Username"
                      required
                      autocomplete="off"
                    />
                  </div>
                  <div class="input-field password">
                    <label for="password">Password</label>
                    <div class="toggle-password">
                      <input
                        v-model="password"
                        type="password"
                        class="input"
                        id="password"
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
                  <!-- <div class="input-group">
                    <div class="form-check">
                      <input
                        v-model="rememberMe"
                        type="checkbox"
                        class="form-check-input"
                        id="formCheck"
                      />
                      <label for="formCheck" class="form-check-label"
                        ><small>Remember Me</small></label
                      >
                    </div>
                    <div class="forgot">
                      <small
                        ><a href="/forgot-password">Forgot Password?</a></small
                      >
                    </div>
                  </div> -->
                  <div v-show="badRequest" class="bad-request" :class="{ 'show': badRequest }">
                    Email atau Password yang anda masukkan salah!
                  </div>
                  <div class="input-field">
                    <button type="submit" class="btn-primary">Login</button>
                  </div>
                  <!-- <span class="or-text">OR</span> -->
                  <!-- <div class="input-field">
                    <a href="/" class="btn-secondary">Log In as Guest</a>
                  </div> -->
                 
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
export default {
  components: {},
  created() {
    this.checkLoginStatus();
  },
  methods: {
    async checkLoginStatus() {
      const token = localStorage.getItem("token");
      if (token) {
        this.$router.push("/");
        return;
      }
    },
    async login() {
      try {
        const key = "9d12b871f4a8533e5d3a6d9e95d71b20";
        this.formData.password = CryptoJS.AES.encrypt(
          this.password,
          key
        ).toString();
        const response = await this.$axios.post("/api/v1/login", this.formData);
        console.log("Login successful!");
        const {token, access_token} = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("access_token", access_token);
        // Redirect to home page
        this.$router.push("/");
      } catch (error) {
        console.error("Error during login:", error);
        // Handle specific error messages
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message); // Show server error message
        }
        this.badRequest = true;
      }
    },
    togglePasswordVisibility() {
      // Implement logic to toggle password visibility
      console.log("Toggle password visibility");
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
  },
  data() {
    return {
      badRequest: false,
      formData: {
        email: "",
        password: "",
      },
      password:"",
    };
  },
};
</script>

<style scoped>
/* Add your custom styles here */
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
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.row {
  width: 900px;
  height: 500px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 20px 20px 40px 2px rgba(0, 0, 0, 0.25);
}
.left {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.side-image {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 0 20px 20px 0;
  object-fit: fill;
  width: 450px;
  height: 600px;
  filter: brightness(0.4);
}
.input-box {
  width: 85%;
  box-sizing: border-box;
}
.input-box header {
  font-weight: 700;
  font-size: 48px;
  line-height: 52px;
  margin-bottom: 32px;
  margin-top: 32px;
  margin-left: 10px;
}
.input-field {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 10px 0 10px;
}
.input {
  height: 45px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #6d6875;
  margin-bottom: 16px;
  color: #000;
}
.input-box .input-field label {
  position: relative;
  font-weight: 600;
  margin-bottom: 8px;
  left: 3px;
  pointer-events: none;
}
.input-box .input-field label::after {
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
.input-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
  padding: 0 10px 0 10px;
}
.input-field.password .toggle-password {
  position: relative;
}

.input-field.password .ikon-password {
  position: absolute;
  top: 35%;
  right: 10px; /* Adjust this value to position the icon */
  transform: translateY(-50%);
  width: 20px; /* Adjust this value to change the size of the icon */
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
.form-check-label {
  font-size: 16px;
  color: #000;
}
.btn-primary {
  height: 45px;
  width: 100%;
  background: #f67280;
  border: 1px solid #f67280;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  margin-bottom: 12px;
  cursor: pointer;
}
.btn-primary:hover {
  background: #e75458;
  color: #fff;
  font-weight: 600;
}
.btn-secondary {
  height: 45px;
  width: 50%;
  background: #fff;
  border: 1px solid #f67280;
  border-radius: 10px;
  color: #f67280;
  font-weight: 600;
  margin-left: 25%;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
}
.btn-secondary:hover {
  background: #fff;
  color: #e75458;
  border: 1px solid #e75458;
  font-weight: 600;
}
.or-text {
  display: grid;
  margin-bottom: 12px;
  text-align: center;
  font-size: 16px;
  color: #000;
}
.signup {
  text-align: center;
  font-size: 16px;
  margin-bottom: 32px;
}
small a {
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  color: #f67280;
}
small a:hover {
  text-decoration: underline;
  color: #f67280;
}
span a {
  text-decoration: none;
  font-weight: 600;
  color: #f67280;
}
span a:hover {
  text-decoration: underline;
  color: #f67280;
}

@keyframes shake {
  0% { transform: translateX(0); }
  10%, 90% { transform: translateX(-5px); }
  20%, 80% { transform: translateX(5px); }
  30%, 50%, 70% { transform: translateX(-5px); }
  40%, 60% { transform: translateX(5px); }
  100% { transform: translateX(0); }
}

.bad-request {
  color: red; 
  font-size: 14px;
  padding: 10px;
}

.bad-request.show {
  animation: shake 0.5s ease-in-out;
}

@media only screen and (max-width: 768px) {
  .row {
    max-width: 420px;
  }
  .side-image {
    display: none;
  }
}


</style>
