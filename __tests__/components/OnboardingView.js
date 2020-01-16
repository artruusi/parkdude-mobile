import 'react-native';
import React from 'react';
import OnboardingView from '../../src/components/OnboardingView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const createMockProps = (props: Record<string, any>) => ({
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn()
  },
  ...props
});

it('renders correctly', () => {
  const props: any = createMockProps({});
  renderer.create(<OnboardingView {...props}/>);
});
