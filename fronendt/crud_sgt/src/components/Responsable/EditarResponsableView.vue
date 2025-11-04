<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header bg-warning text-dark text-center">
        <h4>Editar Paciente</h4>
      </div>

      <div class="card-body">
        <form @submit.prevent="actualizarPaciente">
          <div class="mb-3">
            <label>Código Ingreso (no editable)</label>
            <input
              type="text"
              class="form-control"
              :value="codIngreso"
              disabled
            />
          </div>

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
            <router-link :to="{ name: 'PacienteView' }" class="btn btn-secondary">
              Cancelar
            </router-link>
          </div>
        </form>
      </div>

      <div class="card-footer text-center text-muted">@IngdeSw</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditarPacienteView",
  props: ["cod_ingreso"], // parámetro que viene desde el router
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
  computed: {
    codIngreso() {
      return this.cod_ingreso || this.$route.params.cod_ingreso || "";
    },
  },
  created() {
    this.obtenerPaciente();
  },
  methods: {
    async obtenerPaciente() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8081/api/pacientes/pacientes/${this.codIngreso}/`
        );
        if (response.data.Message === "Success") {
          this.paciente = response.data.paciente;
        } else {
          alert(response.data.Message);
          this.$router.push({ name: "PacienteView" });
        }
      } catch (error) {
        console.error("Error al obtener paciente:", error);
        alert("Error al obtener paciente");
        this.$router.push({ name: "PacienteView" });
      }
    },

    async actualizarPaciente() {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8081/api/pacientes/pacientes/${this.codIngreso}/`,
          this.paciente
        );
        if (response.data.Message === "Paciente actualizado") {
          alert("Paciente actualizado correctamente");
          this.$router.push({ name: "PacienteView" });
        } else {
          alert(response.data.Message);
        }
      } catch (error) {
        console.error("Error al actualizar paciente:", error);
        alert("Error al actualizar paciente");
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
