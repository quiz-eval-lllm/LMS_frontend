import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/LandingPage/LandingPage.vue";
import NotFound from "@/views/LandingPage/NotFound.vue";
import MyCourse from "@/views/Course/MyCourse.vue";
import CourseDetail from "@/views/Course/CourseDetail.vue";
import ManageCourse from "@/views/ManageCourse/ManageCourse.vue";
import CreateCourse from "@/views/ManageCourse/CreateCourse.vue";
import EditCourse from "@/views/ManageCourse/EditCourse.vue";
import ViewParticipant from "@/views/ManageCourse/ViewParticipant.vue";
import ParticipantLogs from "@/views/ManageCourse/ParticipantLogs.vue";
import LoginPage from "@/views/Auth/LoginPage.vue";
import RegisterPage from "@/views/Auth/RegisterPage.vue";
import ProfilePage from "@/views/Profile/ProfilePage.vue";
import LearningMaterial from "@/views/Material/LearningMaterial.vue";

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
    meta: {
      title: 'MEDIS LMS'
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Page Not Found'
    }
  },
  {
    path: '/my-course',
    name: 'MyCourse',
    component: MyCourse,
    meta: {
      title: 'My Course'
    }
  },
  {
    path: '/course/:slugName',
    name: 'CourseDetail',
    component: CourseDetail,
    meta: {
      title: 'Course'
    }
  },
  {
    path: '/course/:slugName/:materialID',
    name: 'LearningMaterial',
    component: LearningMaterial,
    meta: {
      title: 'Course'
    }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      title: 'Log In'
    }
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage,
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/manage-course',
    name: 'ManageCourse',
    component: ManageCourse,
    meta: {
      title: 'Manage Course'
    }
  },
  {
    path: '/create-course',
    name: 'CreateCourse',
    component: CreateCourse,
    meta: {
      title: 'Create Course'
    }
  },
  {
    path: '/edit-course/:slugName',
    name: 'EditCourse',
    component: EditCourse,
    meta: {
      title: 'Edit Course'
    }
  },
  {
    path: '/view-participant/:slugName',
    name: 'ViewParticipant',
    component: ViewParticipant,
    meta: {
      title: 'View Participant'
    }
  },
  {
    path: '/view-participant/:slugName/participant-logs/:participantID',
    name: 'ParticipantLogs',
    component: ParticipantLogs,
    meta: {
      title: 'Participant Logs'
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
