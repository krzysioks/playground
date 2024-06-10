const printIngredients = (
    quantity: number,
    ingredient: string,
    extraIngredient?: string
): void => {
    console.log(
        'quantity: ',
        quantity,
        'ingredient: ',
        ingredient,
        'extraIngredient: ',
        extraIngredient || 'no extra'
    );
};
printIngredients(3, 'sugar');
printIngredients(3, 'sugar', 'syroup');
