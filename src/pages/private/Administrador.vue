<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="flex column">
    <h2 class="text-align-center">Panel de control de administrador</h2>
    <h3 class="text-align-center">{{user.username}}</h3>
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
                <div class="row flex justify-between usuario" v-for="usuario in user">
                  <div class="column flex">
                    <span class="text-weight-bold">{{usuario.username}}</span>
                    <span>Seguidores: {{usuario.numeroSeguidores}}</span>
                    <span>Usuarios seguidos: {{usuario.numeroSeguidos}}</span>
                  </div>
                  <div class="column flex">
                    <q-btn class="expulsar" style="margin-bottom: 10px;">EXPULSAR</q-btn>
                    <q-btn class="modificar">MODIFICAR</q-btn>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="songs">
              <div>

                <q-table
                  title="Lista de canciones"
                  :data="mySongs"
                  :columns="columns"
                  row-key="id"
                  selection="single"
                  :selected.sync="selected"
                  :filter="filter"
                  :loading="loading"
                >

                  <template v-slot:top>
                    <q-btn class="on-right" flat dense color="primary" :disable="loading" icon="delete" label="Eliminar" @click="removeSongExtra" ></q-btn>
                    <q-space ></q-space>
                    <q-input borderless dense debounce="300" color="primary" v-model="filter">
                      <template v-slot:append>
                        <q-icon name="search" ></q-icon>
                      </template>
                    </q-input>
                  </template>

                </q-table>

              </div>
            </q-tab-panel>
          </q-tab-panels>

        </q-card>
      </div>
    </div>

    <q-dialog v-model="noSongSelected">
      <q-card>
        <q-card-section>
          <div class="text-h6">Información</div>
        </q-card-section>

        <q-card-section>
          No has seleccionado ningúna canción
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Aceptar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="areYouSure">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alerta</div>
        </q-card-section>

        <q-card-section>
          ¿Está seguro de que sea eliminar la canción?
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Sí" color="primary" @click="removeSong" v-close-popup />
          <q-btn flat label="No" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
  import constants from '../../statics/js/configuration'
  import moment from 'moment'

  export default {
    name: 'Administrador',
    data () {
      return {
        /* MODALS */
        noSongSelected: false,
        areYouSure: false,
        /* CANCIONES TABLE */
        selected: [],
        columns: [
          { name: 'nombre', field: "nombre", label: 'Nombre', align: 'center', sortable: true },
          { name: 'autor', field: row => row.autor.username, label: 'Autor', align: 'center', sortable: true },
          { name: 'reproducciones', field: 'reproducciones', label: 'Reproducciones', align: 'center', sortable: true },
          { name: 'genero', field: row => row.genero.nombre, label: 'Genero', align: 'center', sortable: true },
          { name: 'fechaRegistro', field: 'fechaRegistro', label: 'Fecha registro', align: 'center', sortable: true }
        ],
        loading: false,
        filter: '',
        rowCount: 10,
        removeSongExtra: () => {
          if (this.selected[0] === undefined) {
            this.noSongSelected = true;
          } else {
            this.areYouSure = true;

          }
        },
        removeSong: () => {
          this.$axios.put(constants.REST_API_URL + "/deleteSongById/" + this.selected[0].id)
            .catch(error => console.error(error));
        },
        mySongs: {
          autor: {
            username: ""
          },
        },

        user: {},
        tab: 'users',
        test: () => console.log(this.mySongs),
        getUserSongs: async () => {
          await this.$axios.get(constants.REST_API_URL + "/getCanciones/")
            .then(response => {
              this.mySongs = response.data;
              for (let item of this.mySongs) {
                item.fechaRegistro = moment(item.fechaRegistro).format(constants.DATE_FORMAT);
              }
            })
            .catch(error => console.error(error))
        },
        getUserData: async () => {
        await this.$axios.get(constants.REST_API_URL + "/getUsuarios/")
          .then(response => {
            this.user = response.data;
          });
      }
      }
    },
  async beforeMount(){
    await this.getUserData();
    await this.getUserSongs();
  }
  }
</script>

<style scoped>

</style>
