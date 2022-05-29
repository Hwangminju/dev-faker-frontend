<template>
  <div v-for="index in dataRowListLength" :key="index" class="data-row">
    <DataRowType class="data-row-type" @emitSelectedDataRowType="onEmitSelectedDataRowType(index, selectedDataRowType)"/>
    <DataRowKeyName class="data-row-key-name" />
    <div>
      <DataRowBasicBoolean v-if="dataRowList[index].dataType === 'basic_boolean'" class="data-row-options" />
      <DataRowBasicColor v-if="dataRowList[index].dataType === 'basic_color'" class="data-row-options" />
    </div>
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <!--div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" />
    <DataRowBasicBoolean class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" />
    <DataRowBasicColor class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" />
    <DataRowBasicDate class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" />
    <DataRowBasicMonth class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" />
    <DataRowBasicWeek class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" />
    <DataRowBasicNumberRange class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" />
    <DataRowBasicWord class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" />
    <DataRowBasicSentences class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" />
    <DataRowBasicTime class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" />
    <DataRowBasicAutoIncrement class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" />
    <DataRowCommerceCard class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'Commerce / Money'" />
    <DataRowCommerceMoney class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'IT / Dummy Image'" />
    <DataRowITDummyImage class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'IT / Url'" />
    <DataRowITUrl class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'IT / User Name'" />
    <DataRowITUserName class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'Location / Full Address'" />
    <DataRowLocationFullAddress class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'Location / Address'" />
    <DataRowLocationAddress class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'Location / Country'" />
    <div></div>
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'Location / Country'" />
    <div></div>
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'Location / Coordinate'" />
    <DataRowLocationCoordinate class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'Location / Phone Number'" />
    <DataRowLocationPhone class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'Personal / Avatar'" />
    <DataRowPersonalAvatar class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'Personal / Company'" />
    <DataRowPersonalCompany class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'Personal / Language'" />
    <DataRowPersonalLanguage class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'Personal / University'" />
    <DataRowPersonalUniversity class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'Products / Car Maker'" />
    <div></div>
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'Products / Car Model'" />
    <div></div>
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div>
  <div class="data-row">
    <DataRowType class="data-row-type" />
    <DataRowKeyName class="data-row-key-name" :dataType="'Products / Movie'" />
    <DataRowProductsMovie class="data-row-options" />
    <button class="data-row-trash"><font-awesome-icon icon="trash-can" /></button>
  </div-->
</template>
<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue';

export default defineComponent({
  components: {
    DataRowType: defineAsyncComponent(() => import('@/components/data/DataRowType.vue')),
    DataRowKeyName: defineAsyncComponent(() => import('@/components/data/DataRowKeyName.vue')),
    DataRowBasicBoolean: defineAsyncComponent(() => import('@/components/data/DataRowBasicBoolean.vue')),
    DataRowBasicColor: defineAsyncComponent(() => import('@/components/data/DataRowBasicColor.vue')),
    /*DataRowBasicDate: defineAsyncComponent(() => import('@/components/data/DataRowBasicDate.vue')),
    DataRowBasicMonth: defineAsyncComponent(() => import('@/components/data/DataRowBasicMonth.vue')),
    DataRowBasicWeek: defineAsyncComponent(() => import('@/components/data/DataRowBasicWeek.vue')),
    DataRowBasicNumberRange: defineAsyncComponent(() => import('@/components/data/DataRowBasicNumberRange.vue')),
    DataRowBasicWord: defineAsyncComponent(() => import('@/components/data/DataRowBasicWord.vue')),
    DataRowBasicSentences: defineAsyncComponent(() => import('@/components/data/DataRowBasicSentences.vue')),
    DataRowBasicTime: defineAsyncComponent(() => import('@/components/data/DataRowBasicTime.vue')),
    DataRowBasicAutoIncrement: defineAsyncComponent(() => import('@/components/data/DataRowBasicAutoIncrement.vue')),
    DataRowCommerceCard: defineAsyncComponent(() => import('@/components/data/DataRowCommerceCard.vue')),
    DataRowCommerceMoney: defineAsyncComponent(() => import('@/components/data/DataRowCommerceMoney.vue')),
    DataRowITDummyImage: defineAsyncComponent(() => import('@/components/data/DataRowITDummyImage.vue')),
    DataRowITUrl: defineAsyncComponent(() => import('@/components/data/DataRowITUrl.vue')),
    DataRowITUserName: defineAsyncComponent(() => import('@/components/data/DataRowITUserName.vue')),
    DataRowLocationFullAddress: defineAsyncComponent(() => import('@/components/data/DataRowLocationFullAddress.vue')),
    DataRowLocationAddress: defineAsyncComponent(() => import('@/components/data/DataRowLocationAddress.vue')),
    DataRowLocationCoordinate: defineAsyncComponent(() => import('@/components/data/DataRowLocationCoordinate.vue')),
    DataRowLocationPhone: defineAsyncComponent(() => import('@/components/data/DataRowLocationPhone.vue')),
    DataRowPersonalAvatar: defineAsyncComponent(() => import('@/components/data/DataRowPersonalAvatar.vue')),
    DataRowPersonalCompany: defineAsyncComponent(() => import('@/components/data/DataRowPersonalCompany.vue')),
    DataRowPersonalLanguage: defineAsyncComponent(() => import('@/components/data/DataRowPersonalLanguage.vue')),
    DataRowPersonalUniversity: defineAsyncComponent(() => import('@/components/data/DataRowPersonalUniversity.vue')),
    DataRowProductsMovie: defineAsyncComponent(() => import('@/components/data/DataRowProductsMovie.vue')),*/
  },
  setup() {
    let dataRowList = ref([
      {
        dataType: "basic_boolean"
      }
    ]);
    let dataRowListLength = ref(1);
    console.log(dataRowList.value[0]);

    const onEmitSelectedDataRowType = ((index, selectedDataRowType) => {
      dataRowList.value[index].dataType = selectedDataRowType;
      console.log(dataRowList.value.dataType);
    });

    return {
      dataRowList,
      dataRowListLength,
      onEmitSelectedDataRowType
    }
  }
});
</script>
<style lang="scss" scoped>
.data-row {
  display: grid;
  grid-template-columns: 250px 250px 1fr 50px;
  padding-top: 1rem;
  padding-bottom: 0.5rem;

  :where(.data-row-type, .data-row-key-name) {
    padding-right: 2rem;
  }

  .data-row-trash {
    color: #999999;
    &:hover {
      color: #b91c1c;
    }
  }
}
</style>
