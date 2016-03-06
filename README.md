#rmap

require-mapper - a CLI tool to create a module dependency tree


## use case
`
synopsis: $ rmap <nodejsfile>
  nodejsfile  - a nodejs javascript file to execute and track
`

The tool outputs to the console information 

## How does it work
It hooks on the Module#require method, and use it to build a tree of requires, 
and emit to a log entry every time a module is required, and by what other 
module.

See known issues.


## installation
`
npm install rmap -g
`

##Known issues
 - [Need to improve tracking of modules that are required lazily](https://github.com/osher/rmap/issues/1)
 