/**
 * @description - develop web page component
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// external
import React, { CSSProperties } from 'react';
import { hot } from 'react-hot-loader';
import { Form, Input } from 'antd';
// internal
import { useCellFluid } from '../src/use-cell-fluid';

const style: CSSProperties = {
  padding: '20px 10px',
};
const formatter = {
  currency: (value: string) =>
    value.replace(/,/g, '').replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'),
  joint: (value: string) =>
    value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 '),
};

function App() {
  const [joint, handleJointChange] = useCellFluid({
    accept: /\d/g,
    format: formatter.joint,
  });
  const [bill, handleBillChange] = useCellFluid({
    accept: /\d/g,
    format: formatter.currency,
  });

  return (
    <Form style={style}>
      <Form.Item label="JointCard">
        <Input
          maxLength={24}
          placeholder="please provide your joint card number"
          value={joint}
          onChange={handleJointChange}
        />
      </Form.Item>
      <Form.Item label="Bill">
        <Input
          maxLength={24}
          placeholder="please provide your current month bill"
          value={bill}
          onChange={handleBillChange}
        />
      </Form.Item>
    </Form>
  );
}

export default hot(module)(App);
