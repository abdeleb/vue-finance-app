<template>
    <div class="modal">
        <div class="content">
            <div class="head">
                <p>Nuevo Movimiento</p>
                <img @click="closeModal" src="../assets/icons/close-icon.svg" alt="Close" />
            </div>
            <div class="body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['closeModal']);

const closeModal = () => emit('closeModal', true);
</script>

<style lang="scss" scoped></style>
