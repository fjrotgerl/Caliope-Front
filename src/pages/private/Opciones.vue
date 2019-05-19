<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <q-page>
      <h2>OPCIONES</h2>
      <div>
        <q-splitter
          v-model="splitterModel"
          style="height: 250px"
        >

          <template v-slot:before>
            <q-tabs
              v-model="tab"
              vertical
              class="text-teal"
            >
              <q-tab name="info" icon="info" label="Informacion" />
              <q-tab name="calidad" icon="high_quality" label="Calidad" />
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

              <q-tab-panel name="calidad">
                <div class="text-h4 q-mb-md">Calidad</div>
                <div class="q-pa-md">
                  <q-list link>
                    <q-item tag="label" v-ripple>
                      <q-item-section avatar>
                        <q-radio v-model="calidad" val="baja" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Baja</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item tag="label" v-ripple>
                      <q-item-section avatar>
                        <q-radio v-model="calidad" val="media" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Media</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item tag="label" v-ripple>
                      <q-item-section avatar top>
                        <q-radio v-model="calidad" val="alta" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Alta</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item tag="label" v-ripple>
                      <q-item-section avatar top>
                        <q-radio v-model="calidad" val="muy-alta" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Muy alta</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-tab-panel>

              <q-tab-panel name="ecu">
                <div class="text-h4 q-mb-md">Ecualizacion</div>
                <div class="q-pa-md" style="max-width: 300px">
                  <div class="q-gutter-md">
                    <q-select v-model="model" :options="options" label="Predeterminada" />
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
  export default {
    name: 'Opciones',
    data () {
      return {
        model: null,
        calidad: "",
        options: [
          'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
        ],
        val: 'media',
        test: '',
        submitting: false,
        tab: 'info',
        splitterModel: 20,
        step: 1,
        accept: false,
        user: {
          username: '',
          email: '',
          password: '',
          nombre: '',
          apellidos: '',
          edad: '',
          direccion: '',
          telefono: '',
          fechaNacimiento: ''
        }

      }
    }
  }
</script>

<style scoped>

</style>
