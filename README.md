# Welcome to cell-fluid 👋

![Build Status](https://img.shields.io/travis/huang-xiao-jian/cell-fluid/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/huang-xiao-jian/cell-fluid/badge.svg?branch=master)](https://coveralls.io/github/huang-xiao-jian/?branch=master)
![Package Dependency](https://david-dm.org/huang-xiao-jian/cell-fluid.svg?style=flat)
![Package DevDependency](https://david-dm.org/huang-xiao-jian/cell-fluid/dev-status.svg?style=flat)

> React hook to transform any input component into formatted input, inspired by [Rifm](https://github.com/istarkov/rifm)

## Prerequisites

+ react 16.8+
+ rxjs 6.4+

## Install

```sh
# classsic npm
npm install cell-fluid;

# yarn
yarn add cell-fluid;
```

## Usage

Abstract way below:

```typescript
// options
interface CellFluidOptions {
  accept: RegExp; // regular expression to detect "accepted" symbols
  format: (payload: string) => string; // format function
}

// hook
import { useCellFluid } from 'cell-fluid';

const [value, handleValueChange] = useCellFluid(options);
```

Compressed way below:

```typescript
import React, { CSSProperties } from 'react';
import { Form, Input } from 'antd';
import { useCellFluid } from 'cell-fluid';

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
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/huang-xiao-jian/cell-fluid/issues).

```sh
# HMR server
npm run dev;

# unit test
npm run test;
```

## Show your support

Give a ⭐️ if this project helped you!

## License

MIT
