import 'react-native';
import React from 'react';
import OnboardingView from '../../src/components/OnboardingView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<OnboardingView />);
});
