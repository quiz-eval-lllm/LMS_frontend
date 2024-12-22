<template>
  <div class="navbar-wrapper">
    <div class="navbar">
      <div class="navbar-content">
        <div class="left">
          <router-link to="/"
            ><img src="/img/logo-light.png" alt="MEDIS-LMS Logo" class="logo"
          /></router-link>
        </div>
        <div class="right">
          <!-- <router-link v-if="isLoggedIn" to="/my-course" class="my-course">
            <span class="my-course">My Course</span>
          </router-link>
          <router-link v-if="isAdmin" to="/manage-course" class="my-course">
            <span class="my-course">Manage Course</span>
          </router-link>
          <div v-if="isLoggedIn" class="btn" @click="logout()">
            <span class="link-text">Logout</span>
          </div> -->
          <div class="dropdown" v-if="isLoggedIn">
            <button class="dropbtn">Menu</button>
            <div class="dropdown-content">
              <router-link v-if="isLoggedIn && !isAdmin" to="/profile"
                >Profil</router-link
              >
              <router-link v-if="isLoggedIn && !isAdmin" to="/my-course"
                >My Course</router-link
              >
              <router-link v-if="isAdmin" to="/manage-course"
                >Pengelolaan Course</router-link
              >
              <router-link v-if="isLoggedIn" to="/" @click="logout()">
                <!-- <span class="link-text">Logout</span> -->
                Logout
              </router-link>
              <!-- <div v-if="isLoggedIn" @click="logout()">Logout</div> -->
            </div>
          </div>
          <router-link v-if="!isLoggedIn" to="/login" class="btn">
            <span class="link-text">Login</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainNavbar",
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
    };
  },
  created() {
    // Check login status when the component is created
    this.checkLoginStatus();
    this.checkIsAdmin();
  },
  watch: {
    // Watch for changes to the route
    $route() {
      // Check login status whenever the route changes
      this.checkLoginStatus();
      this.checkIsAdmin();
    },
  },
  methods: {
    checkLoginStatus() {
      // Check if token exists in local storage
      const token = localStorage.getItem("token");
      if (token) {
        // Verify if token is expired (you need to implement this logic)
        const isTokenValid = this.verifyToken(token);
        // Update isLoggedIn based on token validity
        this.isLoggedIn = isTokenValid;
      }
    },
    checkIsAdmin() {
      const token = localStorage.getItem("token");
      if (token) {
        const tokenParts = token.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));
        const role = payload.sub.split("|")[1];
        this.isAdmin = role === "ADMIN";
      }
    },
    verifyToken(token) {
      if (!token) {
        // If no token provided, consider it as expired
        localStorage.removeItem("token");
        return false;
      }

      const tokenData = JSON.parse(atob(token.split(".")[1])); // Decode token payload
      const expirationTimestamp = tokenData.exp * 1000; // Expiration time in milliseconds

      // Check if current time is past the expiration time
      const isTokenValid = Date.now() < expirationTimestamp;

      if (!isTokenValid) {
        // If token is expired, remove it from local storage
        localStorage.removeItem("token");
      }

      return isTokenValid;
    },
    logout() {
      // Remove token from local storage
      localStorage.clear();
      // Reload the page
      window.location.reload();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-wrapper {
  position: fixed;
  width: 100%;
  z-index: 1000; /* Ensure navbar stays on top */
}
.navbar {
  background-color: #1d3557; /* Set the background color to white */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a bit of shadow effect */
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px; /* Add padding to the navbar content */
}

.left {
  flex-grow: 1; /* Pushes the left content to the left end */
}

.right {
  display: flex;
  align-items: center;
}

/* Additional styling for the navbar links (optional) */
.navbar-content span {
  color: #333; /* Set the text color */
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px; /* Add some space between the links */
}

.btn {
  padding: 8px 12px; /* Reduce left and right padding */
  border: 1px solid #ccc; /* Add a border */
  border-radius: 4px; /* Add border radius */
  background-color: #f5f5f5; /* Set background color */
  color: #333; /* Set text color */
  cursor: pointer;
  margin-right: 10px;
  text-decoration: none; /* Remove underline */
}

/* Add hover effect */
.btn:hover {
  background-color: #e0e0e0; /* Change background color on hover */
}

.logo {
  width: 100px; /* Adjust the width as needed */
  margin-right: 10px; /* Add a gap to the right */
}

.profile-photo {
  width: 30px; /* Adjust the width as needed */
  height: 30px; /* Adjust the height as needed */
  border-radius: 50%; /* Make it circular */
  margin-right: 10px; /* Add a gap to the right */
}

.my-course {
  color: white !important; /* Set the text color to white */
  text-decoration: none; /* Remove underline */
  margin-right: 10px; /* Add space to the right of the profile photo */
}

.my-course:hover {
  color: rgb(206, 226, 238) !important;
}

/* Dropdown button on hover & focus */
.dropbtn {
  background-color: #1d3557;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* Dropdown button on hover & focus */
.dropbtn:hover,
.dropbtn:focus {
  background-color: #0b1c2d;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 20px; /* Align the right edge of the dropdown with the left edge of the dropdown button */
  left: auto; /* Reset left positioning */
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #0b1c2d;
}
</style>
