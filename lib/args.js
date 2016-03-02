module.exports = args_from;

function args_from(process) { 
    var target = process.argv.pop();

    return {
      target : target
    }
}