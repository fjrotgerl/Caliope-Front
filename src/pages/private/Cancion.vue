<template>
  <q-page class="flex column">
    <div style="width: 80%;margin: 0 auto;">
      <h2 style="background-color: cornflowerblue">CANCIÓN</h2>
      <div class="flex row">
        <q-btn icon="play_arrow" color="primary" style="margin-right: 20px;"></q-btn>
        <div class="flex column justify-between" style="width:90%;">
            <span>Nombre Canción</span>
            <span>Nombre Autor</span>
            <span>Numero reproducciones</span>
        </div>
      </div>
    </div>
    <div style="width: 80%;margin: 0 auto;" class="flex column justify-between">
      <h2 style="background-color: cornflowerblue">COMENTARIOS</h2>
      <div class="flex row" style="margin-bottom: 5%">
        <q-btn icon="person" color="primary" style="margin-right: 20px;"></q-btn>
        <div class="flex column justify-between" style="width:90%;">
          <span>Nombre Usuario</span>
          <p>Cras elit massa, ullamcorper bibendum commodo ut, auctor non nibh. Quisque euismod gravida varius. Vestibulum ac faucibus risus, sed tincidunt ligula. Sed tincidunt urna sit amet enim iaculis, ut scelerisque nunc mollis.
          </p>
        </div>
      </div>
      <div class="flex row">
        <q-btn icon="person" color="primary" style="margin-right: 20px;"></q-btn>
        <div class="flex column justify-between" style="width:90%;">
          <span>Nombre Usuario</span>
          <p>Cras elit massa, ullamcorper bibendum commodo ut, auctor non nibh. Quisque euismod gravida varius. Vestibulum ac faucibus risus, sed tincidunt ligula. Sed tincidunt urna sit amet enim iaculis, ut scelerisque nunc mollis.
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: 'Cancion'
  }
</script>

<style scoped>

</style>
