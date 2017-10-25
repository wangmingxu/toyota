//自定义一个插件，可用于在html上插入scriptsrc
function InsertScriptPlugin(options) {
this.options = options;
}

InsertScriptPlugin.prototype.apply = function(compiler) {
    var paths = this.options.paths;
    compiler.plugin('compilation', function(compilation, options) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            for (var i = paths.length - 1; i >= 0; i--) {
                htmlPluginData.assets.js.unshift(paths[i]);
            }
            callback(null, htmlPluginData);
        });
    });
};

module.exports = InsertScriptPlugin;
