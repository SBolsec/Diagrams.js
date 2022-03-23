import * as React from "react";

import { Link } from "react-router-dom";

import { List } from "antd";
import Item from "antd/es/list/Item";

export default function HomePage() {
  return (
    <List>
      <Item>
        <Link to="/basic-flowchart">Basic Flowchart</Link>
      </Item>
      <Item>
        <Link to="/custom-node">Custom Node</Link>
      </Item>
      <Item>
        <Link to="/custom-form">Custom Form</Link>
      </Item>
      <Item>
        <Link to="/reading-state">Reading State</Link>
      </Item>
    </List>
  );
}
