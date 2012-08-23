[![build status](https://secure.travis-ci.org/killfill/amqp-watcher.png)](http://travis-ci.org/killfill/amqp-watcher)
# Amqp Watcher

  A tool to get and send messages from an amqp server from the command line
  

## Installation

	$ npm install amqp-watcher -g

## Usage
```
Usage: amqp-watcher [options] [command]

  Commands:

    get 
    Get messages from the given exchange or if specified directly from a queue.
    
    send 
    Send messages to the exchange

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -s, --server <servername>  Hostname of the server [localhost]
    -u, --url <url>            Url to connect to. For example amqp://user:pass@localhost:port/vhost]
    -e, --exchange <name>      Exchange name to bind to [amq.topic]
    -t, --type <type>          Exchange type
    -q, --queue <queuename>    Queue name [watcher-randomnr]
    -d, --durable <bool>       Is the exchange or queue durable? [true]
    -k, --key [routing key]    Set the value of the routing key [#]
    -o, --output <file>        Output messages to [stdout]
    -i, --input <file>         Read messages from
    -b, --body <text>          Body of the message to send.
    ,--text <bool>             Assume the content in the body is text [true]
    -c, --count <n>            Send or get n messages
```

## Examples

Get all mesages from exchange

	$ amqp-watcher get -s myhost -e exchange

Get messages exchange, that match the routing key 'this.route':

	$ amqp-watcher get -s myhost -e exchange -k 'this.route'

Send 10 'hello world' to exchange:

	$ amqp-watcher send -s myhost -e exchange -b 'hello world' -c 10

Get the first message from queue

	$ amqp-watcher get -s myhost -q queue -c 1

Send the content of file.txt to exchange, line by line

	$ amqp-watcher send -s myhost -e exchange -i file.txt

Get all messages from host1 comming to queue and send it to host2 to exchange

	$ amqp-watcher get -s host1 -q queue | amqp-watcher send -s host2 -e exchange



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