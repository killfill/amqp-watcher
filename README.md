# Amqp Watcher

  A simple watcher, that connects to an amqp server, binds an exchange to a queue, and outputs the activity.
  
  It can also send strings to the exchange.
  

## Installation

	$ npm install amqp-watcher -g

## Options
```
Options:

  -h, --help                          output usage information
  -V, --version                       output the version number
  -s, --server <servername>           Hostname of the server [localhost]
  -u, --url <url>                     Url to connect to. For example amqp://user:pass@localhost:port/vhost]
  -e, --exchange <name:type:durable>  Exchange type to bind to [amq.topic:topic:true]
  -b, --body <text>                   Send a message with the specified body. Will quit after
  -k, --key [routing key]             Set the value of the routing key [#]
  -c, --count <n>                     Repeat the msg n times [1]
```

## Examples

Bind to myExchange, all messages:

	$ amqp-watcher -s myhost -e myExchange

Bind to myExchange, ad listen to messages comming with routing key 'this.route':

	$ amqp-watcher -s myhost -e myExchange -k 'this.route'

Send 10 'hello world' to myExchange:

	$ amqp-watcher -s myhost -e myExchange -b 'hello world' -c 10


## License 

(The MIT License)

Copyright (c) 2011 Phillip Neumann &lt;pneumann@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.