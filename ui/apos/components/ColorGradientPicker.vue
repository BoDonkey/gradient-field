<template>
  <AposInputWrapper
    :field="field"
    :error="null"
    :uid="uid"
    :display-options="displayOptions"
    :modifiers="modifiers"
  >
    <template #body>
      <div class="apos-input-object">
        <div class="apos-input-wrapper">
          <div id="color-square" :style="{ background: gradient }" />
          <div>
            <AposSchema
            :schema="rangeSchema" v-model="schemaInput"
            :trigger-validation="triggerValidation"
            :utility-rail="false" :generation="generation"
            />
            <ul>
              <li v-for="color in colors">
                <AposButton type="button" label="up" :icon="arrow-up-icon" :icon-only="true" :disabled="atEdge" @click="moveUp" />
                <AposButton type="button" label="down" :icon="arrow-down-icon" :icon-only="true" :disabled="atEdge" @click="moveDown" />
                <AposSchema
                :schema="schema" v-model="schemaInput"
                :trigger-validation="triggerValidation"
                :utility-rail="false" :generation="generation" />
                <AposButton type="button" label="-" :icon="delete-icon" :icon-only="true" :disabled="removeLimit" @click="removeColor" />
              </li>
            </ul>
            
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
      rangeSchema: [
        {
          name: 'gradientangle',
          label: 'Gradient Angle',
          type: 'range',
          min: 0,
          max: 360,
          unit: 'deg'
      }
    ],
      schema: [
        {
        name: 'color',
        label: 'Color',
        type: 'color'
        }
      ],
      schemaInput: {
        data: next
      },
      next
    };
  },
  computed: {
    gradient() {
      const _data = { ...this.schemaInput.data };
      let colorString = `linear-gradient(${_data.gradientangle}deg`;
      delete _data.gradientangle;
      Object.values(_data).forEach(value => {
        colorString = `${colorString}, ${value}`;
      });
      colorString = colorString + ')';
      return colorString;
    }
  },
  watch: {
    schemaInput() {
      this.next = this.schemaInput.data;
    },
    generation() {
      this.next = this.getNext();
      this.schemaInput = {
        data: this.next
      };
    }
  },
  methods: {
    validate(value) {
      if (this.schemaInput.hasErrors) {
        return 'invalid';
      }
    },
    getNext() {
      return this.value ? this.value.data : (this.field.def || {});
    },
    addColor() {
      this.schemaInput.data.push({color: "#0047abff"});
    },
    removeColor() {
      console.log('figure out how to remove');
    },
    moveUp() {
      console.log('figure out how to move up');
    },
    moveDown() {
      console.log('figure out how to move down');
    },
    atEdge() {
      console.log('figure out how to see beginning or end');
      return false;
    },
    removeLimit() {
      // TBD
      return false;
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