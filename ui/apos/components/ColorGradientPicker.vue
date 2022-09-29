<template>
  <AposInputWrapper :field="field" :error="null" :uid="uid" :display-options="displayOptions" :modifiers="modifiers"
    :value="value">
    <template #body>
      <div class="apos-input-object">
        <div class="apos-input-wrapper">
          <div id="color-square" :style="{ background: gradient }" />
          <div>
            <AposInputRange :field="{
              name: 'angle',
              label: 'Gradient Angle',
              min: 0,
              max: 360,
              unit: 'deg',
              def: 90
            }" v-model="angleValue" :conditionMet="true" />
          </div>
          <div>
            <ul>
              <h3>Colors</h3>
              <li v-for="(color, index) in colors">
                <p>{{ color }}</p>
                <AposSchema :schema="colorSchema" v-model="colorsValue" :trigger-validation="triggerValidation"
                :utility-rail="false" :generation="generation"
                :key="index" />
                <AposButton
                :field="{
                  label: 'Trash'
                }"
                />
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
import AposButton from 'apostrophe/modules/@apostrophecms/ui/ui/apos/components/AposButton.vue';

export default {
  name: 'ColorGradientPicker',
  components: {
    AposInputWrapper,
    AposButton
},
  mixins: [AposInputMixin],
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
    console.log('next in data', next);
    return {
      colorSchema: [
        {
          name: 'color',
          type: 'color'
        }
      ],
      colorsValue: {
        data: next.colors
      },
      angleValue: {
        data: next.angle
      },
      next,
      colors: next.colors
    };
  },
  computed: {
    gradient() {
      // holder until final data structure
      return 'linear-gradient(45deg, #e66465, #9198e5)';
    },
    addLimit() {
      // holder till I figure out if this is needed
      console.log('tbd');
      return false;
    }
  },
  watch: {
    angleValue() {
      this.next = {
        ...this.next,
        angle: this.angleValue.data
      }
    },
    colorsValue() {
      const newColorArray = this.setColorArray();
      const colorsLength = this.next.colorsLength;
      // spreading both next and colorvalue to get the error checking and validation from colorvalue
      this.next = {
        ...this.next,
        ...this.colorValue,
        colors: newColorArray,
        colorsLength: colorsLength
      }
    },
    generation() {
      this.next = this.getNext();
      this.colorsValue = {
        data: this.next
      };
    }
  },
  methods: {
    validate(value) {
      return false;
    },
    getNext() {
      // not sure default colors array is correct
      return this.value.data ? this.value.data : (this.field.def || {
        angle: 90,
        colors: [
          { data: {color: '#4a90e2ff'}}
        ],
        colorsLength: 1
        // ranValidation: true
      });
    },
    setColorArray() {
      const newColor = this.colorsValue.data;
      const newColorObject = {data:newColor};
      let newArray = [...this.next.colors];
      newArray.pop();
      newArray.push(newColorObject);
      return newArray
    },
    getColorSchema() {
      const returnedSchema = [
        {
          name: 'color',
          type: 'color'
        }
      ];
      return returnedSchema;
    },
    addColor() {
      this.next.colors.push({data: {color: '#00ff00ff'}});
      this.next.colorsLength++;
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