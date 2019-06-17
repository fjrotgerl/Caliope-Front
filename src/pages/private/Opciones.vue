<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <q-page class="flex column" :style="color">
      <h2 class="text-align-center">OPCIONES</h2>
      <div class="bg-white">
        <q-splitter
          v-model="splitterModel"
        >
          <template v-slot:before>
            <q-tabs
              v-model="tab"
              vertical
              class="text-teal"
            >
              <q-tab name="info" icon="info" label="Informacion" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              animated
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="info">
                <div class="text-h4 q-mb-md">Informacion basica</div>
                <q-input
                  ref="user.username"
                  filled
                  v-model="user.username"
                  label="Nombre de usuario"
                  lazy-rules
                  :rules="[ val => val.length >= 3  && val.length <= 32 || 'Introduce entre 3 y 32 caracteres']"
                />

                <q-input
                  ref="user.email"
                  filled
                  v-model="user.email"
                  label="Email"
                  lazy-rules
                  :rules="[ val => val.includes('@') && val.includes('.') || 'Revisa tu dirección de correo']"
                />

                <q-input
                  ref="user.nombre"
                  filled
                  v-model="user.nombre"
                  label="Nombre"
                  lazy-rules
                  :rules="[ val => val.includes('@') && val.includes('.') || 'Revisa tu dirección de correo']"
                />

                <q-input
                  ref="user.apellidos"
                  filled
                  v-model="user.apellidos"
                  label="Apellidos"
                  style="margin-bottom: 20px"
                />

                <q-input
                  ref="user.password"
                  filled
                  type="password"
                  v-model="user.password"
                  label="Contraseña"
                  lazy-rules
                  :rules="[ val => val.length >= 3  && val.length <= 32 || 'Introduce entre 3 y 32 caracteres']"
                />

                <q-btn
                  type="submit"
                  :loading="submitting"
                  label="Guardar"
                  class="q-mt-md"
                  color="teal"
                >
                  <template v-slot:loading>
                    <q-spinner-facebook />
                  </template>
                </q-btn>
              </q-tab-panel>

            </q-tab-panels>
          </template>

        </q-splitter>
      </div>
    </q-page>
</template>

<script>
  import constants from '../../statics/js/configuration'


  export default {
    name: 'Opciones',
    data () {
      return {
        color:"",
        model: null,
        calidad: "",
        val: 'media',
        test: '',
        submitting: false,
        tab: 'info',
        splitterModel: 20,
        step: 1,
        accept: false,
        user: { },

        getUserData: async () => {
          let userId = localStorage.getItem("user");
          await this.$axios.get(constants.REST_API_URL + "/getUsuarioById/" + userId)
            .then(response => {
              this.user = response.data;
            });
        }
      }
    },
    async beforeMount(){
      await this.getUserData();
      this.color = this.$tools.randomColor();
    }
  }
</script>

<style scoped>

</style>
