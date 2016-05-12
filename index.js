var _conf = require('./param.json');
var _os = require('os');
//var _tools = require('graphdat-plugin-tools');

var _source = _os.hostname();
var _interval =  _conf.pollInterval || 5000;

var _last;


function poll()
{
	var cpus = _os.cpus();

	//cpus.length
	for(var idx = 0; idx < cpus.length; idx++)
	{
		var e = cpus[idx];
		e.total = 0;
		for(var t in e.times)
			e.total += e.times[t];
	}

	if (_last)
	{
		for(var idx = 0; idx < cpus.length; idx++)
		{
			var e = cpus[idx];
			var l = _last[idx];
			var user = (e.times.user - l.times.user)  /
					   (e.total - l.total);

			if (!isNaN(user))
				console.log('STREAM_CPU_CORE %d %s-C%d', user, _source, idx + 1);
			    
		}
		console.log('STREAM_MEM_CORE %d %s-C%d', user - idx, _source, idx + 1);
		console.log('STREAM_TOTAL_CONSUMERS %d %s-C%d', user / idx, _source, idx + 1);
	}

	_last = cpus;

	setTimeout(poll, _interval);
}

poll();
