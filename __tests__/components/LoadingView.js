import 'react-native';
import React from 'react';
import LoadingView from '../../src/components/LoadingView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('LoadingView tests', () => {
  it('renders correctly', () => {
    renderer.create(<LoadingView />);
  });
});
