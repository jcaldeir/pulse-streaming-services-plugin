# pulse-streaming-services-plugin
Pulse Plugin to consume metrics and events from Streaming Platforms

### Streaming Platforms Supported
 - Wowza Media Systems- http://www.wowza.com

### Prerequisites

#### Supported OS

|     OS    | Linux | Windows | SmartOS | OS X |
|:----------|:-----:|:-------:|:-------:|:----:|
| Supported |   v   |    v    |    -    |  -   |

#### Boundary Meter versions v4.2 or later

- To install new meter go to Settings->Installation or [see instructions](https://help.boundary.com/hc/en-us/sections/200634331-Installation).
- To upgrade the meter to the latest version - [see instructions](https://help.boundary.com/hc/en-us/articles/201573102-Upgrading-the-Boundary-Meter).

#### Boundary Meter versions earlier than v4.2

None

#### Server Runtime

|  Runtime | node.js | Python | Java |
|:---------|:-------:|:------:|:----:|
| Required |    +    |        |      |

- [How to install node.js?](https://help.boundary.com/hc/articles/202360701)

### Plugin Setup

None

### Plugin Configuration Fields

|Field Name   |Description                                             |
|:----------------|:---------------------------------------------------|
|Source           |Meter collecting metrics from the Streaming Platform|
|PollInterval     |How often to send measurements in seconds           |
|Host             |Hostname/IP of the Streaming Platform API server    |
|Port             |Port of the Streaming Platform API server           |

### Metrics Collected

|Metric Name                                       |Description                                                                 |
|:-------------------------------------------------|:---------------------------------------------------------------------------|
|STREAMING_SERVER_CPU_CORE                         |Total CPU server utilization                                                |
|STREAMING_SERVER_MEM_TOTAL                        |Total server Memory                                                         |
|STREAMING_SERVER_MEM_FREE                         |Total server Free Memory                                                    |
|STREAMING_SERVER_MEM_USED                         |Total server Used Memory                                                    |
|STREAMING_SUBSCRIPTION_NEW_CUSTOMERS              |Number of new customers subscribing to the streaming service                |
|STREAMING_SUBSCRIPTION_CANCELING_CUSTOMERS        |Number of customers cancelling their subscription from the streaming service|
|STREAMING_SUBSCRIPTION_CHANNELS_VIEWED_TOTAL      |Number of streaming channels being viewed                                   |
|STREAMING_FINANCIAL_REVENUE_TOTAL                 |Total revenue generated                                                     |
|STREAMING_FINANCIAL_REVENUE_PER_CONSUMER          |Total revenue per customer                                                  |
|STREAMING_FINANCIAL_REVENUE_PER_SECOND            |Total revenue per second                                                    |
|STREAMING_ENGINE_CPU_IDLE                         |Streaming Engine CPU Idle                                                   |
|STREAMING_ENGINE_CPU_USER                         |Streaming Engine CPU User                                                   |
|STREAMING_ENGINE_CPU_SYSTEM                       |Streaming Engine CPU System                                                 |
|STREAMING_ENGINE_MEMORY_FREE                      |Streaming Engine Free Memory                                                |
|STREAMING_ENGINE_MEMORY_USED                      |Streaming Engine Used Memory                                                |
|STREAMING_ENGINE_HEAP_FREE                        |Streaming Engine Heap Free                                                  |
|STREAMING_ENGINE_HEAP_USED                        |Streaming Engine Heap Used                                                  |
|STREAMING_ENGINE_DISK_FREE                        |Streaming Engine Disk Free                                                  |
|STREAMING_ENGINE_DISK_USED                        |Streaming Engine Disk Used                                                  |
|STREAMING_ENGINE_CONNECTION_COUNT                 |Total connections to the Streaming Engine                                   |
|STREAMING_ENGINE_SERVER_UPTIME                    |Streaming Engine Uptime                                                     |
|STREAMING_APP_ENGINE_UPTIME                       |Application Engine Uptime                                                   |
|STREAMING_APP_BYTES_IN                            |Application Engine Bytes In                                                 |
|STREAMING_APP_BYTES_OUT                           |Application Engine Bytes Out                                                |
|STREAMING_APP_BYTES_IN_RATE                       |Application Engine Bytes In Rate                                            |
|STREAMING_APP_BYTES_OUT_RATE                      |Application Engine Bytes Out Rate                                           |
|STREAMING_APP_TOTAL_CONNECTIONS                   |Application Engine total connections                                        |
|STREAMING_APP_WEBM_CONNECTIONS                    |Application Engine WEBM protocol connections                                |
|STREAMING_APP_DVRCHUNKS_CONNECTIONS               |Application Engine DVRCHUNKS protocol connections                           |
|STREAMING_APP_RTMP_CONNECTIONS                    |Application Engine RTMP protocol connections                                |
|STREAMING_APP_MPEGDASH_CONNECTIONS                |Application Engine MPEGDASH protocol connections                            |
|STREAMING_APP_CUPERTINO_CONNECTIONS               |Application Engine CUPERTINO protocol connections                           |
|STREAMING_APP_SANJOSE_CONNECTIONS                 |Application Engine SANJOSE protocol connections                             |
|STREAMING_APP_SMOOTH_CONNECTIONS                  |Application Engine SMOOTH protocol connections                              |
|STREAMING_APP_RTP_CONNECTIONS                     |Application Engine RTP protocol connections                                 |


### Dashboards

|Dashboard Name|Metrics Displayed                                                       |
|:-------------|:-----------------------------------------------------------------------|
|BMCtv         | Sample Pulse Dasboard with 9 ootb metrics                              |
|P&Atv         | Sample Pulse Dasboard with 9 ootb metrics                              |
|REFtv         | Sample Pulse Dasboard with 9 ootb metrics                              |

### References

None
