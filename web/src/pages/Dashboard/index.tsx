import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import Nav from "-/components/Nav";

const Dashboard: React.FC<RouteComponentProps> = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Dashboard;
