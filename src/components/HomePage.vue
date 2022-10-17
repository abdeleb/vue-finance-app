<template>
    <LayoutMain>
        <!-- Slot header -->
        <template #header>
            <HeaderMain />
        </template>
        <!-- Slot contents -->
        <template #resume>
            <ResumeContent
                :total-label="'Ahorro total'"
                :date-label="dateLabel"
                :total-amount="totalAmount"
                :date-amount="dateAmount"
            >
                <template #graphic>
                    <GraphicMovements :amounts="amounts" @select="select" />
                </template>
                <template #action>
                    <AddMovement @create="create" />
                </template>
            </ResumeContent>
        </template>
        <!-- Slot movement history -->
        <template #movements>
            <MovementsHistory :movements="movements" @remove="remove" />
        </template>
    </LayoutMain>
</template>

<script setup>
import LayoutMain from './LayoutMain.vue';
import HeaderMain from './HeaderMain.vue';
import ResumeContent from './ResumeContent.vue';
import MovementsHistory from './MovementsHistroy/index.vue';
import AddMovement from './AddMovement.vue';
import GraphicMovements from './GraphicMovements.vue';
import { computed, ref } from 'vue';

// Label de fecha dinámica
const dateLabel = ref(null);

// Monto de fecha dinámico
const dateAmount = ref(null);

// Lista de movimientos
const movements = ref([
    {
        id: 0,
        title: 'Movimiento 1',
        description: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
        amount: 100,
        date: new Date('07-01-2022'),
    },
    {
        id: 1,
        title: 'Movimiento 2',
        description: 'Lorem ipsum dolor sit amet',
        amount: 200,
        date: new Date('07-10-2022'),
    },
    {
        id: 2,
        title: 'Movimiento 3',
        description: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
        amount: 500,
        date: new Date('07-15-2022'),
    },
    {
        id: 3,
        title: 'Movimiento 4',
        description: 'Lorem ipsum dolor sit amet',
        amount: 200,
        date: new Date('07-17-2022'),
    },
    {
        id: 4,
        title: 'Movimiento 5',
        description: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
        amount: -400,
        date: new Date('07-19-2022'),
    },
    {
        id: 5,
        title: 'Movimiento 6',
        description: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
        amount: -600,
        date: new Date('07-21-2022'),
    },
    {
        id: 6,
        title: 'Movimiento 7',
        description: 'Lorem ipsum dolor sit amet',
        amount: -300,
        date: new Date('07-22-2022'),
    },
    {
        id: 7,
        title: 'Movimiento 8',
        description: 'Lorem ipsum dolor sit amet',
        amount: 0,
        date: new Date('07-25-2022'),
    },
    {
        id: 8,
        title: 'Movimiento 9',
        description: 'Lorem ipsum dolor sit amet',
        amount: 300,
        date: new Date('07-26-2022'),
    },
    {
        id: 9,
        title: 'Movimiento 10',
        description: 'Lorem ipsum dolor sit amet',
        amount: 400,
        date: new Date('07-27-2022'),
    },
]);

// Lista de montos
const amounts = computed(() => {
    const today = new Date();
    return movements.value
        .filter((movement) => {
            const daysDiff = (today.getTime() - movement.date.getTime()) / (1000 * 60 * 60 * 24);
            return daysDiff <= 30;
        })
        .map((movement) => movement.amount)
        .map((_, i, lastDays) => {
            const lastMovements = lastDays.slice(0, i + 1);
            return lastMovements.reduce((accAmount, amount) => accAmount + amount, 0);
        });
});

// Obteniendo el monto total
const totalAmount = computed(() =>
    movements.value
        .map((movement) => movement.amount)
        .reduce((accAmount, amount) => accAmount + amount, 0),
);

// Crear un movimiento
const create = (movement) => {
    const nextId = Math.max(...movements.value.map((movement) => movement.id)) + 1;

    movements.value.push({
        id: nextId,
        ...movement,
    });
};

// Eliminar un movimiento
const remove = (id) => {
    movements.value = movements.value.filter((movement) => movement.id !== id);
};

// Al seleccionar un movimiento
const select = (selectedAmount, index) => {
    // Monto en la fecha seleccionada
    dateAmount.value = selectedAmount;

    // Label en la fecha seleccionada
    const dateString = movements.value[index].date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    dateLabel.value = `Ahorro hasta el ${dateString}`;
};
</script>

<style lang="scss" scoped></style>
