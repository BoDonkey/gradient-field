const _ = require('lodash');
const tinycolor = require('tinycolor2');

module.exports = {
  init(self) {
    self.addVueGradientPickerFieldType();
    self.apos.template.addFilter({
      makeGradient: self.makeGradient
    });
  },
  methods(self) {
    return {
      addVueGradientPickerFieldType() {
        self.apos.schema.addFieldType({
          name: 'gradientPicker',
          convert: self.convert,
          vueComponent: 'ColorGradientPicker'
        });
      },
      async convert(req, field, data, object) {
        const input = data[field.name];
        console.log('in convert input', input);
        // Write validation when figure out final data structure
        object[field.name] = input;
      },
      makeGradient(colorData) {
        const _data = {...colorData};
        let colorString = `linear-gradient(${_data.gradientangle}deg`;
        delete _data.gradientangle;
        Object.values(_data).forEach((values) => {
          colorString = `${colorString}, ${value}`;
        });
        colorString = colorString + ')';
        return colorString;
      }
    };
  }
};