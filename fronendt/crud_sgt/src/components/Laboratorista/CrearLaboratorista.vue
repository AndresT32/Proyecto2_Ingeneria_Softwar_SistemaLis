<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header bg-primary text-white text-center">
        <h4>Registrar Laboratorista</h4>
      </div>

      <div class="card-body">
        <form @submit.prevent="agregarRegistro">
          <div class="mb-3">
            <label>Nombre</label>
            <input v-model="laboratorista.nombre" class="form-control" required />
          </div>

          <div class="mb-3">
            <label>Apellido</label>
            <input v-model="laboratorista.apellido" class="form-control" required />
          </div>

          <div class="mb-3">
            <label>Profesión</label>
            <input v-model="laboratorista.profesion" class="form-control" />
          </div>

          <div class="mb-3">
            <label>Teléfono</label>
            <input v-model="laboratorista.telefono" class="form-control" />
          </div>

          <div class="btn-group w-100" role="group">
            <button type="submit" class="btn btn-success">Guardar</button>
            <router-link :to="{ name: 'ListLaboratoristas' }" class="btn btn-warning">
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
  name: "CrearLaboratorista",
  data() {
    return {
      laboratorista: {
        nombre: "",
        apellido: "",
        profesion: "",
        telefono: "",
      },
    };
  },
  methods: {
    async agregarRegistro() {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8081/api/laboratoristas/laboratoristas/",
          this.laboratorista
        );

        if (res.data.message === "Success") {
          alert(`✅ Laboratorista creado correctamente\nCódigo: ${res.data.cod_laboratorista}`);
          this.$router.push({ name: "ListLaboratoristas" });
        } else {
          alert(res.data.message || "Error al crear laboratorista");
        }
      } catch (error) {
        console.error(error);
        alert("Error en la creación");
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