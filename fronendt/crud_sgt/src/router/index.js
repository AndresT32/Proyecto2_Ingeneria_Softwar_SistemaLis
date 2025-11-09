import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import EditarPacienteView from '../components/Paciente/EditarPacienteView.vue'
import PacienteView from '../components/Paciente/PacienteView.vue'
import CrearPacienteView from '../components/Paciente/CrearPacienteView.vue'
import CrearResultadosMedicosView from '../components/ResultadosMedicos/CrearResultadosMedicosView.vue'
import EditarResultadosMedicosView from '../components/ResultadosMedicos/EditarResultadosMedicosView.vue'
import ResultadosMedicosView from '../components/ResultadosMedicos/ResultadosMedicosView.vue'      
import LoginU from '@/components/Login/LoginU.vue'
import RegistrarU from '@/components/Login/RegistrarU.vue'
import CrearLaboratorista from '@/components/Laboratorista/CrearLaboratorista.vue'
import EditarLaboratorista from '@/components/Laboratorista/EditarLaboratorista.vue'
import ListLaboratoristas from '@/components/Laboratorista/ListLaboratoristas.vue'
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },  {
    path: '/PacienteView',
    name: 'PacienteView',
    component: PacienteView,
    meta: { requiresAuth: true }
  },
  {
    path: '/CrearPacienteView',
    name: 'CrearPacienteView', 
    component: CrearPacienteView,
    meta: { requiresAuth: true }
  },
  {
    path: '/EditarPacienteView/:cod_ingreso',
    name: 'EditarPacienteView', 
    component: EditarPacienteView,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/CrearResultadosMedicosView",
    name: "CrearResultadosMedicosView",
    component: CrearResultadosMedicosView,
    meta: { requiresAuth: true }
  },
  {
    path: "/EditarResultadosMedicosView/:ID_EM",
    name: "EditarResultadosMedicosView",
    component: EditarResultadosMedicosView,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/ResultadosMedicosView",
    name: "ResultadosMedicosView",
    component: ResultadosMedicosView,
    meta: { requiresAuth: true }
  },
  {
    path: "/LoginU",
    name: "LoginU",
    component: LoginU
  },
  {
    path: "/RegistrarU",
    name: "RegistrarU",
    component: RegistrarU
  },

  {
    path: "/:catchAll(.*)",
    redirect: { name: "LoginU" }
  },
  {
  path: '/ListLaboratoristas',
  name: 'ListLaboratoristas',
  component: ListLaboratoristas,
  meta: { requiresAuth: true }
},
{
  path: '/CrearLaboratorista',
  name: 'CrearLaboratorista',
  component: CrearLaboratorista,
  meta: { requiresAuth: true }
},
{
  path: '/EditarLaboratorista/:cod_laboratorista',
  name: 'EditarLaboratorista',
  component: EditarLaboratorista,
  props: true,
  meta: { requiresAuth: true }
},

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// 🔒 Guard de autenticación
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("usuario");
<<<<<<< HEAD
    // 🟢 Si entra directamente a "/" sin estar logueado → redirigir a Login
=======

  // 🟢 Si entra directamente a "/" sin estar logueado → redirigir a Login
>>>>>>> d725872948f5bb9999fbf1cd01bebbc5a5728c37
  if (to.path === "/" && !isLoggedIn) {
    next("/LoginU");
    return;
  }
<<<<<<< HEAD
=======

>>>>>>> d725872948f5bb9999fbf1cd01bebbc5a5728c37
  // Si intenta entrar a login o registro y ya está logueado → redirigir a Home
  if ((to.path === "/LoginU" || to.path === "/RegistrarU") && isLoggedIn) {
    next("/");
    return;
  }

  // Si intenta entrar a una ruta protegida sin estar logueado → redirigir a Login
  const publicPages = ["/LoginU", "/RegistrarU"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !isLoggedIn) {
    next("/LoginU");
    
    return;
  }

  // En cualquier otro caso, permitir
  next();
});



export default router;
