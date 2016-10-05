'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getFieldList = getFieldList;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getFieldList(context, ast) {
	var asts = ast.fieldASTs;

	//for recursion...Fragments doesn't have many sets...
	if (!Array.isArray(asts)) {
		asts = [asts];
	}

	//get all selectionSets
	var selections = asts.reduce(function (reduction, ast) {
		reduction.push.apply(reduction, _toConsumableArray(ast.selectionSet.selections));

		return reduction;
	}, []);

	//return fields
	return selections.reduce(function (reduction, ast) {
		switch (ast.kind) {
			case 'Field':
				reduction.push(ast.name.value);

				return reduction;
			case 'InlineFragment':
				return [].concat(_toConsumableArray(reduction), _toConsumableArray(getFieldList(context, ast)));
			case 'FragmentSpread':
				return [].concat(_toConsumableArray(reduction), _toConsumableArray(getFieldList(context, context.fragments[ast.name.value])));
			default:
				throw new Error('Unsuported query selection');
		}
	}, []);
}