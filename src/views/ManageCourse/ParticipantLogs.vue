<template>
  <div class="logs-container">
    <div>
      <h1>Catatan Aktivitas</h1>
      <div v-show="logTotal === 0">
        <h3 style="color: #666; text-align: center">Catatan tidak ditemukan</h3>
      </div>
      <div v-for="(log, index) in activityLogs" :key="index" class="log-card">
        <div class="log-text">{{ log.log }}</div>
        <div class="log-time">{{ formatDate(log.createdAt) }}</div>
      </div>
      <div class="pagination" v-if="logTotal > 0">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
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
      <br />
      <router-link
        :to="`/view-participant/${$route.params.slugName}`"
        class="back-button"
      >
        &#8592; Kembali
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activityLogs: [],
      activityLogsSearchQuery: "",
      currentPage: 1,
      itemsPerPage: 10,
      maxDisplayedPages: 5,
      logTotal: 0,
    };
  },
  methods: {
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
      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();

      const formattedDateTime = `${day} ${month} ${year}, ${hours
        .toString()
        .padStart(2, "0")}.${minutes.toString().padStart(2, "0")}`;

      return formattedDateTime;
    },
    search() {},
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
    async getLogs() {
      try {
        const participantID = this.$route.params.participantID;
        const slugName = this.$route.params.slugName;
        const courseName = slugName
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(
          `api/v1/admin/activity?page=${this.currentPage}&user=${participantID}&course=${courseName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.activityLogs = response.data.data.activities;
        this.logTotal = response.data.data.total;
      } catch (error) {
        console.error("Error getting log:", error);
      }
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      await this.getLogs();
    },
    // Method to navigate to next page
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
      await this.getLogs();
    },
    async goToPage(pageNumber) {
      if (pageNumber !== "..." && pageNumber !== this.currentPage) {
        this.currentPage = pageNumber;
      }
      await this.getLogs();
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.logTotal / this.itemsPerPage);
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
  created() {
    this.checkIsAdmin();
    this.getLogs();
  },
};
</script>

<style scoped>
.logs-container {
  display: flex;
  background-color: #f0f0f0;
  padding-top: 50px;
  min-height: 94vh;
  padding: 50px;
  justify-content: center;
}

h1 {
  text-align: center;
}

.back-button {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #1d3557;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #0b1c2d;
}

.log-card {
  width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
}

.log-text {
  font-weight: bold;
}

.log-time {
  color: #777;
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
</style>
