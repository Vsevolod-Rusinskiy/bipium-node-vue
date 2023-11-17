<template>
  <q-form @submit.prevent='onSubmit' class='q-gutter-md'>
    <q-input v-model='orderData.comment' label='Comment' label-class='text-h6 text-weight-bold' />
    <q-select
      v-model='orderData.status'
      label='Status'
      :options='statusOptions'
      label-class='text-h6 text-weight-bold'
    />
    <div class='q-mt-lg'>
      <q-btn label='Create Order' type='submit' color='primary' class='full-width' />
    </div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';

const q = useQuasar();
const orderData = ref({
  catalog: 'Заказы',
  comment: '',
  status: ''
});

const statusOptions = [
  { label: 'Новый', value: '1' },
  { label: 'Выполнен', value: '2' }
];

const onSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/create-record', orderData.value);
    console.log(response);
    q.notify({ type: 'positive', message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    q.notify({ type: 'negative', message: 'Error creating order: ' + error.message });
  }
};
</script>

<style>
.full-width {
  width: 100%;
}
</style>
