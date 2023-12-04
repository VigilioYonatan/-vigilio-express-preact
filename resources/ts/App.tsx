import { Suspense, lazy } from "preact/compat";
import { Switch, Router, Route, useLocation } from "wouter-preact";

function App({ $user }: { $user: { id: 1; name: string } }) {
    const [location] = useLocation();

    if (!location.startsWith("/admin")) return null;

    return (
        <Router base="/admin">
            <div>
                <header>this is a header admin</header>
                <Suspense fallback={null}>
                    <Switch>
                        <Route
                            path="/"
                            component={lazy(
                                () => import("@/admin/views/Dashboard")
                            )}
                        />

                        <Route>404</Route>
                    </Switch>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
