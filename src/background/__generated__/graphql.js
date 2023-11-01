"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFishDocument = exports.EcosystemAnalysisMessageParameterType = exports.AnalysisStatus = void 0;
var AnalysisStatus;
(function (AnalysisStatus) {
    AnalysisStatus["Bad"] = "bad";
    AnalysisStatus["Moderate"] = "moderate";
    AnalysisStatus["Ok"] = "ok";
    AnalysisStatus["Skipped"] = "skipped";
})(AnalysisStatus = exports.AnalysisStatus || (exports.AnalysisStatus = {}));
var EcosystemAnalysisMessageParameterType;
(function (EcosystemAnalysisMessageParameterType) {
    EcosystemAnalysisMessageParameterType["Float"] = "float";
    EcosystemAnalysisMessageParameterType["Integer"] = "integer";
    EcosystemAnalysisMessageParameterType["String"] = "string";
})(EcosystemAnalysisMessageParameterType = exports.EcosystemAnalysisMessageParameterType || (exports.EcosystemAnalysisMessageParameterType = {}));
exports.SearchFishDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "SearchFish" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "substring" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "fishList" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "substring" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "substring" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cursor" } }, { "kind": "Field", "name": { "kind": "Name", "value": "node" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }] } }] } }] } }] };
