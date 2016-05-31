var _conf = require('./param.json');
var _streaming = require('./plugin/streaming.js'); 
var _social = require('./plugin/social.js'); 

var _interval =  _conf.pollInterval || 5000;

function poll()
{
	_streaming.getServerCPU();
	_streaming.getServerMemory()
	_streaming.getStreamingEngineMeasurements();
	_streaming.getStreamingApplicationMeasurements( "BMCtv" );
	_streaming.getStreamingApplicationMeasurements( "P&Atv" );
	_streaming.getStreamingApplicationMeasurements( "REFtv" );
	_streaming.getStreamingSubscriptionMetrics();
	_streaming.getStreamingFinancialMetrics();
	_streaming.getStreamingCustomMetrics();
	
	setTimeout(poll, _interval);
}

poll();

_social.listenToTwitterPosts( _conf.contextWords );

