/**
 * Copyright (c) 2022, WSO2 Inc. (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { AuthProvider, Storage, useAuthContext } from "@asgardeo/auth-react";
import { TokenExchangePlugin } from "@asgardeo/token-exchange-plugin";
import React, { FunctionComponent, ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { default as authConfig } from "./config.json";
import { ErrorBoundary } from "./error-boundary";
import { HomePage, NotFoundPage } from "./pages";
import { LandingPage } from "./pages/landing";
import { LoggedOutPage } from "./pages/LoggedOut";
import "./app.css";
import { ReactNotifications } from "react-notifications-component";

const AppContent: FunctionComponent = (): ReactElement => {
    const { error } = useAuthContext();
    
    return (
        <>
            <ReactNotifications />
            <ErrorBoundary error={error}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/signin" component={HomePage} />
                        <Route path="/login" component={LoggedOutPage} />
                        <Route path="*" component={NotFoundPage} />
                    </Switch>
                </Router>
            </ErrorBoundary>
        </>
    )
};

const App = () => (
    <AuthProvider 
        config={{...authConfig, storage: "webWorker" as Storage.WebWorker}}
        plugin={ TokenExchangePlugin.getInstance() }
    >
        <AppContent />
    </AuthProvider>
);

const root = createRoot(document.getElementById("root"));
root.render(<App />);
