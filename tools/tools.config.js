var path = require('path')
var ToolsContainerDirName = './tools.json'
var ToolsContainer = require(ToolsContainerDirName);
ToolsContainer.toolsPath = path.dirname(ToolsContainerDirName);
ToolsContainer.getDependencies = function(dependenciesName){
    return path.resolve(__dirname, ToolsContainer.toolsPath, ToolsContainer.dependencies[dependenciesName]).replace(/\\/g, '\\\\');
}

module.exports = ToolsContainer