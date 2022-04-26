<template>
    <v-container>
        <v-row style="height: 300px">
        </v-row>
        <v-row>
            <v-col v-for="n in 3" :key="n" cols="12" md="4">
                <v-card class="mx-5" style="height: 300px">
                #{{ n }}번째 카드
                </v-card>
            </v-col>
        </v-row>
        <v-row>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainView',

  components: {

  },
});
</script>
