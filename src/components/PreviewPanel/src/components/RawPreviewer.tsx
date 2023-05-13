import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {StreamLanguage} from "@codemirror/language";
import {loadLanguage, langNames, langs} from '@uiw/codemirror-extensions-langs';

export const RawPreviewer = () => {
    return (
        <CodeMirror
            value={exampleCode}
            extensions={[langs.javascript()]}/>
    )
}


const exampleCode = "(function (global, undefined) {\n" +
    "  \"use strict\";\n" +
    "  undefinedVariable = {};\n" +
    "  undefinedVariable.prop = 5;\n" +
    "\n" +
    "  function initializeProperties(target, members) {\n" +
    "    var keys = Object.keys(members);\n" +
    "    var properties;\n" +
    "    var i, len;\n" +
    "    for (i = 0, len = keys.length; i < len; i++) {\n" +
    "      var key = keys[i];\n" +
    "      var enumerable = key.charCodeAt(0) !== /*_*/95;\n" +
    "      var member = members[key];\n" +
    "      if (member && typeof member === 'object') {\n" +
    "        if (member.value !== undefined || typeof member.get === 'function' || typeof member.set === 'function') {\n" +
    "          if (member.enumerable === undefined) {\n" +
    "            member.enumerable = enumerable;\n" +
    "          }\n" +
    "          properties = properties || {};\n" +
    "          properties[key] = member;\n" +
    "          continue;\n" +
    "        } \n" +
    "      }\n" +
    "      if (!enumerable) {\n" +
    "        properties = properties || {};\n" +
    "        properties[key] = { value: member, enumerable: enumerable, configurable: true, writable: true }\n" +
    "        continue;\n" +
    "      }\n" +
    "      target[key] = member;\n" +
    "    }\n" +
    "    if (properties) {\n" +
    "      Object.defineProperties(target, properties);\n" +
    "    }\n" +
    "  }\n" +
    "\n" +
    "  (function (rootNamespace) {\n" +
    "\n" +
    "    // Create the rootNamespace in the global namespace\n" +
    "    if (!global[rootNamespace]) {\n" +
    "      global[rootNamespace] = Object.create(Object.prototype);\n" +
    "    }\n" +
    "\n" +
    "    // Cache the rootNamespace we just created in a local variable\n" +
    "    var _rootNamespace = global[rootNamespace];\n" +
    "    if (!_rootNamespace.Namespace) {\n" +
    "      _rootNamespace.Namespace = Object.create(Object.prototype);\n" +
    "    }\n" +
    "\n" +
    "    function defineWithParent(parentNamespace, name, members) {\n" +
    "      /// <summary locid=\"1\">\n" +
    "      /// Defines a new namespace with the specified name, under the specified parent namespace.\n" +
    "      /// </summary>\n" +
    "      /// <param name=\"parentNamespace\" type=\"Object\" locid=\"2\">\n" +
    "      /// The parent namespace which will contain the new namespace.\n" +
    "      /// </param>\n" +
    "      /// <param name=\"name\" type=\"String\" locid=\"3\">\n" +
    "      /// Name of the new namespace.\n" +
    "      /// </param>\n" +
    "      /// <param name=\"members\" type=\"Object\" locid=\"4\">\n" +
    "      /// Members in the new namespace.\n" +
    "      /// </param>\n" +
    "      /// <returns locid=\"5\">\n" +
    "      /// The newly defined namespace.\n" +
    "      /// </returns>\n" +
    "      var currentNamespace = parentNamespace,\n" +
    "        namespaceFragments = name.split(\".\");\n" +
    "\n" +
    "      for (var i = 0, len = namespaceFragments.length; i < len; i++) {\n" +
    "        var namespaceName = namespaceFragments[i];\n" +
    "        if (!currentNamespace[namespaceName]) {\n" +
    "          Object.defineProperty(currentNamespace, namespaceName, \n" +
    "            { value: {}, writable: false, enumerable: true, configurable: true }\n" +
    "          );\n" +
    "        }\n" +
    "        currentNamespace = currentNamespace[namespaceName];\n" +
    "      }\n" +
    "\n" +
    "      if (members) {\n" +
    "        initializeProperties(currentNamespace, members);\n" +
    "      }\n" +
    "\n" +
    "      return currentNamespace;\n" +
    "    }\n" +
    "\n" +
    "    function define(name, members) {\n" +
    "      /// <summary locid=\"6\">\n" +
    "      /// Defines a new namespace with the specified name.\n" +
    "      /// </summary>\n" +
    "      /// <param name=\"name\" type=\"String\" locid=\"7\">\n" +
    "      /// Name of the namespace.  This could be a dot-separated nested name.\n" +
    "      /// </param>\n" +
    "      /// <param name=\"members\" type=\"Object\" locid=\"4\">\n" +
    "      /// Members in the new namespace.\n" +
    "      /// </param>\n" +
    "      /// <returns locid=\"5\">\n" +
    "      /// The newly defined namespace.\n" +
    "      /// </returns>\n" +
    "      return defineWithParent(global, name, members);\n" +
    "    }\n" +
    "\n" +
    "    // Establish members of the \"WinJS.Namespace\" namespace\n" +
    "    Object.defineProperties(_rootNamespace.Namespace, {\n" +
    "\n" +
    "      defineWithParent: { value: defineWithParent, writable: true, enumerable: true },\n" +
    "\n" +
    "      define: { value: define, writable: true, enumerable: true }\n" +
    "\n" +
    "    });\n" +
    "\n" +
    "  })(\"WinJS\");\n" +
    "\n" +
    "  (function (WinJS) {\n" +
    "\n" +
    "    function define(constructor, instanceMembers, staticMembers) {\n" +
    "      /// <summary locid=\"8\">\n" +
    "      /// Defines a class using the given constructor and with the specified instance members.\n" +
    "      /// </summary>\n" +
    "      /// <param name=\"constructor\" type=\"Function\" locid=\"9\">\n" +
    "      /// A constructor function that will be used to instantiate this class.\n" +
    "      /// </param>\n" +
    "      /// <param name=\"instanceMembers\" type=\"Object\" locid=\"10\">\n" +
    "      /// The set of instance fields, properties and methods to be made available on the class.\n" +
    "      /// </param>\n" +
    "      /// <param name=\"staticMembers\" type=\"Object\" locid=\"11\">\n" +
    "      /// The set of static fields, properties and methods to be made available on the class.\n" +
    "      /// </param>\n" +
    "      /// <returns type=\"Function\" locid=\"12\">\n" +
    "      /// The newly defined class.\n" +
    "      /// </returns>\n" +
    "      constructor = constructor || function () { };\n" +
    "      if (instanceMembers) {\n" +
    "        initializeProperties(constructor.prototype, instanceMembers);\n" +
    "      }\n" +
    "      if (staticMembers) {\n" +
    "        initializeProperties(constructor, staticMembers);\n" +
    "      }\n" +
    "      return constructor;\n" +
    "    }\n" +
    "\n" +
    "    function derive(baseClass, constructor, instanceMembers, staticMembers) {\n" +
    "      /// <summary locid=\"13\">\n" +
    "      /// Uses prototypal inheritance to create a sub-class based on the supplied baseClass parameter.\n" +
    "      /// </summary>\n" +
    "      /// <param name=\"baseClass\" type=\"Function\" locid=\"14\">\n" +
    "      /// The class to inherit from.\n" +
    "      /// </param>\n" +
    "      /// <param name=\"constructor\" type=\"Function\" locid=\"9\">\n" +
    "      /// A constructor function that will be used to instantiate this class.\n" +
    "      /// </param>\n" +
    "      /// <param name=\"instanceMembers\" type=\"Object\" locid=\"10\">\n" +
    "      /// The set of instance fields, properties and methods to be made available on the class.\n" +
    "      /// </param>\n" +
    "      /// <param name=\"staticMembers\" type=\"Object\" locid=\"11\">\n" +
    "      /// The set of static fields, properties and methods to be made available on the class.\n" +
    "      /// </param>\n" +
    "      /// <returns type=\"Function\" locid=\"12\">\n" +
    "      /// The newly defined class.\n" +
    "      /// </returns>\n" +
    "      if (baseClass) {\n" +
    "        constructor = constructor || function () { };\n" +
    "        var basePrototype = baseClass.prototype;\n" +
    "        constructor.prototype = Object.create(basePrototype);\n" +
    "        Object.defineProperty(constructor.prototype, \"_super\", { value: basePrototype });\n" +
    "        Object.defineProperty(constructor.prototype, \"constructor\", { value: constructor });\n" +
    "        if (instanceMembers) {\n" +
    "          initializeProperties(constructor.prototype, instanceMembers);\n" +
    "        }\n" +
    "        if (staticMembers) {\n" +
    "          initializeProperties(constructor, staticMembers);\n" +
    "        }\n" +
    "        return constructor;\n" +
    "      } else {\n" +
    "        return define(constructor, instanceMembers, staticMembers);\n" +
    "      }\n" +
    "    }\n" +
    "\n" +
    "    function mix(constructor) {\n" +
    "      /// <summary locid=\"15\">\n" +
    "      /// Defines a class using the given constructor and the union of the set of instance members\n" +
    "      /// specified by all the mixin objects.  The mixin parameter list can be of variable length.\n" +
    "      /// </summary>\n" +
    "      /// <param name=\"constructor\" locid=\"9\">\n" +
    "      /// A constructor function that will be used to instantiate this class.\n" +
    "      /// </param>\n" +
    "      /// <returns locid=\"12\">\n" +
    "      /// The newly defined class.\n" +
    "      /// </returns>\n" +
    "      constructor = constructor || function () { };\n" +
    "      var i, len;\n" +
    "      for (i = 0, len = arguments.length; i < len; i++) {\n" +
    "        initializeProperties(constructor.prototype, arguments[i]);\n" +
    "      }\n" +
    "      return constructor;\n" +
    "    }\n" +
    "\n" +
    "    // Establish members of \"WinJS.Class\" namespace\n" +
    "    WinJS.Namespace.define(\"WinJS.Class\", {\n" +
    "      define: define,\n" +
    "      derive: derive,\n" +
    "      mix: mix\n" +
    "    });\n" +
    "\n" +
    "  })(WinJS);\n" +
    "\n" +
    "})(this);"