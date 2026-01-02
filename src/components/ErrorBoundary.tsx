import { Component, ReactNode } from 'react';

export class ErrorBoundary extends Component<
    { children: ReactNode },
    { hasError: boolean }
> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 24 }}>
                    <h2>Something went wrong</h2>
                    <p>Take a moment. Your data is safe.</p>
                </div>
            );
        }
        return this.props.children;
    }
}
