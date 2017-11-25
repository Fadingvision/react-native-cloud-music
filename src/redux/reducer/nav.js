import RootNavigation from 'NAVIGATIONS';

export default function navReducer(state, action) {
  const newState = RootNavigation.router.getStateForAction(action, state)
  return newState || state
}
