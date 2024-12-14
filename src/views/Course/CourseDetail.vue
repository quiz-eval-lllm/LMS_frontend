<template>
  <div class="course-detail-page">
    <div class="enroll">
      <div class="header">
        <div class="header-left">
          <div class="course">
            <div class="course-info">
              <div class="course-title">
                <h1>{{ course.name }}</h1>
              </div>
              <div>
                <span style="color: white"
                  >Fakultas Kedokteran Universitas Indonesia</span
                >
                <!-- <span style="color: white">Online</span> -->
              </div>
            </div>
            <div class="course-info">
              <div>
                <span style="color: white"
                  >Dibuat pada {{ formatDate(course.createdAt) }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="header-right">
          <img :src="course.image_url" alt="Course Image" />
        </div>
      </div>
      <div class="enroll-button">
        <router-link
          v-if="
            (isEnrolled || isAdmin) &&
            course.listSubCourse[0] &&
            course.listSubCourse[0].listMaterial[0]
          "
          :to="
            '/course/' +
            course.slugName +
            '/' +
            course.listSubCourse[0].listMaterial[0].uuid
          "
          class="enroll-btn"
          >Lihat Materi Pembelajaran</router-link
        >
        <div
          v-else-if="!isEnrolled"
          :to="'/course/enroll/' + course.slugName"
          class="enroll-btn"
          @click="openEnrollConfirmation()"
        >
          {{
            course.price === 0
              ? "Daftar Course"
              : course.price
              ? "Beli Course (Rp. " + course.price.toLocaleString("id-ID") + ")"
              : ""
          }}
        </div>
      </div>
    </div>

    <!-- Description of the course -->
    <div class="description">
      <h2>Deskripsi Course</h2>
      <p v-html="course.description"></p>
    </div>
    <div class="sub-courses">
      <h2>Sub-Courses</h2>
      <div
        class="sub-course"
        v-for="(subCourse, index) in course.listSubCourse"
        :key="index"
      >
        <div class="sub-course-card">
          <h3 @click="toggleMaterials(index)">
            {{ subCourse.name }}
            <span class="toggle-icon">{{
              subCourse.showMaterials ? "-" : "+"
            }}</span>
          </h3>
          <p
            v-show="subCourse.showMaterials"
            v-html="subCourse.description"
          ></p>
          <ul v-show="subCourse.showMaterials">
            <li
              v-for="(material, index) in subCourse.listMaterial"
              :key="index"
            >
              <router-link
                v-if="isEnrolled || isAdmin"
                :to="'/course/' + course.slugName + '/' + material.uuid"
                style="text-decoration: none; color: black"
              >
                <div class="material-tile">
                  <div>{{ material.name }}</div>
                  <div>{{ material.readingMinute }} menit</div>
                </div>
              </router-link>
              <div v-else class="material-tile" style="cursor: default">
                <div>{{ material.name }}</div>
                <div>{{ material.readingMinute }} menit</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="sub-courses" v-if="isEnrolled || isAdmin">
      <h2>Ujian</h2>
      <div class="exam-card">
        <h3>Anda bisa mengikuti ujian dengan menekan link di bawah ini.</h3>
        <h4>Pastikan anda Login terlebih dahulu di aplikasi TC Exam sebelum menekan link ujian.</h4>
        <a :href="course.examLink" target="_blank">{{ course.examLink }}</a>
      </div>
    </div>

    <!-- List of reviews -->
    <div class="reviews" v-if="course.listReview.length === 0">
      <h2>Reviews</h2>
      Belum ada review untuk course ini
    </div>
    <div class="reviews" v-else>
      <h2>Reviews</h2>
      <div class="flex-container">
        <!-- Div for average rating -->
        <div class="average-rating">
          <h3>Average Rating</h3>
          <div class="rating-box">
            <div class="average-rating-text">
              {{
                typeof course.rating === "number"
                  ? course.rating.toFixed(2)
                  : "N/A"
              }}
            </div>
            <div class="esrb-rating">Average Rating</div>
          </div>
        </div>

        <!-- Div for bar chart -->
        <div class="bar-chart">
          <h3>Rating Distribution</h3>
          <!-- Bar for each rating -->
          <div class="bar" v-for="rating in ratings" :key="rating.value">
            <div class="review-bar-container">
              <div
                class="review-bar"
                :style="{ width: rating.percentage + '%' }"
              ></div>
            </div>
            <div class="bar-percentage">{{ rating.percentage }}%</div>
            <div class="bar-label">
              <span class="star-container" v-for="i in 5" :key="i">
                <span v-if="i <= rating.value">★</span>
                <span v-else>☆</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Overall review -->
      <div class="overall-review">
        <p>
          Average Rating: {{ course.rating.toFixed(2) }} (Based on
          {{ course.listReview.length }} reviews)
        </p>
      </div>

      <!-- Individual reviews -->
      <div class="individual-reviews" v-if="course.listReview.length > 0">
        <div
          class="review-row"
          v-for="(review, index) in displayedReviews"
          :key="index"
        >
          <!-- Render reviews for the current page -->
          <div class="review">
            <p style="color: #007bff">{{ review.name }}</p>
            <!-- <p>Rating: {{ review.rating }}/5</p> -->
            <span class="star-container">
              <span v-for="i in 5" :key="i">
                <span v-if="i <= review.rating">★</span>
                <span v-else>☆</span>
              </span>
            </span>
            <p>{{ review.message }}</p>
          </div>
        </div>
      </div>
      <!-- Pagination controls -->
      <div class="pagination">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          Prev
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === pageCount"
          class="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
    <EnrollConfirmation
      :show="showEnrollConfirmation"
      @enroll-course="enrollCourse()"
      @close-modal="closeEnrollConfirmation()"
    />
  </div>
  <MainFooter />
</template>

<script>
import MainFooter from "@/components/Footer/MainFooter.vue";
import EnrollConfirmation from "@/components/Course/EnrollConfirmation.vue";
export default {
  components: {
    MainFooter,
    EnrollConfirmation,
  },
  data() {
    return {
      showEnrollConfirmation: false,
      course: {
        name: "",
        description: "",
        image_url: "",
        createdAt: "",
        listSubCourse: [],
        listReview: [],
      },
      reviewsPerPage: 4, // Number of reviews to display per page
      currentPage: 1,
      isEnrolled: false,
      isAdmin: false,
    };
  },
  created() {
    this.checkEnrollment();
    this.checkIsAdmin();
    this.fetchCourse();
  },
  computed: {
    pageCount() {
      // Calculate the total number of pages based on the number of reviews and reviewsPerPage
      return Math.ceil(this.course.listReview.length / this.reviewsPerPage);
    },
    displayedReviews() {
      // Calculate the start and end index of reviews to display for the current page
      const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
      const endIndex = startIndex + this.reviewsPerPage;
      // Return the reviews for the current page
      return this.course.listReview.slice(startIndex, endIndex);
    },
    ratings() {
      const ratingDistribution = this.course.ratingDistribution;
      const totalReviews = this.course.listReview.length;
      const ratings = [];

      // Loop through rating distribution data
      for (let ratingValue in ratingDistribution) {
        const count = ratingDistribution[ratingValue];
        const percentage = (count / totalReviews) * 100;
        ratings.push({
          value: parseInt(ratingValue),
          percentage: percentage.toFixed(1),
        });
      }
      return ratings;
    },
  },
  methods: {
    prevPage() {
      // Navigate to the previous page
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      // Navigate to the next page
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    async fetchCourse() {
      try {
        const slugName = this.$route.params.slugName;
        const response = await this.$axios.get(`api/v1/course/${slugName}`);
        this.course = response.data.data;
      } catch (error) {
        if (error.code === "ERR_BAD_REQUEST") {
          this.$router.push("/404");
        }
      }
    },
    async checkEnrollment() {
      try {
        const slugName = this.$route.params.slugName;
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(
          `api/v1/course/enrolled/${slugName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.isEnrolled = response.data.data.isEnrolled;
      } catch (error) {
        console.error("Error checking enrollment:", error);
        this.isEnrolled = false;
      }
    },
    toggleMaterials(index) {
      this.course.listSubCourse[index].showMaterials =
        !this.course.listSubCourse[index].showMaterials;
    },
    formatDate(dateTimeString) {
      const dateTime = new Date(dateTimeString);

      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const month = months[dateTime.getMonth()];
      const day = dateTime.getDate();
      const year = dateTime.getFullYear();

      const formattedDateTime = `${day} ${month} ${year}`;

      return formattedDateTime;
    },
    initiatePayment(midTransToken, slugName) {
      const transactionToken = midTransToken;

      // Trigger snap popup
      window.snap.pay(transactionToken, {
        onSuccess: () => {
          // alert("Payment success!");
          // console.log(result);
          // this.checkEnrollment();
          window.location.href = "/course/" + slugName;
        },
        onPending: () => {
          // alert("Waiting for your payment!");
          // console.log(result);
        },
        onError: (result) => {
          alert("Payment failed!");
          console.log(result);
        },
        onClose: () => {
          // alert("You closed the popup without finishing the payment");
        },
      });
    },
    async enrollCourse() {
      this.showEnrollConfirmation = false;
      try {
        const slugName = this.$route.params.slugName;
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(
          `api/v1/course/buy/${slugName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data;
        if (this.course.price !== 0) {
          this.snapToken = data.snap_token;
          this.clientKey = data.client_key;
          this.isProduction = data.is_production;
          if (data.is_production) {
            const script = document.createElement("script");
            script.src = "https://app.midtrans.com/snap/snap.js";
            script.setAttribute("data-client-key", this.clientKey);
            script.async = true;
            script.onload = async () => {
              await this.initiatePayment(this.snapToken, slugName);
            };
            document.body.appendChild(script);
          } else {
            const script = document.createElement("script");
            script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
            script.setAttribute("data-client-key", this.clientKey);
            script.async = true;
            script.onload = async () => {
              await this.initiatePayment(this.snapToken, slugName);
            };
            document.body.appendChild(script);
          }
        } else {
          location.reload();
        }
      } catch (error) {
        console.error("Error enrolling course:", error);
        this.$router.push("/login");
      }
    },
    openEnrollConfirmation() {
      this.showEnrollConfirmation = true;
    },
    closeEnrollConfirmation() {
      this.showEnrollConfirmation = false;
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
  },
};
</script>

<style scoped>
/* Your CSS styles for the course detail component */
.course-detail-page {
  background-color: #f0f0f0;
}

.enroll {
  padding-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* .enroll-button {
  background-color: red;
  height: 7vh;
} */

.enroll-button {
  display: flex;
  justify-content: center;
  background-color: #132742;
}

.enroll-btn {
  background-color: white;
  color: black;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  text-decoration: none;
  text-align: center;
}

.enroll-btn:hover {
  background-color: #e9edee;
}

.header {
  display: flex;
  background-color: #132742;
  height: 35vh;
}
.header-left {
  padding-left: 150px;
  display: flex;
  width: 50%;
}
/* .course {
  padding-top: 20px;
} */

.course-info {
  padding-top: 20px;
  color: #ffffff;
}

.course-title {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}

.header-right {
  padding-right: 150px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.header-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.description {
  padding-left: 150px;
  padding-right: 150px;
}

.sub-courses {
  padding-left: 150px;
  padding-right: 150px;
}
.sub-course {
  margin-bottom: 20px;
}

.sub-course-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  cursor: pointer;
}

.sub-course h3 {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-icon {
  font-size: 1.2em;
}

.material-tile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 5px; /* Add spacing between tiles */
  cursor: pointer;
}

.material-tile:hover {
  background-color: #e0e0e0;
}

.exam-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.reviews {
  padding: 20px 150px;
}

.flex-container {
  display: flex;
}

.average-rating {
  /* Existing styles... */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rating-box {
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
}

.average-rating-text {
  color: white;
  font-size: 24px; /* Adjust font size as needed */
  margin-bottom: 5px;
}

.esrb-rating {
  color: black;
  background-color: white;
  font-size: 14px; /* Adjust font size as needed */
  padding: 5px 10px;
  border-radius: 5px;
}

.average-rating,
.bar-chart {
  flex: 1;
  margin-right: 20px;
}

.average-rating h3,
.bar-chart h3 {
  margin-bottom: 10px;
}

.bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.review-bar-container {
  width: 67%;
  background-color: #ccc;
  height: 10px;
  border-radius: 5px;
}

.review-bar {
  height: 100%;
  background-color: #f67280; /* Adjust color as needed */
  border-radius: 5px;
}

.bar-label {
  margin-right: 10px;
  margin-bottom: 5px;
}

.bar-percentage {
  margin-left: 10px;
  width: 55px;
  text-align: left;
}

.star-container {
  display: inline-block;
  width: 20px; /* Adjust as needed to fit your layout */
  text-align: center;
  color: #f67280;
}

.individual-reviews {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.review-row {
  width: calc(50% - 10px); /* Set width for 2 reviews per row with margin */
  margin-bottom: 20px;
}

.review {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.review p {
  margin: 5px 0;
}

.overall-review {
  margin-bottom: 20px;
}

.individual-reviews .review {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.individual-reviews .review p {
  margin: 5px 0;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pagination-btn {
  padding: 8px 16px;
  margin: 0 4px;
  background-color: #132742;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-btn:hover {
  background-color: #1a3968;
}

.pagination-btn:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
</style>
