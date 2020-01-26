import 'react-native';
import React from 'react';
import OnboardingView from '../../src/components/OnboardingView';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const createMockProps = (props: Record<string, any>) => ({
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn()
  },
  ...props
});

const mockStore = configureStore([]);
const store = mockStore({cookie: {hasCookie: false}});

it('renders correctly', () => {
  const props: any = createMockProps({});
  renderer.create(
    <Provider store={store}>
      <OnboardingView {...props}/>
    </Provider>);
});
