<template>
    <div class="header-container">
        <slot name="header"></slot>
    </div>
    <div class="resume-container">
        <slot name="resume"></slot>
    </div>
    <div class="movements-container">
        <div class="head" @click="showMovements = !showMovements">
            <div class="grip"></div>
        </div>
        <div class="body" v-show="showMovements">
            <slot name="movements"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showMovements = ref(false);
</script>

<style lang="scss" scoped></style>
