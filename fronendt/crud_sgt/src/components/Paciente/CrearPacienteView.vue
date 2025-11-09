<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header bg-primary text-white">
        Registrar Paciente
      </div>

      <div class="card-body">
        <form @submit.prevent="crearPaciente">
          <div class="mb-3">
            <label>Documento</label>
            <input v-model="paciente.documento" class="form-control" required />
          </div>

          <div class="mb-3">
            <label>Nombre</label>
            <input v-model="paciente.nombre" class="form-control" required />
          </div>

          <div class="mb-3">
            <label>Apellido</label>
            <input v-model="paciente.apellido" class="form-control" required />
          </div>

          <div class="mb-3">
            <label>Dirección</label>
            <input v-model="paciente.direccion" class="form-control" />
          </div>

          <div class="mb-3">
            <label>Teléfono</label>
            <input v-model="paciente.telefono" class="form-control" />
          </div>

          <div class="btn-group w-100" role="group">
            <button type="submit" class="btn btn-success">Guardar</button>
            <router-link :to="{ name: 'PacienteView' }" class="btn btn-warning">
              Cancelar
            </router-link>
          </div>
        </form>
      </div>

      <div class="card-footer text-muted text-center">@IngdeSw</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CrearPacienteView", // puedes dejarlo como CrearPacienteView temporalmente
  data() {
    return {
      paciente: {
        documento: "",
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
      },
    };
  },
  methods: {
    async crearPaciente() {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8081/api/pacientes/pacientes/",
          this.paciente
        );

        if (response.data.Message === "Paciente creado exitosamente") {
          alert("✅ Paciente registrado correctamente");
          this.$router.push({ name: "PacienteView" });
        } else {
          alert(response.data.Message || "Error al crear paciente");
        }
      } catch (error) {
        console.error("Error al crear paciente:", error);
        alert("Error de conexión con el servidor");
      }
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
