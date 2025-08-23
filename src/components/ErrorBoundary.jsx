import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-5xl mx-auto p-6">
          <h2 className="text-xl font-bold text-red-600">Something went wrong</h2>
          <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto">
            {String(this.state.error && this.state.error.toString())}
            {this.state.info ? "\n\n" + JSON.stringify(this.state.info.componentStack, null, 2) : ""}
          </pre>
          <p className="mt-3 text-sm text-gray-600">Check console for full stack trace.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
