import {createSelector} from 'reselect'

const selectShop = state =>state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)
//convert object to array
export const SelectCollectionForPreview = createSelector(
    [selectCollections],
    collections =>Object.keys(collections).map(key=> collections[key])
)

export const selectCollection = collectionUrlParam => 
createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
)