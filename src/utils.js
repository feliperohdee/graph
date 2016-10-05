export function getFieldList(context, ast) {
	let asts = ast.fieldASTs;

	//for recursion...Fragments doesn't have many sets...
	if (!Array.isArray(asts)) {
		asts = [asts];
	}

	//get all selectionSets
	const selections = asts.reduce((reduction, ast) => {
		reduction.push(...ast.selectionSet.selections);

		return reduction;
	}, []);

	//return fields
	return selections.reduce((reduction, ast) => {
		switch (ast.kind) {
			case 'Field':
				reduction.push(ast.name.value);

				return reduction;
			case 'InlineFragment':
				return [
					...reduction,
					...getFieldList(context, ast)
				];
			case 'FragmentSpread':
				return [
					...reduction,
					...getFieldList(context, context.fragments[ast.name.value])
				];
			default:
				throw new Error('Unsuported query selection');
		}
	}, []);
}
