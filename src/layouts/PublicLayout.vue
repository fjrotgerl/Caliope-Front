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

      <!-- Login modal -->
      <div v-if="this.$q.screen.width > 500">
        <q-dialog
          v-model="loginWindow"
        >
          <q-card style="width: 800px; max-width: 80vw; background: white;">
            <div class="">
              <div class="row">
                <q-card-section class="col-12">
                  <div class="text-h6">
                    Login
                  </div>
                </q-card-section>

                <q-card-actions class="absolute-top-right" >
                  <q-btn flat v-close-popup><i class="material-icons">clear</i></q-btn>
                </q-card-actions>

                <div v-if="this.$q.screen.width < 500">
                  <q-btn flat v-close-popup>LoginLoginLogin</q-btn>
                </div>

              </div>

              <div class="row">
                <q-input class="col-xs" outlined v-model="usuario.username" label="Nombre de usuario" />
              </div>

              <div class="row">
                <q-input style="text-align: center" class="col-xs-12" outlined v-model="usuario.contraseña" label="Contraseña" />
              </div>

              <div class="row">
                <q-card-actions align="center" class="col-xs-12">
                  <q-btn flat v-close-popup @click="login()">Iniciar sesión</q-btn>
                </q-card-actions>
              </div>
            </div>

          </q-card>
        </q-dialog>
      </div>
      <div v-else>
        <q-dialog
          v-model="loginWindow"
        >
          <q-card class="fullscreen">
            <div >
              <div class="row">
                <q-card-section class="col-12">
                  <div class="text-h6">
                    Login
                  </div>
                </q-card-section>

                <q-card-actions class="absolute-top-right" >
                  <q-btn flat v-close-popup><i class="material-icons">clear</i></q-btn>
                </q-card-actions>

                <div v-if="this.$q.screen.width < 500">
                  <q-btn flat v-close-popup>LoginLoginLogin</q-btn>
                </div>

              </div>

              <div class="row">
                <q-input class="col-xs" outlined v-model="usuario.username" label="Nombre de usuario" />
              </div>

              <div class="row">
                <q-input style="text-align: center" class="col-xs-12" outlined v-model="usuario.contraseña" label="Contraseña" />
              </div>

              <div class="row">
                <q-card-actions align="center" class="col-xs-12">
                  <q-btn flat v-close-popup @click="login()">Iniciar sesión</q-btn>
                </q-card-actions>
              </div>
            </div>

          </q-card>
        </q-dialog>
      </div>

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
        loginWindow: false,
        usuario: {
          username: "",
          contraseña: ""
        },
        login: () => {
          this.$axios.post("http://localhost:8080/autenticador", this.usuario)
            .then(response => {
              console.log(response.data);
              if (response.data.status === "autenticado") {
                // push
              }
            })
            .catch(error => console.log(error))
        }
      }
    }
  }
</script>
