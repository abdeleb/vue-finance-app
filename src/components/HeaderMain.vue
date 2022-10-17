<template>
    <header class="header">
        <img @click="reload" src="../assets/icons/cashflow-icon.svg" alt="LogoHeader" />
        <h1>Finance <span>App</span></h1>
    </header>
</template>

<script setup>
// Método para recargar la aplicación
const reload = () => location.reload();
</script>

<style lang="scss" scoped></style>
