export const zhCN = {
    // -------------------------------------------------------------------------------------------------------------
    // export

    // export category
    "export.category.fileTypes": "常见格式",
    "export.category.programmingLanguages": "编程语言",

    // export format modal
    "export.configurator.modal.title": "导出格式",
    "export.configurator.modal.confirmButton.text": "确认",
    "export.configurator.config.label": "配置",
    "export.configurator.config.empty": "该输出格式的配置暂时还不可用",

    // export modal
    "export.modal.title": "生成数据",
    "export.modal.exportNumOfRows.label": "生成数据行数",
    "export.modal.exportFormat.label": "生成格式",
    "export.modal.estimatedSize.label": "预计大小",
    "export.modal.exportFileName.label": "文件名",

    // csv
    "export.configurator.csv.delimiter": "分隔符",
    "export.configurator.csv.includeHeader": "包含表头",
    "export.configurator.csv.endLineChar": "行结束符",

    // xml
    "export.configurator.xml.rootNodeName": "根节点",
    "export.configurator.xml.childNodeName": "子节点",
    "export.configurator.xml.encoding": "编码",
    "export.configurator.xml.indentSize": "缩进大小",

    // json
    "export.configurator.json.insideArray": "数组",
    "export.configurator.json.includeNullValues": "包含空值",

    // -------------------------------------------------------------------------------------------------------------
    // data types

    // data type category
    "dataType.category.all": "全部",
    "dataType.category.basic": "基础",
    "dataType.category.person": "人物",
    "dataType.category.commerce": "商业",
    "dataType.category.network": "网络",

    // number
    "dataType.number": "数字",
    "dataType.number.kind.label": "种类",
    "dataType.number.precision.label": "精度",
    "dataType.number.min.label": "最小值",
    "dataType.number.min.tooltip":"生成数据的最小值",
    "dataType.number.min.errorMessage.empty": "最小值不能为空",
    "dataType.number.min.errorMessage.greaterThanMax": "最小值不能大于最大值",
    "dataType.number.max.label": "最大值",
    "dataType.number.max.tooltip":"生成数据的最大值",
    "dataType.number.max.errorMessage.empty": "最大值不能为空",
    "dataType.number.max.errorMessage.lessThanMin": "最大值不能小于最小值",

    // dateTime
    "dataType.dateTime": "日期时间",

    // boolean
    "dataType.boolean": "布尔值",
    "dataType.boolean.true.label": "真值概率",
    "dataType.boolean.true.tooltip": "生成真值(true)的概率",
    "dataType.boolean.true.errorMessage.empty": "真值概率不能为空",
    "dataType.boolean.format.label": "格式",

    // full name
    "dataType.fullName": "人物全名",
    "dataType.fullName.sex.label": "性别",
    "dataType.fullName.sex.selectOptions.all": "男性, 女性",
    "dataType.fullName.sex.selectOptions.male": "男性",
    "dataType.fullName.sex.selectOptions.female": "女性",
    "dataType.fullName.firstName.label": "名",
    "dataType.fullName.lastName.label": "姓",

    // email
    "dataType.email": "邮箱",
    "dataType.email.provider.label": "邮箱提供商",
    "dataType.email.allowSpecialCharacters.label": "允许特殊字符",

    // company name
    "dataType.companyName": "公司名称",

    // account mi,ner
    "dataType.accountNumber": "账号",

    // -------------------------------------------------------------------------------------------------------------
    // pages

    // nav bar
    "nav.item.home": "首页",
    "nav.item.workspace": "工作台",
    "nav.item.about": "关于",
    "nav.colorModeSwitchButton.switchToDarkMode.text": "切换到暗色模式",
    "nav.colorModeSwitchButton.switchToLightMode.text": "切换到亮色模式",
    "nav.languageSwitchButton.tooltip": "语言",
    "nav.languageSwitchModal.title": "选择语言",
    "nav.languageSwitchModal.footer.chatGPT.text": "多语言翻译由ChatGPT生成",

    // workspace
    "toolbar.numOfRowInput.suffix": "行",
    "toolbar.generateButton.text": "生成",
    "toolbar.panelsOrientationButton.tooltip.switchToColumn": "切换面板为横向",
    "toolbar.panelsOrientationButton.tooltip.switchToRow": "切换面板为竖向",
    "toolbar.emptyPageButton.tooltip": "清空工作台",
    "toolbar.emptyPageButton.confirmation.title": "清空工作台",
    "toolbar.emptyPageButton.confirmation.text": "确定要清空工作台吗？所有的工作台配置将会被清空。",
    "toolbar.exportSchemaButton.tooltip": "导出模板",
    "toolbar.importSchemaButton.tooltip": "导入模板",
    "preview.setting.regenerateButton.tooltip": "重新生成",
    "preview.setting.lineNumberSwitch.tooltip.show": "显示行数",
    "preview.setting.lineNumberSwitch.tooltip.hide": "隐藏行数",
    "preview.setting.lineWarpSwitch.tooltip.enable": "启用自动换行",
    "preview.setting.lineWarpSwitch.tooltip.disable": "禁用自动换行",
    "preview.setting.copyToClipboard.tooltip": "复制到剪切板",
    "preview.setting.copyToClipboard.notification.success": "成功",
    "preview.setting.copyToClipboard.notification.content": "已复制到剪切板",
    "preview.setting.rawView.text": "原始",
    "preview.setting.tableView.text": "表格",
    "dataFields.list.addNewFieldButton.text": "添加字段",
    "dataFields.list.noDataFields.text": "还没有字段",
    "dataFields.list.createFirstField.text": "从创建第一个字段开始吧！",
    "dataFields.input.fieldName.label": "字段名",
    "dataFields.input.fieldName.errorMessage.empty": "字段名不能为空",
    "dataFields.input.type.label": "类型",
    "dataFields.input.type.placeholder": "选择类型...",
    "dataFields.input.emptyRate.label": "空值概率",
    "dataFields.input.emptyRate.tooltip": "生成空值(null)的概率",
    "dataFields.input.emptyRate.errorMessage.empty": "空值概率不能为空",
    "dataFields.input.options.label": "选项",
    "dataFields.type.modal.title": "选择类型",
    "dataFields.type.modal.search.placeholder": "搜索类型...",

    // error pages
    "error.404.description": "页面不存在",
    "error.404.button.text": "首页",
    "error.general.description": "Oops! 出错了！",
    "error.general.button.text": "首页",

}