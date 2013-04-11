/** Simple extension that let's you UPPERCASE, lowercase, or Proper Case the selected text */

define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        EditorManager  = brackets.getModule("editor/EditorManager");


    /*
     * _getSelectedText()
     * @private
     * Returns the text that has been selected in the editor window in focus     
     */
    function _getSelectedText() {
        return EditorManager.getActiveEditor().getSelectedText();
    }

    /*
     * _replaceActiveString(str)
     * @private     
     * Replaces the currently selected text with the passed string param 
     * @param {String} str
     */
    function _replaceActiveSelection(str) {
        EditorManager.getActiveEditor()._codeMirror.replaceSelection(str);
        EditorManager.focusEditor();
    }

    function ucwords (str) {
      // http://kevin.vanzonneveld.net
      // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
      // +   improved by: Waldo Malqui Silva
      // +   bugfixed by: Onno Marsman
      // +   improved by: Robin
      // +      input by: James (http://www.james-bell.co.uk/)
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // *     example 1: ucwords('kevin van  zonneveld');
      // *     returns 1: 'Kevin Van  Zonneveld'
      // *     example 2: ucwords('HELLO WORLD');
      // *     returns 2: 'HELLO WORLD'
      return (str + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
        return $1.toUpperCase();
      });
    }

    
    function caseUpper() {
        _replaceActiveSelection(_getSelectedText().toUpperCase());
    }

    function caseLower() {
        _replaceActiveSelection(_getSelectedText().toLowerCase());
    }

    function caseProper() {
        _replaceActiveSelection(ucwords(_getSelectedText()));
    }
    
    
    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMANDU_ID = "case.uppercase";   // package-style naming to avoid collisions
    CommandManager.register("UPPERCASE", MY_COMMANDU_ID, caseUpper);
    var MY_COMMANDL_ID = "case.lowercase";   // package-style naming to avoid collisions
    CommandManager.register("lowercase", MY_COMMANDL_ID, caseLower);
    var MY_COMMANDP_ID = "case.propercase";   // package-style naming to avoid collisions
    CommandManager.register("Proper Case", MY_COMMANDP_ID, caseProper);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
//    menu.addMenuItem(MY_COMMAND_ID);  
    menu.addMenuItem(MY_COMMANDU_ID);
    menu.addMenuItem(MY_COMMANDL_ID);
    menu.addMenuItem(MY_COMMANDP_ID);
    
});