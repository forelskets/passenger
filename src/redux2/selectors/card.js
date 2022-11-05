import { createSelector } from 'reselect'

export const getMemoizedcardData = createSelector(
  (state) => state.card,
  (cardState) => {
    const {
      addCardLoader,
      addCardSuccess,
      addCardData,
      removeCardDetailsLoader,
      removeCardDetailsSuccess
    } = cardState

    return {
      addCardLoader,
      addCardSuccess,
      addCardData,
      removeCardDetailsLoader,
      removeCardDetailsSuccess
    }
  }
)