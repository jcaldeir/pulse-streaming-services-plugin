var _conf = require('./param.json');
var _streaming = require('./plugin/streaming.js'); 

var _interval =  _conf.pollInterval || 5000;
var _apiHost =  _conf.apiHost || localhost;
var _apiPort =  _conf.apiPort || 8087;

function poll()
{

	_streaming.getServerCPU();
	_streaming.getServerMemory()
	_streaming.getStreamingEngineMeasurements( _apiHost, _apiPort);
	_streaming.getStreamingApplicationMeasurements( _apiHost, _apiPort, "BMCtv");
	_streaming.getStreamingApplicationMeasurements( _apiHost, _apiPort, "P&Atv");
	_streaming.getStreamingApplicationMeasurements( _apiHost, _apiPort, "REFtv");
	_streaming.getStreamingSubscriptionMetrics();
	_streaming.getStreamingFinancialMetrics();
	
	
	setTimeout(poll, _interval);
}

poll();
