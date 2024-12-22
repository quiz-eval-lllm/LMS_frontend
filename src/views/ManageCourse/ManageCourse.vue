<template>
  <div class="manage-course">
    <h1>Pengelolaan Course</h1>
    <router-link to="/create-course" class="create-course-btn"
      >+ Buat Course</router-link
    >

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
      <div class="card" v-for="course in courses" :key="course.id">
        <div class="course">
          

          <div class="card-content">
            <h2>{{ course.name }}</h2>
            <!-- <p>{{ course.description }}</p> -->
            <p>
              {{
                course.price === 0
                  ? "Free"
                  : course.price
                  ? "Rp. " + course.price.toLocaleString("id-ID")
                  : "Price not available"
              }}
            </p>
            <p v-if="course.rating === 0" style="color: #666">
              Not yet reviewed
            </p>
            <p v-else>
              Rating:
              {{
                typeof course.rating === "number"
                  ? course.rating.toFixed(2)
                  : "N/A"
              }}
            </p>
            <div class="buttons">
              <router-link :to="'/course/' + course.slugName" class="btn"
                >Lihat Course</router-link
              >
              <router-link
                :to="'/view-participant/' + course.slugName"
                class="btn"
                v-if="course.released"
                >Lihat Peserta</router-link
              >
              <router-link
                :to="'/edit-course/' + course.slugName"
                class="btn"
                v-if="!course.released"
                >Edit Course</router-link
              >
              <div
                class="btn"
                @click="showReleaseModal(course.slugName)"
                v-if="!course.released"
              >
                Rilis Course
              </div>
              <div
                @click="showDeleteModal(course.slugName)"
                class="btn delete-button"
                v-if="!course.released"
              >
                Hapus Course
              </div>
            </div>
          </div>
        </div>
        <DeleteCourse
          :slugName="chosenSlugName"
          :show="isDeleteModalVisible"
          @delete-course="deleteCourse()"
          @close-modal="closeDeleteModal()"
        />
        <ReleaseCourse
          :slugName="chosenSlugName"
          :show="isReleaseModalVisible"
          @release-course="releaseCourse()"
          @close-modal="closeReleaseModal()"
        />
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
</template>

<script>
import DeleteCourse from "@/components/Course/DeleteCourse.vue";
import ReleaseCourse from "@/components/Course/ReleaseCourse.vue";
export default {
  methods: {
    showDeleteModal(slugName) {
      this.chosenSlugName = slugName;
      this.isDeleteModalVisible = true;
    },
    closeDeleteModal() {
      this.chosenSlugName = "";
      this.isDeleteModalVisible = false;
    },
    deleteCourse() {
      this.closeDeleteModal();
      this.fetchCourses();
    },
    showReleaseModal(slugName) {
      this.chosenSlugName = slugName;
      this.isReleaseModalVisible = true;
    },
    closeReleaseModal() {
      this.chosenSlugName = "";
      this.isReleaseModalVisible = false;
    },
    releaseCourse() {
      this.closeReleaseModal();
      this.fetchCourses();
    },
    async fetchCourses() {
      try {
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(
          `/api/v1/admin/course?page=${this.currentPage}&keyword=${this.searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.courses = response.data.data.courses;
        this.coursesTotal = response.data.data.total;
      } catch (error) {
        console.error("Error during fetching course:", error);
      }
    },
    checkIsAdmin() {
      const token = localStorage.getItem("token");
      if (token) {
        const tokenParts = token.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));
        const role = payload.sub.split("|")[1];
        if (role !== "ADMIN") {
          this.$router.push("/");
        }
      } else {
        this.$router.push("/");
      }
    },
    async search() {
      this.currentPage = 1;
      await this.fetchCourses();
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      await this.fetchCourses();
    },
    // Method to navigate to next page
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
      await this.fetchCourses();
    },
    async goToPage(pageNumber) {
      if (pageNumber !== "..." && pageNumber !== this.currentPage) {
        this.currentPage = pageNumber;
      }
      await this.fetchCourses();
    },
  },
  mounted() {
    this.checkIsAdmin();
    this.fetchCourses();
  },
  components: {
    DeleteCourse,
    ReleaseCourse,
  },
  data() {
    return {
      isDeleteModalVisible: false,
      isReleaseModalVisible: false,
      courses: [],
      chosenSlugName: "",
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 8,
      maxDisplayedPages: 5,
      coursesTotal: 0,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.coursesTotal / this.itemsPerPage);
    },
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
};
</script>

<style scoped>
/* .create-course-btn {
  padding: 10px 20px;
  background-color: #1d3557;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  margin-top: 20px;
  display: inline-block;
} */
.search-container {
  margin-top: 20px;
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

.create-course-btn {
  padding: 10px 20px;
  background-color: #1d3557;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  margin-top: 20px;
  display: block; /* Change display to block */
  margin-right: auto; /* Add this to align it to the left */
}
.manage-course {
  background-color: #f0f0f0;
  padding: 50px;
  text-align: center;
  min-height: 90vh;
}

.manage-course h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.manage-course p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.manage-course .btn {
  padding: 10px 20px;
  background-color: #1d3557;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.manage-course .btn:hover {
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
  margin-bottom: 20px;
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

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-content .buttons .delete-button {
  background-color: red;
  color: white;
}
</style>
