const { propertyGroups } = require('stylelint-config-clean-order');

const propertiesOrder = propertyGroups.map(properties => ({
  noEmptyLineBetween: true,
  emptyLineBefore: 'never',
  properties
}));

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order', 'stylelint-prettier/recommended'],
  defaultSeverity: 'warning',
  rules: {
    'max-nesting-depth': [
      1,
      {
        ignore: ['pseudo-classes']
      }
    ],
    'order/properties-order': [
      propertiesOrder,
      {
        severity: 'warning',
        unspecified: 'bottomAlphabetical'
      }
    ]
  }
};
