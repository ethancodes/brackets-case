                                                                     
                                                                     
                                                                     
                                             
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

    /* 
     * To Title Case 2.0.1 – http://individed.com/code/to-title-case/
     * Copyright © 2008–2012 David Gouch. Licensed under the MIT License. 
     */
    
    String.prototype.toTitleCase = function () {
      var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i;
    
      return this.replace(/([^\W_]+[^\s-]*) */g, function (match, p1, index, title) {
        if (index > 0 && index + p1.length !== title.length &&
          p1.search(smallWords) > -1 && title.charAt(index - 2) !== ":" && 
          title.charAt(index - 1).search(/[^\s-]/) < 0) {
          return match.toLowerCase();
        }
    
        if (p1.substr(1).search(/[A-Z]|\../) > -1) {
          return match;
        }
    
        return match.charAt(0).toUpperCase() + match.substr(1);
      });
    };
    
    function caseUpper() {
        _replaceActiveSelection(_getSelectedText().toUpperCase());
    }

    function caseLower() {
        _replaceActiveSelection(_getSelectedText().toLowerCase());
    }

    function caseTitle() {
        _replaceActiveSelection(_getSelectedText().toLowerCase().toTitleCase());
    }


    function caseCamel() {
        _replaceActiveSelection(ucwords(_getSelectedText().toLowerCase()));
    }
    
    
    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMANDU_ID = "case.uppercase";   // package-style naming to avoid collisions
    CommandManager.register("UPPERCASE", MY_COMMANDU_ID, caseUpper);
    var MY_COMMANDL_ID = "case.lowercase";   // package-style naming to avoid collisions
    CommandManager.register("lowercase", MY_COMMANDL_ID, caseLower);
    var MY_COMMANDT_ID = "case.titlecase";   // package-style naming to avoid collisions
    CommandManager.register("Title Case", MY_COMMANDT_ID, caseTitle);
    var MY_COMMANDC_ID = "case.camelcase";   // package-style naming to avoid collisions
    CommandManager.register("Camel Case", MY_COMMANDC_ID, caseCamel);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuItem(MY_COMMANDU_ID);
    menu.addMenuItem(MY_COMMANDL_ID);
    menu.addMenuItem(MY_COMMANDT_ID);
    menu.addMenuItem(MY_COMMANDC_ID);
    
});