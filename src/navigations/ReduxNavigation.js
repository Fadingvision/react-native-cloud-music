import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import RootNavigation from './index';

// here is our redux-aware our smart component
function ReduxNavigation(props) {
  const { dispatch, nav } = props;
  const navigation = addNavigationHelpers({
    dispatch,
    state: nav
  });

  return <RootNavigation navigation={navigation} />
}

const mapStateToProps = state => ({ nav: state.nav });
export default connect(mapStateToProps)(ReduxNavigation);
