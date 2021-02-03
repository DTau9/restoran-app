const initialState = {
	menu: [],
	loading: true,
	error: false,
	totalPrice: 0,
	items: [],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'MENU_REQUESTED':
			return {
				...state,
				menu: state.menu,
				loading: true,
				error: false
			};
		case 'MENU_LOADED':
			return {
				...state,
				menu: action.payload,
				loading: false,
				error: false
			};
		case 'MENU_ERROR':
			return {
				...state,
				menu: state.menu,
				loading: true,
				error: true
			};

		case 'ITEM_ADD_TO_CART':
			const id = action.payload;

			const itemInd = state.items.findIndex(item => item.id === id);
			if (itemInd >= 0) {
				const itemInState = state.items.find(item => item.id === id);
				const newItem = {
					...itemInState,
					pieces: ++itemInState.pieces
				}
				return {
					...state,
					items: [
						...state.items.slice(0, itemInd),
						newItem,
						...state.items.slice(itemInd + 1)
					],
					totalPrice: state.totalPrice + newItem.price
				}
			}

			const item = state.menu.find(item => item.id === id);
			const newItem = {
				title: item.title,
				price: item.price,
				url: item.url,
				id: item.id,
				pieces: 1
			};

			return {
				...state,
				items: [
					...state.items,
					newItem
				],
				totalPrice: state.totalPrice + newItem.price
			};

		case 'ITEM_REMOVE_FROM_CART':
			const idx = action.payload;
			const itemIndex = state.items.findIndex(item => item.id === idx);
			const itemPrice = state.items[itemIndex].price * state.items[itemIndex].pieces;
			return {
				...state,
				items: [
					...state.items.slice(0, itemIndex),
					...state.items.slice(itemIndex + 1)
				],
				totalPrice: state.totalPrice - itemPrice
			}
		default:
			return state;
	}
}

export default reducer;