import { Route, Routes as Switch } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import BasicFlowchart from "./pages/BasicFlowchart/BasicFlowchart";
import CustomForm from "./pages/CustomForm/CustomForm";
import CustomNode from "./pages/CustomNode/CustomNode";
import ReadingState from "./pages/ReadingState/ReadingState";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" element={<HomePage />} />
      <Route path="/basic-flowchart" element={<BasicFlowchart />} />
      <Route path="/custom-node" element={<CustomNode />} />
      <Route path="/custom-form" element={<CustomForm />} />
      <Route path="/reading-state" element={<ReadingState />} />
    </Switch>
  );
}
