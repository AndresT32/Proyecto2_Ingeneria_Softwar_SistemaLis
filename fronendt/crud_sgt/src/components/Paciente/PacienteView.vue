<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header bg-primary text-white text-center">
        <h4>Lista de Pacientes</h4>
      </div>

      <div class="card-body">


        <table class="table table-striped table-hover">
          <thead class="table-dark">
            <tr>
              <th>Código Ingreso</th>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pac in pacientes" :key="pac.cod_ingreso">
              <td>{{ pac.cod_ingreso }}</td>
              <td>{{ pac.documento }}</td>
              <td>{{ pac.nombre }}</td>
              <td>{{ pac.apellido }}</td>
              <td>{{ pac.direccion }}</td>
              <td>{{ pac.telefono }}</td>
              <td>
                <div class="btn-group">
                  <router-link
                    :to="{
                      name: 'EditarPacienteView',
                      params: { cod_ingreso: pac.cod_ingreso },
                    }"
                    class="btn btn-warning btn-sm"
                  >
                    Editar
                  </router-link>
                  <button
                    @click="borrarPaciente(pac.cod_ingreso)"
                    class="btn btn-danger btn-sm"
                  >
                    Borrar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card-footer text-center text-muted">@IngdeSw</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PacienteView",
  data() {
    return {
      pacientes: [],
    };
  },
  created() {
    this.obtenerPacientes();
  },
  methods: {
    async obtenerPacientes() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8081/api/pacientes/pacientes/"
        );
        this.pacientes = response.data.pacientes || [];
      } catch (error) {
        console.error("Error al obtener pacientes:", error);
        alert("Error al cargar la lista de pacientes");
      }
    },
    async borrarPaciente(cod_ingreso) {
      if (confirm("¿Seguro que deseas eliminar este paciente?")) {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8081/api/pacientes/pacientes/${cod_ingreso}/`
          );
          if (response.data.Message === "Paciente eliminado") {
            alert("Paciente eliminado correctamente");
            this.obtenerPacientes();
          } else {
            alert(response.data.Message);
          }
        } catch (error) {
          console.error("Error al borrar paciente:", error);
          alert("Error al eliminar paciente");
        }
      }
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
}
.table th,
.table td {
  vertical-align: middle;
}
</style>
