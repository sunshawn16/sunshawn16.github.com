#spike－Message queue
##What
在计算机科学中，消息队列（Message queue）是一种进程间通信或同一进程的不同线程间的通信方式。
消息发送后，可以立即返回，由消息系统来确保消息的可靠传递，消息作为应用间的一种通信方式，能够有效的降低各模块间的**耦合性**，提升**分布式协作**的效率。

***
JMS 提供了:

* 点对点模式 point to point queue:仅允许一对一，Java消息服务JMS的接收者和发送者之间不存在时间上的依赖关系。不论发送者发送消息时接收者是否在运行，接收者都可以提取信息。接收者对于成功处理的消息给出回执。

![P2P][pic]
[pic]:/Users/xiaosun/sunshawn16.github.com/source/_posts/images/P2Pqueue "P2P"

* 发布－订阅模式 publish/subcribe topic 模式:向某个话题订阅的客户程序只能收到那些在它订阅之后发布的消息。为了接收到消息，订阅者必须保持活动状态。因此，发布者和订阅者之间存在时间上的依赖关系。

![Publish/subcribe][pic]
[pic]:/Users/xiaosun/sunshawn16.github.com/source/_posts/images/publiser&subqueue "Publish/subcribe"

##Why

* 稳定性 — 组件失败对消息的影响程度远远小于组件间的直接调用，因为消息存储在队列中并一直留在那里，直到被适当地处理。消息处理同事务处理相似，因为消息处理是有保证的。
* 消息优先级 — 更紧急或更重要的消息可在相对不重要的消息之前接收，因此可以为关键的应用程序保证足够的响应时间。
* 脱机能力 — 发送消息时，它们可被发送到临时队列中并一直留在那里，直到被成功地传递。当因任何原因对所需队列的访问不可用时，用户可以继续执行操作。同时，其他操作可以继续进行，如同消息已经得到了处理一样，这是因为网络连接恢复时消息传递是有保证的。
* 事务性消息处理 — 将多个相关消息耦合为单个事务，确保消息按顺序传递、只传递一次并且可以从它们的目标队列中被成功地检索。如果出现任何错误，将取消整个事务。
* 安全性 — MessageQueue 组件基于的消息队列技术使用 Windows 安全来保护访问控制，提供审核，并对组件发送和接收的消息进行加密和验证。



##feature
* decoupling
* redundancy:确保过程完成彩绘丢弃message
* scalability:因为和过程解耦，不必多写代码也更容易扩大规模。
* Elasticity & Spikability: 如果出现和大网站的链接，不必担心大流量
* resiliency：恢复力，当结构坏了，不至于让整个系统坏掉，queue可以继续接受和保存message。
* delivery guarantees:redudancy 可以确保message 最终被处理掉，只要过程还在读取queue。每个message 都会被处理一次。
* ordering guarantees:大部分情况，处理信息的顺序是非常重要的。
* buffering：
* understanding data flow:有一个overall sense 来理解分布式系统。理解完成用户行为的时间，以及重要性。
* Asynchronous Communication:大部分时候你并不需要立刻处理信息。
* 可以把你的应用分解成一些服务，使得他们分别工作。


## Implements&Comparsion
![protocols and implements](../images/MessageQueue1.PNG)

###apache kafka
>Apache Kafka is an open-source message broker project developed by the Apache Software Foundation written in Scala.  The project aims to provide a unified, high-throughput, low-latency platform for handling real-time data feeds.

* Written at LinkedIn in Scala
* Used by LinkedIn to offload processing of all page and other views
* Defaults to using persistence, uses OS disk cache for hot data (has higher throughput then any of the above having persistence enabled)
*Supports both on-line as off-line processing
###zeroMQ
>zeroMQ 专门为了搞吞吐量量／低影响因素场景设计的轻量级的信息系统。它支持很多新的场景，但是你需要自己实现，还需要学习很多东西再来发消息。
* The socket library that acts as a concurrency framework
* Faster than TCP, for clustered products and supercomputing
* Carries messages across inproc, IPC, TCP, and multicast
* Connect N-to-N via fanout, pubsub, pipeline, request-reply
* Asynch I/O for scalable multicore message-passing apps

