<script>
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
    components: {
        LoginModal: defineAsyncComponent(()=>import('../modal/user/LoginModal.vue'))
    },
    setup() {
    },
})
</script>

<template>
    
</template>

<style scoped>

</style>