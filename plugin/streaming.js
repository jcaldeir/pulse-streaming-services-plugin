//streaming.js

var streamingAPI = require('request');
var _os = require('os');
var _conf = require('../param.json');

var apiHost =  _conf.apiHost || localhost;
var apiPort =  _conf.apiPort || 8087;

var _source = _os.hostname();
var _last;
var MB = 1; // (1024*1024);
var GB = 1; //MB * 1024;
var MINUTES = 1; //60; //60 seconds
var HOURS = 1; //60 * MINUTES; //60 minutes
			
var exports = module.exports = {};
   
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

exports.getServerCPU = function() {
	
	var cpus = _os.cpus();

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
				console.log('STREAMING_SERVER_CPU_CORE %d %s-CPU%d', user, _source, idx + 1);
			    
		}
		
	}

	_last = cpus;
				
}

exports.getServerMemory = function() {
		
        var total = _os.totalmem() / MB;
		var free = _os.freemem()  / MB;
		
		console.log('STREAMING_SERVER_MEM_TOTAL %d %s', total, _source);
		console.log('STREAMING_SERVER_MEM_FREE %d %s', free, _source);
		console.log('STREAMING_SERVER_MEM_USED %d %s', total - free, _source);
		
				
}

exports.getStreamingSubscriptionMetrics = function() {
				
				
		console.log('STREAMING_SUBSCRIPTION_NEW_CUSTOMERS %d %s', randomIntFromInterval(0,100), _source);
		console.log('STREAMING_SUBSCRIPTION_CANCELING_CUSTOMERS %d %s', randomIntFromInterval(0,50), _source);
		console.log('STREAMING_SUBSCRIPTION_CHANNELS_VIEWED_TOTAL %d %s', randomIntFromInterval(0,50), _source);		
				
}


exports.getStreamingFinancialMetrics = function() {
								
		console.log('STREAMING_FINANCIAL_REVENUE_TOTAL %d %s', randomIntFromInterval(10000,1000000), _source);
		console.log('STREAMING_FINANCIAL_REVENUE_PER_CONSUMER %d %s', randomIntFromInterval(10,100), _source);
		console.log('STREAMING_FINANCIAL_REVENUE_PER_SECOND %d %s', randomIntFromInterval(0,10), _source);
						
}

exports.getStreamingEngineMeasurements = function() {
								
		var context = "v2/machine/monitoring/current"
		
		var apiOptions = {
						  url: "http://" + apiHost + ":" + apiPort + "/" + context,
						  headers: {
							'Accept': 'application/json; charset=UTF-8'
						  }
				};
				
		function processResult(error, response, body) {
			
			 if (!error && response.statusCode == 200) {
					 				
				var result = JSON.parse(body);
				
				//console.log(result)

				console.log('STREAMING_ENGINE_CPU_IDLE %d %s', result.cpuIdle, _source);
				console.log('STREAMING_ENGINE_CPU_USER %d %s', result.cpuUser, _source);
				console.log('STREAMING_ENGINE_CPU_SYSTEM %d %s', result.cpuSystem, _source);
				console.log('STREAMING_ENGINE_MEMORY_FREE %d %s', result.memoryFree / MB, _source);
				console.log('STREAMING_ENGINE_MEMORY_USED %d %s', result.memoryUsed / MB, _source);
				console.log('STREAMING_ENGINE_HEAP_FREE %d %s', result.heapFree / MB, _source);
				console.log('STREAMING_ENGINE_HEAP_USED %d %s', result.heapUsed / MB, _source);
				console.log('STREAMING_ENGINE_DISK_FREE %d %s', result.diskFree / MB, _source);
				console.log('STREAMING_ENGINE_DISK_USED %d %s', result.diskUsed / MB, _source);
				console.log('STREAMING_ENGINE_CONNECTION_COUNT %d %s', result.connectionCount, _source);
				console.log('STREAMING_ENGINE_SERVER_UPTIME %d %s', result.serverUptime / HOURS, _source);
				
				
				}
	
		else { console.log(error); }
		
		}
					
				
		streamingAPI.get(apiOptions, processResult);		
				
}

exports.getStreamingApplicationMeasurements = function( app ) {
				
		var context = "v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/" + app + "/monitoring/current"
		
		var apiOptions = {
						  url: "http://" + apiHost + ":" + apiPort + "/" + context,
						  headers: {
							'Accept': 'application/json; charset=UTF-8'
						  }
				};
				
		function processResult(error, response, body) {
			
			 if (!error && response.statusCode == 200) {
					 				
				var result = JSON.parse(body);
				
				//console.log(result)

				console.log('STREAMING_APP_ENGINE_UPTIME %d %s-%s', result.uptime / HOURS, _source, app);
				console.log('STREAMING_APP_BYTES_IN %d %s-%s', result.bytesIn / MB, _source, app);
				console.log('STREAMING_APP_BYTES_OUT %d %s-%s', result.bytesOut / MB, _source, app);
				console.log('STREAMING_APP_BYTES_IN_RATE %d %s-%s', result.bytesInRate, _source, app);
				console.log('STREAMING_APP_BYTES_OUT_RATE %d %s-%s', result.bytesOutRate, _source, app);
				console.log('STREAMING_APP_TOTAL_CONNECTIONS %d %s-%s', result.totalConnections, _source, app);
				console.log('STREAMING_APP_WEBM_CONNECTIONS %d %s-%s', result.connectionCount.WEBM, _source, app);
				console.log('STREAMING_APP_DVRCHUNKS_CONNECTIONS %d %s-%s', result.connectionCount.DVRCHUNKS, _source, app);
				console.log('STREAMING_APP_RTMP_CONNECTIONS %d %s-%s', result.connectionCount.RTMP, _source, app);
				console.log('STREAMING_APP_MPEGDASH_CONNECTIONS %d %s-%s', result.connectionCount.MPEGDASH, _source, app);
				console.log('STREAMING_APP_CUPERTINO_CONNECTIONS %d %s-%s', result.connectionCount.CUPERTINO, _source, app);
				console.log('STREAMING_APP_SANJOSE_CONNECTIONS %d %s-%s', result.connectionCount.SANJOSE, _source, app);
				console.log('STREAMING_APP_SMOOTH_CONNECTIONS %d %s-%s', result.connectionCount.SMOOTH, _source, app);
				console.log('STREAMING_APP_RTP_CONNECTIONS %d %s-%s', result.connectionCount.RTP, _source, app);
				
				}
	
		else { console.log(error); }
		
		}
					
				
		streamingAPI.get(apiOptions, processResult);		
				
}

exports.getStreamingCustomMetrics = function() {
				
		//Add your own custom metrics here...		
		//example - METRIC NAME, VALUE, SOURCE
		//console.log('STREAMING_CUSTOM_METRIC %d %s', randomIntFromInterval(0,100), _source);				
}