它着重在高效的传递信息而不是像RabbitMQ 一样作为一个完整的代理人来处理，存储，过滤和监控信息。是一个构建message queue的框架，而不是像其他MQ 一样提前打包messsages. 
它没有"broker"，意味着，它不会有一个中心分发器来管理信息，就不是
一个“全服务”的message queue
ZeroMQ你可以做更多自己的控制，当你需要考虑更高的开销的时候，可以考虑RabbitMQ 和activeMQ
###RabitMQ
>RabbitMQ is an open source message broker software (sometimes called message-oriented middleware) that implements the Advanced Message Queuing Protocol (AMQP).
AMQP  协议应用最广泛的实现，采用broker 结构，意味着消息在发送给服务器之前都需要在中心节点处排队。容易部署和使用，但是因为核心节点的存在处理速度比较慢、不宜扩张。
RabbitMQ is built on Erlang, powered by AMQP and is used frequently with applications within Erlang, Python, PHP, Ruby, et al.  
ActiveMQ is built in JAVA on JMS.


* RabbitMQ is a Message Queue Server in Erlang
* stores jobs in memory (message queue)
* runs on all major operating systems
* supports a huge number of developer platforms
* open source and commercially supported

***

|Parameter|Kafka|rabbitMQ|zeroMq|
------|----|----|---|
|custering\load balancing mechanism|Available but producer has to know to which partition it is writing..|Clustering Available, Queues clustering have to be handled separately.Clustering queue will be only for HA not for load balancing Feature|Can be achieved by wriritng lots of customize code.|
|Replication among different nodes.|available|available|Not automatic as there is no broker but can be coded. But lot of customization.|
|Fault tolerance feature. Turned around time in case of failure|Zookeeper is required to manage it.|Durable Queue, Durable Message and Clustering support. Another cluster node will take over but in case of queue it is different(connection has to be established with new node again by client.)|Features available but not out of the box.|
|Supported libraries for go and other languages like dot net (CRM , ERP and CMS are on window stack).|Available support for Go.|Available in languages Java, Go, Python and .Net|Go support available
|security|Not available in current version.|Basic Level of Authentication like restricting users for read/write/configure(administration) exist.|One has to built on top of it.|
|Interopretability in case Message broker is to be changed. (No binding)|Rest interface plugis are available.|AMQP 0.9 complaint. So changing one AMQP complaint broker with another one should not need a change in client code. Rest based plugin available.|Specific client has to be written.|
|Performance throughput (read/write).|Very fast|Moderate as per benchmarking data available. (I read in pivotal blog that it can receive and deliver more than one million messages per second.)|very fast|
|Administration interface|Very basic interface. Third party web console is available.Less features as compared to RabbitMq interface like User Management|Available, Http based having basic functionality.|Not available has to be built in.|
***
RabbitMQ是一个AMQP实现，传统的messaging queue系统实现，基于Erlang。老牌MQ产品了。AMQP协议更多用在企业系统内，对数据一致性、稳定性和可靠性要求很高的场景，对性能和吞吐量还在其次。

Kafka是linkedin开源的MQ系统，主要特点是基于Pull的模式来处理消息消费，追求高吞吐量，一开始的目的就是用于日志收集和传输，0.8开始支持复制，不支持事务，适合产生大量数据的互联网服务的数据收集业务。

ZeroMQ只是一个网络编程的Pattern库，将常见的网络请求形式（分组管理，链接管理，发布订阅等）模式化、组件化，简而言之socket之上、MQ之下。对于MQ来说，网络传输只是它的一部分，更多需要处理的是消息存储、路由、Broker服务发现和查找、事务、消费模式（ack、重投等）、集群服务等。

***
Ref1: [comparsion Mqs](http://www.brokeragesdaytrading.com/article/3302104206/comparison-of-message-broker-rabbitmq-activemq-kafka-zeromq-/ "comparsion Mqs")

Ref2:[Rabbit Q seems best](http://blog.csdn.net/linsongbin1/article/details/47781187)

Ref3:[RabbitQ and AMQP](http://www.infoq.com/cn/articles/AMQP-RabbitMQ)

Ref4:[Big data messaging with Kafka](http://www.javaworld.com/article/3060078/big-data/big-data-messaging-with-kafka-part-1.html#tk.rss_all)