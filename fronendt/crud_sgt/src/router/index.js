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
    path: '/',
    redirect: '/Home'
  },

  {
    path: '/Home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },

  {
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
    path: '/CrearResultadosMedicosView',
    name: 'CrearResultadosMedicosView',
    component: CrearResultadosMedicosView,
    meta: { requiresAuth: true }
  },
  {
    path: '/EditarResultadosMedicosView/:ID_EM',
    name: 'EditarResultadosMedicosView',
    component: EditarResultadosMedicosView,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/ResultadosMedicosView',
    name: 'ResultadosMedicosView',
    component: ResultadosMedicosView,
    meta: { requiresAuth: true }
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

  {
    path: '/LoginU',
    name: 'LoginU',
    component: LoginU
  },
  {
    path: '/RegistrarU',
    name: 'RegistrarU',
    component: RegistrarU
  },

  {
    path: '/:catchAll(.*)',
    redirect: '/LoginU'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ Middleware de protección de rutas
router.beforeEach((to, from, next) => {
  console.log('[ROUTER] to:', to.path)

  const raw = sessionStorage.getItem('usuario')
  let usuarioObj = null

  try {
    usuarioObj = raw ? JSON.parse(raw) : null
  } catch {
    usuarioObj = null
  }

  const isLoggedIn = !!(usuarioObj && usuarioObj.usuario)

  console.log('[ROUTER] isLoggedIn:', isLoggedIn, 'usuarioObj:', usuarioObj)

  // ✅ Evita que entren a Login o Registrar si ya están logueados
  if ((to.path === '/LoginU' || to.path === '/RegistrarU') && isLoggedIn) {
    return next('/Home')
  }

  // ✅ Rutas protegidas
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/LoginU')
  }

  return next()
})

export default router
