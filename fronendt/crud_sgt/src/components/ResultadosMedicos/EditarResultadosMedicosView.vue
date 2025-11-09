<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header bg-warning text-dark text-center">
        <h4>Editar Resultado</h4>
      </div>

      <div class="card-body">
        <form @submit.prevent="actualizarResultado">
          <div class="mb-3">
            <label>ID Resultado</label>
            <input :value="idResultado" class="form-control" disabled />
          </div>

          <div class="mb-3">
            <label>Paciente</label>
            <select v-model="resultado.cod_ingreso" class="form-control">
              <option v-for="p in pacientes" :key="p.cod_ingreso" :value="p.cod_ingreso">
                {{ p.cod_ingreso }} - {{ p.nombre }} {{ p.apellido }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label>Laboratorista</label>
            <select v-model="resultado.cod_laboratorista" class="form-control">
              <option v-for="l in laboratoristas" :key="l.cod_laboratorista" :value="l.cod_laboratorista">
                {{ l.cod_laboratorista }} - {{ l.nombre }} {{ l.apellido }}
              </option>
            </select>
          </div>

          <div class="mb-3"><label>HDL</label><input v-model="resultado.hdl" class="form-control" /></div>
          <div class="mb-3"><label>LDL</label><input v-model="resultado.ldl" class="form-control" /></div>
          <div class="mb-3"><label>Triglicéridos</label><input v-model="resultado.trigliceridos" class="form-control" /></div>

          <div class="btn-group w-100">
            <button type="submit" class="btn btn-success">Guardar</button>
            <router-link :to="{ name: 'ResultadosMedicosView' }" class="btn btn-secondary">Cancelar</router-link>
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
  props: ["ID_EM"],
  data() {
    return {
      resultado: {},
      pacientes: [],
      laboratoristas: [],
    };
  },
  computed: {
    idResultado() {
      return this.ID_EM || this.$route.params.ID_EM;
    },
  },
  async created() {
    await this.cargarListas();
    await this.obtenerResultado();
  },
  methods: {
    async cargarListas() {
      const [pacs, labs] = await Promise.all([
        axios.get("http://127.0.0.1:8081/api/pacientes/pacientes/"),
        axios.get("http://127.0.0.1:8081/api/laboratoristas/laboratoristas/"),
      ]);
      this.pacientes = pacs.data.pacientes || [];
      this.laboratoristas = labs.data.laboratoristas || [];
    },
    async obtenerResultado() {
      const res = await axios.get(`http://127.0.0.1:8081/api/resultados/resultados/${this.idResultado}/`);
      if (res.data.message === "Success") this.resultado = res.data.resultado;
      else alert(res.data.message);
    },
    async actualizarResultado() {
      const res = await axios.put(
        `http://127.0.0.1:8081/api/resultados/resultados/${this.idResultado}/`,
        this.resultado
      );
      if (res.data.message === "Updated") {
        alert("Resultado actualizado correctamente");
        this.$router.push({ name: "ResultadosMedicosView" });
      } else alert(res.data.message);
    },
  },
};
</script>
