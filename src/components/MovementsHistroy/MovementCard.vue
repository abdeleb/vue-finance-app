<template>
    <div class="movement">
        <div class="movement__content">
            <h3>{{ title }}</h3>
            <p>{{ desc }}</p>
        </div>
        <div class="movement__action">
            <img src="../../assets/icons/trash-icon.svg" alt="Trash" @click="remove" />
            <span :class="{ 'curr-negative': isNegative, 'curr-positive': !isNegative }">
                {{ amountCurrency }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { toRefs, computed } from 'vue';
import { currencyFormatter } from '../../utils/formatter';

const props = defineProps({
    id: { type: Number },
    title: { type: String },
    desc: { type: String },
    amount: { type: Number },
});

const { id, title, desc, amount } = toRefs(props);

const amountCurrency = computed(() => currencyFormatter.format(amount.value));

const emit = defineEmits(['remove']);

// Comunicando al padre que hemos eliminado un item
const remove = () => {
    emit('remove', id.value);
};

// Color de la moneda
const isNegative = computed(() => amount.value < 0);
</script>

<style lang="scss" scoped></style>
