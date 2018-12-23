import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import BasicLayout from "./layouts/BasicLayout";
import BettingPage from "./pages/Betting";
import RechargePage from "./pages/Recharge";
import RechargeDetailPage from "./pages/RechargeDetail";
import GetCashPage from "./pages/GetCash";
import TransferPage from "./pages/Transfer";
import BillRecordPage from "./pages/BillRecord";
import BindCardPage from "./pages/BindCard";
import CardDetailPage from "./pages/CardDetail";
import PasswordPage from "./pages/Password";
import AgentListPage from "./pages/AgentList";
import GameHomePage from "./pages/GameHome";
import GameDetailPage from "./pages/GameDetail";
import LoginPage from "./pages/LoginPage";
import SideMenuPage from "./pages/SideMenuPage";
import AwardResult from "./pages/AwardResult";

import createStore from "./store/createStore";
import { history } from "./utils/history";
import { BASE_ROUTE } from "./constants/env";
import "./App.scss";

const store = createStore();

const BasicRouter = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path={`${BASE_ROUTE}/login`} component={LoginPage} />
        <Route path="/betting" component={BettingPage} />

        <Route path="/recharge" component={RechargePage} />
        <Route path="/recharge_detail" component={RechargeDetailPage} />
        <Route path="/get_cash" component={GetCashPage} />
        <Route path="/transfer" component={TransferPage} />
        <Route path="/bill_record" component={BillRecordPage} />
        <Route path="/bind_card" component={BindCardPage} />
        <Route path="/card_detail" component={CardDetailPage} />
        <Route path="/change_password" component={PasswordPage} />
        <Route path="/game_home" component={GameHomePage} />
        <Route path="/game_detail" component={GameDetailPage} />
        <Route path="/agent_list" component={AgentListPage} />
        <Route path="/sideMenu" component={SideMenuPage} />
        <Route path="/awardResult" component={AwardResult} />
        <Route path="/" component={BasicLayout} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default BasicRouter;
