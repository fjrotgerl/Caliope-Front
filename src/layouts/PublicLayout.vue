<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout view="hHh lpR fFf">

    <q-header reveal bordered class="bg-primary text-accent">
      <q-toolbar>
        <q-toolbar-title>
          <p>PARTE PUBLICA</p>
        </q-toolbar-title>

        <q-btn flat rounded color="accent" label="Ir a la parte privada (solo dev)" @click="$router.push('/user')"/>

        <q-btn flat rounded color="accent" label="Preguntas frecuentes" @click="$router.push('/faq')"/>

        <q-btn flat rounded color="accent" label="Iniciar sesión"  @click="loginWindow = true"/>

        <q-btn flat rounded color="accent" label="Registrarse" @click="$router.push('/registro')"/>

      </q-toolbar>

      <q-dialog
        v-model="loginWindow"
      >
        <q-card style="width: 500px; max-width: 80vw; background: white;">
          <div class="row">
            <q-card-section class="col-xs">
              <div class="text-h6">Login</div>
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal ">
              <q-btn flat v-close-popup><i class="material-icons">clear</i></q-btn>
            </q-card-actions>
          </div>
          <q-card-section>
            Click/Tap on the backdrop.
          </q-card-section>
        </q-card>
      </q-dialog>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
  export default {
    data () {
      return {
        loginWindow: false
      }
    }
  }
</script>
