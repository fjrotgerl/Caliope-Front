<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <q-page>
      <h2 class="text-align-center">OPCIONES</h2>
      <div>
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
              <q-tab name="ecu" icon="equalizer" label="Ecualizacion" />
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

              <q-tab-panel name="ecu">
                <div class="text-h4 q-mb-md">Ecualizacion</div>
                <div class="q-pa-md">
                  <div class="q-gutter-md flex row">
                    <div class="flex column text-align-center">
                      <span>nombre1</span>
                    <q-knob
                      :min="0"
                      :max="100"
                      v-model="value1"
                      show-value
                      size="50px"
                      :thickness="0.22"
                      color="teal"
                      track-color="grey-3"
                      class="q-ma-md"
                    />
                    </div>

                    <div class="flex column text-align-center">
                    <span>nombre2</span>
                    <q-knob
                      :min="0"
                      :max="100"
                      v-model="value2"
                      show-value
                      size="50px"
                      :thickness="0.22"
                      color="teal"
                      track-color="grey-3"
                      class="q-ma-md"
                    />
                    </div>

                    <div class="flex column text-align-center">
                      <span>nombre3</span>
                    <q-knob
                      :min="0"
                      :max="100"
                      v-model="value3"
                      show-value
                      size="50px"
                      :thickness="0.22"
                      color="teal"
                      track-color="grey-3"
                      class="q-ma-md"
                    />
                    </div>
                  </div>
                  <q-btn label="Guardar"></q-btn>
                </div>
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
    }
  }
</script>

<style scoped>

</style>
