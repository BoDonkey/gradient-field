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
          <!-- <div id="color-square" :style="{ background: gradient }" /> -->
          <div>
            <!-- <AposSchema
            :schema="rangeSchema" v-model="rangeInput"
            :trigger-validation="triggerValidation"
            :utility-rail="false" :generation="generation"
            /> -->
            <AposInputRange :value="next.angle" :field="next.angle.field" />
            <ul>
              <li v-for="color in next.colors" :key="color">
                <AposButton type="button" label="up" :icon="arrow-up-icon" :icon-only="true" :disabled="atEdge" @click="moveUp" />
                <AposButton type="button" label="down" :icon="arrow-down-icon" :icon-only="true" :disabled="atEdge" @click="moveDown" />
                <AposInputColor 
                  :value="color"
                />
                <!-- <AposSchema
                :schema="colorSchema" v-model="colorInput"
                :trigger-validation="triggerValidation"
                :utility-rail="false" :generation="generation" /> -->
                <AposButton type="button" label="-" :icon="delete-icon" :icon-only="true" :disabled="removeLimit" @click="removeColor" />
              </li>
            </ul>
            
          </div>
          <footer class="apos-link-control__footer">
            <AposButton type="button" label="+" @click="addColor" />
          </footer>
        </div>
      </div>
    </template>
  </AposInputWrapper>
</template>

<script>
import AposInputMixin from 'Modules/@apostrophecms/schema/mixins/AposInputMixin';
import AposInputWrapper from 'Modules/@apostrophecms/schema/components/AposInputWrapper.vue';

/**
 * value: {
 *  angle: {
 *    field: Object
 *  }
 *  colors: [
 *    String, String, { field: Object }
 *  ]
 * }
 * 
 */

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
    const next = this.getNext()
    // const colors = value.colors; // array of colors
    // const angle = value.angle // gradient angle

    // const nextColor = this.getNext(color);
    // const nextRange = this.getNext(range);
    return {
      next
    //   rangeSchema: [
    //     {
    //       name: 'gradientangle',
    //       label: 'Gradient Angle',
    //       type: 'range',
    //       min: 0,
    //       max: 360,
    //       unit: 'deg'
    //   }
    // ],
      // colorSchema: [
      //   {
      //   name: 'color',
      //   label: 'Color',
      //   type: 'color'
      //   }
      // ],
      // colorInput: {
      //   data: nextColor
      // },
      // nextColor,
      // rangeInput: {
      //   data: nextRange
      // },
      // nextRange
    };
  },
  computed: {
    // gradient() {
    //   const _data = { ...this.colorInput.data, ...this.rangeInput.data };
    //   let colorString = `linear-gradient(${_data.gradientangle}deg`;
    //   delete _data.gradientangle;
    //   Object.values(_data).forEach(value => {
    //     colorString = `${colorString}, ${value}`;
    //   });
    //   colorString = colorString + ')';
    //   return colorString;
    // }
  },
  watch: {
    colorInput() {
      this.nextColor = this.colorInput.data;
    },
    rangeInput() {
      this.nextRange = this.rangeInput.data;
    },
    generation() {
      this.nextColor = this.getNext(color);
      this.colorInput = {
        data: this.nextColor
      };
      this.nextRange = this.getNext(range);
      this.rangeInput = {
        data: this.nextRange
      };
    }
  },
  methods: {
    validate(value) {
      if (this.colorInput.hasErrors || this.rangeInput.hasErrors) {
        return 'invalid';
      }
    },
    getNext(type) {
      // console.log(this.value.data);
      // console.log(this.value);
      return {
        angle: {
          field: {
            step: 1,
            min: 0,
            value: 80
          }
        },
        color: ['#ffee00']
      }
      // return this?.value.data ? this.value.data : (this.field.def || {
      //   angle: 70,
      //   colors: ['#ff00ee', '#00ee33']
      // });
    },
    addColor() {
      this.colorInput.data.push({color: "#0047abff"});
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