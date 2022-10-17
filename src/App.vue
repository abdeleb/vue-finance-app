<template>
    <!-- Suspense nos permite cargar el componente antes de la carga asincrona -->
    <suspense>
        <!-- Slot de carga de componente por defecto -->
        <template #default>
            <HomePage />
        </template>
        <!-- Slot de carga de componente antes de la carga -->
        <template #fallback>
            <SplashScreen />
        </template>
    </suspense>
</template>

<script setup>
import SplashScreen from './components/SplashScreen.vue';
import { defineAsyncComponent } from 'vue';

// Componente asincrono que se cargará cuando lo necesitemos
const HomePage = defineAsyncComponent(() => {
    // Promesa para cargar un componente
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(import('./components/HomePage.vue'));
        }, 2500);
    });
});
</script>

<style lang="scss"></style>
