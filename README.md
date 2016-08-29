## Thinking

### 组件 `build` 为什么形态

- all in one?

    在业务中无法分拆资源, 丧失资源依赖的可控性, 后期没法做优化

- es5 -> es6?

    单一转化 es6 文件意义不大, 如果在业务 `loader` 中排除 `node_modules` 导致依赖分析时丢失其他资源文件, 其产出目录下还需完成对其他资源的处理

- styl -> css?

    在代码中 `import 'index.styl'` 需要引入 `loader` 才能转化为 `import 'index.css'`

综上, 考虑到组件体系可以规范前缀 `fe-` 规则且与业务环境的基础 `build` 环境可以保持一致, 除了不考虑资源依赖的 `fe-reset` 等模块外, 组件产出并不进行任何 `build`, 在业务中的追加 `include` 规则, 统一在业务中处理 `build`

### theme

权衡重复开发成本与 UI 灵活性, 将 `theme` 抽象为 3 个颜色:

- `highlightColor`

    有意义的突出可读性的颜色(如文字颜色, 表单中的 "✔", 表意 icon 等)

- `primaryColor`

    主调背景颜色(如黑色风格设计中的黑色)

- `secondaryColor`

    辅助背景颜色, 常于主调颜色搭配避免色彩单调(如 Airbnb 设计中的砖红色)

组件内部对注入颜色进行合理分配, 其他的轻量颜色变化基于 `HSL` 酌情按简单规则处理, 如:

```
醒目: Lightness +20%

弱化: Lightness -20%
```

业务场景:

```
state: {
  theme: {
    highlightColor: '#fff',
    primaryColor: '#2b2d2e',
    secondaryColor: '#e00007'
  }
}

<Button theme={this.state.theme} />
```

### 数据接口

强调 `propsType` 声明, 用于生成文档及单元测试尤其是表单组件自动生成后端接口

> 表单数据接口规范示例:

对于表单元素, 我们用基本的 `key-value` 格式描述

```json
{
  "taskName": {
    "value": "默认值",
    "type": "text",
    "label": "任务名称"
  }
}
```

意为一个 `key` 为 `taskName` 的文本型输入框, 默认值为 "默认值", 标签文本为 "任务名称", 在    `submit` 后我们会提交: 

```json
{
  "taskName": {
    "value": "用户输入值"
  }
}
```

**注意:**

- `value` 字段永远为字符串, 特别地, 在 `type` 为 `bool` 时 "0" -> `false` "1" -> `true`, 在 `type` 为 `number` 时, "0" -> 0

> 装饰属性:

用于修饰性的非关键信息, 根据产品需求选填

- **placeholder** [`String`] 空值时的占位字符(一般灰色显示), 如: "请输入用户名"

- **disabled** [`Bool`] 控制元素默认是否禁用

- **labelWidth** [`Number` | `String`] 控制标签宽度

- **width** [`Number` | `String`] 控制整体宽度

- **verify** [`String`] 校验规则

- **description** [`String`] 额外的描述信息

- **formater** [`String`] 额外的格式化信息, 例如 type 为 `date` 时: `yyyy-MM-dd HH:mm:ss`


@TODO

- [ ] babel-preset
- [ ] fe-button
- [ ] fe-dialog
- [ ] fe-icon
- [ ] fe-input
- [ ] fe-table
