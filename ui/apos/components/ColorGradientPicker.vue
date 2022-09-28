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
              <li v-for="(color, index) in colors">
                <AposSchema :schema="extraColorSchema" v-model="colorValue" :trigger-validation="triggerValidation"
                  :utility-rail="false" :generation="generation" :key="index" />
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
    const colorSchema = this.getColorSchema();
    const colorsLength = next.colors.length;
    console.log('in data', colorsLength);
    console.log('next in data', next);
    return {
      extraColorSchema: colorSchema,
      colorValue: {
        data: next
      },
      angleValue: {
        data: next.angle
      },
      next,
      colors: next.colors,
      colorsLength: colorsLength
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
    angleValue() {
      console.log('in angle value', this.angleValue, this.next);
      this.next = {
        ...this.next,
        ...this.angleValue,
        angle: this.angleValue.data
      }
    },
    colorValue() {
      console.log('in color picker', this.colorValue, this.next);
      const newColorArray = this.setColorArray();
      const colorsLength = newColorArray.length;
      console.log('in colorValue', typeof newColorArray, newColorArray,);
      this.next = {
        ...this.next,
        ...this.colorValue,
        color: this.colorValue.data.color,
        colors: newColorArray,
        colorsLength: colorsLength
      }
    },
    generation() {
      this.next = this.getNext();
      this.colorsSchemaInput = {
        data: this.next
      };
    }
  },
  methods: {
    validate(value) {
      return false;
    },
    getNext() {
      console.log('in getNext', this.value.data);
      return this.value.data ? this.value.data : (this.field.def || {
        angle: 90,
        color: '#4a90e2ff',
        colors: ['#4a90e2ff'],
        ranValidation: true
      });
    },
    getAngleValue() {
      console.log('in getAngleValue');
      return this?.value.angle ? this.value.angle : (this.field.def || 90);
    },
    setColorArray() {
      console.log('in setColorArray length',this.colorsLength);
      // Return new color if we are changing the first color
      if (this.colorsLength === 1){
        return  [ this.colorValue.data.color ];
      };

      let colorArray = this.next.colors;
      console.log('in set color array', typeof colorArray, colorArray);

      // Return changed array if we are changing in place
      if (colorArray.length === this.colorsLength) {
        return colorArray[colorArray.length - 1] = this.colorValue.data.color;
      } else {
        return colorArray.push(this.colorValue.data.color);
      }
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
      // How do I add an extra AposSchema?
      console.log('prepush', this.next, this.colorsLength);
      let newColorArray = [...this.next.colors];
      newColorArray.push("#00ff00ff");

      console.log('in plus', this.next.colors);
    },
    angleChange() {
      this.error = this.value.error;
      console.log('angle error', this.error);
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