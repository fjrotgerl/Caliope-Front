<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"

      >
        <q-step
          :name="1"
          title="Introduce tus credenciales"
          icon="settings"
          :done="step > 1"
        >
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

        </q-step>

        <q-step
          :name="2"
          title="Datos personales"
          caption="Opcional"
          icon="create_new_folder"
          :done="step > 2"
        >

          <div class="q-gutter-md">

            <q-input ref="user.nombre" filled v-model="user.nombre" label="Nombre"/>

            <q-input ref="user.apellidos" filled v-model="user.apellidos" label="Apellidos"/>

            <q-input ref="user.direccion" filled v-model="user.direccion" label="Direccion"/>

            <q-input ref="user.telefono" filled v-model="user.telefono" label="Telefono"
                     mask="### ### ###"/>

            <q-input filled v-model="user.fechaNacimiento" mask="date" :rules="['user.fechaNacimiento']" label="Fecha de nacimiento">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-date v-model="user.fechaNacimiento" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

          </div>

        </q-step>


        <q-step
          :name="3"
          title="Finalizar"
          icon="add_comment"
        >
          Para finalizar acepte los términos y condiciones. <br>

          <q-toggle v-model="accept" label="Acepto los términos y condiciones" />

        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 3 ? 'Finalizar' : 'Siguiente'" />
            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Atras" class="q-ml-sm" />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'Register',
  data () {
    return {
      step: 1,
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
