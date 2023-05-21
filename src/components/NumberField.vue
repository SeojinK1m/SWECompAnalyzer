<template>
    <div class="mb-4 flex bg-emerald-500 rounded-lg w-full">
        <div class="flex items-center w-10 " v-if="!this.right">
            <p class="mx-auto font-semibold text-white">{{ symbol }}</p>
        </div>
        <input 
            type="number" 
            id="salary" 
            :class="`bg-white text-sm rounded-${right ? 'l' : 'r'}-lg block w-full p-2.5`"
            :placeholder = placeholder
            required = "true"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        >
        <div class="flex items-center w-10" v-if="this.right">
            <p class="mx-auto font-semibold text-white">{{ symbol }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NumberField',
        data() {
            return {

            }
        },
        props: ['modelValue', 'placeholder', 'symbol', 'right'],
        emits: ['update:modelValue']
    }
</script>