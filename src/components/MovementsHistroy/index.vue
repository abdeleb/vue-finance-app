<template>
    <div class="movements">
        <h2 class="movements__title">Historial</h2>
        <div class="movements__content">
            <!-- Creamos un iterador sobre para el componente movimiento -->
            <MovementCard
                v-for="{ id, title, description, amount } in movements"
                :key="id"
                :id="id"
                :title="title"
                :desc="description"
                :amount="amount"
                @remove="remove"
            />
        </div>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';
import MovementCard from './MovementCard.vue';

const props = defineProps({
    movements: {
        type: Array,
        default: () => [], // definimos como arrayFunc para que sea reactivo
    },
});

// Para que los props sean reactivos
const { movements } = toRefs(props);

const emits = defineEmits(['remove']);

const remove = (id) => {
    emits('remove', id);
};
</script>

<style lang="scss" scoped></style>
