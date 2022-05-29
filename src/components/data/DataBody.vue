<template>
  <section>
    <div class="btn-group">
      <button class="add-row-btn">
        <font-awesome-icon :icon="['fa', 'plus']" class="font-awesome-icon" /><span>Add Row</span>
      </button>
      <button class="save-btn" @click="emitDataRowList">
        <font-awesome-icon 
          :icon="['far', 'floppy-disk']" 
          class="font-awesome-icon" />
          <span>Save</span>
      </button>
      <button class="preview-btn">
        <font-awesome-icon :icon="['fa', 'align-left']" class="font-awesome-icon" /><span>Preview</span>
      </button>
    </div>
    <div>
      <div class="data-grid-head">
        <p>Data Type</p>
        <p>Data Key Name</p>
        <p>Data Options</p>
      </div>
      <div>
        <DataRow />
      </div>
    </div>
  </section>
</template>
<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue';

export default defineComponent({
  components: {
    DataRow: defineAsyncComponent(() => import('@/components/data/DataRow.vue')),
  },
  emits: ['emitDataRowList'],
  setup(props, { emit }) {
    // data 담아서 부모에 전달
    let dataRowList = ref([]);
    const emitDataRowList = (() => emit("emitDataRowList", dataRowList.value));

    return {
      emitDataRowList
    }
  }
});
</script>
<style lang="scss" scoped>
section {
  .btn-group {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 2rem;

    button {
      padding: 0.325rem 1.5rem;
      // color: #fff;
      color: #374151;
      border: 1px solid #6b7280;
      font-size: 0.875rem;
      border-radius: 0.25rem;
      margin-right: 0.5rem;

      &:hover {
        background: #6b7280;
        color: #fff;
      }

      .font-awesome-icon {
        margin-right: 0.5rem;
      }
    }
  }
  .data-grid-head {
    display: grid;
    grid-template-columns: 250px 250px 1fr;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;

    p {
      padding-left: 1rem;
    }
  }
}
</style>
