import React from 'react';

class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, color: 'red' }}>
          <h3>Something went wrong</h3>
          <pre>{String(this.state.error?.message)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;