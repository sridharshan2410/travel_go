import React from "react";

class ErrorBoundary extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      hasError: false
    };

  }


  static getDerivedStateFromError(error) {

    return {
      hasError: true
    };

  }


  componentDidCatch(error, errorInfo) {

    console.error(
      "Application Error:",
      error
    );

    console.error(
      "Error Information:",
      errorInfo
    );

  }


  render() {

    if (this.state.hasError) {

      return (
        <div className="error-page">

          <h1>
             Something went wrong
          </h1>

          <p>
            Sorry! An unexpected error
            occurred.
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
          >
            Reload Application
          </button>

        </div>
      );

    }


    return this.props.children;

  }

}


export default ErrorBoundary;