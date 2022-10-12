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
        console.log('in field type *********************************************');
        self.apos.schema.addFieldType({
          name: 'gradientPicker',
          convert: self.convert,
          vueComponent: 'ColorGradientPicker'
        });
      },
      async convert(req, field, data, object) {
        const input = data[field.name];

        // Check it is the right type of data
        if (typeof input !== 'object') {
          throw self.apos.error('Data object is malformed');
        }

        // Check if required and present
        if (
          field.required &&
          (input == null)
        ) {
          throw self.apos.error('required');
        };

        const result = {};
        if (!Number.isInteger(input.angle) || input.angle > 360 || input.angle < 0) {
          throw self.apos.error('invalid', 'gradient angle has invalid value');
        }
        result.angle = input.angle;
        if (!Array.isArray(input.colors)) {
          throw self.apos.error('invalid', 'colors is not an array');
        }
        result.colors = input.colors.map(value => {
          const test = tinycolor(value.color);
          if (!tinycolor(test).isValid()) {
            throw self.apos.error('Not a color string');
          }
          if(!Number.isInteger(value.percentage) || value.percentage > 100 || value.percentage < 0) {
            throw self.apos.error('invalid', 'color percentage has an invalid value');
          }
          return value;
        });
        object[field.name] = result;
      },
      makeGradient(value) {
        const theColors = value.colors;
        let colorArray = theColors.map(color => color.color);

        return `linear-gradient(${value.angle}deg, ${colorArray.join(', ')})`;
      }
    };
  }
};