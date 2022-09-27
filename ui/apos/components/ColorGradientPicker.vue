<template>
  <AposInputWrapper
    :field="field"
    :error="null"
    :uid="uid"
    :display-options="displayOptions"
    :modifiers="modifiers"
    :value="value"
  >
    <template #body>
      <div class="apos-input-object">
        <div class="apos-input-wrapper">
          <div id="color-square" :style="{ background: gradient }" />
          <div>
            <AposInputRange
            :field="{
              name: 'angle',
              label: 'Gradient Angle',
            }"
            :value="next.angle"
            @change="gradientChange"
            />
            </div>
          <div>
            <!-- <AposSchema
            :schema="extraColorSchema" v-model="colorsSchemaInput"
            :trigger-validation="triggerValidation"
            :utility-rail="false" :generation="generation"
            /> -->
          </div>
          <footer class="apos-link-control__footer">
            <AposButton type="button" label="+" :disabled="addLimit" @click="addColor" />
          </footer>
        </div>
      </div>
    </template>
  </AposInputWrapper>
</template>

<script>
import AposInputMixin from 'Modules/@apostrophecms/schema/mixins/AposInputMixin';
import AposInputWrapper from 'Modules/@apostrophecms/schema/components/AposInputWrapper.vue';

export default {
  name: 'ColorGradientPicker',
  components: {
    AposInputWrapper
},
  mixins: [ AposInputMixin ],
  props: {
    generation: {
      type: Number,
      required: false,
      default() {
        return null;
      }
    }
  },
  data() {
    const next = this.getNext();
    return {
      colorsSchemaInput: {
        data: next
      },
      next
    };
  },
  computed: {
    gradient() {
      // holder until final data structure
      return 'linear-gradient(45deg, "#ff0000ff", "#00FF00FF", "#0000ffff")';
    },
    addLimit() {
      // holder till I figure this out
      console.log('tbd');
      return false;
    }
  },
  watch: {
    generation() {
      this.next = this.getNext();
      this.colorsSchemaInput = {
        data: this.next
      };
    }
  },
  methods: {
    validate(value) {
      if (this.colorsSchemaInput.hasErrors)
      {
        return 'invalid';
      }
    },
    getNext() {
      return this?.value.data ? this.value.data : (this.field.def || {});
    },
    parseSchema() {
      const defaultSchema = [
        {
          name: 'angle',
          label: 'Gradient Angle',
          type: 'range',
          min: 0,
          max: 360,
          step: 1,
          unit: 'deg',
          def: 90
        },
        {
          name: 'color',
          type: 'color'
        },
      ];
      return defaultSchema;
    },
    colorSchema() {
      const returnedSchema = [
        {
          name: 'color',
          type: 'color'
        }
      ];
      return returnedSchema;
    },
    addColor() {
      // How do I add an extra AposSchema?
      console.log('tbd');
    },
    gradientChange() {
      this.error = this.value.error;
      console.log('gradient error', this.error);
      this.next.angle = this.data;
    }
  }
};
</script>

<style lang="scss" scoped>
#color-square {
  height: 200px;
  width: 100%;
}

li {
  list-style: none;
}

.apos-input-object {
  border-left: 1px solid var(--a-base-9);
}

.apos-input-wrapper {
  margin: 20px 0 0 19px;
}

.apos-input-object ::v-deep .apos-schema .apos-field {
  margin-bottom: 30px;
}
</style>