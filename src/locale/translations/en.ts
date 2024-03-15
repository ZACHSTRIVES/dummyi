export const en = {

    // -------------------------------------------------------------------------------------------------------------
    // export

    // export category
    "export.category.file_types": "General file types",
    "export.category.databases": "Databases",
    "export.category.programming_languages": "Programming languages",

    // export format modal
    "export.configurator.modal.title": "Format",
    "export.configurator.modal.confirmButton.text": "Confirm",
    "export.configurator.config.label": "Configurations",
    "export.configurator.config.empty": "Configuration of this export format is currently not available.",

    // export modal
    "export.modal.title": "Batch Generate",
    "export.modal.exportNumOfRows.label": "Rows to generate",
    "export.modal.exportNumOfRows.empty": "Rows to generate cannot be empty",
    "export.modal.exportFormat.label": "Format",
    "export.modal.estimatedSize.label": "Estimated size",
    "export.modal.estimatedTime.label": "Estimated time",
    "export.modal.exportFileName.label": "File name",
    "export.modal.exportFileName.empty": "File name cannot be empty",
    "export.modal.cancel.button.text": "Cancel",
    "export.modal.generate.button.text": "Generate",
    "export.modal.hide.button.text": "Hide",
    "export.modal.terminate.button.text": "Terminate",
    "export.modal.generating.rows.text": "Rows",
    "export.modal.generating.time.text": "Time",
    "export.modal.generating.done.text": "Done",
    "export.modal.toast.details.button.text": "Details",
    "export.modal.toast.download.button.text": "Download",

    // csv
    "export.configurator.csv.delimiter": "Delimiter",
    "export.configurator.csv.delimiter.required": "Delimiter cannot be empty",
    "export.configurator.csv.includeHeader": "Include header",
    "export.configurator.csv.endLineChar": "End of line characters",


    // xml
    "export.configurator.xml.rootNodeName": "Root node",
    "export.configurator.xml.childNodeName": "Child node",
    "export.configurator.xml.encoding": "Encoding",
    "export.configurator.xml.indentSize": "Indent size",

    // json
    "export.configurator.json.insideArray": "Inside array",
    "export.configurator.json.includeNullValues": "Include null values",

    // javascript
    "export.configurator.javascript.format": "Format",
    "export.configurator.javascript.format.variable": "Variable",
    "export.configurator.javascript.format.export": "Export",
    "export.configurator.javascript.varName": "Variable name",
    "export.configurator.javascript.varName.required": "Variable name cannot be empty",
    "export.configurator.javascript.declarationKeyword": "Declaration Keyword",
    "export.configurator.javascript.module": "Module",

    // sql
    "export.configurator.sql.type": "Database type",
    "export.configurator.sql.tableName": "Table name",
    "export.configurator.sql.tableName.required": "Table name cannot be empty",
    "export.configurator.sql.statement": "SQL statement",
    "export.configurator.sql.batchSize": "Batch size",
    "export.configurator.sql.includeDropTable": "Include `DROP TABLE`",
    "export.configurator.sql.includeCreateTable": "Include `CREATE TABLE`",
    "export.configurator.sql.includePrimaryKey": "Include primary key",
    "export.configurator.sql.primaryKeyColumnName": "Primary key column",

    // c#
    "export.configurator.csharp.collectionType": "Collection type",
    "export.configurator.csharp.collectionName": "Collection name",
    "export.configurator.csharp.dtoClass": "Create DTO class",
    "export.configurator.csharp.dtoClassName": "Class name",

    // typescript
    "export.configurator.typescript.declarationType": "Declaration type",
    "export.configurator.typescript.declarationType.interface.name": "Interface name",
    "export.configurator.typescript.declarationType.type.name": "Type name",
    "export.configurator.typescript.variableName": "Variable name",

    // -------------------------------------------------------------------------------------------------------------
    // data types

    
    // macaddress
    "dataType.macaddress": "Mac address",
    "dataType.macaddress.format": "Separator",
    "dataType.macaddress.format.colon":"colon",
    "dataType.macaddress.format.dash": "hyphen",
    "dataType.macaddress.format.space": "none",

    // ipaddress
    "dataType.ipaddress": "IP Address",
    "dataType.ipaddress.types":"Types",

    // birthday
    "dataType.birthday": "Birthday",
    "dataType.birthday.mode":"Mode",
    "dataType.birthday.mode.age":"Age",
    "dataType.birthday.mode.year":"Year",
    "dataType.birthday.mode.minAge":"Min. Age",
    "dataType.birthday.mode.maxAge":"Max. Age",
    "dataType.birthday.mode.fromYear":"From year",
    "dataType.birthday.mode.toYear":"To year",

    // month
    "dataType.month": "Month",
    "dataType.month.abbreviated": "Abbreviated",

    // weekday
    "dataType.weekday": "Weekday",
    "dataType.weekday.abbreviated": "Abbreviated",

    // datetime
    "dataType.datetime": "DateTime",
    "dataType.datetime.terms": "Terms",
    "dataType.datetime.terms.anytime": "Anytime",
    "dataType.datetime.terms.between": "Between",
    "dataType.datetime.terms.future": "Future",
    "dataType.datetime.terms.past": "Past",
    "dataType.datetime.terms.recent": "Recent past",
    "dataType.datetime.terms.soon": "Soon",
    "dataType.datetime.ref": "Reference date",
    "dataType.datetime.ref.tooltip": "The date to use as reference point",
    "dataType.datetime.format": "Format",
    "dataType.datetime.format.text": "Text",
    "dataType.datetime.format.timestamp": "Timestamp",
    "dataType.datetime.format.datetime": "DateTime",
    "dataType.datetime.timeRange": "Range",

    // anytime
    "dataType.anytime": "Anytime",

    // url
    "dataType.url": "Url",
    "dataType.url.appendSlash.label": "Slash",
    "dataType.url.protocol.label": "Protocol",

    // domainsuffix
    "dataType.domainsuffix": "Domain Suffix",

    // domainname
    "dataType.domainname": "Domain Name",

    // accountnumber
    "dataType.accountnumber": "Account Number",
    "dataType.accountnumber.length": "Length",
    "dataType.accountnumber.empty": "Length cannot be empty",

    // accountname
    "dataType.accountname": "Account Name",

    // color
    "dataType.color": "Color",
    "dataType.color.kind.label": "Kind",
    "dataType.color.format.label": "Format",
    "dataType.color.format.humanWord": "Human Word",

    // phone
    "dataType.phone": "Phone Number",
    "dataType.phone.formats.label": "Formats",
    "dataType.phone.formats.tooltips": "Phone number format, please use \"#\" to represent digits, press Enter key to confirm",

    // emoji
    "dataType.emoji": "Emoji",
    "dataType.emoji.type": "Type",
    "dataType.emoji.type.all": "All",
    "dataType.emoji.type.smiley": "Smiley",
    "dataType.emoji.type.body": "Body",
    "dataType.emoji.type.person": "Person",
    "dataType.emoji.type.nature": "Nature",
    "dataType.emoji.type.food": "Food",
    "dataType.emoji.type.travel": "Travel",
    "dataType.emoji.type.activity": "Activity",
    "dataType.emoji.type.object": "Object",
    "dataType.emoji.type.symbol": "Symbol",
    "dataType.emoji.type.flag": "Flag",

    // persontitle
    "dataType.persontitle": "Person Title",

    // middlename
    "dataType.middlename": "Middle Name",

    // lastname
    "dataType.lastname": "Last Name",

    // firstname
    "dataType.firstname": "First Name",

    // sex
    "dataType.sex": "Sex",

    // number
    "dataType.number": "Number",
    "dataType.number.kind.label": "Kind",
    "dataType.number.precision.label": "Precision",
    "dataType.number.min.label": "Min.",
    "dataType.number.min.tooltip": "Lower bound for generated numbers",
    "dataType.number.min.errorMessage.empty": "Min. value cannot be empty",
    "dataType.number.min.errorMessage.greaterThanMax": "Min. value cannot be greater than max. value",
    "dataType.number.max.label": "Max.",
    "dataType.number.max.tooltip": "Upper bound for generated numbers",
    "dataType.number.max.errorMessage.empty": "Max. value cannot be empty",
    "dataType.number.max.errorMessage.lessThanMin": "Max. value cannot be less than min. value",

    // boolean
    "dataType.boolean": "Boolean",
    "dataType.boolean.true.label": "Prob of True",
    "dataType.boolean.true.tooltip": "Probability of generating true value",
    "dataType.boolean.true.errorMessage.empty": "Prob of True cannot be empty",
    "dataType.boolean.format.label": "Format",

    // full name
    "dataType.fullName": "Full Name",
    "dataType.fullName.sex.label": "Sex",
    "dataType.fullName.sex.selectOptions.all": "Male, Female",
    "dataType.fullName.sex.selectOptions.male": "Male",
    "dataType.fullName.sex.selectOptions.female": "Female",
    "dataType.fullName.firstName.label": "First name",
    "dataType.fullName.lastName.label": "Last name",

    // email
    "dataType.email": "Email",
    "dataType.email.provider.label": "Provider",
    "dataType.email.allowSpecialCharacters.label": "Special characters",

    // company name
    "dataType.companyName": "Company Name",

    // account number
    "dataType.accountNumber": "Account Number",

    // data type category
    "dataType.category.all": "All",
    "dataType.category.basic": "Basic",
    "dataType.category.person": "Person",
    "dataType.category.commerce": "Commerce",
    "dataType.category.network": "Network",
    "dataType.category.datetime": "Datetime",

    // -------------------------------------------------------------------------------------------------------------
    // pages

    // nav bar
    "nav.item.home": "Home",
    "nav.item.workspace": "Workspace",
    "nav.item.about": "About",
    "nav.colorModeSwitchButton.switchToDarkMode.text": "Switch to dark mode",
    "nav.colorModeSwitchButton.switchToLightMode.text": "Switch to light mode",
    "nav.languageSwitchButton.tooltip": "Language",
    "nav.languageSwitchModal.title": "Select language",
    "nav.languageSwitchModal.footer.chatGPT.text": "Translations generated by ChatGPT",

    // workspace
    "toolbar.numOfRowInput.suffix": "Rows",
    "toolbar.generateButton.text": "Batch Generate",
    "toolbar.panelsOrientationButton.tooltip.switchToColumn": "Switch panels to column",
    "toolbar.panelsOrientationButton.tooltip.switchToRow": "Switch panels to row",
    "toolbar.emptyPageButton.tooltip": "Empty workplace",
    "toolbar.emptyPageButton.confirmation.title": "Empty workplace",
    "toolbar.emptyPageButton.confirmation.text": "Are you sure you want to empty the workplace? All the workplace configurations you have set up will be lost.",
    "toolbar.exportSchemaButton.tooltip": "Export schema",
    "toolbar.importSchemaButton.tooltip": "Import schema",
    "preview.setting.regenerateButton.tooltip": "Regenerate",
    "preview.setting.lineNumberSwitch.tooltip.show": "Show line number",
    "preview.setting.lineNumberSwitch.tooltip.hide": "Hide line number",
    "preview.setting.lineWarpSwitch.tooltip.enable": "Enable line wrap",
    "preview.setting.lineWarpSwitch.tooltip.disable": "Disable line wrap",
    "preview.setting.copyToClipboard.tooltip": "Copy to clipboard",
    "preview.setting.copyToClipboard.notification.success": "Success",
    "preview.setting.copyToClipboard.notification.content": "Copied to the clipboard.",
    "preview.setting.rawView.text": "Raw",
    "preview.setting.tableView.text": "Table",
    "dataFields.list.addNewFieldButton.text": "Add field",
    "dataFields.list.noDataFields.text": "No fields",
    "dataFields.list.createFirstField.text": "Let's start by creating the first field!",
    "dataFields.input.fieldName.label": "Field name",
    "dataFields.input.fieldName.errorMessage.empty": "Field name cannot be empty",
    "dataFields.input.type.label": "Data type",
    "dataFields.input.type.placeholder": "Select type",
    "dataFields.input.emptyRate.label": "Empty %",
    "dataFields.input.emptyRate.tooltip": "Probability of generating empty value",
    "dataFields.input.emptyRate.errorMessage.empty": "Empty rate cannot be empty",
    "dataFields.input.options.label": "Options",
    "dataFields.type.modal.title": "Data types",
    "dataFields.type.modal.search.placeholder": "Search data type...",

    // error pages
    "error.input.isRequired": "This field is required",
    "error.404.description": "Page does not exist",
    "error.404.button.text": "Home page",
    "error.general.description": "Oops! An error has occurred!",
    "error.general.button.text": "Home page",
}