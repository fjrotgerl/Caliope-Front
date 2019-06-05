<template>
  <q-page class="flex column">
    <h2>Username</h2>
    <h3>Administrador</h3>
    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-3"
            align="justify"
            narrow-indicator
          >
            <q-tab name="users" label="Usuarios" />
            <q-tab name="songs" label="Canciones" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="users">
              <div class="text-h6">Lista de usuarios</div>
              <div>
                <div class="row flex justify-between" style="border:1px solid black;padding:10px;">
                  <div class="column flex">
                    <span>Username</span>
                    <span>Seguidores</span>
                    <span>Seguidos</span>
                  </div>
                  <div class="row flex">
                    <button class="expulsar">EXPULSAR</button>
                    <button class="modificar">MODIFICAR</button>
                  </div>
                </div>
                <div class="row flex justify-between" style="border:1px solid black;padding:10px;">
                  <div class="column flex">
                    <span>Username</span>
                    <span>Seguidores</span>
                    <span>Seguidos</span>
                  </div>
                  <div class="row flex">
                    <button class="expulsar">EXPULSAR</button>
                    <button class="modificar">MODIFICAR</button>
                  </div>
                </div>
                <div class="row flex justify-between" style="border:1px solid black;padding:10px;">
                  <div class="column flex">
                    <span>Username</span>
                    <span>Seguidores</span>
                    <span>Seguidos</span>
                  </div>
                  <div class="row flex">
                    <button class="expulsar">EXPULSAR</button>
                    <button class="modificar">MODIFICAR</button>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="songs">
              <div class="text-h6">Lista de canciones</div>
              <div>
                <div class="row flex cancion">
                  <q-btn icon="play_arrow" color="primary" style="margin-right: 20px;"></q-btn>
                  <div class="flex column justify-between" style="width:90%;">
                    <div class="flex row justify-around">
                      <span>Nombre Canción</span>
                      <span>Nombre Autor</span>
                    </div>
                    <div class="flex row justify-around">
                      <span>Comentar</span>
                      <span>Me gusta</span>
                      <span>...</span>
                    </div>
                  </div>
                </div>
                <div class="row flex cancion">
                  <q-btn icon="play_arrow" color="primary" style="margin-right: 20px;"></q-btn>
                  <div class="flex column justify-between" style="width:90%;">
                    <div class="flex row justify-around">
                      <span>Nombre Canción</span>
                      <span>Nombre Autor</span>
                    </div>
                    <div class="flex row justify-around">
                      <span>Comentar</span>
                      <span>Me gusta</span>
                      <span>...</span>
                    </div>
                  </div>
                </div>
                <div class="row flex cancion">
                  <q-btn icon="play_arrow" color="primary" style="margin-right: 20px;"></q-btn>
                  <div class="flex column justify-between" style="width:90%;">
                    <div class="flex row justify-around">
                      <span>Nombre Canción</span>
                      <span>Nombre Autor</span>
                    </div>
                    <div class="flex row justify-around">
                      <span>Comentar</span>
                      <span>Me gusta</span>
                      <span>...</span>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: 'Administrador',
    data () {
      return {
        tab: 'users'
      }
    }
  }
</script>

<style scoped>

</style>
