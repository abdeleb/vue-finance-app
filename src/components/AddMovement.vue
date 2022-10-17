<template>
    <!-- Botón para abrir la ventana modal -->
    <input @click="showModal = true" type="button" value="Agregar movimiento" />
    <!-- La ventana modal -->
    <teleport to="#app">
        <div v-show="showModal">
            <ModalWindows @close-modal="showModal = false">
                <form @submit.prevent="submit" class="form-addmovement">
                    <div class="field">
                        <label>Título</label>
                        <input type="text" v-model="title" />
                    </div>
                    <div class="field">
                        <label>Monto</label>
                        <input type="number" v-model="amount" />
                    </div>
                    <div class="field">
                        <label>Descripción</label>
                        <textarea rows="4" v-model="description"></textarea>
                    </div>
                    <div class="field">
                        <label>Tipo de movimiento</label>
                        <label class="radio-label">
                            <input
                                v-model="movementType"
                                type="radio"
                                value="Ingreso"
                                name="income"
                                checked
                            />
                            <span>Ingreso</span>
                        </label>
                        <label class="radio-label">
                            <input
                                v-model="movementType"
                                type="radio"
                                value="Gasto"
                                name="income"
                            />
                            <span>Gasto</span>
                        </label>
                    </div>
                    <div class="action">
                        <input type="submit" value="Agregar Movimiento" />
                    </div>
                </form>
            </ModalWindows>
        </div>
    </teleport>
</template>

<script setup>
import { ref, watch } from 'vue';
import ModalWindows from './ModalWindows.vue';

const showModal = ref(false);
const title = ref('');
const amount = ref(0);
const description = ref('');
const movementType = ref('Ingreso');

const emits = defineEmits(['create']);

const submit = () => {
    // Agregar datos de movimientos
    emits('create', {
        title: title.value,
        description: description.value,
        amount: movementType.value === 'Ingreso' ? amount.value : -amount.value,
        date: new Date(),
    });

    // <!-- Todo: Actualizar base de datos mediante una API -->

    // Reiniciando campos
    title.value = '';
    description.value = '';
    amount.value = 0;
    movementType.value = 'Ingreso';

    // Cerrar formulario y ventana modal
    showModal.value = false;
};

// Desactivar overflowy en el body
watch(showModal, () => {
    const body = document.body;
    body.style.overflowY = showModal.value ? 'hidden' : 'auto';
});
</script>

<style lang="scss" scoped></style>
