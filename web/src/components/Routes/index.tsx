import * as React from "react";
import { Router, Redirect } from "@reach/router";
import Login from "-/pages/Login";
import Dashboard from "-/pages/Dashboard";
import Deliveries from "-/pages/Deliveries";
import Deliverymans from "-/pages/Deliverymans";
import Recipients from "-/pages/Recipients";
import CreateRecipient from "-/pages/CreateRecipient";
import CreateDeliveryman from "-/pages/CreateDeliveryman";
import CreateDelivery from "-/pages/CreateDelivery";
import EditDeliveryman from "-/pages/EditDeliveryman";
import EditRecipient from "-/pages/EditRecipient";
import EditDelivery from "-/pages/EditDelivery";
import Problems from "-/pages/Problems";

const Routes = () => (
  <>
    <Router>
      <Login path="/" />
      <Dashboard path="dashboard">
        <Redirect from="/" to="encomendas" />
        <Deliveries path="encomendas" />
        <Deliverymans path="entregadores" />
        <Recipients path="destinatarios" />
        <Problems path="problemas" />
        <CreateRecipient path="destinatarios/novo" />
        <CreateDeliveryman path="entregadores/novo" />
        <EditDeliveryman path="entregadores/edit" />
        <EditRecipient path="destinatarios/edit" />
        <EditDelivery path="encomendas/edit" />
        <CreateDelivery path="encomendas/novo" />
      </Dashboard>
    </Router>
  </>
);
export default Routes;
