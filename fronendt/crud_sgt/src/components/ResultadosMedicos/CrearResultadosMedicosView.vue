<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header bg-primary text-white text-center">
        <h4>Registrar Resultado</h4>
      </div>

      <div class="card-body">
        <form @submit.prevent="crearResultado">

          <div class="mb-3">
            <label>Paciente</label>
            <select v-model="resultado.cod_ingreso" class="form-control" required>
              <option value="">Seleccione un paciente</option>
              <option v-for="p in pacientes" :key="p.cod_ingreso" :value="p.cod_ingreso">
                {{ p.cod_ingreso }} - {{ p.nombre }} {{ p.apellido }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label>Laboratorista</label>
            <select v-model="resultado.cod_laboratorista" class="form-control" required>
              <option value="">Seleccione un laboratorista</option>
              <option v-for="l in laboratoristas" :key="l.cod_laboratorista" :value="l.cod_laboratorista">
                {{ l.cod_laboratorista }} - {{ l.nombre }} {{ l.apellido }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label>HDL</label>
            <input v-model="resultado.hdl" class="form-control" required />
          </div>

          <div class="mb-3">
            <label>LDL</label>
            <input v-model="resultado.ldl" class="form-control" required />
          </div>

          <div class="mb-3">
            <label>Triglicéridos</label>
            <input v-model="resultado.trigliceridos" class="form-control" required />
          </div>

          <div class="btn-group w-100">
            <button type="submit" class="btn btn-success">Guardar</button>
            <router-link :to="{ name: 'ResultadosMedicosView' }" class="btn btn-warning">Cancelar</router-link>
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
  data() {
    return {
      resultado: {
        cod_ingreso: "",
        cod_laboratorista: "",
        hdl: "",
        ldl: "",
        trigliceridos: "",
      },
      pacientes: [],
      laboratoristas: [],
    };
  },
  created() {
    this.cargarListas();
  },
  methods: {
    async cargarListas() {
      try {
        const [pacs, labs] = await Promise.all([
          axios.get("http://127.0.0.1:8081/api/pacientes/pacientes/"),
          axios.get("http://127.0.0.1:8081/api/laboratoristas/laboratoristas/"),
        ]);
        this.pacientes = pacs.data.pacientes || [];
        this.laboratoristas = labs.data.laboratoristas || [];
      } catch (error) {
        console.error(error);
        alert("Error al cargar listas");
      }
    },
    async crearResultado() {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8081/api/resultados/resultados/",
          this.resultado
        );
        if (res.data.message.includes("exitosamente")) {
          alert("✅ Resultado registrado correctamente");
          this.$router.push({ name: "ResultadosMedicosView" });
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Error al crear resultado");
      }
    },
  },
};
</script>
