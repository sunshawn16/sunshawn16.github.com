---
title: Micro-service overview
date: 2016-05-11 19:32:41
tags: micro-service
category: tech
---

微服务中的每个服务都是一个独立的进程，他们之间的交互需要使用inter-process communication(IPC)算法。
我们将介绍一些设计的思路和一些IPC技术

＃Interaction styles
当选择IPC算法的时候，我们首先应该考虑服务之间是如何进行交互的。有一些客户端－服务器交互方式，主要可以通过两个纬度来划分。
第一个分类方法是：

* one-to-one：每个客户端请求由一个服务实体来处理， 
* one-to-many：每个请求由多个服务实体来处理。

第二个分类方法是：

* synchronous:客户端需要服务器实时的反馈，当它需要等待甚至会导致阻塞
* asynchronous：反馈不是立刻需要的。

###Defining APIs

提前精确的定义好interface definition language是很重要的，Api定义的本质决定于你所使用的IPC 算法种类。如果你使用message， API 就由信息channels 和message type 组成，如果你使用HTTP，API 就由URL 和request response 组成。

###Evolving APIs
当需要改变某个API的时候，

### handling partial failure

处理的策略有：

* network timeouts：等待response的时候常用timeouts，
* limiting the number of outstanding request
* circuit breaker pattern: 纪录成功和失败的请求的树木，如果超过门限值，就进行circuit breaker。timeout 时期过去后，可以恢复客户端的请求
* provide fallbacks：

Netflix hystrix

### IPC technologies

同步可以使用HTTP为基础的rest 或者thrift, 异步可以使用message 为基础的 AMQP 和STOMP。

#### Asynchronous, Message-Based Communication

message 由头和body 组成，通过channels 来交换有one-to-one 和 publish-subcribe 模式。

优势：

* 解藕－－不需要使用发现算法来决定服务instance 的位置
* message buffering－客户端和服务器要清楚交换信息的时间。broker 会把消息排列好，直到有consumer 来处理它。
* flexible client－支持所有交互模式
* explicit-process communication:安全

缺点：

* 操作的复杂性：message 系统必须配置， message broker 必须可靠和稳固
* 实现上的工作比较复杂，比如correlation ID.

#### Synchronous, Request/Response IPC

REST is an IPC mechanism that (almost always) uses HTTP.



