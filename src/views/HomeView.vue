<template>
  <div class="justify-center lg:items-center bg-[#99FFcc] flex flex-wrap p-8 min-h-screen w-screen">
    <div class=" lg:w-1/2 lg:p-10 w-full flex flex-col justify-center">
      <h1 class="lg:text-left md:mb-8 mb-2 text-gray-900 font-semibold">See what your offer is really worth</h1>
      <h2 class="lg:text-left text-gray-500 font-semibold">get valuable insights, make better decisions</h2>
    </div>
    <Form @offerSubmit="(offerInfo) => $emit('offerSubmit', offerInfo)" />
  </div>
</template>

<script>
// @ is an alias to /src
import { getAllOffers } from '@/firebase';
import Form from '@/components/Form.vue';

export default {
  name: 'HomeView',
  components: {
    Form
  },
  data() {
    return {
      offers: []
    }
  },
}
</script>
