<template>
  <div v-if="coursesTotalDefault === 0" class="my-course-page-no-enrollment">
    <h1>My Course</h1>
    <SadIcon size="300px" />
    <h2>Belum ada course yang didaftarkan</h2>
  </div>
  <div v-else class="my-course-page">
    <h1>My Course</h1>
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search course"
        class="search-bar"
        @keyup.enter="search"
      />
      <button @click="search" class="search-button">Search</button>
    </div>
    <div v-show="coursesTotal === 0">
      <h3 style="color: #666">Course tidak ditemukan</h3>
    </div>
    <div class="course-list">
      <div class="card" v-for="course in courses" :key="course.course.uuid">
        <router-link :to="'/course/' + course.course.slugName" class="course">
          <div class="image-container">
            <img
              :src="course.course.image_url"
              :alt="course.title"
              class="course-image"
            />
          </div>
          <div class="card-content">
            <h2>{{ course.course.name }}</h2>
            <!-- <p>{{ course.description }}</p> -->
            <p>
              Progress:
              {{
                ((course.finishedMaterial / course.course.totalMaterial) * 100).toFixed(0)
              }}%
            </p>
            <div class="progress-bar-container">
              <div
                class="progress-bar"
                :style="{
                  width:
                    (course.finishedMaterial / course.course.totalMaterial) *
                      100 +
                    '%',
                }"
              ></div>
            </div>
            <router-link :to="'/course/' + course.course.slugName" class="btn"
              >Lihat Course</router-link
            >
            <!-- <router-link :to="'/course/' + course.id + '/review'" class="btn"
              >Review</router-link
            > -->
          </div>
        </router-link>
      </div>
    </div>
    <div class="pagination" v-if="coursesTotal > 0">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span v-for="pageNumber in displayedPageNumbers" :key="pageNumber">
        <button
          v-if="pageNumber !== '...'"
          @click="goToPage(pageNumber)"
          :class="{ active: pageNumber === currentPage }"
        >
          {{ pageNumber }}
        </button>
        <span v-else>...</span>
      </span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
  <MainFooter />
</template>

<script>
import SadIcon from "@/assets/icon/SadIcon.vue";
import MainFooter from "@/components/Footer/MainFooter.vue";
export default {
  components: {
    SadIcon,
    MainFooter,
  },
  data() {
    return {
      courses: [],
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 8,
      maxDisplayedPages: 5,
      coursesTotal: 0,
      coursesTotalDefault: 0
    };
  },
  created() {
    this.checkLoginStatus();
    this.fetchEnrolledCourses();
    this.getEnrolledTotal();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.coursesTotal / this.itemsPerPage);
    },
    // paginatedCourses() {
    //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //   const endIndex = startIndex + this.itemsPerPage;
    //   return this.courses.slice(startIndex, endIndex);
    // },
    displayedPageNumbers() {
      const totalPages = this.totalPages;
      const currentPage = this.currentPage;
      const maxDisplayedPages = this.maxDisplayedPages;
      let startPage, endPage;

      if (totalPages <= maxDisplayedPages) {
        startPage = 1;
        endPage = totalPages;
      } else {
        const halfMaxDisplayedPages = Math.floor(maxDisplayedPages / 2);
        if (currentPage <= halfMaxDisplayedPages) {
          startPage = 1;
          endPage = maxDisplayedPages;
        } else if (currentPage + halfMaxDisplayedPages >= totalPages) {
          startPage = totalPages - maxDisplayedPages + 1;
          endPage = totalPages;
        } else {
          startPage = currentPage - halfMaxDisplayedPages;
          endPage = currentPage + halfMaxDisplayedPages;
        }
      }

      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift("...");
      }
      if (endPage < totalPages) {
        pages.push("...");
      }

      return pages;
    },
  },
  methods: {
    async checkLoginStatus() {
      // Check if token exists in localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login page if token doesn't exist
        this.$router.push("/login");
        return;
      }
      // Fetch course data or perform other actions if user is logged in
      // await this.fetchCourseData();
    },
    async fetchEnrolledCourses() {
      try {
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(
          `api/v1/course/enrolled?page=${this.currentPage}&keyword=${this.searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.courses = response.data.data.enrollment;
        this.coursesTotal = response.data.data.total;
      } catch (error) {
        console.error("Error during fetching course:", error);
      }
    },
    async getEnrolledTotal() {
      try {
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(
          `api/v1/course/enrolled?page=${this.currentPage}&keyword=${this.searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.coursesTotalDefault = response.data.data.total;
      } catch (error) {
        console.error("Error during fetching course:", error);
      }
    },
    async search() {
      this.currentPage = 1;
      await this.fetchEnrolledCourses();
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      await this.fetchEnrolledCourses();
    },
    // Method to navigate to next page
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
      await this.fetchEnrolledCourses();
    },
    async goToPage(pageNumber) {
      if (pageNumber !== "..." && pageNumber !== this.currentPage) {
        this.currentPage = pageNumber;
      }
      await this.fetchEnrolledCourses();
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
}

.search-bar {
  flex: 1; /* Take remaining space */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-right: 10px; /* Add space between input and button */
}

/* Style the search button */
.search-button {
  padding: 10px 20px;
  background-color: #1d3557;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #0b1c2d;
}

/* Style the search bar placeholder text */
.search-bar::placeholder {
  color: #aaa; /* Adjust placeholder text color */
}

/* Style the search bar on focus */
.search-bar:focus {
  outline: none; /* Remove default focus outline */
  border-color: #1d3557; /* Change border color on focus */
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 8px 12px;
  margin: 0 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  background-color: #fff;
  color: #1d3557;
  border: 1px solid #1d3557;
}

.pagination button:hover {
  background-color: #1d3557;
  color: #fff;
}

.pagination .active {
  background-color: #1d3557;
  color: #fff;
}

.pagination span.disabled {
  pointer-events: none;
  opacity: 0.5;
}

.pagination span.ellipsis {
  font-weight: bold;
}

.pagination button:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.my-course-page {
  background-color: #f0f0f0;
  padding: 50px;
  text-align: center;
  min-height: 100vh;
}

.my-course-page-no-enrollment {
  background-color: #f0f0f0;
  padding: 50px;
  text-align: center;
  height: 57vh;
}

.my-course-page h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.my-course-page p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.my-course-page .btn {
  padding: 10px 20px;
  background-color: #1d3557;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.my-course-page .btn:hover {
  background-color: #0b1c2d;
}

.course-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 50px; /* Adjust as needed */
  gap: 5px;
}

.card {
  width: calc(25% - 20px); /* Set width for 4 items per row */
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box; /* Ensure padding doesn't affect width */
}

.card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add box shadow on hover */
}

.image-container {
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio (height / width * 100%) */
  position: relative;
  overflow: hidden;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.course-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.card-content h2 {
  font-size: 1.25em;
  margin-bottom: 10px;
}

.card-content p {
  margin-bottom: 10px;
}

.card-content .btn {
  padding: 8px 16px;
  background-color: #1d3557;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.card-content .btn:hover {
  background-color: #0b1c2d;
}

.course {
  text-decoration: none;
  color: black;
}

.progress-bar-container {
  width: 100%;
  background-color: #ccc;
  height: 10px;
  border-radius: 5px;
  margin-bottom: 30px;
}

.progress-bar {
  height: 100%;
  background-color: #f67280; /* Adjust color as needed */
  border-radius: 5px;
}
/* Style for the buttons */
</style>
