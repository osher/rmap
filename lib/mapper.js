var path      = require('path')
  , mdl       = require('module')
  , _require  = mdl.prototype.require
;

module.exports = mapper;
  
function mapper(args) { 
    var stack = [];
    
    if (!args.target || ~args.target.replace(/\\/g,"/").indexOf('/rmap/bin/rmap') ) { 
        console.log(
          [ ""
          , "rmap - Require-Mapper - a CLI tool to map which module requires what modules"
          , ""
          , "synopsis: $ rmap <nodejsfile>"
          , "  nodejsfile  - a nodejs javascript file to execute and track"
          , ""
          ].join("\n")
        );
        process.exit();
    };

    mdl.prototype.require = function(m) { 
        var callerPath = stack.join(" > ");
        
        console.log("%s } %s", callerPath, m);
        
        stack.push(m);
        try {
            var mod = _require.call(this, m);
        } catch(e) {
            stack.pop();
            console.log( "%s ! THROWS: %s",
                callerPath.replace(/./g, " "), 
                e.message
            );
            throw e;
        }
        stack.pop();
        return mod;
    };

    console.log(" --- requireing targat start --- ");

    stack.push(args.target);
    require( path.resolve(args.target) );
    stack.pop();
    
    stack.push("event loop");
    
    console.log(" --- requireing targat ended --- ")
}