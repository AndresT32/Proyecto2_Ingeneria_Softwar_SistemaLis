<template>
  <div class="home-container">
    <!-- Encabezado de bienvenida -->
    <div class="welcome-card">
      <img src="../assets/Health.jpg" alt="Logo Inventario" class="logo" />
      <h1>Bienvenido al Sistema LIS</h1>
      <p>
        Desde este panel puedes gestionar el registro de Pacientes y Especialistas, además de los registros de exámenes médicos.
      </p>
    </div>

    <!-- Tarjetas de acceso rápido -->
    <div class="modules">
  <!-- Pacientes Médicos -->
  <div
    class="module-card"
    @click="selectModuleAndNavigate('Paciente', '/PacienteView')"
    :class="{ active: selectedModule === 'Paciente' }"
  >
    <i class="fas fa-stethoscope"></i>
    <h3>Pacientes</h3>
    <p>Ingreso de Pacientes</p>
  </div>

  <!-- Laboratorio -->
 <div
    class="module-card"
    @click="selectModuleAndNavigate('Laboratorista', '/ListLaboratoristas')"
    :class="{ active: selectedModule === 'Laboratorista' }"
  >
    <i class="fas fa-user-md"></i>
    <h3>Especialista de laboratorio</h3>
    <p>Ingreso de Especialistas</p>
  </div>

  <!-- Ubicaciones -->
  <div
    class="module-card"
    @click="selectModuleAndNavigate('Resultados', '/ResultadosMedicosView')"
    :class="{ active: selectedModule === 'Resultados' }"
  >
    <i class="fas fa-map-marker-alt"></i>
    <h3>Registros</h3>
    <p>Ingreso de Resultados de laboratorio</p>
  </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",

  data() {
    return {
      loggedIn: !!sessionStorage.getItem("usuario"),
      selectedModule: null,
    };
  },

  methods: {
    selectModuleAndNavigate(modulo, route) {
      if (!this.loggedIn) {
        this.$router.push("/LoginU");
        return;
      }
      this.selectedModule = modulo;
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
.home-container {
  text-align: center;
  padding: 50px 20px;
}

.welcome-card {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 40px;
}

.logo {
  width: 90px;
  margin-bottom: 20px;
}

.modules {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
}

.module-card {
  width: 250px;
  background-color: #f5f7fb;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
}

.module-card:hover {
  background-color: #eaf3ff;
  transform: translateY(-5px);
}

.module-card i {
  font-size: 40px;
  color: #3b82f6;
  margin-bottom: 10px;
}

.module-card h3 {
  color: #1f2937;
  margin-bottom: 8px;
}

.module-card p {
  color: #6b7280;
  font-size: 14px;
}
</style>