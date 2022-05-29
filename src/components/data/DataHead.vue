<template>
  <section>
    <h1 class="data-title"><span>Data Create</span></h1>
    <div class="data-url">
      <span>faker.kt.co.kr/{{ projectNamespace }}</span>
    </div>
    <article>
      <div class="data-input">
        <div class="data-name">
          <p>Data Name :</p>
          <input type="text" class="ds-input" v-model="dataName" @change="emitDataName" />
        </div>
        <div class="data-path">
          <p>Data Path :</p>
          <p class="data-path-host"><span>faker.kt.co.kr/{{ projectNamespace }}/</span></p>
          <input type="text" class="ds-input" v-model="dataPath" @change="emitDataPath" />
      </div>
      </div>
      <div class="data-input">
        <div class="data-rows">
          <p>Generate Rows :</p>
          <input type="number" class="ds-input" v-model="dataRows" @change="emitDataRows" />
        </div>
        <div class="data-type">
          <p>Data Type :</p>
          <input type="text" class="ds-input" v-model="dataType" @change="emitDataType" />
        </div>
      </div>
      <div class="data-array">
        <p>Array Check :</p>
        <span class="data-array-checkbox">
          <input type="checkbox" id="arrayCheck" value="true" v-model="isArray" @change="emitArrayCheck" />
          <label for="arrayCheck">True</label>
        </span>
      </div>
    </article>
  </section>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    projectNamespace: String
  },
  emits: ['emitDataName', 'emitDataPath', 'emitDataRows', 'emitDataType', 'emitArrayCheck'],
  setup(props, { emit }) {
    let dataName = ref("");
    let dataPath = ref("");
    let dataRows= ref(0);
    let dataType = ref("");

    let isArray = ref(false);

    const emitDataName = (() => { emit("emitDataName", dataName.value); });
    const emitDataPath = (() => { emit("emitDataPath", dataPath.value); });
    const emitDataRows = (() => { emit("emitDataRows", dataRows.value); });
    const emitDataType = (() => { emit("emitDataType", dataType.value); });
    const emitArrayCheck = (() => { emit("emitArrayCheck", isArray.value); });

    return { 
      dataName,
      dataPath,
      dataRows,
      dataType,
      isArray,
      emitDataName,
      emitDataPath,
      emitDataRows,
      emitDataType,
      emitArrayCheck
    }
  },
});
</script>
<style lang="scss" scoped>
section {
  .data-title {
    padding: 1rem 1rem;
  }

  .data-url {
    padding: 1.5rem 1rem;
    color: #999999;
  }

  .data-input {
    display: flex;
    width: 100%;
  }

  .data-array {
    display: flex;
    justify-content: flex-start;

    > p {
      padding: 0.25rem 1rem;
    }

    .data-array-checkbox {
      padding: 0.25rem 0.5rem;

      label {
        margin-left: 0.25rem;
      }
    }
  }

  :where(.data-name, .data-path, .data-rows, .data-type) {
    margin-bottom: 1rem;
    display: flex;
    flex: 1 0 50%;

    > p {
      flex: 1 0 150px;
      padding: 0.25rem 1rem;
    }

    .data-path-host {
      font-size: 0.75rem;
      padding: 0.25rem 1rem;
      background: #b4c8d4;
      border-radius: 2px 0px 0px 2px;

      > span {
        color: #3d4167;
        letter-spacing: 0.0125rem;
      }
    }

    .data-array-checkbox {
      display: inline-block; 
      text-align: left;
    }
  }
}
</style>
